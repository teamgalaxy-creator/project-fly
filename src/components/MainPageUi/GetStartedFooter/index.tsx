import React, { useState } from 'react'
import { FaItunesNote, FaPlay } from "react-icons/fa6";
import Button from '@mui/material/Button';
import './style.css'

const GetStartedFooter = () => {
  return (
    <>
      <div className="main">
        <div>
          <h4 style={{ color: '#fff', fontFamily: 'Manrope', fontWeight: 'bolder' }}>Trip to Bangladesh</h4>
          <h6 style={{ color: '#fff', fontFamily: 'Manrope', fontWeight: 'bold' }}>Made with
            <img style={{ width: '10 0px', color: '#fff', filter: 'invert(1)' }} src="/logoVizualTravel.svg" alt="Icon" />
          </h6>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{ color: '#fff', fontFamily: 'Manrope' }}>Jess Trip made by Travelnow Agency</h2>
          <h4 style={{ color: '#fff', fontFamily: 'Manrope' }}>From March 12 to April 15</h4>
          <Button
            style={{
              backgroundColor: '#FE7138', color: '#fff', width: '200px', height: '50px', borderRadius: '8px',
            }}
          // onClick={() => setOpen(true)}
          >
            Get Started
          </Button>
        </div>
        <div className="music-bottom" >
          <FaItunesNote size={25} color='#fff' />
          <FaPlay size={25} color='#fff' />
        </div>
      </div>
    </>
  )
}
export default GetStartedFooter