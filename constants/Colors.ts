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
      settingsTitleColor: string;
      settingsItemBackground: string;
      checkboxBackground: string;
      checkboxBorder: string;
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
      settingsTitleColor: string;
      settingsItemBackground: string;
      checkboxBackground: string;
      checkboxBorder: string;
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
    infoNavIconFocused: '#00bfbf',
    settingsTitleColor: '#838383',
    settingsItemBackground: '#ffffff',
    checkboxBackground: '#fdfdfd',
    checkboxBorder: '#d2d2d2'
  },
  dark: {
    text: '#ffffff',
    background: '#070707',
    itemBackground: '#1D2025',
    navIcon: '#808487',
    navIconFocused: '#008ef4',
    controlsBackground: '#303134',
    controlsIcon: '#ffffff',
    infoNavIconFocused: '#00bfbf',
    settingsTitleColor: '#838383',
    settingsItemBackground: '#1c1c1e',
    checkboxBackground: '#1e1e1e',
    checkboxBorder: '#2c2c2c'
  },
};

// #ec4a89 
// #00bfbf
