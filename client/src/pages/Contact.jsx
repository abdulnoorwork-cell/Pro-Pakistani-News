import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Contact = () => {
  return (
    <>
      <div className='border-b border-[#e0e0e0] mb-10'>
        <div className="container mx-auto px-4 py-2">
          <span className='text-[#249991] font-medium leading-[24px]' style={{ fontFamily: 'Lato' }}>Contact Us</span>
        </div>
      </div>
      <div className='bg-[#249991] py-12'>
        <div className="container px-4 mx-auto">
          <h2 className='text-[25px] font-semibold text-white text-center py-4'>SAY HELLO!</h2>
          <h6 className='leading-[24px] lg:text-lg text-white py-5' style={{fontFamily: 'Andada Pro'}}>Be informed that each email is received, read and taken very seriously. However, due to huge amount of emails, we may reply only those emails that require response from ProPakistani.</h6>
          <h6 className='leading-[24px] lg:text-lg text-white pb-5' style={{fontFamily: 'Andada Pro'}}>You can also email us at hello@propakistani.pk</h6>
          <ul className='flex items-center gap-2.5 mb-4 mt-2'>
            <li className='lg:py-4 py-3 lg:px-[17px] px-[14px] cursor-pointer text-[#83939d] bg-[#f5f7fa] w-fit lg:text-[25px] text-[20px]'><FaFacebookF /></li>
            <li className='lg:py-4 py-3 lg:px-[17px] px-[14px] cursor-pointer text-[#83939d] bg-[#f5f7fa] w-fit lg:text-[25px] text-[20px]'><FaTwitter /></li>
            <li className='lg:py-4 py-3 lg:px-[17px] px-[14px] cursor-pointer text-[#83939d] bg-[#f5f7fa] w-fit lg:text-[25px] text-[20px]'><IoMdMail /></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact