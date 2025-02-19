/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

interface ThemeColors {
  light: {
      text: string;
      background: string;
      itemBackground: string;
      navIcon: string;
      navIconFocused: string;
      controlsBackground: string;
      controlsIcon: string;
      infoNavIconFocused: string;
  };
  dark: {
      text: string;
      background: string;
      itemBackground: string;
      navIcon: string;
      navIconFocused: string;
      controlsBackground: string;
      controlsIcon: string;
      infoNavIconFocused: string;
  };
}

export const Colors: ThemeColors = {
  light: {
    text: '#000000',
    background: '#f6f7fb',
    itemBackground: '#ffffff',
    navIcon: '#808487',
    navIconFocused: '#008ef4',
    controlsBackground: '#f2f5fa',
    controlsIcon: '#1D2025',
    infoNavIconFocused: '#00bfbf'
  },
  dark: {
    text: '#ffffff',
    background: '#070707',
    itemBackground: '#1D2025',
    navIcon: '#808487',
    navIconFocused: '#008ef4',
    controlsBackground: '#303134',
    controlsIcon: '#ffffff',
    infoNavIconFocused: '#00bfbf'
  },
};

// #ec4a89 
// #00bfbf
