import React from 'react';
import { Path, Svg } from 'react-native-svg';

export default (props: {
  pColor?: string;
  sColor?: string;
  h?: number | string;
  w?: number | string;
}) => {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={props?.w ?? 24}
      height={props?.h ?? 24}
      viewBox="0 0 24 24"
      fill={props?.pColor ?? '#000000'}
      stroke={props?.sColor ?? '#000000'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="m3 11 19-9-9 19-2-8z" />
    </Svg>
  );
};
