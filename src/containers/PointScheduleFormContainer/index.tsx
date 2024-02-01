import { Modal } from '@mui/material';
import React from 'react';
import PointSchedule from '~/components/PointSchedule';
import { useSelector } from '~/redux/reducers';
import { TravelFormData, FormData } from '~/utility/models';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
// import { calculateTravelTime, formatTime } from '~/utility/utils';

const PointScheduleFormContainer = (props: {
  travelData: TravelFormData[];
  currentPointData: FormData;
  }) => {
  const dispatch = useDispatch();

  const openItineraryPopUp: any = useSelector(
    (state: any) => state.MapReducers.popupState,
  );

  const handleClose = () => {
    dispatch(ActionsCreator.openPopUP(false));
  };

  const useCustomProps = props.travelData !== undefined;

  const sampleProps = {
    travelData: [], // Empty array for travelData
    currentPointAirport: 'Default Current Airport',
    currentPointCity: 'Default Current City',
    currentPointCountry: 'Default Current Country',
    handleClose: () => {}, // Placeholder handleClose function
  };

  // const sampleProps = {
  //   currentPointAirport: 'Default Current Airport',
  //   currentPointCity: 'Default Current City',
  //   currentPointCountry: 'Default Current Country',
  //   originAirport: 'Default Departure Airport',
  //   originCity: 'New York City',
  //   originCountry: 'USA',
  //   destAirport: 'Default Arrival Airport',
  //   destCity: 'Paris',
  //   destCountry: 'France',
  //   departureDate: new Date('2023-10-25'),
  //   departureTime: '09:00 AM',
  //   arrivalDate: new Date('2023-10-25'),
  //   arrivalTime: '22:00 PM',
  //   travelTime: '6hrs 23min',
  //   disabled: false,
  //   handleClose: () => {}, // Placeholder function
  // };
  // let travelTime = '';
  // let departureDateTime;
  // let arrivalDateTime;
  // let departureTime;
  // let arrivalTime;

  // if (props.travelData) {
  //   departureDateTime = props.travelData.departure.dateTime
  //     ? new Date(props.travelData.departure.dateTime)
  //     : null;
  //   arrivalDateTime = props.travelData.arrival.dateTime
  //     ? new Date(props.travelData.arrival.dateTime)
  //     : null;

  //   travelTime = calculateTravelTime(departureDateTime, arrivalDateTime);
  //   departureTime = formatTime(departureDateTime);
  //   arrivalTime = formatTime(arrivalDateTime);
  // }

  // ('sadsadasdsa', props.travelData);
  const customProps = useCustomProps
    ? {
        travelData: props.travelData,
        currentPointAirport:
          props.currentPointData?.location?.label ||
          'Default Departure Airport',
        currentPointCity: props.currentPointData?.location?.city || '',
        currentPointCountry: props.currentPointData?.location?.country || '',
        currentPointCategory: props.currentPointData.category || '',
        handleClose: handleClose,
      }
    : sampleProps;

  return (
    <div style={{}}>
      <Modal
        open={openItineraryPopUp}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PointSchedule {...customProps} />
      </Modal>
    </div>
  );
};

export default PointScheduleFormContainer;
