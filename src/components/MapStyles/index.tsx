import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MapStyles() {
  return (
    <Box
      sx={{
        width: '60%',
        height: '50%',
        zIndex: '3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '25%',
        left: '20%',
        backgroundColor: 'white', // Set your desired background color
        borderRadius: '8px', // Set your desired border radius
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography
        variant="h5"
        style={{ display: 'flex', alignItems: 'flex-start', marginTop: '5px' }}
      >
        Customize Map
      </Typography>
    </Box>
  );
}
