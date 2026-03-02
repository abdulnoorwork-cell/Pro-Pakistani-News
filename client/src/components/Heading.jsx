import React from 'react'

const Heading = ({text,boldtext}) => {
  return (
    <h5 className='py-[7px] mb-2 text-xl font-extrabold leading-[24px] uppercase text-[#6367ff]' style={{fontFamily: 'Outfit'}}>{text} <span className='text-black' style={{fontFamily:'Outfit'}}>{boldtext}</span></h5>
  )
}

export default Heading