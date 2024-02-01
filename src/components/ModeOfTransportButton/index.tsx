import React from 'react';
import Button from '@mui/material/Button';
import useStyles from './styles';

interface ModeOfTransportButtonProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ModeOfTransportButton: React.FC<ModeOfTransportButtonProps> = ({
  label,
  icon,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ModeOfTransportButtonProps) => {
  const classes = useStyles(); // Use useStyles to access the CSS classes

  return (
    <Button
      disabled={false}
      size="large"
      variant="contained"
      className={`${classes.modeButtons} ${
        isSelected ? classes.activeMode : ''
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
      {label}
    </Button>
  );
};

export default ModeOfTransportButton;
