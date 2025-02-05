import { Svg, Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

interface ReactNativeSVGProps {
  color: string,
  size: string
}

export default function ExercisesSVG({ color, size }: ReactNativeSVGProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 40 40' fill="none">
      <G>
        <Path fill={color} d="M19.3382 0.00750158C18.2986 0.0407099 17.2489 0.143549 16.2952 0.306377C15.9332 0.368509 15.7647 0.424213 15.5633 0.549548C15.4344 0.628819 15.2296 0.8195 15.1504 0.931979C15.0712 1.04446 14.9977 1.18693 14.957 1.30691C14.9332 1.37654 14.8031 2.02036 14.5486 3.32619C14.1188 5.52545 14.164 5.30263 14.1504 5.30263C14.1357 5.30263 13.785 5.43546 13.5407 5.53295C12.1742 6.08356 10.8586 6.827 9.70021 7.7022C9.59161 7.78469 9.49772 7.85217 9.49319 7.85217C9.48754 7.85217 8.60858 7.55758 7.53844 7.19765C6.46944 6.83771 5.54523 6.53134 5.48641 6.51634C5.34161 6.47992 5.04749 6.47028 4.88912 6.49599C4.75224 6.51848 4.56559 6.5774 4.44907 6.63418C4.22396 6.74344 4.08369 6.86235 3.78844 7.19872C2.31333 8.87735 1.15383 10.7392 0.32464 12.7638C0.188893 13.0948 0.0836897 13.3776 0.049753 13.503C0.0101603 13.6465 -2.07149e-05 13.9015 0.0271286 14.0568C0.0836897 14.3835 0.266948 14.6995 0.520341 14.9095C0.554278 14.9373 1.26242 15.5094 2.09274 16.18C2.92306 16.8506 3.61536 17.4108 3.63007 17.4248L3.65722 17.4494L3.61536 17.7258C3.38573 19.2448 3.38573 20.7659 3.61536 22.2635C3.63799 22.4092 3.65269 22.5356 3.65043 22.5431C3.64704 22.5517 2.9355 23.1312 2.06785 23.8318C1.20134 24.5335 0.455862 25.143 0.410613 25.1869C0.266948 25.3316 0.157219 25.5094 0.0848209 25.7129C0.0339159 25.8565 0.0112915 25.9947 0.0112915 26.1607C0.0112915 26.391 0.0452282 26.5206 0.221699 26.9716C0.848396 28.5678 1.69568 30.0943 2.72622 31.4837C3.14025 32.0407 3.8484 32.8902 4.08143 33.1077C4.45134 33.4526 4.99998 33.5929 5.50224 33.4708C5.5588 33.4569 6.47962 33.1516 7.54975 32.7917C8.61876 32.4317 9.49885 32.1403 9.50564 32.1446C9.51242 32.1478 9.59387 32.21 9.68776 32.2807C10.9728 33.2566 12.4468 34.0632 13.9762 34.6288C14.1233 34.6835 14.1584 34.7006 14.1651 34.721C14.1697 34.7349 14.3416 35.6058 14.5464 36.6577C14.7522 37.7097 14.9298 38.6031 14.9423 38.6449C15.0452 38.9888 15.2952 39.2941 15.6278 39.4805C15.8484 39.6047 16.0124 39.6465 16.6403 39.7418C18.8292 40.075 21.0441 40.0804 23.2489 39.7579C23.8642 39.669 24.0724 39.6229 24.2613 39.5383C24.5509 39.4076 24.8133 39.1634 24.9593 38.8881C25.0554 38.7081 25.0577 38.6952 25.4513 36.6738C25.6572 35.6186 25.828 34.7467 25.8314 34.7349C25.8348 34.7188 25.8722 34.7006 25.9808 34.661C26.7511 34.3835 27.6267 33.985 28.3654 33.5758C29.052 33.1944 29.7183 32.7617 30.3427 32.2892L30.5339 32.1457L32.4932 32.8045C33.8473 33.2609 34.4887 33.4719 34.5701 33.488C34.724 33.519 34.9887 33.5222 35.1391 33.4933C35.4163 33.4419 35.6606 33.3283 35.8789 33.1473C36.0113 33.038 36.5113 32.4606 36.9061 31.9604C38.0215 30.5485 38.9027 29.0616 39.595 27.4237C39.8054 26.9256 39.9389 26.5645 39.9717 26.406C39.9955 26.2871 39.9955 26.0461 39.9717 25.9239C39.9129 25.6251 39.767 25.3605 39.5475 25.1548C39.4943 25.1055 38.7613 24.5067 37.9185 23.8254C36.5079 22.6835 36.3857 22.5828 36.388 22.5538C36.388 22.5367 36.4072 22.4049 36.4298 22.2603C36.6357 20.9084 36.6538 19.4933 36.4819 18.1093C36.4604 17.9379 36.397 17.5137 36.3846 17.4505C36.3789 17.4237 36.4808 17.3391 37.9638 16.1382C38.9321 15.3541 39.5758 14.8259 39.6154 14.782C39.7545 14.6288 39.8495 14.4714 39.9151 14.2871C39.9706 14.1307 39.9898 14.0107 39.9898 13.835C39.9898 13.5897 39.9672 13.4987 39.7794 13.0209C38.9989 11.0273 37.8982 9.18587 36.4943 7.52545C36.069 7.02304 35.888 6.83557 35.7228 6.73059C35.5396 6.61275 35.3133 6.52813 35.1018 6.49599C34.9479 6.47349 34.6765 6.47992 34.5362 6.51099C34.483 6.52277 33.5656 6.827 32.4955 7.18694C31.4265 7.54687 30.5464 7.84146 30.5384 7.84146C30.5317 7.84146 30.4513 7.78576 30.362 7.7172C29.4717 7.04232 28.4502 6.42314 27.4321 5.94002C26.983 5.72684 26.6369 5.58008 26.1323 5.38833L25.8337 5.27478L25.5192 3.66256C25.0712 1.36369 25.0792 1.40761 25.043 1.30156C24.9706 1.08945 24.862 0.920196 24.6923 0.754154C24.5113 0.578471 24.3235 0.463849 24.095 0.392076C23.9581 0.349226 23.8993 0.337443 23.5396 0.278525C22.6572 0.13605 21.7183 0.0449949 20.7579 0.0107153C20.4955 0.00107416 19.5916 -0.00106832 19.3382 0.00750158ZM20.8145 3.24692C21.1979 3.26406 21.9864 3.32298 22 3.33691C22.0022 3.33798 22.1934 4.31281 22.4242 5.50188L22.8461 7.66364L23.8574 8.02357C25.1289 8.47564 25.3529 8.56455 25.9389 8.84414C26.6403 9.17837 27.2726 9.54794 27.9016 9.99358C28.1572 10.1746 28.2262 10.2271 29.1154 10.9191C29.5147 11.2298 29.8484 11.4869 29.8574 11.4901C29.8654 11.4933 30.8439 11.1687 32.0317 10.7702C33.2194 10.3717 34.2025 10.0429 34.2149 10.0407C34.2353 10.0364 34.259 10.0621 34.3575 10.1896C34.7658 10.7199 35.1844 11.3476 35.5486 11.9764C35.6923 12.225 36.026 12.8591 36.1527 13.1227C36.2364 13.2973 36.2409 13.3112 36.224 13.3273C36.2127 13.3369 35.4231 13.9775 34.4683 14.7509C33.5136 15.5244 32.7308 16.165 32.7285 16.1746C32.7274 16.1843 32.7986 16.6213 32.8891 17.1452C33.1007 18.3728 33.121 18.511 33.1617 18.9823C33.2172 19.6261 33.2172 20.3846 33.1617 21.0284C33.1199 21.5083 33.0939 21.6851 32.8789 22.9138C32.7262 23.7933 32.7172 23.8522 32.7353 23.8682C32.7455 23.8779 33.5362 24.5185 34.4909 25.2919C35.4457 26.0654 36.2285 26.7017 36.2308 26.707C36.2364 26.7209 36.0396 27.1269 35.8586 27.4719C35.4423 28.2689 34.9785 28.9995 34.4378 29.7161C34.2183 30.0075 34.2353 29.9872 34.2115 29.9818C34.2002 29.9786 33.2217 29.6508 32.0362 29.2523C30.8507 28.8538 29.8755 28.5271 29.8688 28.5249C29.8608 28.5228 29.5056 28.7938 29.0769 29.1269C28.2172 29.7954 28.1617 29.8382 27.9016 30.0236C27.0102 30.6567 25.9808 31.2073 24.9547 31.5994C24.8461 31.6401 24.3269 31.8275 23.8009 32.0139C23.2749 32.2014 22.8439 32.3546 22.8427 32.3557C22.8416 32.3567 22.6516 33.3283 22.4208 34.5153C22.1889 35.7022 21.9966 36.677 21.9932 36.6813C21.974 36.6985 21.224 36.7552 20.7353 36.7767C20.4004 36.7906 19.2726 36.7842 18.9819 36.7659C18.7522 36.7509 18.2964 36.7156 18.1244 36.6985C18.0113 36.6877 17.9966 36.6835 17.9909 36.6642C17.9887 36.6513 17.7986 35.6765 17.569 34.496C17.3393 33.3155 17.1504 32.3482 17.1482 32.3471C17.1459 32.3449 16.7285 32.1928 16.2217 32.0086C15.7149 31.8254 15.2104 31.6401 15.1018 31.5994C13.9536 31.1612 12.8224 30.5378 11.8563 29.8093C11.7783 29.7504 11.3688 29.4323 10.9468 29.1023C10.4265 28.6963 10.1731 28.5056 10.1606 28.5088C10.1504 28.511 9.15948 28.8441 7.95926 29.2491C6.7579 29.6529 5.7726 29.9807 5.76808 29.9764C5.7398 29.9475 5.43776 29.5383 5.28618 29.323C4.74432 28.556 4.30202 27.805 3.87894 26.9331C3.82464 26.8195 3.77713 26.7209 3.776 26.7135C3.77374 26.7049 4.56446 26.0589 5.53165 25.2769C6.49885 24.4938 7.29862 23.8457 7.30994 23.8361C7.3269 23.82 7.31785 23.7568 7.17645 22.9406C7.09387 22.4574 7.01016 21.9636 6.99093 21.8425C6.82464 20.7734 6.80428 19.6754 6.92871 18.6074C6.96265 18.3246 6.98867 18.1639 7.18211 17.038C7.31785 16.2517 7.3269 16.1907 7.30994 16.1746C7.29862 16.165 6.49885 15.5169 5.53165 14.7338C4.56446 13.9518 3.77374 13.3058 3.776 13.2983C3.78392 13.2641 4.00111 12.8216 4.14138 12.5549C4.47849 11.9111 4.82351 11.3455 5.24772 10.7392C5.38573 10.5421 5.7398 10.0632 5.76808 10.0343C5.7726 10.03 6.7579 10.3578 7.95926 10.7617C9.15948 11.1666 10.1504 11.4997 10.1606 11.5019C10.1731 11.5051 10.4265 11.3144 10.9468 10.9084C12.069 10.0321 12.2093 9.9293 12.7432 9.59294C13.2443 9.27692 13.6923 9.03268 14.2138 8.78951C14.7602 8.53455 14.974 8.45207 16.25 7.99679C16.7421 7.82111 17.147 7.67542 17.1504 7.67114C17.155 7.66792 17.3473 6.69095 17.5792 5.50081C17.8099 4.31066 18 3.33691 18.0011 3.33584C18.0068 3.33155 18.5011 3.28763 18.7104 3.27263C18.9559 3.25656 19.3869 3.23621 19.6323 3.23085C19.8597 3.2255 20.5565 3.23514 20.8145 3.24692Z"/>
        <Path fill={color} d="M19.5814 11.7097C16.8122 11.8436 14.2998 13.2791 12.8699 15.5447C12.2602 16.511 11.8699 17.6369 11.7488 18.7735C11.7025 19.2084 11.6968 19.8147 11.7353 20.225C11.9242 22.2089 12.8507 23.9979 14.3835 25.338C15.7828 26.5603 17.5633 27.2812 19.4774 27.4023C19.7013 27.4162 20.3099 27.4162 20.5339 27.4023C22.1572 27.3005 23.6923 26.7649 24.9728 25.8533C26.776 24.571 27.9434 22.6824 28.2353 20.5764C28.3133 20.0075 28.3235 19.3455 28.2624 18.7735C28.0136 16.4349 26.6821 14.3375 24.6108 13.0209C23.1414 12.0879 21.362 11.624 19.5814 11.7097ZM20.2658 14.5689C21.5192 14.631 22.6617 15.083 23.5803 15.8833C25.0203 17.1366 25.6074 19.0477 25.1063 20.8442C24.7206 22.2271 23.6957 23.4108 22.3382 24.0418C21.7805 24.301 21.2217 24.4564 20.5826 24.5281C20.3676 24.5517 19.6957 24.5549 19.4853 24.5335C18.759 24.4585 18.1482 24.2818 17.5215 23.9668C16.0271 23.217 14.9932 21.8051 14.7737 20.2143C14.5961 18.9224 14.9491 17.6304 15.7636 16.5881C16.0679 16.1982 16.4604 15.8265 16.8665 15.5415C17.6052 15.0241 18.4366 14.7092 19.3473 14.601C19.6685 14.5624 19.9446 14.5528 20.2658 14.5689Z"/>
      </G>
      <Defs>
        <ClipPath>
          <Rect width={size} height={size} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}