import { Modal } from '@mui/material';
import React from 'react';
import { useSelector } from '~/redux/reducers';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import VideoPopup from '~/components/VideoPopup';
const VideoPopupContainer = () => {
  const dispatch = useDispatch();

  const openVideoPopup: any = useSelector(
    (state: any) => state.MapReducers.videoPopupState,
  );

  const isRecording: boolean = useSelector(
    (state: any) => state.MapReducers.isRecording,
  );

  const handleClose = () => {
    if (isRecording) return;
    dispatch(ActionsCreator.openVideoPopup(false));
    dispatch(ActionsCreator.setIsAnimationCapture(false));
    dispatch(ActionsCreator.setFullscreenAnimationMode(false));
  };

  const VideoPopupProps = {
    handleClose: handleClose,
  };

  return (
    <div style={{ padding: '10px' }}>
      <Modal
        open={openVideoPopup}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <VideoPopup {...VideoPopupProps} />
      </Modal>
    </div>
  );
};

export default VideoPopupContainer;
