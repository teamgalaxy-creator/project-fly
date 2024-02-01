import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { isEditingAllowed } from '~/utility/utils';
import useStyles from './styles';

interface EditMenuProps {
  index: number;
  handleEditClick: (index: number) => void;
  handleDeleteClick: (index: number) => void;
  travelPoints: any[]; // Replace with actual type
}

const EditMenu: React.FC<EditMenuProps> = ({
  index,
  handleEditClick,
  handleDeleteClick,
  travelPoints,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnEditClick = (index: number) => {
    setAnchorEl(null);
    handleEditClick(index);
  };

  const handleOnDeleteClick = (index: number) => {
    handleDeleteClick(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.editbutton}>
      <Button
        id={`edit-button-${index}`}
        aria-controls={open ? `edit-menu-${index}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src="icons/dotted.svg" alt="Add a Travel" />
      </Button>
      <Menu
        id={`edit-menu-${index}`}
        aria-labelledby={`edit-button-${index}`}
        anchorEl={anchorEl}
        open={open}
        key={index}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          key={index}
          disabled={!isEditingAllowed(index, travelPoints)}
          sx={{
            width: '118px',
            height: '25px',
            fontFamily: 'Futura Bk BT',
          }}
          onClick={() => handleOnEditClick(index)}
        >
          Edit
        </MenuItem>
        <Divider variant="middle" sx={{ bgcolor: 'gray' }} />
        <MenuItem
          disabled={!isEditingAllowed(index, travelPoints)}
          sx={{
            width: '118px',
            height: '25px',
            fontFamily: 'Futura Bk BT',
          }}
          onClick={() => handleOnDeleteClick(index)}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EditMenu;
