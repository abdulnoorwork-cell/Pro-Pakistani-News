import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";
import { AppContext } from '../context/AppContext';
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activePage, setActivePage] = useState('Home')
  const [sticky, setSticky] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const { navigate, token, userRole } = useContext(AppContext)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  })

  const logout = () => {
    localStorage.removeItem('User')
    toast.success('Logout Successfully')
    setTimeout(() => {
      window.location.reload()
      navigate('/login')
    }, 1000)
  }

  return (
    <>
      <div className='bg-white xl:block hidden'>
        <div className='container mx-auto px-4 flex items-center text-gray-500'>
          <Link className='py-2.5 px-2.5' style={{ fontFamily: 'Afacad' }}>How To</Link>
          <Link className='py-2.5 px-2.5' style={{ fontFamily: 'Afacad' }}>Tools</Link>
          <Link className='py-2.5 px-2.5' style={{ fontFamily: 'Afacad' }}>Careers</Link>
          <Link className='py-2.5 px-2.5' style={{ fontFamily: 'Afacad' }}>About</Link>
          <Link to={'/contact'} className='py-2.5 pl-2.5' style={{ fontFamily: 'Afacad' }}>Contact</Link>
          {!token ? <Link to={'/signin'} className='py-2.5 pl-2.5' style={{ fontFamily: 'Afacad' }}>Login</Link> : <Link to={'/my-account'} className='py-2.5 pl-2.5' style={{ fontFamily: 'Afacad' }}>My Profile</Link>}
        </div>
      </div>
      <header className={`transition-all ease-in-out duration-300 z-30 ${sticky ? 'sticky top-0 border-b border-[#f6f9fa] bg-[#f6f9faf1]' : 'border-none bg-[#f6f9fa]'}`} style={{ transition: 'sticky' }}>
        <nav className="container mx-auto px-4 py-2 relative flex items-center gap-2 justify-between">
          <div className='flex items-center gap-4'>
            <span onClick={() => setMobileMenu(true)} className='xl:hidden block text-2xl text-gray-500 cursor-pointer'>
              <RiMenu2Fill />
            </span>
            {/* <div onClick={() => { navigate('/'); scrollTo(0, 0) }} className='bg-[#0088cb] py-3.5 px-5 cursor-pointer'>
            </div> */}
            <Link to={'/'}>
              <h1 className='logo text-[24px] uppercase font-extrabold leading-none' style={{ fontFamily: 'Outfit' }}>Insightful <span className='text-[#6367FF]' style={{ fontFamily: 'Outfit' }}>News</span></h1>
            </Link>
          </div>
          <ul className='relative hidden xl:flex items-center text-[#4e5c64] uppercase text-sm font-medium text-center'>
            <li onClick={() => { scrollTo(0, 0) }}><NavLink to={'/category/tech'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300">Tech and Telecom</NavLink></li>
            <li onClick={() => { scrollTo(0, 0) }}><NavLink to={'/category/business'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300">Business</NavLink></li>
            <li onClick={() => { scrollTo(0, 0) }}><NavLink to={'/category/carbase'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300">CarBase</NavLink></li>
            <li onClick={() => { scrollTo(0, 0) }}><NavLink to={'/category/sports'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300">ProSports</NavLink></li>
            <li onClick={() => { scrollTo(0, 0) }}><NavLink to={'/category/education'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300">Education</NavLink></li>
            <li onClick={() => { scrollTo(0, 0) }}><NavLink to={'/category/health'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300">Health</NavLink></li>
            <li className='relative'>
              <NavLink to={'/category/world-cup'} className="py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300 flex items-center">T20 WC 2026</NavLink>
              <small className='bg-red-500 text-white text-[9px] absolute top-[4%] right-[4%] rounded px-1 py-[1px] font-medium'>New</small>
            </li>
            <li onClick={() => setDropDown(!dropDown)} className='relative text-sm font-medium'><NavLink className='py-[15px] px-2.5 hover:bg-[#ebf0f1] hover:text-[#242a3a] transition-all duration-300 flex items-center gap-1 text-[13px] font-medium'>More <span><IoMdArrowDropdown /></span></NavLink>
              <ul className={`flex flex-col absolute top-[100%] bg-white border border-[rgba(36,42,58,.15)] text-[#4e5c64] min-w-[150px] z-20 text-start transition-all duration-200 text-[13px] font-medium ${dropDown ? 'min-h-full opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                <Link onClick={() => { scrollTo(0, 0) }} to={'/category/pakistan'} className="leading-[24px] py-[12.8px] px-2 hover:bg-[#f6f9fa] transition-all duration-200 text-[13px] font-medium">Pakistan</Link>
                <Link onClick={() => { scrollTo(0, 0) }} to={'/category/international'} className="leading-[24px] py-[12.8px] px-2 hover:bg-[#f6f9fa] transition-all duration-200 text-[13px] font-medium">International</Link>
                <Link onClick={() => { scrollTo(0, 0) }} to={'/category/social'} className="leading-[24px] py-[12.8px] px-2 hover:bg-[#f6f9fa] transition-all duration-200 text-[13px] font-medium">Social</Link>
              </ul>
            </li>
          </ul>
          {/* Mobile Menu */}
          <ul className={`flex xl:hidden flex-col sm:w-[500px] w-[90%] bg-white fixed top-0 left-[-100%] min-h-screen z-50 transition-all font-medium duration-300 ${mobileMenu ? 'left-[0%]' : 'left-[-100%]'}`}>
            <span onClick={() => setMobileMenu(false)} className='text-[#6367FF] cursor-pointer text-2xl mb-4 ml-[10px] mt-1.5'>
              <IoClose />
            </span>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/tech'} className="border-l-[5px] border-[#3498db] pl-[10px]">Tech and Telecom</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/business'} className="border-l-[5px] border-black pl-[10px]">Business</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/carbase'} className="border-l-[5px] border-[#c0392b] pl-[10px]">CarBase</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/sports'} className="border-l-[5px] border-[#249991] pl-[10px]">ProSports</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/education'} className="border-l-[5px] border-[#8e44ad] pl-[10px]">Education</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/health'} className="border-l-[5px] border-[#249991] pl-[10px]">Health</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/social'} className="border-l-[5px] border-[#dd9933] pl-[10px]">Social</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/pakistan'} className="border-l-[5px] border-[#008036] pl-[10px]">Pakistan</NavLink></li>
            <li className='py-[10px] pl-5'><NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/international'} className="border-l-[5px] border-[#249991] pl-[10px]">International</NavLink></li>
            <li className='relative py-[10px] pl-5'>
              <NavLink onClick={() => { scrollTo(0, 0); setMobileMenu(false) }} to={'/category/world-cup'} className="border-l-[5px] border-[#249991] pl-[10px]">T20 WC 2026</NavLink>
              <small className='bg-red-500 text-white text-[9px] absolute bottom-[13px] right-[4%] rounded px-1 py-[1px] font-medium'>New</small>
            </li>
            <hr className='border-t-4 border border-[rgba(36,42,58,.1)] my-4' />
            <li className={`py-[10px] pl-5 ${activePage === 'Home' ? 'bg-[#eff4f5]' : 'bg-none'}`}>
              <NavLink onClick={() => { setActivePage('Home'); setMobileMenu(false) }} to={'/'}>Home</NavLink>
            </li>
            <li className={`py-[10px] pl-5 ${activePage === 'Contact' ? 'bg-[#eff4f5]' : 'bg-none'}`}>
              <NavLink onClick={() => { setActivePage('Contact'); setMobileMenu(false) }} to={'/contact'}>Contact</NavLink>
            </li>
            {!token ? <Link onClick={() => { setActivePage('Login'); setMobileMenu(false); setMobileMenu(false) }} to={'/signin'} className={`py-[10px] pl-5 ${activePage === 'Login' ? 'bg-[#eff4f5]' : 'bg-none'}`}>Login</Link> : <Link onClick={() => { setActivePage('My Profile'); setMobileMenu(false) }} to={'/my-account'} className={`py-[10px] pl-5 ${activePage === 'My Profile' ? 'bg-[#eff4f5]' : 'bg-none'}`}>My Profile</Link>}
          </ul>
          {token ? <button onClick={logout} className='sm:text-sm text-xs font-medium cursor-pointer text-white border-none h-full flex items-center justify-center bg-[#111] px-9 py-2.5 rounded-full'>
            Logout
          </button> : <button onClick={() => { navigate('/signin'); scrollTo(0, 0) }} className='sm:text-sm text-xs font-medium cursor-pointer text-white border-none h-full flex items-center justify-center bg-[#6367FF] px-9 py-2.5 rounded-full'>
            Signin
          </button>}
          {/* Overlay */}
          <div onClick={() => setMobileMenu(false)} className={`fixed top-0 h-screen w-full bg-black/50 z-40 ${mobileMenu ? 'block' : 'hidden'}`}></div>
        </nav>
      </header>
    </>
  )
}

export default Navbar