import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AppState } from '../types';
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from '../utils/storage';

export type AppContext = {
  app: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const AppContext = createContext<AppContext | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const init = loadStateFromLocalStorage() || {
    user: null,
    allowAudio: false,
  };

  const [appState, setAppState] = useState<AppState>(init);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveStateToLocalStorage(appState);
  }, [appState]);

  // Return JSX To the Screen
  return (
    <AppContext.Provider
      value={{
        app: appState,
        setAppState: setAppState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
