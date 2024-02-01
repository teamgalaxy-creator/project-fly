import { LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PiAirplaneTiltFill } from 'react-icons/pi'


const FlightCard = ({arrivalCity, departCity}: any) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div className='flight-details' >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className='icon'>
                    <PiAirplaneTiltFill color='#FE7138' size={20} />
                </div>
                <h6><b>Flight to {arrivalCity}</b></h6>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 17, fontWeight: 'bold' }}>{departCity}</div>
                    <div style={{ fontSize: 12 }}>10:45 AM</div>
                </div>

                <div style={{ width: '40%' }}>
                    <LinearProgress variant="determinate" value={progress} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 17, fontWeight: 'bold' }}>{arrivalCity}</div>
                    <div style={{ fontSize: 12 }}>10:45 AM</div>
                </div>
            </div>
        </div>
    )
}

export default FlightCard