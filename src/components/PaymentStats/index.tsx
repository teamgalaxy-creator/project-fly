import * as React from 'react';
import Box from '@mui/material/Box';
import TransactionHistory from './table';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from './styles';


export default function PaymentStats() {
    const classes = useStyles();

    return(
        <Box className={classes.maincontainer}>
        <Grid container  alignItems="center" className={classes.mainGrid} >
            <Grid item xs={12} sm={12} md={8} lg={5} xl={5}  className={classes.firstGrid}> 
            <Typography className={classes.titleBilling}>Billing</Typography>
            <div style={{width:'fit-content'}}>
            <Typography className={classes.h1}>Basic Plan</Typography>
            <Typography className={classes.h2} >Monthly - $23.00</Typography>
            <Typography className={classes.h3} >Your next billing date: 23/12/2023</Typography>
                 <img src="orangeCard.svg" alt="Add a Travel" className={classes.orangeCard} />   
            </div>
                 <Typography sx={{fontFamily:'Futura Md BT', fontSize:'20px',mt:'25px',mb:'15px'}}>Information</Typography>
                 <img src="paymentMethodField.svg" alt="Add a Travel"  style={{maxWidth:'100%', height:'auto'}}/>   
                 <Typography sx={{fontFamily:'Futura Bk BT', fontSize:'16px',mt:'18px',mb:'15px'}}>Your next billing is on 1 November 2023</Typography>
            </Grid>      
            <Grid item xs={12} sm={12} md={8} lg={5} xl={5}  className={classes.secondGrid}> 
            <Typography sx={{fontFamily:'Futura Md BT', fontSize:'20px',}}>Transaction History</Typography>
                <TransactionHistory/>            
            </Grid>
        </Grid>
    </Box>
    );
}