import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

function ToggleColorMode({ children }) {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const colorContextValue = useMemo(() => ({
    mode,
    setMode,
    toggleColorMode,
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorContextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
