import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { Train, Trains } from "./trainsSlice";


const initialState: Trains = []

const storeAsync = async (value: any) => {
  try {
    await AsyncStorage.setItem("mockups", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const readyMadeTrainsSlice = createSlice({
  name: "readyMadeTrains",
  initialState,
  reducers: {
    setReadyMadeTrains: (state, action: PayloadAction<Trains>) => {
      return action.payload
    },
    addReadyMadeTrain: (state, action: PayloadAction<Train>) => {
      if (state) {
        state.push(action.payload)
      } else {
        state = [{ID: action.payload.ID, Date: action.payload.Date, Exercises: action.payload.Exercises}]
      }
      storeAsync(state)
    },
    delReadyMadeTrain: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload) {
              state.splice(i, 1)
          }
      }
      storeAsync(state)
    },
    cleanReadyMadeTrains: (state) => {
      state = []
      storeAsync(state)
    }
  }
})

export const { setReadyMadeTrains, addReadyMadeTrain, delReadyMadeTrain, cleanReadyMadeTrains } = readyMadeTrainsSlice.actions