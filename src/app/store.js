import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import { loadState, saveState } from './localStorage';

// Load the previously saved state from localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  // Use the loaded state as the initial state for the app
  preloadedState: persistedState,
});

// This part is crucial: It listens for any change in the Redux store
// and calls saveState() to write the new data to localStorage.
store.subscribe(() => {
  saveState({
    contacts: store.getState().contacts,
  });
});