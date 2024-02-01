import { Modal } from '@mui/material';
import React from 'react';
import CustomizeMap from '~/components/CustomizeMap';
import { useSelector } from '~/redux/reducers';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';

const CustomizeMapContainer = () => {
  const dispatch = useDispatch();

  const openCustomizeMap: any = useSelector(
    (state: any) => state.MapReducers.mapCustomizationPopupState,
  );

  const handleClose = () => {
    dispatch(ActionsCreator.openMapCustomizationPopup(false));
  };

  const CustomizeMapProps = {
    handleClose: handleClose,
  };

  return (
    <div style={{ padding: '10px' }}>
      <Modal
        open={openCustomizeMap}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomizeMap {...CustomizeMapProps} />
      </Modal>
    </div>
  );
};

export default CustomizeMapContainer;
