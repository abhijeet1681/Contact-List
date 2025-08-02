// This function loads the state from localStorage.
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('contactsState');
    if (serializedState === null) {
      return undefined; // Let the reducer initialize the state if nothing is saved
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

// This function saves the state to localStorage.
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('contactsState', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};