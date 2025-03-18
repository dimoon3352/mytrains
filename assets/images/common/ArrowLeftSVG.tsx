import { Svg, Path } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: number
}

export default function ArrowLeftSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill="none">
      <Path fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11 5l-7 7l7 7m-7-7h16"/>
    </Svg>
  );
}