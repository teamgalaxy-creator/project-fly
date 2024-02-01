import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useDispatch } from '~redux/store';
import Button from '@mui/material/Button';
import { CircularProgress, Grid } from '@mui/material';

import ActionsCreator from '~redux/actions';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { useSelector } from '~/redux/reducers';
import { useAuth } from '~/managers/AuthContext';
// import useStyles from './styles';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const anchorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Detect initial screen width

  const { signOut } = useAuth();

  const [logoutState, setLogoutState] = useState<boolean>(false);

  const userName: string = useSelector(
    (state: any) => state.MapReducers.userName,
  );
  const profilePictureURL: string = useSelector(
    (state: any) => state.MapReducers.profileImgURL,
  );

  const [selectedProfilePicture, setSelectedProfilePicture] = useState(
    'icons/croppedLogoVizualTravel.svg',
  );

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const classes = useStyles();
  const handleOpenHistoryPage = () => {
    navigate('/history');
    dispatch(ActionsCreator.openHistoryPageState(true));
    handleCloseUserMenu();
  };
  const handleOpenPaymentStats = () => {
    navigate('/payment');
    dispatch(ActionsCreator.setPaymentStatsState(true));
    handleCloseUserMenu();
  };
  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleOpenSettingsPage = () => {
    navigate('/settings');
    dispatch(ActionsCreator.openSettingsPageState(true));
    handleCloseUserMenu();
  };
  const handleFeedbackPopup = () => {
    setAnchorElUser(null);
    dispatch(ActionsCreator.setFeedbackPopupState(true));
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setLogoutState(true);

    signOut()
      .then(() => {
        const tokenKey = process.env.REACT_APP_SUPABASE_TOKEN_KEY as string;
        localStorage.removeItem(tokenKey);

        dispatch(ActionsCreator.resetStateToInitial());
        navigate('/login');

        setAnchorElUser(null);
        setLogoutState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Determine if we're on mobile (max-width: 600px)
  // const isMobile = window.innerWidth <= 600;
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };
  // const classes = useStyles();

  useEffect(() => {
    // Add a listener for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <AppBar className={classes.appbar} position="static">
      <Container className={classes.containerset} maxWidth={false}>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          disableGutters
        >
          <Box sx={{ width: '190px', mt: isMobile ? '12px' : '24px' }}>
            <img
              src="/logoVizualTravel.svg"
              alt="Logo"
              onClick={() => navigate('/homepage')}
              style={{ cursor: 'pointer' }}
            />
          </Box>

          <Box className={classes.feedbackContainer}>
            <Typography
              sx={{
                position: 'relative',

                fontSize: '20px',
                fontFamily: 'Futura Md BT',
                color: 'black',
              }}
            >
              👋 Welcome to the Early Access
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  position: 'relative',
                  // left: '20%',
                  // top: '2.3rem',
                  fontSize: '15px',
                  fontFamily: 'Futura Md BT',
                  color: '#68707b',
                  // marginTop: '20px',
                  marginRight: '6px',
                }}
              >
                If you have any suggestions,{' '}
              </Typography>
              <Button
                className={classes.suggestionButton}
                color="primary"
                onClick={handleFeedbackPopup}
              >
                Give Feedback
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              // display: 'flex',
              // alignItems: 'center',
              mr: isMobile ? '1px' : '10px',
              mt: isMobile ? '12px' : '20px',
            }}
          >
            <Button
              onClick={handleOpenUserMenu}
              disableRipple
              sx={{
                // right:0,
                textTransform: 'none',
                '&:hover, &:focus': { backgroundColor: 'transparent' },
              }}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton
                    disableRipple
                    ref={anchorRef}
                    sx={{
                      p: 0,
                      borderRadius: '50%', // Set borderRadius to create a circular shape
                      overflow: 'hidden', // Ensure the content is not displayed outside the circular shape
                    }}
                  >
                    {!isMobile ? (
                      <img
                        src={
                          !profilePictureURL
                            ? selectedProfilePicture
                            : profilePictureURL
                        }
                        alt="add smth here"
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                        }}
                      />
                    ) : (
                      <img src="icons/MobileMenuTop.svg" alt="add here" />
                    )}
                  </IconButton>
                </Grid>
                {!isMobile && (
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: 'black',
                        fontFamily: 'Futura Md BT',
                        whiteSpace: 'nowrap',
                        textTransform: 'capitalize',
                      }}
                    >
                      {userName} {'     '}
                      <img src="icons/nameIcon.svg" alt="add here" />
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Button>
            <Menu
              sx={{ mt: '45px', right: '55%', width: '229px' }}
              id="menu-appbar"
              anchorEl={anchorRef.current}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                sx={{
                  width: '229px',
                  fontFamily: 'Futura Md BT',
                  marginBottom: '5px',
                }}
                onClick={handleOpenHistoryPage}
              >
                <img src="icons/History.svg" alt="Add a Travel" />
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: 'Futura Md BT', marginLeft: '8px' }}
                >
                  History
                </Typography>
              </MenuItem>

              <Divider variant="middle" sx={{ bgcolor: 'gray' }} />

              <MenuItem
                onClick={handleOpenSettingsPage}
                sx={{
                  width: '229px',
                  fontFamily: 'Futura Md BT',
                  marginTop: '7px',
                }}
              >
                <img src="icons/Settings.svg" alt="Add a Travel" />
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: 'Futura Md BT', marginLeft: '8px' }}
                >
                  Settings
                </Typography>
              </MenuItem>
              <Divider variant="middle" sx={{ bgcolor: 'gray' }} />

              <MenuItem
                onClick={handleFeedbackPopup}
                sx={{
                  width: '229px',
                  fontFamily: 'Futura Md BT',
                  marginTop: '7px',
                  '@media (min-width: 850px)': { display: 'none' },
                }}
              >
                <Icon
                  icon="fluent:person-feedback-32-regular"
                  color="#fe7138"
                  width={25}
                />
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: 'Futura Md BT', marginLeft: '8px' }}
                >
                  Feedback
                </Typography>
              </MenuItem>
              <Divider
                variant="middle"
                sx={{
                  bgcolor: 'gray',
                  '@media (min-width: 850px)': { display: 'none' },
                }}
              />

              {/* <MenuItem
                // onClick={handleOpenPaymentStats}
                sx={{ width: '229px', fontFamily: 'Futura Md BT' }}
              >
                <img src="icons/Billing.svg" alt="Add a Travel" />
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: 'Futura Md BT', marginLeft: '8px' }}
                >
                  Billing
                </Typography>
              </MenuItem>
              <Divider variant="middle" sx={{ bgcolor: 'gray' }} /> */}

              <MenuItem
                onClick={handleLogout}
                sx={{
                  // width: '229px',
                  fontFamily: 'Futura Md BT',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center', // Vertically align content
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertically align content
                  }}
                >
                  <img src="icons/Logout.svg" alt="Add a Travel" />
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: 'Futura Md BT', marginLeft: '8px' }}
                  >
                    Logout
                  </Typography>
                </Box>
                {logoutState && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '50px',
                    }}
                  >
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                      }}
                    />
                  </Box>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
