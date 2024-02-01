// @ts-nocheck

import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Typography,
  InputAdornment,
  Button,
  MenuItem,
  Select,
  // DialogActions,
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DisabledFormContainer from '../DisabledFormContainer';
import useStyles from './styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormData, Options } from '~/utility/models';
import dayjs, { Dayjs } from 'dayjs';
import { Loader } from '@googlemaps/js-api-loader';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Autocomplete, TextField } from '@mui/material';
import { timezoneDate } from '~/utility/utils';
// import { PickersActionBarProps } from '@mui/x-date-pickers';
import tzlookup from 'tz-lookup';
import { Position } from '@turf/turf';
import { useSelector } from '~/redux/reducers';
import OutsideClickHandler from 'react-outside-click-handler';

// import { Position } from '@turf/turf';

dayjs.extend(utc);
dayjs.extend(timezone);
interface FormSectionProps {
  formData: FormData;
  oppositeformData: FormData;
  onFormChange: (
    field: keyof FormData,
    value: string | null | number | Date | Options | Dayjs,
  ) => void;
  isDisabled: boolean;
  alertText: string;
  defaultCategory: string | null;
  type: string;
}

// console.log(google as any);

// const CustomActionBar = (props: PickersActionBarProps) => {
//   const { onAccept, onClear, onCancel, onSetToday, actions } = props;

//   const actionsArray = actions;

//   if (actionsArray == null || actionsArray.length === 0) {
//     return null;
//   }

//   ('actionsArray', props);

//   const setOnCloseValue = () => {
//     onClear();
//     // onFormChange('dateTime', null);
//   };

//   return (
//     <DialogActions>
//       <Button onClick={setOnCloseValue}>Cancel</Button>
//     </DialogActions>
//   );
// };

const FormContainer = (props: FormSectionProps) => {
  const { onFormChange, formData, isDisabled, alertText, oppositeformData } =
    props;

  const classes = useStyles(); // Use useStyles to access the CSS classes
  const [options, setOptions] = useState<Options[]>([]);
  const tzArrival = useRef<string>('Asia/Karachi');
  const tzDeparture = useRef<string>('Asia/Karachi');
  const [editAirport, setEditAirport] = useState(false);
  const placesService = useRef();
  const autocompleteSelected = useRef(false);

  const categories = [
    '✈️ Airport',
    '🏠 Home',
    '🏨 Hotel',
    '🍽️ Restaurant',
    '🎡 Point of Attraction',
    '📌 Other',
  ];

  async function setupGoogle() {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
      version: 'weekly',
      authReferrerPolicy: 'origin',
    });

    const { PlacesService } = await loader.importLibrary('places');

    placesService.current = new PlacesService(document.createElement('div'));
  }

  async function geocode(request: any) {
    const autocompleteService = new google.maps.places.AutocompleteService();

    const detailsPromises = new Promise((resolve) => {
      autocompleteService.getPlacePredictions(
        {
          input: request,
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const detailsArray = predictions.map((prediction) => {
              const terms = prediction.terms;
              const mainText =
                prediction.structured_formatting?.main_text || '';
              const placeId = prediction.place_id;

              let country = '';
              let city = '';

              if (terms.length === 1) {
                country = terms[0].value;
              } else if (terms.length > 1) {
                city = terms[terms.length - 2].value;
                country = terms[terms.length - 1].value;
              }

              const result = {
                value: mainText,
                label: mainText,
                text: mainText,
                code: country,
                city: city,
                country: country,
                placeId: placeId,
              };

              return result;
            });

            resolve(Promise.all(detailsArray));
          } else {
            resolve([]);
          }
        },
      );
    });

    return detailsPromises;
  }

  const isEditing: boolean = useSelector(
    (state: any) => state.MapReducers.isEditing,
  );
  const handleChange = (event) => {
    const newCategory = event.target.value;
    // setSelectedCategory(newCategory);
    handleCategoryClick(newCategory);
  };
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!formData.location?.text) {
      autocompleteSelected.current = false;
    } else autocompleteSelected.current = true;
  }, [formData.location?.text]);

  const lookupTimezone = (latitude: any, longitude: any) => {
    const timezone = tzlookup(latitude, longitude);
    return timezone;
  };

  const handleChangeAirport = async (
    event: React.SyntheticEvent<Element, Event>,
    data: Options,
  ) => {
    if (currentDebounceValueRef.current <= maxDebounceDelay) {
      console.log(currentDebounceValueRef.current, 'debvounce');

      currentDebounceValueRef.current += 1000;
    }

    const geocoder = new google.maps.Geocoder();

    const { results } = await geocoder.geocode({
      placeId: data.placeId,
    });

    const countryComponent = results[0].address_components.find((component) =>
      component.types.includes('country'),
    );
    const cityComponent = results[0].address_components.find(
      (component) =>
        component.types.includes('locality') ||
        component.types.includes('administrative_area_level_1'),
    );

    const result = {
      value: data.value,
      label: data.label,
      text: data.text,
      code: countryComponent ? countryComponent.short_name : '',
      city: cityComponent ? cityComponent.long_name : '',
      country: countryComponent ? countryComponent.long_name : '',
      coordinates: [
        results[0].geometry.location.lng(),
        results[0].geometry.location.lat(),
      ],
      placeId: results[0].place_id,
    };

    const coordinates = result.coordinates as Position;
    const timezone = lookupTimezone(coordinates[1], coordinates[0]);
    if (props.type === 'departure') {
      tzDeparture.current = lookupTimezone(coordinates[1], coordinates[0]);
    } else if (props.type === 'arrival') {
      tzArrival.current = lookupTimezone(coordinates[1], coordinates[0]);
    }
    onFormChange('timezone', timezone);
    onFormChange('location', result);
  };
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  let maxDebounceDelay = 5000;
  let debounceDelayInitial = 1000;
  const currentDebounceValueRef = useRef(debounceDelayInitial);

  useEffect(() => {
    // Clear the previous timeout when inputValue changes
    if (inputValue !== debouncedInputValue) {
      setOptions([]);
      const timeoutId = setTimeout(() => {
        setDebouncedInputValue(inputValue);
      }, currentDebounceValueRef.current);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [inputValue, debouncedInputValue]);

  useEffect(() => {
    const handleSearch = async (query: string) => {
      try {
        const newOptions = await geocode(query);

        setOptions(newOptions);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    console.log(debouncedInputValue, 'debvounce');

    if (debouncedInputValue) {
      handleSearch(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  const handleInputChange = (e: any, newInputValue: any) => {
    if (e && e.type && e.type === 'change') setInputValue(newInputValue);
  };

  const handleChangeDateTime = (date: any) => {
    if (date) {
      if (props.type === 'arrival') {
        if (date.isBefore(oppositeformData.dateTime)) {
          setDefaulValue();
        } else {
          let convertedDate = date.toISOString();

          onFormChange('dateTime', convertedDate);
        }
      }

      if (props.type === 'departure') {
        if (date.isAfter(oppositeformData.dateTime)) {
          setDefaulValue();
        } else {
          let convertedDate = date.toISOString();

          onFormChange('dateTime', convertedDate);
        }
      }
    }

    //call this in each condition after the check else give alert and dont allow this fucntion onFormChange('dateTime', date);
  };

  const handleClearDebounce = () => {
    setDebouncedInputValue('');
    setInputValue('');
    setOptions([]);
  };

  useEffect(() => {
    if (inputValue === '') {
      handleClearDebounce();
    }
  }, [inputValue]);

  const setNullValue = () => {
    onFormChange('dateTime', null);
  };

  const setDefaulValue = () => {
    const dateWithTimeZone = dayjs(oppositeformData.dateTime).tz(
      formData.timezone,
    );

    onFormChange('dateTime', dateWithTimeZone as any);
  };

  const handleCategoryClick = (newCategory: string) => {
    onFormChange('category', newCategory);
    // setAutocompleteSelected(false);
  };

  let minDate; // Declare a variable to hold the min date
  let maxDate; // Declare a variable to hold the min date

  if (props.type === 'departure') {
    maxDate = dayjs(oppositeformData.dateTime).tz(formData.timezone);
  } else if (props.type === 'arrival') {
    minDate = dayjs(oppositeformData.dateTime).tz(formData.timezone);
  }
  const desktopScreen = useMediaQuery('(min-width:1440px)');
  const inputFieldSize = desktopScreen ? 'medium' : 'small';

  const title = props.type === 'departure' ? 'Departure' : 'Arrival';

  return (
    <div style={{ padding: '10px', paddingTop: '0' }} onLoad={setupGoogle}>
      {isDisabled ? (
        <DisabledFormContainer
          type={props.type}
          date={oppositeformData.dateTime}
          data={props.formData}
          alertText={alertText}
          handleChangeDateTime={handleChangeDateTime}
          onFormChange={onFormChange}
        />
      ) : (
        <Grid
          container
          spacing={1}
          padding={0.5}
          className={classes.formContainer}
        >
          <Grid
            xs={12}
            md={12}
            marginTop={1}
            marginBottom={1}
            padding={1}
            className={classes.formContainer}
          >
            <Typography className={classes.subHeading}>
              {title} Point
            </Typography>

            {/* <Select
              fullWidth
              variant="outlined"
              size={inputFieldSize}
              className={`${classes.hideDropdownArrow} ${classes.dropDownOutlineInput} ${classes.selectBackground}`}
              value={formData.airport} // Set the selected value
              onChange={handleChangeAirport} // Handle changes in selection
            >
              {airportData
                .filter((airport) => airport.text !== oppositeformData.airport) // Exclude the selected departure airport
                .map((airport) => (
                  <MenuItem
                    key={airport.text}
                    value={airport.text}
                    className={classes.customMenuItem}
                  >
                    {airport.text}
                  </MenuItem>
                ))}
            </Select> */}
            <OutsideClickHandler onOutsideClick={handleClearDebounce}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                className={`${classes.hideDropdownArrow} ${classes.dropDownOutlineInput} ${classes.selectBackground}`}
                autoComplete
                size={inputFieldSize}
                filterOptions={(x) => x}
                includeInputInList
                filterSelectedOptions
                value={(formData.location?.text as any) || ''}
                fullWidth
                open={
                  isOpen &&
                  options.length > 0 &&
                  (formData.location === null || (!isEditing && editAirport))
                }
                onChange={(e, newValue) => {
                  if (newValue) {
                    handleChangeAirport(e, newValue);
                    setIsOpen(false);
                    setEditAirport(false);
                    autocompleteSelected.current = true;
                  }
                }}
                onInputChange={(e, newInputValue) => {
                  handleInputChange(e, newInputValue);
                  setIsOpen(newInputValue !== '');
                  setEditAirport(true);

                  // handleSearch(newInputValue);
                }}
                renderOption={(props, option: Options) => (
                  <li {...props} key={option.value}>
                    <div
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                      >
                        {option.text}
                      </div>
                      <div
                        style={{ color: '#555', textTransform: 'capitalize' }}
                      >
                        {option.city ? option.city : option.code},{' '}
                        {option.country}
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    value={formData.location?.text as any}
                    placeholder={
                      props.type === 'departure'
                        ? 'Enter a point of departure (e.g. JFK Airport)'
                        : 'Enter a point of arrival (e.g. DXB Airport)'
                    }
                    fullWidth
                    InputProps={{
                      // Add custom CSS to hide the arrow
                      ...params.InputProps,
                      className: classes.subHeading,

                      endAdornment: <React.Fragment></React.Fragment>,
                      // endAdornment: (
                      //   <InputAdornment position="start">
                      //     <img
                      //       src="icons/searchIcon.svg"
                      //       alt="calendar"
                      //       className={classes.clockImg}
                      //     />
                      //   </InputAdornment>)
                    }}
                    onClick={() => {
                      setEditAirport(true);
                    }}
                  />
                )}
              />
            </OutsideClickHandler>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            marginTop={1}
            marginBottom={1}
            style={{
              opacity: autocompleteSelected.current ? 1 : 0.2,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <Typography className={classes.subHeading}>
              {title} Date and Time{' '}
              <span style={{ fontSize: '15px' }}> (local time)</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                //  label='when'
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: inputFieldSize,
                    placeholder: 'When?',
                    className: `${classes.selectBackground} ${classes.customOutlineInput}`,
                    InputProps: {
                      className: classes.subHeading,
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src="icons/clock.svg"
                            alt="calendar"
                            className={classes.clockImg}
                          />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
                onOpen={setNullValue}
                disabled={formData.location ? false : true}
                defaultValue={formData.dateTime}
                value={
                  formData.dateTime
                    ? dayjs(formData.dateTime).tz(formData.timezone)
                    : null
                }
                minDateTime={minDate as any}
                maxDateTime={maxDate as any}
                onChange={handleChangeDateTime}
                timezone={formData.timezone}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            marginTop={1}
            marginBottom={1}
            style={{
              opacity: autocompleteSelected.current ? 1 : 0.2,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <Typography className={classes.subHeading}>
              Type of Point
            </Typography>
            <Select
              sx={{ borderRadius: '30px', height: '46px' }}
              value={formData.category}
              onChange={handleChange}
              className={classes.subHeading}
              displayEmpty
              // className={classes.categorySelect}
              disabled={!autocompleteSelected.current}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default FormContainer;
