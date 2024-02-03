import { useState } from 'react'
import { IconChevron } from '../Step2'
import './style.css'

export default ({ type, line1, line2, toHeading, date }: { type: 'Plane' | 'Car', line1: string | any, line2: string | any, toHeading: string | any, date: string }) => {
    const [opened, setOpened] = useState(false)
    return (
        <div className='d-flex flex-column my-4'>
            <div className='d-flex pb-3'>
                {!opened && <><div className='d-flex justify-content-center align-items-center'>
                    <div className='planeIconWrapper'>
                        {
                            type == 'Plane' ? <PlaneIcon /> : <VehicleIcon />
                        }

                    </div>
                    <div className='d-flex flex-column ps-3' >
                        <span className='toHeading'>{toHeading}</span>
                        <span className='dateHeading'>{date}</span>
                    </div>

                </div>

                    <div className="flex-grow-1" /></>}


                <IconChevron currentdate='2023-03-07' opened={opened} setOpened={setOpened} />

            </div>
            <div className='d-flex'>

                <div className='daydate'>
                    {line1}
                    {line2}
                </div>
            </div>
        </div>
    )
}

const PlaneIcon = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_583)">
                <path d="M16.9873 16.3655L16.1806 17.1118C16.0995 17.1868 16.001 17.2402 15.8939 17.2672C15.7868 17.2943 15.6747 17.294 15.5677 17.2665C15.4608 17.239 15.3624 17.1852 15.2817 17.1098C15.2009 17.0345 15.1403 16.9402 15.1055 16.8354L13.0709 10.7173L10.0774 13.3657L10.2067 15.6515C10.2399 16.0966 10.1829 16.3614 9.76771 16.7455L9.22464 17.2479C9.14122 17.3302 9.03918 17.3912 8.92718 17.4256C8.81518 17.4601 8.69651 17.4671 8.58123 17.446C8.41911 17.4155 8.19568 17.3162 8.04723 17.0171L6.65736 14.3098C6.64705 14.2895 6.63765 14.2684 6.62913 14.2471C6.62804 14.2453 6.62661 14.2437 6.62492 14.2425C6.6041 14.2326 6.58385 14.2214 6.56429 14.2092L3.95991 12.6001C3.6814 12.4298 3.60347 12.2027 3.58724 12.0416C3.57631 11.9335 3.59092 11.8243 3.62988 11.7228C3.66883 11.6213 3.73106 11.5304 3.81155 11.4573L4.38493 10.9269C4.69495 10.6401 5.12456 10.5008 5.50928 10.5616L7.73581 10.8668L10.6447 8.09474L4.71086 5.59801C4.60909 5.55518 4.51969 5.48752 4.45082 5.40122C4.38195 5.31493 4.33581 5.21274 4.31662 5.10401C4.29743 4.99529 4.3058 4.88348 4.34096 4.77882C4.37613 4.67416 4.43697 4.57998 4.51792 4.5049L5.33342 3.75047C5.44931 3.6475 5.58691 3.57197 5.73599 3.52947C5.88507 3.48697 6.04181 3.4786 6.19457 3.50498L14.2456 4.60553L15.9537 2.93986C16.0754 2.8143 16.4284 2.4833 16.5105 2.40733C18.186 0.859003 19.689 0.47751 20.5318 1.38848C20.797 1.67517 21.1742 2.31269 20.7206 3.35991C20.4532 3.97849 19.9432 4.63817 19.2049 5.32111C19.1237 5.39625 18.7672 5.72156 18.6308 5.83486L16.8372 7.40751L17.2995 15.5284C17.3135 15.6824 17.2927 15.8376 17.2387 15.9825C17.1847 16.1274 17.0988 16.2583 16.9873 16.3655Z" fill="url(#paint0_linear_1_583)" />
            </g>
            <defs>
                <filter id="filter0_d_1_583" x="0.117769" y="0.901276" width="24.2803" height="23.4886" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="3.46597" />
                    <feGaussianBlur stdDeviation="1.73299" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_583" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_583" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_1_583" x1="12.055" y1="11.1875" x2="13.2256" y2="-0.0266809" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ED6934" />
                    <stop offset="1" stop-color="#FFD268" />
                </linearGradient>
            </defs>
        </svg>


    )
}

