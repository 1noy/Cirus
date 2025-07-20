import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Paper } from '@mui/material';

export default function Settings() {
  // Gestion du thème global via localStorage et event
  const [dark, setDark] = React.useState(() => localStorage.getItem('theme') !== 'light');

  const handleThemeChange = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <Box minHeight="100vh" bgcolor="#181828" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Paper elevation={8} sx={{ bgcolor: '#23233a', p: 5, borderRadius: 5, minWidth: 380, maxWidth: 420, boxShadow: '0 8px 32px #0008' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#4fc3f7', mb: 3 }}>
          Paramètres
        </Typography>
        <FormControlLabel
          control={<Switch checked={dark} onChange={handleThemeChange} color="primary" />}
          label={dark ? 'Mode sombre activé' : 'Mode clair activé'}
          sx={{ mb: 2, mx: 'auto', display: 'block' }}
        />
        <Typography variant="body2" color="#bbb" mt={2} align="center">
          Le changement de thème s’applique à toute l’application.<br />
          (Il est mémorisé pour tes prochaines visites.)
        </Typography>
      </Paper>
    </Box>
  );
} 