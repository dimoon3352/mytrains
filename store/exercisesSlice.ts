import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChangeExerciseTitle {
  ID: number,
  ExerciseName: string
}

interface Exercise {
	ID: number,
	ExerciseName: string,
  AdditionDate: string,
}

export type Exercises = Exercise[]

const initialState: Exercises = []

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercises>) => {
      return action.payload
    },
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.push(action.payload)
      //localStorage.setItem("exercises", JSON.stringify(state))
    },
    delExercise: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload) {
              state.splice(i, 1)
          }
      }
      //localStorage.setItem("exercises", JSON.stringify(state))
    },
    changeExerciseTitle: (state, action: PayloadAction<ChangeExerciseTitle>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload.ID) {
              state[i].ExerciseName = action.payload.ExerciseName
          }
      }
      //localStorage.setItem("exercises", JSON.stringify(state))
    },
    eraseExercises: (state) => {
      state = []
      //localStorage.setItem("exercises", JSON.stringify(state))
    }
  }
})

export const { setExercises, addExercise, delExercise, changeExerciseTitle, eraseExercises } = exercisesSlice.actions