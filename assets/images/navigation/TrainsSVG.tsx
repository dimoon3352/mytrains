import { Svg, Path } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: number
}

export default function TrainsSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 40 40' fill="none">   
      <Path stroke={color} strokeLinecap='round' strokeLinejoin='round' d="M4.58332 1.66663L2.62999 24.2733L5.26999 23.6541L2.43082 26.5791L1.66666 35.4166L26.3683 37.5516L27.0542 32.0208L28.8367 37.765L35.4167 38.3333L37.3333 16.1508L34.2608 12.645L37.61 12.95L38.3333 4.58329L15.2633 2.58996L13.9817 5.80829L12.9958 2.39329L4.58332 1.66663Z"/> 
      <Path stroke={color} strokeLinecap='round' strokeLinejoin='round' d="M9.18168 12.41C10.1022 12.41 10.8483 11.6638 10.8483 10.7433C10.8483 9.82285 10.1022 9.07666 9.18168 9.07666C8.26121 9.07666 7.51501 9.82285 7.51501 10.7433C7.51501 11.6638 8.26121 12.41 9.18168 12.41Z"/>
      <Path stroke={color} strokeLinecap='round' strokeLinejoin='round' d="M8.91749 19.8875C9.83797 19.8875 10.5842 19.1413 10.5842 18.2209C10.5842 17.3004 9.83797 16.5542 8.91749 16.5542C7.99702 16.5542 7.25082 17.3004 7.25082 18.2209C7.25082 19.1413 7.99702 19.8875 8.91749 19.8875Z"/>
      <Path stroke={color} strokeLinecap='round' strokeLinejoin='round' d="M8.78916 27.3717C9.70964 27.3717 10.4558 26.6255 10.4558 25.705C10.4558 24.7845 9.70964 24.0383 8.78916 24.0383C7.86869 24.0383 7.1225 24.7845 7.1225 25.705C7.1225 26.6255 7.86869 27.3717 8.78916 27.3717Z"/>
      <Path stroke={color} strokeLinecap='round' strokeLinejoin='round' d="M14.4233 12.3167L33.0408 14.2475M13.5133 19.1633L32.4667 20.9066M12.8908 26.0966L31.6975 26.9383"/>   
    </Svg>
  );
}

