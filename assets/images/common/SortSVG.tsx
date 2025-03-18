import { Svg, Path } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: number
}

export default function SortSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill="none">
      <Path fill={color} d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"/>
    </Svg>
  );
}