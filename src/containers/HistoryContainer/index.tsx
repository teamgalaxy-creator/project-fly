import React from 'react';
import FeedbackPopup from '~/components/FeedbackPopup';
import HistoryPage from '~/components/HistoryPage/HistoryPage';
import Navbar from '~/components/NavBar';
// import { useSelector } from '~/redux/reducers';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
// import PaymentPlans from '~/components/PaymentPlans';

const HistoryPageContainer = () => {
  const dispatch = useDispatch();

  // const openHistoryPage: any = useSelector(
  //   (state: any) => state.MapReducers.historyPageState,
  // );

  const handleClose = () => {
    dispatch(ActionsCreator.openHistoryPageState(false));
  };
  const HistoryPageProps = {
    handleClose: handleClose,
  };

  return (
    <>
      <Navbar />
      <FeedbackPopup/>

      <HistoryPage {...HistoryPageProps} />
    </>
  );
};

export default HistoryPageContainer;
