import { Button } from '@mui/material'
import './style.css'
import { useState } from 'react'

export default () => {
    const [opened, setOpened] = useState(false)
    const day = 'Tuesday'
    const date = 'March 7, 2023'

    return (
        <div className='d-flex flex-column my-4'>

            <IconChevron currentdate='2023-03-07' opened={opened} setOpened={setOpened} />

            {!opened && <div className='d-flex'>
                <div className='d-flex justify-content-center align-items-center'>
                    <CalendarIcon text={'Day 1'} />

                </div>
                <div className='daydate ps-3'>
                    <b>{day}</b>
                    <b>{date}</b>
                </div>
            </div>}
        </div >
    )
}

const CalendarIcon = ({ text = '' }) => {
    return (
        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.4926 19.3723C63.2881 13.0735 57.0994 7.35154 50.2846 6.24021C46.147 5.61149 40.5303 5.00776 32.8334 5.00007C25.1365 4.99238 19.5199 5.6038 15.3844 6.24021C8.56952 7.35346 2.38081 13.0735 1.17635 19.3723C0.487788 23.1946 -0.155005 28.3955 -0.165407 35.4999C-0.175808 42.6043 0.487788 47.8052 1.17635 51.6294C2.38081 57.9282 8.56952 63.6483 15.3844 64.7615C19.5199 65.4075 25.149 65.9843 32.8334 65.9997C40.5178 66.0151 46.147 65.396 50.2846 64.7615C57.0994 63.6483 63.2881 57.9282 64.4926 51.6294C65.1812 47.8071 65.824 42.6043 65.8344 35.4999C65.8447 28.3955 65.1812 23.1946 64.4926 19.3723Z" fill="url(#paint0_linear_1_107)" />
            <path d="M64.8345 22.9824C64.6528 21.5471 64.4504 20.2485 64.246 19.0768C63.0733 12.7986 57.131 7.08669 50.5136 5.81347V3.27484C50.5136 2.4063 50.1488 1.57333 49.4995 0.959177C48.8501 0.345026 47.9694 0 47.0511 0C46.1328 0 45.252 0.345026 44.6027 0.959177C43.9533 1.57333 43.5885 2.4063 43.5885 3.27484V4.94838C41.435 4.7531 39.0214 4.60859 36.3145 4.53829V3.27679C36.3145 2.40825 35.9498 1.57528 35.3004 0.96113C34.6511 0.346979 33.7703 0.00195321 32.852 0.00195321C32.3972 0.00169649 31.9469 0.0862278 31.5266 0.250713C31.1064 0.415198 30.7246 0.65641 30.403 0.960558C30.0815 1.26471 29.8264 1.62582 29.6525 2.02326C29.4786 2.4207 29.3892 2.84666 29.3895 3.27679V4.54024C26.6827 4.61055 24.269 4.757 22.1134 4.94643V3.27679C22.1134 2.84673 22.0239 2.42088 21.8499 2.02356C21.6759 1.62624 21.4208 1.26523 21.0993 0.96113C20.7778 0.657034 20.3961 0.415811 19.976 0.251236C19.5559 0.0866598 19.1056 0.00195321 18.6509 0.00195321C18.1962 0.00195321 17.7459 0.0866598 17.3259 0.251236C16.9058 0.415811 16.5241 0.657034 16.2025 0.96113C15.881 1.26523 15.626 1.62624 15.4519 2.02356C15.2779 2.42088 15.1884 2.84673 15.1884 3.27679V5.81542C8.55858 7.07692 2.59361 12.7947 1.42292 19.0944C1.21644 20.2661 1.00997 21.5569 0.834473 23C0.834473 23 13.5531 22.3966 32.85 22.3966C52.1468 22.3966 64.8345 22.9824 64.8345 22.9824Z" fill="url(#paint1_linear_1_107)" />
            <defs>
                <linearGradient id="paint0_linear_1_107" x1="59.4938" y1="60.1393" x2="10.3673" y2="6.98769" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FE7838" />
                    <stop offset="0.54" stop-color="#FE7636" />
                    <stop offset="1" stop-color="#FFAD8A" />
                </linearGradient>
                <linearGradient id="paint1_linear_1_107" x1="50.8192" y1="36.2341" x2="16.864" y2="0.332822" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EF3739" />
                    <stop offset="0.54" stop-color="#EF3739" />
                    <stop offset="1" stop-color="#FF8C8B" />
                </linearGradient>
            </defs>
            <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="white" fontSize="16">
                {text}
            </text>
        </svg>

    )
}


const generateDates = (date: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = new Date(date)
    const dates = []
    for (let i = -3; i < 4; i++) {
        d.setDate(d.getDate() + i)
        dates.push({ date: d.toDateString(), day: days[d.getDay()] })
    }
    return dates
}

const formatCurrentDate = (date: string) => {
    const d = new Date(date)
    return d.toDateString()
}


export const IconChevron = ({ currentdate, opened, setOpened }: { currentdate: string, opened: boolean, setOpened: any }) => {



    const dates = generateDates(currentdate)
    const items = [{
        type: 'flight',
        title: 'Flight to Bangkok',
        from: 'New York',
        to: 'Bangkok',
        departure: '10:45 AM',
        arrival: '14:45 PM',

    }, {
        type: 'hotel',
        title: 'Sunlight Hotel',
        from: 'Start Time',
        to: 'End Time',
        departure: '10:45 AM',
        arrival: '14:45 PM',

    }, {
        type: 'activity',
        title: 'Safari',
        from: 'Start Time',
        to: 'End Time',
        departure: '10:45 AM',
        arrival: '14:45 PM',
    }]

    return (
        <>
            {opened ?
                <>
                    <div className="chevron-up" onClick={() => setOpened(!opened)}>
                        <svg width="19" height="15" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.2168 1.62891L6.944 7.38086L12.6712 1.62891" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                    <div className='d-flex justify-content-evenly'>


                        {
                            dates.map((d, i) => {
                                return (
                                    <div datatype='selected' key={i} className={d.date == formatCurrentDate(currentdate) ? 'datecard-selected' : 'datecard'}>
                                        {d.day} {d.date.split(' ')[2]}
                                    </div>
                                )
                            })
                        }

                    </div>
                    <Timeline items={items} />
                </>
                :
                <div className="chevron-up" onClick={() => setOpened(!opened)}>
                    <svg width="19" height="15" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7207 7.37598L6.9935 1.62402L1.2663 7.37598" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </div>
            }
        </>
    )
}

const Timeline = ({ items }: { items: any }) => {
    return (
        <div className='d-flex'>
            <div>
                {
                    items.map((item: any, i: number) => {
                        return (
                            <div key={i} className='d-flex'>
                                <div className='timeline-dot' />
                                <div className='timeline-line' />
                            </div>
                        )
                    })
                }
            </div>
            <CardComponent />
        </div>
    )
}

const CardComponent = () => {
    return (
        <div className="card">
            <div className="card-header">

                Flight to Bangkok

            </div>
            <div className="card-body">
                <div className="card-info">
                    <div>
                        <b>New York</b>
                        <b>10:45 AM</b>
                    </div>
                    <div>
                        <progress value="50" max="100"></progress>
                        <span>5hr 30mins</span>
                    </div>
                    <div>
                        <b>Bangkok</b>
                        <b>14:45 PM</b>
                    </div>
                </div>
                <Button variant="contained" className="card-button">Book Flight</Button>
            </div>
        </div>
    );
};