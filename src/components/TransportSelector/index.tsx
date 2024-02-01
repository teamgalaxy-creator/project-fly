import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ModeOfTransportButton from '../ModeOfTransportButton'; // Import the ModeOfTransportButton component
import useStyles from './styles';

interface TransportSelectorProps {
  onTransportChange: (transportType: string) => void;
  isPlaneSelected: boolean;
  isCarSelected: boolean;
  isPlaneHovered: boolean;
  isCarHovered: boolean;
  onMouseEnter: (transportType: string) => void; // Add onMouseEnter prop
  onMouseLeave: (transportType: string) => void; // Add onMouseLeave prop
}

const TransportSelector: React.FC<TransportSelectorProps> = ({
  onTransportChange,
  isPlaneSelected,
  isCarSelected,
  isPlaneHovered,
  isCarHovered,
  onMouseEnter,
  onMouseLeave, // Receive onMouseEnter and onMouseLeave props
}: TransportSelectorProps) => {
  const classes = useStyles();

  const planeTransport = {
    label: 'Plane',
    icon: (
      <img
        src="icons/blackplane.svg"
        alt="Plane"
        className={classes.transportIcon}
      />
    ),
    selectIcon: (
      <img
        src="icons/plane.svg"
        alt="Plane"
        className={classes.transportIcon}
      />
    ),
  };

  const carTransport = {
    label: 'Car',
    icon: (
      <img
        src="icons/blackcar.svg"
        alt="Car"
        className={classes.transportIcon}
      />
    ),
    selectIcon: (
      <img src="icons/car.svg" alt="Car" className={classes.transportIcon} />
    ),
  };

  return (
    <Grid
      item
      xs={12}
      md={12}
      textAlign={'center'}
      className={classes.modeOfTrasport}
    >
      <Typography className={classes.modeHeading}>
        Select Mode of Transport
      </Typography>
      <div style={{ gap: '16px', display: 'flex', justifyContent: 'center' }}>
        <ModeOfTransportButton
          label={planeTransport.label}
          icon={
            isPlaneSelected
              ? planeTransport.selectIcon
              : isPlaneHovered
              ? planeTransport.selectIcon
              : planeTransport.icon
          }
          isSelected={isPlaneSelected}
          onClick={() => onTransportChange('Plane')}
          onMouseEnter={() => onMouseEnter('Plane')} // Call onMouseEnter prop
          onMouseLeave={() => onMouseLeave('Plane')} // Call onMouseLeave prop
        />
        <ModeOfTransportButton
          label={carTransport.label}
          icon={
            isCarSelected
              ? carTransport.selectIcon
              : isCarHovered
              ? carTransport.selectIcon
              : carTransport.icon
          }
          isSelected={isCarSelected}
          onClick={() => onTransportChange('Car')}
          onMouseEnter={() => onMouseEnter('Car')} // Call onMouseEnter prop
          onMouseLeave={() => onMouseLeave('Car')} // Call onMouseLeave prop
        />
      </div>
    </Grid>
  );
};

export default TransportSelector;
