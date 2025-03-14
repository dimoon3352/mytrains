import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { PayloadAction } from "@reduxjs/toolkit";


interface ChangeExerciseTitle {
  ID: number,
  ExerciseName: string
}

interface ChangeImage {
  ID: number,
  ImagePath: string
}

export interface Exercise {
	ID: number,
	ExerciseName: string,
  AdditionDate: string,
  ImagePath: string
}

export type Exercises = Exercise[]

const initialState: Exercises = [{
    ID: 0,
    ExerciseName: "barbell 60kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 1,
    ExerciseName: "barbell 70kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 2,
    ExerciseName: "barbell 80kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 3,
    ExerciseName: "barbell 90kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  }]

const storeAsync = async (value: any) => {
  try {
    await AsyncStorage.setItem("exercises", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercises>) => {
      return action.payload
    },
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.push(action.payload)
      storeAsync(state)
    },
    delExercise: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload) {
              state.splice(i, 1)
          }
      }
      storeAsync(state)
    },
    changeExerciseTitle: (state, action: PayloadAction<ChangeExerciseTitle>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload.ID) {
              state[i].ExerciseName = action.payload.ExerciseName
          }
      }
      storeAsync(state)
    },
    changeImage: (state, action: PayloadAction<ChangeImage>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload.ID) {
              state[i].ImagePath = action.payload.ImagePath
          }
      }
      storeAsync(state)
    },
    eraseExercises: (state) => {
      state = []
      storeAsync(state)
    }
  }
})

export const { setExercises, addExercise, delExercise, changeExerciseTitle, changeImage, eraseExercises } = exercisesSlice.actions