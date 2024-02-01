import React from 'react';
import Settings from '~/components/Settings';
import Navbar from '~/components/NavBar';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import FeedbackPopup from '~/components/FeedbackPopup';

const SettingsPageContainer = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(ActionsCreator.openSettingsPageState(false));
  };
  const SettingsPageProps = {
    handleClose: handleClose,
  };

  return (
    <>
      <Navbar />
      <FeedbackPopup />
      <Settings {...SettingsPageProps} />
    </>
  );
};

export default SettingsPageContainer;
