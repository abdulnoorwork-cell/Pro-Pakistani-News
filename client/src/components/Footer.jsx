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
    <div className='bg-[#292d30] pt-[65px] pb-[30px] text-[#798186]'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 items-center sm:gap-6'>
          <div>
            <img src={footer_logo} alt="logo" />
          </div>
          <div>
            <img src={footer_light_logo} alt="logo" />
            <p className='text-[12.8px] mt-5'>ProPakistani is the premier and most trustworthy resource for all happenings in technology, telecom, business, sports, auto, education, real estate and entertainment news in Pakistan. <br /><br /> Whether it's the top trending news, inside scoops or features, interviews, market trends and analysis, product reviews, How to's or tutorials – we cover it all.</p>
          </div>
          <div>
            <h3 className='text-white mb-5 mt-[30px] sm:text-[28px] text-2xl font-medium leading-[33px]'>Follow Us</h3>
            <div className='flex items-center text-white'>
              <input type="email" placeholder='Enter your email' className='bg-[#393f43] outline-none px-5 h-[50px] w-[calc(70%-4px)]' />
              <button type='submit' className='h-[50px] bg-[#51585d] px-2.5 cursor-pointer w-[calc(30%+4px)] hover:scale-105 transition-all duration-100'>Subscribe</button>
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
          <p className='text-xs'>Telecom News
            Business News
            Education News
            ProSports
            Carbase
            ProPrice
            Samsung Price in Pakistan
            iPhone Price in Pakistan
            OPPO Price in Pakistan
            Infinix Price in Pakistan
            Tecno Price in Pakistan
            Xiaomi Price in Pakistan
            Vivo Price in Pakistan
            Zong Call Packages
            Zong SMS Packages
            Zong Internet 3G / 4G Packages
            Jazz Call Packages
            Jazz SMS Packages
            Jazz Internet 3G / 4G Packages
            Telenor Call Packages
            Telenor SMS Packages
            Telenor Internet 3G / 4G Packages
            Ufone Call Packages
            Ufone SMS Packages
            Ufone Internet 3G / 4G Packages
            Celebrities
            How To
            Prayer Timings
            Live Streaming Today
            Budget 2025-26
            Ramadan Calendar 2026
            EduNation</p>
            <ul className='text-[13px] mt-5'>
              <Link>About</Link> - <Link>Contact</Link> - <Link>Privacy Policy</Link> - <Link>Careers</Link>
            </ul>
            <p className='mt-4 text-[12.8px]'>© 2026 ProPakistani.PK - All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer