import Svg, { Path } from 'react-native-svg';

export default (props: {color?: string; h?: number; w?: number}) => (
  <Svg
    width={props?.w ?? 800}
    height={props?.h ?? 800}
    viewBox="0 -6 524 524"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fill={props?.color ?? '#000000'}
      d="m64 191 34-34 164 163 164-163 34 34-198 196z"
    />
  </Svg>
);
