# Picsel 프로젝트 코드 컨벤션

## 📂 1. 프로젝트 구조

```
📦 project-root(FSD + Atomic)
┣ 📂 src
┃ ┣ 📂 api             # API 요청 관련 (axios, react-query)
┃ ┣ 📂 assets          # 이미지, 아이콘, 폰트 등 정적 파일
┃ ┣ 📂 components      # 공통 UI 컴포넌트 (버튼, 카드, 모달 등)
┃ ┣ 📂 features        # 주요 도메인 기능 (모듈 단위 관리)
┃ ┃ ┣ 📂 auth          # 로그인, 회원가입 관련 기능 (네이버/카카오 로그인 포함)
┃ ┃ ┣ 📂 map           # 지도 관련 기능 (네이버/구글 지도)
┃ ┃ ┣ 📂 restaurant    # 맛집 관련 기능 (리스트, 상세보기)
┃ ┃ ┣ 📂 review        # 리뷰 작성/조회 기능
┃ ┃ ┗ 📂 cart          # 장바구니 기능 (즐겨찾기)
┃ ┣ 📂 hooks           # 커스텀 훅 (useAuth, useLocation 등)
┃ ┣ 📂 utils           # 유틸리티 함수
┃ ┣ 📂 navigation      # React Navigation 설정 (스택, 탭, 드로어)
┃ ┣ 📂 store           # Zustand 상태관리
┃ ┣ 📂 styles          # 전역 스타일 (NativeWind 설정)
┃ ┣ 📂 screens         # 페이지 단위 화면 (Home, Search, Profile 등)
┃ ┣ 📜 App.tsx         # 앱 진입점
┃ ┗ 📜 index.tsx       # 엔트리 포인트
┗ 📜 package.json
```

## 📝 2. 명명 규칙

### 2.1 기본 규칙

| 스타일     | 용도                                    | 예시          |
| ---------- | --------------------------------------- | ------------- |
| PascalCase | 클래스, 인터페이스, 타입, 컴포넌트 폴더 | `TitleTitle`  |
| camelCase  | 변수, 함수, 기본 폴더                   | `titleTitle`  |
| kebab-case | 파일명(이미지)                          | `title-title` |
| UPPER_CASE | 상수변수                                | `TITLE_TITLE` |

### 2.2 명명 세부 규칙

#### 2.2.1 Boolean 타입

Boolean 타입인 경우 'is'로 시작합니다.

```tsx
let isAvailable = false;
```

#### 2.2.2 함수

- 이벤트 핸들러는 'handle'로 시작

```tsx
const handleClick = () => {};
const handleKeyDown = () => {};
```

- 이름은 가장 효율적인 방식으로 그것이 수행/소유하는 것을 반영해야 함(주석이 없더라도 알아보기 쉽도록)

```tsx
/* Bad */
const a = 5; // "a" could mean anything
const isPaginatable = a > 10; // "Paginatable" sounds extremely unnatural
const shouldPaginatize = a > 10; // Made up verbs are so much fun!

/* Good */
const postCount = 5;
const hasPagination = postCount > 10;
const shouldPaginate = postCount > 10; // alternatively
```

- 축약은 최소한만 사용 (가독성을 해침)

```tsx
/* Bad */
const onItmClk = () => {};

/* Good */
const onItemClick = () => {};
```

## 🔄 3. 순서 규칙

### 3.1 import 순서 정리

