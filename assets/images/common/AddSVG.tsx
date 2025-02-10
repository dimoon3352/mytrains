import { Svg, Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: string
}

export default function AddSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill="none">
      <Path fill={color} d="M17 15V5h-2v10H5v2h10v10h2V17h10v-2z"/>
    </Svg>
  );
}