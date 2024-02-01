import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Icon } from '@iconify/react';
import { Popover, Typography } from '@mui/material';
import MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  bottomRight: ({ placement }: { placement: boolean }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: placement ? 0 : 20,
    cursor: 'pointer',
    zIndex: 99,
    display: 'flex',
    alignContent: 'center',
    [theme.breakpoints.between(100, 600)]: {
      right: 0,
    },
  }),
  infoButton: {
    position: 'relative',
    background: 'none',
    textAlign: 'center',
    lineHeight: '30px',
    marginLeft: '-40px',
    opacity: 0.7,
    cursor: 'pointer',
  },
  popover: ({ placement }: { placement: boolean }) => ({
    marginLeft: placement ? '-30px' : '-50px',
    opacity: 0.7,
    [theme.breakpoints.between(300, 600)]: {
      marginLeft: '-30px',
    },
  }),
  infoText: {
    fontSize: '12px',
    backgroundColor: '#333',
    color: 'white',
    padding: '2px',
    borderRadius: theme.shape.borderRadius,
  },
}));

const AttributionControl = ({ placement }: { placement: boolean }) => {
  const classes = useStyles({ placement });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTogglePopover = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.bottomRight}>
      <Icon
        className={classes.infoButton}
        icon="mdi:information-outline"
        onClick={handleTogglePopover}
        width={20}
        height={20}
      />

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'right',
        // }}
        // transformOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        onClose={handleTogglePopover} // Close the popover on click
        // disableRestoreFocus
      >
        <Typography className={classes.infoText}>
          {' '}
          ©{' '}
          <a
            href="http://www.openstreetmap.org/copyright"
            target="_blank"
            style={{ textDecoration: 'none', color: 'inherit' }}
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>{' '}
          | © OpenStreetMap Contributors{' '}
        </Typography>
      </Popover>
    </div>
  );
};

export default AttributionControl;
