// import { Modal } from '@mui/material';
import React from 'react';
import FeedbackPopup from '~/components/FeedbackPopup';
import Navbar from '~/components/NavBar';
import PaymentPlans from '~/components/PaymentPlans';
// import { useSelector } from '~/redux/reducers';
// import ActionsCreator from '~redux/actions';
// import { useDispatch } from '~redux/store';

const PaymentPlansContainer = () => {
  return (
    <>
      <Navbar />
      <FeedbackPopup/>

      <PaymentPlans />
    </>
  );
};

export default PaymentPlansContainer;
