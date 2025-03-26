import React from "react";
import { ClipPath, Defs, G, Path, Svg } from "react-native-svg";

export default (props: {
  pColor?: string;
  sColor?: string;
  h?: number | string;
  w?: number | string;
}) => {
  return (
    <Svg
      width={props?.w ?? 16}
      height={props?.h ?? 20}
      viewBox="0 0 16 20"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#a)" fillRule="evenodd" clipRule="evenodd">
        <Path
          d="M7.562 19.314c.395 0 7.457-7.544 7.457-11.662a7.456 7.456 0 0 0-14.913 0c0 4.118 7.061 11.662 7.456 11.662m0-7.933a3.78 3.78 0 1 0 0-7.56 3.78 3.78 0 0 0 0 7.56"
          fill={props?.pColor ?? "#1DAEEF"}
        />
        <Path
          d="M.106 7.652c0 4.118 7.061 11.662 7.456 11.662v-7.933a3.78 3.78 0 0 1 0-7.56V.194A7.456 7.456 0 0 0 .106 7.652"
          fill={props?.sColor ?? "#3EC3FF"}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h16v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