린트 설정을 통해 통일 ([참고](https://tesseractjh.tistory.com/305))

### 3.2 컴포넌트 내 선언 순서

1. useRouter, useParams, useAppSelector
2. useQuery
3. customHook
4. useRef
5. useState
6. 일반 변수들
7. mutation
8. 함수
9. 조건문
10. **useEffect (필수 최하단)**

## 📏 4. 개행 규칙

- return문 바로 위는 한 줄 개행

```jsx
// Bad
const getResult = () => {
  ...
  return someDataInFalse;
}

// Good
const getResult = () => {
  ...

  return someDataInFalse;
}
```

## 🧰 5. 기타 컨벤션

- **ESLint와 Prettier 적용**: `.eslintrc.js`와 `.prettierrc` 설정을 팀과 동일하게 유지하고 `eslint --fix`, `prettier --write` 또는 IDE 자동 저장 설정을 활용하여 코드 정리 필수
- **화살표 함수 사용**: 함수 선언 시 가능하면 화살표 함수 사용
- **등호 연산자**: 삼중 등호 연산자만 사용

```jsx
const numberB = 777;

// Bad
if (numberB == '777') {
  ...
}

// Good
if (numberB === 777) {
  ...
}
```

## 📌 6. Attributes

### 6.1 인라인 스타일 사용 최소화

### 6.2 Boolean 값 애트리뷰트

- HTML5에서는 Boolean 애트리뷰트를 선언하는 것만으로도 true 값을 가짐. 필요하지 않다면 값 생략

```html
<!-- Not Bad -->
<button disabled="true"></button>

<!-- Good -->
<button disabled></button>
```

## 🔷 7. TypeScript 규칙

- **타입 정의**: `any` 사용 금지, 대신 `unknown`을 사용
- 가능한 모든 변수, 함수 매개변수, 반환 값에 명시적 타입 지정
- 재사용 가능한 타입은 별도 파일에 정의 (types 파일)
- 객체 타입은 interface 사용 (확장성 고려)
- Props와 State의 타입 정의 필수

```tsx
// Good
interface EpicStatusBoxProps {
  project?: ProjectData;
  statuses?: WorkspaceStatus[];
}

const EpicStatusBox = ({project, statuses}: EpicStatusBoxProps) => {
  // ...
};

// Bad
const EpicStatusBox = ({
  project,
  statuses,
}: {
  project?: ProjectData;
  statuses?: WorkspaceStatus[];
}) => {
  // ...
};
```

## 📦 8. 상태 관리 (Zustand)

- **비구조화 할당 사용**: `const { count, increment } = useStore();`

## 🔄 9. 데이터 패칭 (TanStack Query)

- **쿼리 키는 API 명과 최대한 일치하도록 설정**:
  - 단 **GET 메소드일땐 get 제외**
    - 예시로 Api 식별 명이 getUserAPI: `useQuery(['user', userId], fetchUserData)`
    - Api 식별 명이 patchUserAPI: `useQuery(['patchUser', userId], fetchUserData)`

## 🌿 10. Git 규칙

### 10.1 브랜치 전략: Git Flow

#### 전략 설명

📌 Git Flow 브랜치 흐름

1. `main`에서 **배포된 코드**가 관리됨
2. `develop`에서 새로운 기능 개발이 이루어짐
3. 새로운 기능 개발 시 `feature` 브랜치를 만들어 작업
4. 기능이 완료되면 `develop`에 **Merge**
5. 배포 준비가 되면 `release` 브랜치를 만들어 최종 수정 및 QA
6. `release`가 완료되면 `main`에 **Merge & 배포**
7. 배포 후 `release` 브랜치는 삭제되고, `develop`에도 병합
8. 운영 중 긴급 버그 발생 시 `hotfix` 브랜치를 생성하여 수정 후 `main`과 `develop`에 반영

### 10.2 브랜치 네이밍

- 스네이크 케이스, `/` 또는 `-`로 띄어쓰기
  - 예: **`feat/23/auth/login`**
- 브랜치 구조:
  - `main`: 배포 가능한 안정적인 코드 (최종 배포 버전)
    - `develop`: 개발용 브랜치 (개발한 기능이 합쳐짐)
      - `feat/{이슈번호}`: 기능 개발
    - `hotfix/{이슈번호}`: 긴급 버그 수정

### 10.3 커밋 메시지 규칙

형식: `Type: 영어로 메시지` (띄어쓰기 주의)

커밋 메시지 타입:

- `Feat`: 새로운 기능 추가
- `Fix`: 버그 수정
- `Docs`: 문서 수정
- `Remove`: 파일 삭제
- `Style`: 단순 코드 스타일 변경(코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우)
- `Chore`: 빌드 업무 수정, 패키지 매니저 수정 (간단하고 하찮은? 일들)
- `Modify`: 수정
- `Refactor`: 코드 리팩토링
- `Test`: 테스트 코드, 리팩토링 테스트 코드 추가

### 10.4 전체 플로우

1. 맡은 기능 `feat` 브랜치 생성, 해당 브랜치에서 작업
2. 작업 완료, 개발 테스트 완료 후 "풀리퀘스트" 요청