import React, { useContext, useState, useCallback, createContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { node } from 'prop-types';
const SnackbarContext =createContext(null);
const SnackbarProvider = ({ children }) => {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackColor, setSnackColor] = useState('success');
  const [snackVariant, setSnackVariant] = useState('filled');

  const setSnack = useCallback((message, options = {}) => {
    const { color = 'success', variant = 'filled', open = true, duration = 5000 } = options;
    setSnackMessage(message);
    setSnackColor(color);
    setSnackVariant(variant);
    setIsSnackOpen(open);


    if (duration > 0) {
      setTimeout(() => setIsSnackOpen(false), duration);
    }
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{pt:10}}
        open={isSnackOpen}
        onClose={() => setIsSnackOpen(false)}
        autoHideDuration={5000} 
      >
        <Alert severity={snackColor} variant={snackVariant} onClose={() => setIsSnackOpen(false)}>
          {snackMessage}
    
  
        </Alert>
      </Snackbar>

      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

SnackbarProvider.propTypes = {
  children: node.isRequired,
};

export default SnackbarProvider;
