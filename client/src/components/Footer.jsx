import React from 'react'
import footer_logo from '../assets/footer-logo.png'
import footer_light_logo from '../assets/footer-light-logo.png'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import { BsAndroid2 } from "react-icons/bs";
import { FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#292d30] pt-[45px] pb-[30px] text-[#798186]'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 items-center sm:gap-6'>
          <div>
            <h1 className='text-[26px] uppercase font-extrabold py-2.5' style={{ fontFamily: 'Outfit' }}>Insightful <span className='text-[#6367FF]' style={{ fontFamily: 'Outfit' }}>News</span></h1>
            <p className='text-[12.8px] mt-4'>Insightful News is the premier and most trustworthy resource for all happenings in technology, telecom, business, sports, auto, education, real estate and entertainment news in Pakistan.</p>
          </div>
          <div>
            <p className='text-[12.8px]'>Insightful News is the premier and most trustworthy resource for all happenings in technology, telecom, business, sports, auto, education, real estate and entertainment news in Pakistan. <br /><br /> Whether it's the top trending news, inside scoops or features, interviews, market trends and analysis, product reviews, How to's or tutorials – we cover it all.</p>
          </div>
          <div>
            <h3 className='text-white mb-5 mt-[30px] sm:text-[28px] text-2xl font-medium leading-[33px]'>Follow Us</h3>
            <div className='flex items-center text-white text-sm'>
              <input type="email" placeholder='Enter your email' className='bg-[#393f43] outline-none px-5 h-[50px] w-[calc(70%-4px)]' />
              <button type='submit' className='h-[50px] bg-[#51585d] px-2.5 cursor-pointer w-[calc(30%+4px)] hover:scale-105 transition-all duration-100 font-medium'>Subscribe</button>
            </div>
            <div className='mt-5 mb-[13px] flex items-center gap-3'>
              <span className='text-white bg-[#393f43] sm:text-[25px] text-lg py-1.5 w-[14%] h-[50px] hover:bg-[#4c76be] transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center cursor-pointer'><FaFacebookF /></span>
              <span className='text-white bg-[#393f43] sm:text-[25px] text-lg py-1.5 w-[14%] h-[50px] hover:bg-[#00b8ce] transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center cursor-pointer'><FaTwitter /></span>
              <span className='text-white bg-[#393f43] sm:text-[25px] text-lg py-1.5 w-[14%] h-[50px] hover:bg-[#0077b5] transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center cursor-pointer'><FaLinkedinIn /></span>
              <span className='text-white bg-[#393f43] sm:text-[25px] text-lg py-1.5 w-[14%] h-[50px] hover:bg-[red] transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center cursor-pointer'><TfiYoutube /></span>
              <span className='text-white bg-[#393f43] sm:text-[25px] text-lg py-1.5 w-[14%] h-[50px] hover:bg-[green] transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center cursor-pointer'><BsAndroid2 /></span>
              <span className='text-white bg-[#393f43] sm:text-[25px] text-lg py-1.5 w-[14%] h-[50px] hover:bg-[#50595f] transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center cursor-pointer'><FaApple /></span>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <ul className='text-[13px] mt-5'>
            <Link>About</Link> - <Link>Contact</Link> - <Link>Privacy Policy</Link> - <Link>Careers</Link>
          </ul>
          <p className='mt-4 text-[12.8px]'>© 2026 Insightful News - All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer