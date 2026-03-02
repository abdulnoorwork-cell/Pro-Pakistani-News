import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import toast from 'react-hot-toast'
import logo from '../../assets/logo.png'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Layout = () => {
  const { navigate } = useContext(AppContext);
  const logout = () => {
    localStorage.removeItem('User');
    toast.success('Logout Successfully')
    setTimeout(() => {
      navigate('/')
      window.location.reload()
    }, 1000)
  }
  return (
    <>
      <div className='flex items-center bg-white justify-between py-2 px-4 sm:px-12 border-b border-gray-200 gap-3'>
        <Link to={'/admin'}>
          <h1 className='text-[26px] font-extrabold py-2.5 text-[#6367FF]' style={{ fontFamily: 'Outfit' }}>Dashboard</h1>
        </Link>
        <button onClick={logout} className='sm:text-sm text-xs tracking-tight px-9 py-2.5 bg-[#242a3a] text-white rounded-full cursor-pointer' style={{ fontFamily: 'Poppins' }}>Logout</button>
      </div>
      <div className='flex min-h-[95vh]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout