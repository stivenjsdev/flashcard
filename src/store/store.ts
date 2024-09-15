import { decksReducer } from '@/store/slices/deckSlice';
import { configureStore } from '@reduxjs/toolkit';
// ...

export const store = configureStore({
  reducer: {
    decks: decksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch