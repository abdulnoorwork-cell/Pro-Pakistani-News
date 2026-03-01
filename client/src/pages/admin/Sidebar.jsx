import React from 'react'
import { NavLink } from 'react-router-dom'
import home_icon from '../../assets/home_icon.svg'
import add_icon from '../../assets/add_icon.svg'
import list_icon from '../../assets/list_icon.svg'

const Sidebar = () => {
    return (
        <div className='flex flex-col border-r text-[#3e484e] border-gray-200 min-h-full pt-6 text-[15px]'>
            <NavLink end={true} to={'/admin'} className={({ isActive }) => `flex items-start gap-3 py-3.5 px-3 sm:px-6 lg:px-9 xl:min-w-60 lg:min-w-52 md:min-w-48 cursor-pointer ${isActive && 'bg-[#f6f9fa] border-r-4 border-[#249991]'}`}>
                <img src={home_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block sm:text-sm text-xs' style={{ fontFamily: 'Poppins' }}>Dashboard</p>
            </NavLink>
            <NavLink end={true} to={'/admin/addblog'} className={({ isActive }) => `flex items-start gap-3 py-3.5 px-3 sm:px-6 lg:px-9 xl:min-w-60 lg:min-w-52 md:min-w-48 cursor-pointer ${isActive && 'bg-[#f6f9fa] border-r-4 border-[#249991]'}`}>
                <img src={add_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block sm:text-sm text-xs' style={{ fontFamily: 'Poppins' }}>Add News</p>
            </NavLink>
            <NavLink end={true} to={'/admin/listblog'} className={({ isActive }) => `flex items-start gap-3 py-3.5 px-3 sm:px-6 lg:px-9 xl:min-w-60 lg:min-w-52 md:min-w-48 cursor-pointer ${isActive && 'bg-[#f6f9fa] border-r-4 border-[#249991]'}`}>
                <img src={list_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block sm:text-sm text-xs' style={{ fontFamily: 'Poppins' }}>My News</p>
            </NavLink>
            <NavLink end={true} to={'/'} className={({ isActive }) => `flex items-start gap-3 py-3.5 px-3 sm:px-6 lg:px-9 xl:min-w-60 lg:min-w-52 md:min-w-48 cursor-pointer ${isActive && 'bg-[#f6f9fa] border-r-4 border-[#249991]'}`}>
                <img src={home_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block sm:text-sm text-xs' style={{ fontFamily: 'Poppins' }}>Home</p>
            </NavLink>
        </div>
    )
}

export default Sidebar