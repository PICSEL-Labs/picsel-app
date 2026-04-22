/**
 * QR 페이지 WebView에 주입되어 벤더별 다운로드 방식(blob/server endpoint/Web Share API)을
 * 가로채 base64로 변환한 뒤 RN에 전달하는 Bridge Script.
 * RN과 주고받는 메시지 타입: qr-download:complete / error / debug
 */
export const QR_DOWNLOAD_INJECTED_SCRIPT = `
(function() {
  // WebView는 페이지 내부 네비게이션 시 스크립트를 재주입할 수 있어, 리스너/override가 중복 등록되면
  // 같은 클릭이 여러 번 처리된다. 플래그로 최초 1회만 설치되도록 방어한다.
  if (window.__picselQrDownloadHookInstalled) { return true; }
  window.__picselQrDownloadHookInstalled = true;

  // RN으로 메시지를 보내는 유일한 통로. ReactNativeWebView가 붙기 전(초기 로드 시점)에
  // 호출될 경우를 대비해 존재 여부를 매번 확인한다.
  function post(payload) {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    }
  }

  // 다운로드 파이프라인: URL → fetch → blob → base64 → RN. 각 단계마다 debug 메시지를 남겨
  // 실패 시 어느 구간에서 끊겼는지(네트워크 / MIME / FileReader) 바로 추적할 수 있게 한다.
  //
  // 빠른 연타로 같은 이미지가 중복 저장되는 것을 막기 위해 진행 중에는 플래그로 재진입을 차단한다.
  // 성공/실패 모두에서 finally로 해제해야 다음 다운로드가 가능해진다.
  function handle(href, downloadName) {
    if (window.__picselQrDownloading) {
      post({ type: 'qr-download:debug', event: 'handle:skip-inflight' });
      return;
    }
    window.__picselQrDownloading = true;

    post({ type: 'qr-download:debug', event: 'handle:start', href: href, downloadName: downloadName });
    fetch(href)
      .then(function(res) {
        post({ type: 'qr-download:debug', event: 'handle:fetched', status: res.status, ok: res.ok });
        return res.blob();
      })
      .then(function(blob) {
        post({ type: 'qr-download:debug', event: 'handle:blob', size: blob.size, mimeType: blob.type });
        // 영상은 현재 저장 대상에서 제외 (네이티브 저장 경로가 사진만 지원). 영상 지원이 필요해지면
        // RN 쪽 savePhoto 로직과 함께 이 분기를 열어야 한다.
        if (blob.type && blob.type.indexOf('video/') === 0) {
          post({ type: 'qr-download:debug', event: 'handle:skip-video' });
          return null;
        }
        return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onloadend = function() {
            post({ type: 'qr-download:debug', event: 'handle:base64-ready', mimeType: blob.type, length: (reader.result && reader.result.length) || 0 });
            resolve({ base64: reader.result, mimeType: blob.type || '' });
          };
          reader.onerror = function() { reject(new Error('FileReader error')); };
          reader.readAsDataURL(blob);
        });
      })
      .then(function(data) {
        if (!data) return;
        post({ type: 'qr-download:debug', event: 'handle:posting-complete' });
        post({
          type: 'qr-download:complete',
          base64: data.base64,
          mimeType: data.mimeType,
          filename: downloadName || '',
        });
      })
      .catch(function(err) {
        post({ type: 'qr-download:debug', event: 'handle:catch', message: (err && err.message) || String(err) });
        post({ type: 'qr-download:error', message: (err && err.message) || String(err) });
      })
      .finally(function() {
        window.__picselQrDownloading = false;
      });
  }

  // ── 진입점 1: <a> 클릭 인터셉트 ────────────────────────────────────────────
  // capture phase(true)로 등록해 벤더 페이지의 자체 핸들러보다 먼저 실행되게 한다.
  // 그래야 preventDefault로 기본 네비게이션을 막을 수 있다.
  document.addEventListener('click', function(e) {
    // 실제로 다운로드로 이어지는 클릭은 <a> 태그(자신 또는 조상)인 경우에 한정한다.
    // 아이콘 SVG나 내부 span이 클릭돼도 조상을 타고 올라가 A를 찾는다.
    var el = e.target;
    var foundA = null;
    while (el && el !== document.body) {
      if (el.tagName === 'A') { foundA = el; break; }
      el = el.parentElement;
    }

    // A 미발견 시에만 부모 5단계 체인을 남긴다. 새 벤더가 <a>가 아닌 엘리먼트로
    // 저장 버튼을 만들 때, 이 로그만이 어떤 매칭 조건을 추가해야 할지 역산하는 단서가 된다.
    // 성공 케이스는 handle:* 디버그 로그로 추적 가능하므로 여기서 또 남기지 않는다.
    if (!foundA) {
      var chain = [];
      var cur = e.target;
      for (var i = 0; i < 5 && cur; i++) {
        chain.push({
          tag: cur.tagName,
          id: cur.id || null,
          className: (typeof cur.className === 'string') ? cur.className : null,
          href: cur.getAttribute ? cur.getAttribute('href') : null,
          download: cur.hasAttribute ? cur.hasAttribute('download') : null,
        });
        cur = cur.parentElement;
      }
      post({ type: 'qr-download:debug', event: 'click-no-a', chain: chain });
      return;
    }

    var href = foundA.getAttribute('href') || '';
    var absHref = foundA.href || '';
    var hasDownload = foundA.hasAttribute('download');

    // 벤더마다 다운로드 방식이 다르므로 두 축으로 감지한다.
    //  ① blob: URL 또는 download 속성 — 하루필름처럼 웹 표준에 충실한 구현
    //  ② 미디어 URL 휴리스틱 — 포토이즘처럼 서버 엔드포인트로 바로 보내는 구현
    //     (확장자, 또는 download/albumdn/type=photo 등 쿼리 키워드로 추정)
    var isBlobOrDownload = href.indexOf('blob:') === 0 || hasDownload;
    var isMediaUrl =
      /\\.(jpe?g|png|gif|webp|heic|heif|mp4|mov|m4v)(\\?|$)/i.test(absHref) ||
      /(download|albumdn|attachment|file=|type=(photo|video))/i.test(absHref);

    if (isBlobOrDownload || isMediaUrl) {
      // WebView가 URL로 이동해버리면 페이지를 이탈하거나 이미지만 풀스크린으로 열려 저장이 안 된다.
      // 그러므로, 기본 동작을 완전히 막고 우리 파이프라인으로 넘긴다.
      e.preventDefault();
      e.stopPropagation();
      handle(foundA.href, foundA.getAttribute('download'));
    }
  }, true);

  // ── 진입점 2: navigator.share override ─────────────────────────────────────
  // 일부 벤더는 <a download> 대신 Web Share API로 파일을 넘긴다. 네이티브 공유 시트가 뜨면
  // 앱 카메라 롤로 직접 저장하는 흐름이 끊기므로, share 호출을 가로채서 첫 번째 이미지 파일을
  // base64로 변환해 RN으로 보낸다. 이미지가 없으면 원래 share 동작을 그대로 위임한다.
  if (navigator.share) {
    var originalShare = navigator.share.bind(navigator);
    navigator.share = function(data) {
      var files = data && data.files;
      if (files && files.length > 0) {
        // 여러 파일이 있을 수 있으니 이미지 타입(MIME 또는 확장자)을 찾고, 영상은 제외한다.
        var imageFile = null;
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var isImageByType = f && f.type && f.type.indexOf('image/') === 0;
          var isImageByName = f && f.name && /\\.(jpe?g|png|gif|webp|heic|heif)$/i.test(f.name);
          var isVideo = f && f.type && f.type.indexOf('video/') === 0;
          if (!imageFile && !isVideo && (isImageByType || isImageByName)) {
            imageFile = f;
          }
        }

        if (imageFile) {
          // handle()과 동일한 in-flight 플래그를 공유해 연타로 인한 중복 저장을 차단한다.
          if (window.__picselQrDownloading) {
            post({ type: 'qr-download:debug', event: 'share:skip-inflight' });
            return Promise.resolve();
          }
          window.__picselQrDownloading = true;

          return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function() {
              post({
                type: 'qr-download:complete',
                base64: reader.result,
                mimeType: imageFile.type || '',
                filename: imageFile.name || '',
              });
              resolve();
            };
            reader.onerror = function() {
              post({ type: 'qr-download:error', message: 'share FileReader error' });
              reject(new Error('FileReader error'));
            };
            reader.readAsDataURL(imageFile);
          }).finally(function() {
            window.__picselQrDownloading = false;
          });
        }
      }

      // 이미지 파일이 없으면 원래 share 동작 유지 (텍스트/URL 공유 등)
      return originalShare(data);
    };
  }

  true;
})();
`;
