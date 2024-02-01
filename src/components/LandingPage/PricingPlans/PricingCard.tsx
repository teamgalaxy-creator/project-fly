import useStyles from './styles';
import { Button } from '@mui/material';

const PricingCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.paymentCard}>
      <div className={classes.planType}>Free Plan</div>
      <div>
        <span className={classes.price}>$29.99</span>
        <span className={classes.planDuration}>Billed monthly.</span>
      </div>
      {/* <hr
        style={{
          height: '2px',
          width: '100%',
          border: '1px solid white',
        }}
      ></hr> */}
      <div className={classes.pointContainer}>
        <div className={classes.pointItem}>
          <img src="/icons/checkIcon.svg" alt="Check Icon" />
          Magna Malesuada
        </div>
        <div className={classes.pointItem}>
          <img src="/icons/checkIcon.svg" alt="Check Icon" />
          Malesuada Fermentum Tortor
        </div>
        <div className={classes.pointItem}>
          <img src="/icons/checkIcon.svg" alt="Check Icon" />
          Venenatis Mollis
        </div>
        <div className={classes.pointItem}>
          <img src="/icons/checkIcon.svg" alt="Check Icon" />
          Fringilla Fusce Elit
        </div>
        <div className={classes.pointItem}>
          <img src="/icons/checkIcon.svg" alt="Check Icon" />
          Parturient Venenatis Etiam
        </div>
      </div>
      <Button className={classes.button} fullWidth>
        Get Started
      </Button>
    </div>
  );
};

export default PricingCard;
