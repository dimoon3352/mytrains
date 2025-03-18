import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const initialState: Trains = []

const storeAsync = async (value: any) => {
  try {
    await AsyncStorage.setItem("trains", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const trainsSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    setTrains: (state, action: PayloadAction<Trains>) => {
      return action.payload
    },
    addTrain: (state, action: PayloadAction<Train>) => {
      if (state) {
        state.push(action.payload)
      } else {
        state = [{ID: action.payload.ID, Date: action.payload.Date, Exercises: action.payload.Exercises}]
      }
      storeAsync(state)
    },
    delTrain: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload) {
              state.splice(i, 1)
          }
      }
      storeAsync(state)
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
      storeAsync(state)
    },
    changeTrainDate: (state, action: PayloadAction<changeTrainDate>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].ID === action.payload.trainId) {
          state[i].Date = action.payload.date
        }
      }
      storeAsync(state)
    },
    addTrainExercise: (state, action: PayloadAction<delTrainExercise>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].ID === action.payload.trainId) {
          state[i].Exercises[action.payload.id] = []
        }
      }
      storeAsync(state)
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
      storeAsync(state)
    },
    cleanTrains: (state) => {
      state = []
      storeAsync(state)
    }
  }
})

export const { setTrains, addTrain, delTrain, addTrainExercise, delTrainExercise, changeTrainExercise, changeTrainDate, cleanTrains } = trainsSlice.actions