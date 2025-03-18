import { Svg, Path } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: number
}

export default function TrashSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill="none">
      <Path fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78zm3.345-2.853A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6zM2 6h20m-12 5v5m4-5v5"/>
    </Svg>
  );
}