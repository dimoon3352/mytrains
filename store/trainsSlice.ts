import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface changeTrainDate {
  trainId: number,
  date: string
}

interface delTrainExercise {
  trainId: number,
  id: number
}

interface changeTrainExercise extends delTrainExercise {
  value: string[]
}

export interface Train {
  ID: number,
  Date: string,
  Exercises: {
    [key: number]: string[]
  }
}

export type Trains = Train[]

const initialState: Trains = [{
  ID: 0,
  Date: "17.01.2024",
  Exercises: {
    0: ["5", "4", "3", "3", "3"],
    1: ["5", "4", "3", "3", "3"],
    2: ["5", "4", "3", "3", "3"],
    3: ["5", "4", "3", "3", "3"],
    4: ["5", "4", "3", "3", "3"]
  }
}]

export const trainsSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    setTrains: (state, action: PayloadAction<Trains>) => {
      return action.payload
    },
    addTrain: (state, action: PayloadAction<Train>) => {
      state.push(action.payload)
      //localStorage.setItem("trains", JSON.stringify(state))
    },
    delTrain: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload) {
              state.splice(i, 1)
          }
      }
      //localStorage.setItem("trains", JSON.stringify(state))
    },
    changeTrainExercise: (state, action: PayloadAction<changeTrainExercise>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].ID === action.payload.trainId) {
          console.log(state[i].ID)
          for (let y in state[i].Exercises) {
            if (Number(y) === action.payload.id) {
              state[i].Exercises[y] = action.payload.value
            }
          }
        }
      }  
      //localStorage.setItem("trains", JSON.stringify(state))
    },
    changeTrainDate: (state, action: PayloadAction<changeTrainDate>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].ID === action.payload.trainId) {
          state[i].Date = action.payload.date
        }
      }
      //localStorage.setItem("trains", JSON.stringify(state))
    },
    addTrainExercise: (state, action: PayloadAction<delTrainExercise>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].ID === action.payload.trainId) {
          state[i].Exercises[action.payload.id] = []
        }
      }
      //localStorage.setItem("trains", JSON.stringify(state))
    },
    delTrainExercise: (state, action: PayloadAction<delTrainExercise>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].ID === action.payload.trainId) {
          for (let j in state[i].Exercises) {
            if (Number(j) === action.payload.id) {
              delete state[i].Exercises[j]
            }
          }
        }
      }
      //localStorage.setItem("trains", JSON.stringify(state))
    },
    cleanTrains: (state) => {
      state = []
      //localStorage.setItem("trains", JSON.stringify(state))
    }
  }
})

export const { setTrains, addTrain, delTrain, addTrainExercise, delTrainExercise, changeTrainExercise, changeTrainDate, cleanTrains } = trainsSlice.actions