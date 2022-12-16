import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className='load'>
        <figure>
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
    </div>
  )
}

export default Loader