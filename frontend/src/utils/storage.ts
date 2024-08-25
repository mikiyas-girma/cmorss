import { AppState } from '../types';

// Function to save state to localStorage
const saveStateToLocalStorage = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (error) {
    console.error('Could not save state to localStorage:', error);
  }
};

// Function to load state from localStorage
const loadStateFromLocalStorage = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load state from localStorage:', error);
    return undefined;
  }
};

export { saveStateToLocalStorage, loadStateFromLocalStorage };
