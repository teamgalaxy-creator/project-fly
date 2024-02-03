import React from 'react';
import Button from '@mui/material/Button';
import './style.css'; // Make sure to create a CSS file for additional styling
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';

const TravelCard = () => {

    const dispatch = useDispatch();

    const handlePlay = () => {
        dispatch(ActionsCreator.setPlayPauseState(true));
    }

    return (

        <div>
            <div className="title">Jess Trip Made by Travelnow Agency</div>
            <div className="date">From March 7 to March 16, 2023</div>
            <Button variant="contained" className="Button"
                onClick={handlePlay}
            >
                <b className='GetStarted'>Get Started</b>
            </Button>
        </div>

    );
};

export default TravelCard;
