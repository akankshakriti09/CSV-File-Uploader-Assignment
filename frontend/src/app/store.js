import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { csvFileApi } from '../services/csvFileApi'

export const store = configureStore({
  reducer: {
    [csvFileApi.reducerPath]: csvFileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(csvFileApi.middleware),
})

setupListeners(store.dispatch)