const VehicleIcon = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_48_13)">
                <path d="M2.82236 3.32237C2.99754 3.0304 3.28951 2.85522 3.58148 2.79683C5.21649 2.56326 7.37705 1.22021 8.36974 0.986635C10.5303 0.461094 14.9609 -0.473201 17.0046 0.285914C19.3578 1.62896 20.1753 2.56326 20.7592 2.79683C22.8614 3.0304 24.73 3.43916 26.4234 3.9647C26.657 4.08148 26.8321 4.19827 27.0073 4.37345C27.8248 5.24935 28.1168 6.30043 28 7.5267C27.8832 8.4026 27.1241 9.04492 26.2482 9.04492C26.365 8.69456 26.4234 8.3442 26.4234 7.99384C26.4234 6.00847 24.7884 4.37345 22.803 4.37345C20.8176 4.37345 19.1826 6.00847 19.1826 7.99384C19.1826 8.3442 19.241 8.75296 19.3578 9.04492H10.9974C11.1142 8.69456 11.1726 8.3442 11.1726 7.99384C11.1726 6.00847 9.5376 4.37345 7.55223 4.37345C5.56685 4.37345 3.93184 6.00847 3.93184 7.99384C3.93184 8.3442 3.99023 8.63617 4.04862 8.92814C3.63987 8.81135 3.17272 8.69456 2.64718 8.4026C2.35522 8.22742 2.18003 7.93545 2.12164 7.58509C1.82967 6.12525 2.06325 4.66542 2.82236 3.32237ZM14.5 3.0304L18.5987 3.20558L19.0074 3.0888C18.0147 2.44647 16.9053 1.92093 15.6206 1.39539C15.5622 1.39539 15.5038 1.33699 15.4454 1.33699C14.8031 1.22021 15.2007 1.22021 14.5 1.22021V3.0304ZM9.18724 2.79683L14 2.97201V1.2786C12.365 1.337 10.8223 1.62896 8.83688 2.09611L9.18724 2.79683Z" fill="url(#paint0_linear_48_13)" />
                <path d="M25.4049 7.99999C25.4049 6.65695 24.2954 5.54747 22.9524 5.54747C21.6093 5.54747 20.4999 6.65695 20.4999 7.99999C20.4999 9.34304 21.6093 10.4525 22.9524 10.4525C24.2954 10.4525 25.4049 9.34304 25.4049 7.99999Z" fill="url(#paint1_linear_48_13)" />
                <path d="M4.99999 7.99384C4.99999 9.33689 6.10946 10.4464 7.45251 10.4464C8.79556 10.4464 9.90503 9.33689 9.90503 7.99384C9.90503 6.6508 8.79556 5.54132 7.45251 5.54132C6.10946 5.54132 4.99999 6.6508 4.99999 7.99384Z" fill="url(#paint2_linear_48_13)" />
            </g>
            <defs>
                <filter id="filter0_d_48_13" x="0.333668" y="0" width="29.3573" height="13.7852" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1.66633" />
                    <feGaussianBlur stdDeviation="0.833166" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_48_13" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_48_13" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_48_13" x1="18.9113" y1="5.27908" x2="15.508" y2="-2.16847" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ED6934" />
                    <stop offset="1" stop-color="#FFD268" />
                </linearGradient>
                <linearGradient id="paint1_linear_48_13" x1="23.6873" y1="8.4103" x2="21.3348" y2="6.62115" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ED6934" />
                    <stop offset="1" stop-color="#FFD268" />
                </linearGradient>
                <linearGradient id="paint2_linear_48_13" x1="8.18738" y1="8.40415" x2="5.83496" y2="6.615" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ED6934" />
                    <stop offset="1" stop-color="#FFD268" />
                </linearGradient>
            </defs>
        </svg>

    )
}