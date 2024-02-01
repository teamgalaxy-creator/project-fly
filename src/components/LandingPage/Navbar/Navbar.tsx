import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import useStyles from './styles';
import { Ref, RefObject, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  homeRef: Ref<HTMLElement>;
  aboutRef: Ref<HTMLElement>;
  featuresRef: Ref<HTMLElement>;
  testimonialsRef: Ref<HTMLElement>;
  pricingRef: Ref<HTMLElement>;
  mainContainerRef: RefObject<HTMLDivElement> | null;
}

const Navbar = ({
  homeRef,
  aboutRef,
  featuresRef,
  testimonialsRef,
  pricingRef,
  mainContainerRef,
}: NavbarProps) => {
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [activeMenuItem, setActiveMenuItem] = useState('home');
  const navigate = useNavigate();

  const navItems = [
    { link: 'Home', path: 'home', ref: homeRef, offset: 100 },
    { link: 'About Us', path: 'about', ref: aboutRef, offset: 0 },
    { link: 'How-to', path: 'features', ref: featuresRef, offset: 90 },
    // {
    //   link: 'Testimonials',
    //   path: 'testimonials',
    //   ref: testimonialsRef,
    //   offset: 90,
    // },
    // { link: 'Pricing', path: 'pricing', ref: pricingRef, offset: 40 },
  ];

  const mobileNavItems = [
    { link: 'Home', path: 'home', ref: homeRef, offset: 100 },
    { link: 'About', path: 'about', ref: aboutRef, offset: 50 },
    { link: 'Features', path: 'features', ref: featuresRef, offset: 90 },
    // {
    //   link: 'Testimonials',
    //   path: 'testimonials',
    //   ref: testimonialsRef,
    //   offset: 40,
    // },
    // { link: 'Pricing', path: 'pricing', ref: pricingRef, offset: 40 },
  ];

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const scrollToRef = (e: any, ref: any, offset: number, path: string) => {
    setActiveMenuItem(path);
    mainContainerRef?.current?.scrollTo({
      top: ref.current.offsetTop - offset, // Adjust the value based on your fixed navbar height
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Add a listener for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAccessMapClick = () => {
    navigate('/homepage');
  };

  return (
    <nav className={`${classes.navbar}`}>
      <Box className={classes.navbarContainer}>
        <Box className={classes.logoBox}>
          <img
            src="/logoVizualTravel.svg"
            alt="Logo"
            style={{ cursor: 'pointer' }}
          />
        </Box>
        {isMobile ? (
          <>
            <IconButton
              disableRipple
              sx={{ p: 0 }}
              onClick={handleOpenUserMenu}
            >
              <img src="icons/mobileNavMenuIcon.svg" alt="add here" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {mobileNavItems.map((item) => (
                <MenuItem
                  sx={{
                    width: '229px',
                    fontFamily: 'Futura Md BT',
                    marginBottom: '5px',
                    color: activeMenuItem === item.path ? '#FE7138' : '#000',
                  }}
                  key={item.path}
                  onClick={(e: any) => {
                    scrollToRef(e, item.ref, item.offset, item.path);
                    handleCloseUserMenu();
                  }}
                >
                  {item.link}
                </MenuItem>
              ))}
              <Box style={{ padding: '10px' }}>
                <Button
                  variant="contained"
                  className={classes.accessMapButton}
                  onClick={handleAccessMapClick}
                >
                  Access Map
                </Button>
              </Box>
            </Menu>
          </>
        ) : (
          <>
            <Box className={classes.navMenu}>
              {navItems.map((item) => (
                <a
                  key={item.path}
                  className={`${classes.navMenuItem} ${
                    activeMenuItem === item.path ? 'active' : ''
                  }`}
                  onClick={(e) =>
                    scrollToRef(e, item.ref, item.offset, item.path)
                  }
                >
                  {item.link}
                </a>
              ))}
            </Box>
            <Button
              variant="contained"
              className={classes.accessMapButton}
              onClick={handleAccessMapClick}
            >
              Access Map
            </Button>
          </>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
