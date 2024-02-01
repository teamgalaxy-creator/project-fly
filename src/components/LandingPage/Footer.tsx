import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useStyles from './styles';

const FooterLink = styled('a')({
  textDecoration: 'none',
  color: '#4F535B',
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.footerContainer}>
        <div className={classes.footerAboutColumn} style={{ flex: '1' }}>
          <img
            src="/logoVizualTravel.svg"
            alt="Logo"
            className={classes.footerLogo}
          />
          <p className={classes.footerAboutText}>
            Showcase travel in the most useful and interesting way.
          </p>
          <Box className={classes.footerIconBox}>
            <a href="https://www.facebook.com/profile.php?id=61555207093836">
              <img
                src="/icons/facebookIcon.svg"
                alt="Facebook Icon"
                style={{ cursor: 'pointer', height: '28px' }}
              />
            </a>
            <a href="https://twitter.com/VizualTravel">
              <img
                src="/icons/twitterIcon.svg"
                alt="Twitter Icon"
                style={{ cursor: 'pointer', height: '26px' }}
              />
            </a>
            <a href="https://www.instagram.com/vizualtravelcom/">
              <img
                src="/icons/instagramIcon.svg"
                alt="Instagram Icon"
                style={{ cursor: 'pointer', height: '26px' }}
              />
            </a>
            <a href="https://www.youtube.com/channel/UCercgvba-LPZLFIaXg5loBw">
              <img
                src="/icons/youtubeIcon.svg"
                alt="Instagram Icon"
                style={{ cursor: 'pointer', height: '24px' }}
              />
            </a>
          </Box>
        </div>
        <div className={classes.footerCenterColumn}>
          <div className={classes.quickAccessColumn}>
            <div className={classes.footerColumnTitle}>Quick Access</div>
            <div className={classes.footerColumnContainer}>
              <a className={classes.footerLink} href="#home">
                Home
              </a>
              <a className={classes.footerLink} href="#about">
                About
              </a>
              <a className={classes.footerLink} href="#features">
                Features
              </a>
            </div>
          </div>
          <div className={classes.featuresColumn}>
            <div className={classes.footerColumnTitle}>How-to</div>
            <div className={classes.footerColumnContainer}>
              <a className={classes.footerLink} href="#customItinery">
                Add Travel Itinerary
              </a>
              <a className={classes.footerLink} href="#generateVideo">
                Automatic Travel Animation
              </a>
              <a className={classes.footerLink} href="#changeMap">
                Publish and Share
              </a>
            </div>
          </div>
        </div>
        <div className={classes.footerContactColumn} style={{ flex: '1' }}>
          <div className={classes.footerColumnTitle}>Contact Us</div>
          <div className="d-flex align-items-start flex-column gap-3">
            <a
              className={classes.footerLink}
              href="mailto:support@vizualtravel.com"
            >
              <img
                src="/icons/emailIcon.svg"
                alt="Email Icon"
                style={{ marginRight: '12px' }}
              />
              support@vizualtravel.com
            </a>
          </div>
        </div>
      </div>
      <Box className={classes.footerCopyrightText}>
        Copyright &copy; VizualTravel 2024
      </Box>
    </footer>
  );
};

export default Footer;
