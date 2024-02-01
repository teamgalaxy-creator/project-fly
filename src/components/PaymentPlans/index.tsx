import React, { useState, MouseEvent } from 'react';
import useStyles from './styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import useMediaQuery from '@mui/material/useMediaQuery';

const PaymentPlans = () => {
  const classes = useStyles();

  const [bilingInterval, setBilingInterval] = useState('monthly');
  const [paymentPlan, setPaymentPlan] = useState('basic');

  const handlebilingInterval = (value: string) => {
    setBilingInterval(value);
  };

  const handlePaymentPlan = (value: string) => {
    setPaymentPlan(value);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isSmScreen = useMediaQuery('(max-width:601px)');

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box className={classes.mainContainer}>
        <Grid container>
          <Grid container>
            <Typography className={classes.heading}>Pricing Plans</Typography>
            <Grid item xs={12}>
              <div className={classes.paymentButtonsGroup}>
                <ToggleButton
                  value="left"
                  aria-label="left aligned"
                  onClick={() => handlebilingInterval('monthly')}
                  className={
                    bilingInterval === 'monthly'
                      ? classes.selectedButton
                      : classes.paymentButton
                  }
                >
                  Monthly
                </ToggleButton>
                <ToggleButton
                  value="right"
                  aria-label="right aligned"
                  onClick={() => handlebilingInterval('yearly')}
                  className={
                    bilingInterval === 'yearly'
                      ? classes.selectedButton
                      : classes.paymentButton
                  }
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  Yearly
                </ToggleButton>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: isSmScreen ? 'bottom' : 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: isSmScreen ? 'top' : 'bottom',
                    horizontal: isSmScreen ? 'center' : 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <div className={classes.dialogBox}>
                    <Typography className={classes.bubbleText}>
                      Pay annually and save upto
                    </Typography>
                    <Typography className={classes.bubbleText2}>40%</Typography>
                  </div>
                </Popover>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <hr className={classes.line}></hr>
            <Grid item xs={12} md={4}>
              <Card
                onClick={() => handlePaymentPlan('free')}
                className={
                  paymentPlan === 'free' ? classes.cardSelected : classes.card
                }
              >
                <CardContent className={classes.cardContent}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        className={
                          paymentPlan === 'free'
                            ? classes.planHeadingSelected
                            : classes.planHeading
                        }
                      >
                        Free plan
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.priceSelected
                              : classes.price
                          }
                        >
                          $00.00
                        </span>
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.planSubheadingSelected
                              : classes.planSubheading
                          }
                        >
                          Billed Monthly.
                        </span>
                      </Typography>
                    </Grid>
                    <hr className={classes.line2}></hr>
                    <Grid item xs={12}>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Magna Malesuada
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Malesuada Fermentum Tortor
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Venenatis Mollis
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Fringilla Fusce Elit
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'free'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Parturient Venenatis Etiam
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        className={
                          paymentPlan === 'free'
                            ? classes.planButtonSelected
                            : classes.planButton
                        }
                      >
                        Get started
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                onClick={() => handlePaymentPlan('basic')}
                className={
                  paymentPlan === 'basic' ? classes.cardSelected : classes.card
                }
              >
                <CardContent className={classes.cardContent}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        className={
                          paymentPlan === 'basic'
                            ? classes.planHeadingSelected
                            : classes.planHeading
                        }
                      >
                        Basic plan
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.priceSelected
                              : classes.price
                          }
                        >
                          $69.99
                        </span>
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.planSubheadingSelected
                              : classes.planSubheading
                          }
                        >
                          Billed Monthly.
                        </span>
                      </Typography>
                    </Grid>
                    <hr className={classes.line2}></hr>
                    <Grid item xs={12}>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Magna Malesuada
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Malesuada Fermentum Tortor
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Venenatis Mollis
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Fringilla Fusce Elit
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'basic'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Parturient Venenatis Etiam
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        className={
                          paymentPlan === 'basic'
                            ? classes.planButtonSelected
                            : classes.planButton
                        }
                      >
                        Get started
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                onClick={() => handlePaymentPlan('business')}
                className={
                  paymentPlan === 'business'
                    ? classes.cardSelected
                    : classes.card
                }
              >
                <CardContent className={classes.cardContent}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        className={
                          paymentPlan === 'business'
                            ? classes.planHeadingSelected
                            : classes.planHeading
                        }
                      >
                        Business plan
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.priceSelected
                              : classes.price
                          }
                        >
                          $99.99
                        </span>
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.planSubheadingSelected
                              : classes.planSubheading
                          }
                        >
                          Billed Monthly.
                        </span>
                      </Typography>
                    </Grid>
                    <hr className={classes.line2}></hr>
                    <Grid item xs={12}>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Magna Malesuada
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Malesuada Fermentum Tortor
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Venenatis Mollis
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Fringilla Fusce Elit
                        </span>
                      </Typography>
                      <Typography className={classes.details}>
                        <img src="icons/checkIcon.svg" alt="check" />
                        <span
                          className={
                            paymentPlan === 'business'
                              ? classes.planDetailsSelected
                              : classes.planDetails
                          }
                        >
                          Parturient Venenatis Etiam
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        className={
                          paymentPlan === 'business'
                            ? classes.planButtonSelected
                            : classes.planButton
                        }
                      >
                        Get started
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PaymentPlans;
