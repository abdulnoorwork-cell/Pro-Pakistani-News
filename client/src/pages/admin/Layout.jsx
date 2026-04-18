import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import toast from 'react-hot-toast'
import logo from '../../assets/logo.png'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BiLogOut } from "react-icons/bi";

const Layout = () => {
  const { navigate } = useContext(AppContext);
  const logout = () => {
    localStorage.removeItem('User');
    toast.success('Logout Successfully')
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }
  return (
    <>
      <div className='flex items-center justify-between py-2 px-4 sm:px-12 border-b border-[rgba(192,193,196,0.28)] gap-3'>
        <Link to={'/admin'}>
          <h1 className='text-[26px] font-bold py-2.5 text-[#6367FF] tracking-tight' style={{ fontFamily: 'Poppins' }}>Dashboard</h1>
        </Link>
        <button onClick={logout} type='submit' className='sm:text-sm text-xs px-7 w-fit py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full cursor-pointer font-medium flex items-center gap-1' style={{fontFamily:'Poppins'}}><span className='text-lg'><BiLogOut /></span>Logout</button>
      </div>
      <div className='flex min-h-[95vh] bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout