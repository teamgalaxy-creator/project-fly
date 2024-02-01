import React, { useReducer } from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import './style.css';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useStyles from './styles';
import dayjs, { Dayjs } from 'dayjs';
import { FormData } from '~/utility/models';

import { Options } from '~/utility/models';
import { lookupTimezone } from '~/utility/utils';
import { Position } from '@turf/turf';

interface FormSectionProps {
  type: string;
  alertText: string;
  data: {
    location: Options | null;
    dateTime: Date | null | undefined | Dayjs | string;
    category: string;
    timezone: string;
  };
  date: Date | null;
  handleChangeDateTime: (date: Date | null) => void;
}

const DisabledFormContainer = ({
  type,
  data,
  alertText,
  date,
  handleChangeDateTime,
}: FormSectionProps) => {
  const classes = useStyles(); // Use useStyles to access the CSS classes
  const dayjsDate = dayjs(date);
  const desktopScreen = useMediaQuery('(min-width:1440px)');
  const inputFieldSize = desktopScreen ? 'medium' : 'small';
  const titletext = type === 'departure' ? 'Departure' : 'Arrival';
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  useEffect(() => {
    if (!selectedDateTime) {
      const dayjsDateTime = dayjs(data.dateTime);
      setSelectedDateTime(dayjsDateTime as any);
    }
  }, [data.dateTime, selectedDateTime]);

  return (
    <Grid container spacing={1} padding={0.5} paddingTop={0} marginTop={0}>
      <Grid
        item
        xs={12}
        md={12}
        marginTop={1}
        marginBottom={2}
        className={classes.formContainer}
      >
        <Typography className={`${classes.subHeading} ${classes.disabled}`}>
          {titletext} Point
          <span>
            <img src="icons/disabled.svg" alt="disabled"></img>
          </span>
        </Typography>
        <Paper
          elevation={3}
          style={{
            backgroundColor: '#ececed',
            padding: '20px',
            marginBottom: '2px',
          }}
        >
          <Typography variant="body1" className={classes.alertText}>
            {alertText}
          </Typography>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        marginTop={1}
        marginBottom={1}
        className={classes.formContainer}
      >
        <TextField
          variant="outlined"
          size={inputFieldSize}
          fullWidth
          value={data.location?.value}
          disabled
          className={classes.customInput}
          InputProps={{
            className: classes.subHeading,
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        marginTop={1}
        marginBottom={1}
        className={classes.formContainer}
      >
        <Typography className={classes.subHeading} color={'grey'}>
          Type of Point
        </Typography>
        <Button
          variant="contained"
          className={classes.categoryButtons}
          disabled
        >
          {data.category}
        </Button>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        marginTop={1}
        marginBottom={1}
        className={classes.formContainer}
      >
        <Typography className={classes.subHeading}>
          {titletext} Time and Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            slotProps={{
              textField: {
                fullWidth: true,
                size: inputFieldSize,
                placeholder: 'Full date format',
                className: classes.selectBackground,
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
            // onOpen={setNullValue}

            value={
              data.dateTime
                ? (dayjs(data.dateTime).tz(data.timezone) as any)
                : null
            }
            onChange={handleChangeDateTime}
            minDateTime={selectedDateTime as any}
            maxDateTime={dayjsDate as any}
            timezone={data.timezone}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default DisabledFormContainer;
