import { configureStore } from '@reduxjs/toolkit'
import { exercisesSlice } from './exercisesSlice'
import { trainsSlice } from './trainsSlice'
import { readyMadeTrainsSlice } from './readyMadeTrainsSlice'
import { settingsSlice } from './settingsSlice'


export const store = configureStore({
  reducer: {
    exercises: exercisesSlice.reducer,
    trains: trainsSlice.reducer,
    readyMadeTrains: readyMadeTrainsSlice.reducer,
    settings: settingsSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch