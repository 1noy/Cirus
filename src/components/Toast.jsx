import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

export default function Toast({ open, onClose, message, severity = 'info', duration = 3000 }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={Slide}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%', fontWeight: 700, fontSize: 18 }}>
        {message}
      </Alert>
    </Snackbar>
  );
} 