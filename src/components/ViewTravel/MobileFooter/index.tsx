import './style.css'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
export default ({ step, data }: { step: any, data: any }) => {
    console.log('MobileFooter', data)

    const steps = {
        'idle': <Step1 />,
        'load': <Step2 />,
        'start': <Step3
            type={step?.model || 'Plane'}
            date='Tuesday March 7, 2023'
            line1={<span><b>Depart</b> at <b> 10:45 AM</b></span>}
            line2={<span>from <b>Barcelona, ES</b></span>}
            toHeading={<b>Flight to New York</b>}
        />
    } as any

    return (
        <div className="mobile-footer">
            <div className='wrapper'>
                <div className="gradient-blur" />
                {/* {
                    steps.hasOwnProperty(step?.state) ? steps[step?.state] : null
                } */}
                <Step2 />
            </div>
        </div>
    )
}