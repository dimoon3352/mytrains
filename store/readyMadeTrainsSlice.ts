import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Train, Trains } from "./trainsSlice";


const initialState: Trains = []

export const readyMadeTrainsSlice = createSlice({
  name: "readyMadeTrains",
  initialState,
  reducers: {
    setReadyMadeTrains: (state, action: PayloadAction<Trains>) => {
      return action.payload
    },
    addReadyMadeTrain: (state, action: PayloadAction<Train>) => {
      state.push(action.payload)
      //localStorage.setItem("readyMadeTrains", JSON.stringify(state))
    },
    delReadyMadeTrain: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload) {
              state.splice(i, 1)
          }
      }
      //localStorage.setItem("readyMadeTrains", JSON.stringify(state))
    },
    cleanReadyMadeTrains: (state) => {
      state = []
      //localStorage.setItem("readyMadeTrains", JSON.stringify(state))
    }
  }
})

export const { setReadyMadeTrains, addReadyMadeTrain, delReadyMadeTrain, cleanReadyMadeTrains } = readyMadeTrainsSlice.actions