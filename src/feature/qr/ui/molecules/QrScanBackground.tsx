import React from 'react';

import Svg, { Defs, Mask, Rect } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  boxSize: number;
  frameTop: number;
  frameLeft: number;
}

export const QrScanBackground = ({
  width,
  height,
  boxSize,
  frameTop,
  frameLeft,
}: Props) => (
  <Svg
    height={height}
    width={width}
    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
    <Defs>
      <Mask id="mask">
        <Rect x="0" y="0" width={width} height={height} fill="white" />
        <Rect
          x={frameLeft}
          y={frameTop}
          width={boxSize}
          height={boxSize}
          rx={20}
          ry={20}
          fill="black"
        />
      </Mask>
    </Defs>
    <Rect
      x="0"
      y="0"
      width={width}
      height={height}
      fill="rgba(17, 17, 20, 0.4)"
      mask="url(#mask)"
    />
  </Svg>
);
