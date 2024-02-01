import { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6"
import { useSelector } from '~/redux/reducers'
import { TravelFormData } from '~/utility/models'
import { generateDateArray } from '~/utility/utils'
import './style.css'
const CalenderView = () => {
    // const selectedDate = new Date('2024-02-01')
    const [selectedDate, setSelectedDate] = useState('')
    const [allDates, setAllDates] = useState<string[]>([])
    const travelArray: TravelFormData[] = useSelector(
        (state: any) => state.MapReducers.pointsArray,
    );
    useEffect(() => {
        if (!travelArray || !travelArray[0]?.departure?.dateTime) return;
        // console.log("Travel ARRAY -->> ", travelArray[0])

        const stringDate = travelArray[0].departure.dateTime;
        const dateObject = new Date(`${stringDate}Z`);
        
        if (!isNaN(dateObject.getTime())) {
            // Check if the date is valid before converting
            const formattedDate = dateObject.toISOString().split('T')[0];
            setSelectedDate(formattedDate)
            console.log("--------------------- ", formattedDate);
            let dates = generateDateArray(formattedDate);
            setAllDates(dates);
            console.log("--------------------- ", dates);
        }
    }, [])

    if (!travelArray || !travelArray[0]?.departure?.dateTime) return null;

    const dateString = travelArray[0]?.departure?.dateTime;
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='calender-main'>
            <div className="music-bottom left-arrow cursor">
                <FaAngleLeft color="white" />
            </div>

            <div className='top-text'>
                <b>Day {travelArray.length} - {formattedDate}</b>

                <div className='mid-text' >
                    <FaAngleLeft color="white" style={{ cursor: 'pointer' }} />
                    {
                        allDates?.map((item, i) => {
                            let date = new Date(item)
                            
                            // let isSelected = mapDate === selectedDatee ? true : false
                            return (
                                <div key={i} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: false ? "orange" : "",
                                    padding: '4px 8px',
                                    borderRadius: 10,
                                    fontSize: 12
                                }}>

                                    <div>{date.toLocaleString('en-US', { weekday: 'short' })}</div>
                                    <b>{date.getDate()}</b>
                                </div>
                            )
                        })
                    }
                    <FaAngleLeft color="white" style={{ rotate: '180deg', cursor: 'pointer' }} />
                </div>


                {/* Flieght details here */}
                
                {/* Flieght details here */}
            </div>

            <div className="music-bottom right-arrow cursor">
                <FaAngleLeft color="white" />
            </div>
        </div>
    )
}
export default CalenderView