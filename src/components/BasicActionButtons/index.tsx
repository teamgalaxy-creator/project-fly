import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import MapStyles from '~components/MapStyles';
import Drawer from '@mui/material/Drawer';
import TravelPage from '~components/TravelPage';

export default function BasicActionButtons() {
  const [isTravelPOpen, setIsTravelPOpen] = useState(false);
  const [isMapTypesOpen, setIsMapTypesOpen] = useState(false);

  const MyButton = styled(Button)({
    margin: '10px',
    width: '150px',
    backgroundColor: '#f5f6f6',
    color: 'black',
    fontFamily: 'Futura Md BT',
    textTransform: 'none',
  });

  const handleOpenTravelP = () => {
    setIsTravelPOpen(true);
  };

  const handleCloseTravelP = () => {
    setIsTravelPOpen(false);
  };

  const handleOpenMapTypes = () => {
    setIsMapTypesOpen(true);
  };

  const handleCloseMapTypes = () => {
    setIsMapTypesOpen(false);
  };

  return (
    <Box
      width="245"
      position="fixed"
      margin={5}
      zIndex={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="white"
      p={2} // Padding
      borderRadius={5}
    >
      <MyButton variant="contained">Generate Video</MyButton>
      <MyButton variant="contained">Add a Travel</MyButton>

      <MyButton variant="contained" onClick={handleOpenTravelP}>
        Travel Itinerary
      </MyButton>
      <MyButton variant="contained" onClick={handleOpenMapTypes}>
        Change Map
      </MyButton>
      <Drawer anchor="right" open={isTravelPOpen} onClose={handleCloseTravelP}>
        <div>
          <TravelPage />
        </div>
      </Drawer>
      <Dialog
        open={isMapTypesOpen}
        onClose={handleCloseMapTypes}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <MapStyles />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
