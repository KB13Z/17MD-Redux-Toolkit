import { configureStore } from '@reduxjs/toolkit'
import formReducer, { FormState } from './formSlice'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as { form: FormState};
  } catch (error) {
    return undefined;
  }
};

const saveState = (state: { form: FormState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    //
  }
};

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch