import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { PayloadAction } from "@reduxjs/toolkit";


export interface Settings {
  theme: "light" | "dark",
  language: "eng" | "rus" | "ger"
}

const initialState: Settings = {
  theme: "light",
  language: "rus"
}

const storeAsync = async (value: any) => {
  try {
    await AsyncStorage.setItem("settings", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      return action.payload
    },
    changeAppTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
      storeAsync(state)
    },
    changeAppLanguage: (state, action: PayloadAction<"rus" | "eng" | "ger">) => {
      state.language = action.payload
      storeAsync(state)
    },
    cleanReadyMadeTrains: (state) => {
      state = initialState
      storeAsync(state)
    }
  }
})

export const { setSettings, changeAppTheme, changeAppLanguage, cleanReadyMadeTrains } = settingsSlice.actions