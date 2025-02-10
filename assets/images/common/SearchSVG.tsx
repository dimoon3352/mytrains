import { Svg, Path, G, ClipPath, Defs, Rect, Circle } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: string
}

export default function SearchSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 16 16' fill="none">
      <G fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
        <Path d="m11.25 11.25l3 3"/>
        <Circle cx="7.5" cy="7.5" r="4.75"/>
      </G>
    </Svg>
  );
}