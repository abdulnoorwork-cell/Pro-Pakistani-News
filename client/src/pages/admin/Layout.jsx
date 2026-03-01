import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
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
      <div className='flex items-center justify-between py-2 px-4 sm:px-12 border-b border-gray-200 gap-3'>
        <figure className='bg-[#249991] py-3.5 px-5 cursor-pointer'>
          <img src={logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/admin')} />
        </figure>
        <button onClick={logout} className='sm:text-sm text-xs tracking-tight px-9 py-2.5 bg-orange-500 hover:bg-red-500 transition duration-150 text-white rounded-full cursor-pointer' style={{fontFamily:'Poppins'}}>Logout</button>
      </div>
      <div className='flex min-h-[95vh]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout