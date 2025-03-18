import { Svg, Path } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: number
}

export default function UploadSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill="none">
      <Path fill={color} d="M11 15h2V9h3l-4-5l-4 5h3z"/>
      <Path fill={color} d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2z"/>
    </Svg>
  );
}