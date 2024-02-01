import React from 'react';
import FeedbackPopup from '~/components/FeedbackPopup';
import Navbar from '~/components/NavBar';
import PaymentStats from '~/components/PaymentStats';
// import { useSelector } from '~/redux/reducers';
// import ActionsCreator from '~redux/actions';
// import { useDispatch } from '~redux/store';

const PaymentStatsContainer = () => {
  // const dispatch = useDispatch();

  // const openPaymentStats: any = useSelector(
  //   (state: any) => state.MapReducers.paymentStatsState,
  // );

  return (
    <>
      <Navbar />
      <FeedbackPopup/>

      <PaymentStats />;
    </>
  );
};

export default PaymentStatsContainer;
