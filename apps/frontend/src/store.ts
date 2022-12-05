import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { recordsReducer, RECORDS_FEATURE_KEY } from './app/recordSlice';

const rootReducer = combineReducers({
  [RECORDS_FEATURE_KEY]: recordsReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
