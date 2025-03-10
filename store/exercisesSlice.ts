import { createSlice } from "@reduxjs/toolkit";
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
  },
  {
    ID: 4,
    ExerciseName: "barbell 60kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 5,
    ExerciseName: "barbell 70kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 6,
    ExerciseName: "barbell 80kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 7,
    ExerciseName: "barbell 90kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 8,
    ExerciseName: "barbell 60kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 9,
    ExerciseName: "barbell 70kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 10,
    ExerciseName: "barbell 80kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 11,
    ExerciseName: "barbell 90kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 12,
    ExerciseName: "barbell 60kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 13,
    ExerciseName: "barbell 70kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 14,
    ExerciseName: "barbell 80kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 15,
    ExerciseName: "barbell 90kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 16,
    ExerciseName: "barbell 60kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 17,
    ExerciseName: "barbell 70kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 18,
    ExerciseName: "barbell 80kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 19,
    ExerciseName: "barbell 90kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 20,
    ExerciseName: "barbell 60kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 21,
    ExerciseName: "barbell 70kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 22,
    ExerciseName: "barbell 80kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  },
  {
    ID: 23,
    ExerciseName: "barbell 90kg",
    AdditionDate: "01.05.2021",
    ImagePath: ""
  }]

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
    changeImage: (state, action: PayloadAction<ChangeImage>) => {
      for (let i = 0; i < state.length; i++) {
          if (state[i].ID === action.payload.ID) {
              state[i].ImagePath = action.payload.ImagePath
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

export const { setExercises, addExercise, delExercise, changeExerciseTitle, changeImage, eraseExercises } = exercisesSlice.actions