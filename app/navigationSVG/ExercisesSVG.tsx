import { Svg, Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: string
}

export default function ExercisesSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 40 40' fill="none">
      <G>
        <Path fill={color} d="M25.4062 1.74219L23.6719 3.47656L30.1016 9.90625L36.5234 16.3281L38.2656 14.5859L40 12.8516L37.8906 10.7422L35.7812 8.63281L37.0703 7.34375L38.3594 6.05469L36.1484 3.84375L33.9453 1.64062L32.6562 2.92969L31.3672 4.21875L29.2578 2.10937L27.1484 -1.90735e-06L25.4062 1.74219Z"/>
      </G>
      <G>
        <Path fill={color} d="M20.1172 7.03125L18.3984 8.75L20.5078 10.8594L22.6172 12.9688L17.7891 17.7891L12.9688 22.6172L10.8594 20.5078L8.75 18.3984L7.00781 20.1406L5.27344 21.875L11.7031 28.2969L18.125 34.7266L19.8594 32.9922L21.6016 31.25L19.4922 29.1406L17.3828 27.0312L22.2109 22.2109L27.0312 17.3828L29.1406 19.4922L31.25 21.6016L32.9844 19.8594L34.7266 18.125L28.3203 11.7188C24.7969 8.19531 21.8984 5.3125 21.875 5.3125C21.8516 5.3125 21.0625 6.08594 20.1172 7.03125Z"/>
      </G>
      <G>
        <Path fill={color} d="M1.73438 25.4141L0 27.1484L2.10938 29.2578L4.21875 31.3672L2.92969 32.6562L1.64062 33.9453L3.85156 36.1562L6.05469 38.3594L7.34375 37.0703L8.63281 35.7812L10.7422 37.8906L12.8516 40L14.5938 38.2578L16.3281 36.5234L9.89844 30.0937L3.47656 23.6719L1.73438 25.4141Z"/>
      </G>
      <Defs>
        <ClipPath>
          <Rect width={size} height={size} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
