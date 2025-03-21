import { configureStore } from '@reduxjs/toolkit'
import { layoutConfigReducer } from './LayoutConfigReducer'
import { editLayoutConfigReducer } from './EditLayoutConfig/reducer'

export const store = configureStore({
  reducer: {
    layoutConfig: layoutConfigReducer,
    editLayoutConfig: editLayoutConfigReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch