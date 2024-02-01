import { styled } from '@mui/material/styles';
import { Button, Divider, Grid } from '@mui/material';
import { Ref, useState } from 'react';
import useStyles from './styles';

interface PricingSectionProps {
  pricingRef: Ref<HTMLElement>;
}

const PricingPlans = ({ pricingRef }: PricingSectionProps) => {
  const [paymentPlan, setPaymentPlan] = useState('monthly');
  const classes = useStyles();

  const pricingPlans = [
    {
      planType: 'Free Plan',
      price: 29.99,
      points: [
        'Magna Malesuada',
        'Malesuada Fermentum Tortor',
        'Venenatis Mollis',
        'Fringilla Fusce Elit',
        'Parturient Venenatis Etiam',
      ],
    },
  ];

  return (
    <section id="pricing" ref={pricingRef} className={classes.section}>
      <div className={classes.sectionTitle}>
        Pricing <span className={classes.sectionTitleSpan}>Plans</span>
      </div>
      <div className={classes.buttonBox}>
        <Button
          className={`${classes.toggleButton} ${
            paymentPlan === 'monthly' ? 'active' : ''
          }`}
          onClick={() => setPaymentPlan('monthly')}
        >
          Monthly
        </Button>
        <Button
          className={`${classes.toggleButton} ${
            paymentPlan === 'yearly' ? 'active' : ''
          }`}
          onClick={() => setPaymentPlan('yearly')}
        >
          Yearly
        </Button>
      </div>

      <Divider light className={classes.mainDivider} />

      <div className={classes.cardContainer}>
        {/* Free Plan */}
        <div className={classes.paymentCard}>
          <div className={classes.planType}>Free Plan</div>
          <div>
            <span className={classes.price}>$0.00</span>
            <span className={classes.planDuration}>Billed monthly.</span>
          </div>
          <Divider className={classes.cardDivider} />
          <div className={classes.pointContainer}>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Add your Travel Points
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Generate 25 Trip Animations per month
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />1 Active
              Published Trip
            </div>
          </div>
          <Button className={classes.button} fullWidth>
            Get Started
          </Button>
        </div>

        {/* Basic Plan */}
        <div className={classes.paymentCard}>
          <div className={classes.planType}>Basic Plan</div>
          <div>
            <span className={classes.price}>$69.99</span>
            <span className={classes.planDuration}>Billed monthly.</span>
          </div>
          <Divider className={classes.cardDivider} />
          <div className={classes.pointContainer}>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              All Features from other Plans
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Generate 1000 Trip Animations per month
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Add Sound / Music
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Add Booking Links to Travel Points
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Add your Logo to Animation
            </div>
          </div>
          <Button className={classes.button} fullWidth>
            Get Started
          </Button>
        </div>

        {/* Business Plan */}
        <div className={classes.paymentCard}>
          <div className={classes.planType}>Business Plan</div>
          <div>
            <span className={classes.price}>$99.99</span>
            <span className={classes.planDuration}>Billed monthly.</span>
          </div>
          <Divider className={classes.cardDivider} />
          <div className={classes.pointContainer}>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              All Features from Free Plan
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Generate 250 Trip Animations per month
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Chose Vehicle Models, Model Size, Map Styles and Control Video
              Speed
            </div>
            <div className={classes.pointItem}>
              <img src="/icons/checkIcon.svg" alt="Check Icon" />
              Unlimited Published Trips
            </div>
          </div>
          <Button className={classes.button} fullWidth>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
