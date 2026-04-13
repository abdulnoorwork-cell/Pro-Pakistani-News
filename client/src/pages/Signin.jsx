import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import profile from '../assets/profile_image.png'

const Signin = () => {
  const [loginModel, setLoginModel] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const [signupModel, setSignupModel] = useState();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role,setRole]=useState('');
  const [profile_image, setProfile_Image] = useState();
  const [previewImage, setPreviewImage] = useState(profile);

  const { backendUrl, navigate } = useContext(AppContext)

  const file = useRef();
  const imageHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfile_Image(file)
      setPreviewImage(reader.result)
    }
  }

  const onSignupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('role',role);
      formData.append('profile_image', profile_image || '')
      let response = await axios.post(`${backendUrl}/api/user/signup`, formData, {
        headers: { "Content-Type": 'multipart/form-data' },
        withCredentials: true
      })
      if (response.data.success) {
        setLoading(false)
        toast.success(response.data.messege)
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setRole('');
        setSignupModel(false)
        setLoginModel(true)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.response.data.messege)
      { error.response.data.messege === 'Email already exist' ? toast.error(error.response.data.messege) : null }
      setError(error.response.data)
    }
  }

  const onLoginHandler = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if (response.data.success) {
        localStorage.setItem('User', JSON.stringify(response.data))
        toast.success(response.data.messege)
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/')
          window.location.reload();
        }, 1000)
        setTimeout(()=>{
          localStorage.removeItem('User');
          window.location.reload()
        },response.data.expiresIn * 1000)
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }
  }

  return loginModel ? (
    <div className='min-h-[86vh] h-full content-center justify-center bg-[#6367FF] py-10'>
      <div className='container mx-auto px-3'>
        <form onSubmit={onLoginHandler} className='bg-white rounded-[10px] text-sm p-[40px] max-w-[700px] mx-auto'>
          <h2 className='text-gray-800 text-[26px] font-semibold' style={{ fontFamily: 'Urbanist' }}>Login</h2>
          <div className='my-7 flex flex-col gap-3'>
            <div>
              <p className='text-gray-800 mb-2 text-[13px]' style={{ fontFamily: 'Urbanist' }}>Email Address <span className='text-[#E12E2E]'>*</span></p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#ECF2F7] rounded-[5px] text-[#3D3D3D] placeholder:text-gray-400 py-[13px] px-[16px] text-sm w-full outline-[#6367FF]' placeholder='Email' style={{ fontFamily: 'Urbanist' }} />
              <p className='text-red-600 mt-2 leading-none'>{error === 'Please enter your email' || error === 'No email exist' ? error : null}</p>
            </div>
            <div>
              <p className='text-gray-800 mb-2 text-[13px]'>Password <span className='text-[#E12E2E]' style={{ fontFamily: 'Urbanist' }}>*</span></p>
              <div className='flex items-center justify-between w-full outline-[#6367FF] bg-[#ECF2F7] rounded-[5px] pr-4'>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordShow ? 'text' : 'password'} className=' text-[#3D3D3D] bg-[#ECF2F7] placeholder:text-gray-400 py-[13px] px-[16px] text-sm w-full outline-none' placeholder='Password' style={{ fontFamily: 'Urbanist' }} />
                <div className='cursor-pointer text-gray-800'>{passwordShow ? <span onClick={() => setPasswordShow(false)}><RxEyeOpen /></span> : <span onClick={() => { setPasswordShow(true) }}><GoEyeClosed /></span>}</div>
              </div>
              <p className='text-red-600 mt-2 leading-none'>{error === 'Please enter your password' || error === 'Incorrect Password' ? error : null}</p>
            </div>
            <p onClick={() => navigate('/forgot-password')} className='text-[#6367FF] font-medium cursor-pointer' style={{ fontFamily: 'Urbanist' }}>Forgot Password?</p>
          </div>
          <button type='submit' className='bg-[#6367FF] text-white font-medium cursor-pointer text-sm py-3 px-12 rounded-full w-fit' style={{ fontFamily: 'Urbanist' }}>{loading ? 'loading...' : 'Signin'}</button>
          <p className='text-gray-800 mt-4 font-medium' style={{ fontFamily: 'Urbanist' }}>Don,t have an account? <Link onClick={() => { setSignupModel(true); setLoginModel(false) }} className='text-[#6367FF] font-medium' style={{ fontFamily: 'Urbanist' }}>Signup</Link></p>
        </form>
      </div>
    </div>
  ) : (
    <div className='content-center justify-center min-h-[86vh] h-full bg-[#6367FF] py-10'>
      <div className='container mx-auto px-3'>
        <form onSubmit={onSignupHandler} className='bg-white rounded-[10px] text-sm p-[40px] max-w-[700px] mx-auto'>
          <h2 className='text-gray-800 text-[26px] font-semibold' style={{ fontFamily: 'Urbanist' }}>Signup</h2>
          <div className='my-7 flex flex-col gap-3'>
            <div>
              <p className='text-gray-800 mb-2 text-[13px]' style={{ fontFamily: 'Urbanist' }}>Your FullName <span className='text-[#E12E2E]'>*</span></p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='bg-[#ECF2F7] rounded-[5px] text-[#3D3D3D] placeholder:text-gray-400 py-[13px] px-[16px] text-sm w-full outline-[#6367FF]' placeholder='Name' style={{ fontFamily: 'Urbanist' }} />
              <p className='text-red-600 mt-2 leading-none'>{error === 'Please enter the name' ? error : null}</p>
            </div>
            <div>
              <p className='text-gray-800 mb-2 text-[13px]' style={{ fontFamily: 'Urbanist' }}>Email Address <span className='text-[#E12E2E]'>*</span></p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#ECF2F7] rounded-[5px] text-[#3D3D3D] placeholder:text-gray-400 py-[13px] px-[16px] text-sm w-full outline-[#6367FF]' placeholder='Email' style={{ fontFamily: 'Urbanist' }} />
              <p className='text-red-600 mt-2 leading-none'>{error === 'Please enter the email' ? error : null}</p>
            </div>
            <div>
              <p className='text-gray-800 mb-2 text-[13px]' style={{ fontFamily: 'Urbanist' }}>Password <span className='text-[#E12E2E]'>*</span></p>
              <div className='flex items-center justify-between w-full outline-[#6367FF] bg-[#ECF2F7] rounded-[5px] pr-4'>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordShow ? 'text' : 'password'} className=' text-[#3D3D3D] bg-[#ECF2F7] placeholder:text-gray-400 py-[13px] px-[16px] text-sm w-full outline-none' placeholder='Password' style={{ fontFamily: 'Urbanist' }} />
                <div className='cursor-pointer text-gray-800'>{passwordShow ? <span onClick={() => setPasswordShow(false)}><RxEyeOpen /></span> : <span onClick={() => { setPasswordShow(true) }}><GoEyeClosed /></span>}</div>
              </div>
              <p className='text-red-600 mt-2 leading-none'>{error === 'Please enter the password' || error === 'Password contains 8 characters long' ? error : null}</p>
            </div>
            <div>
              <p className='text-gray-800 mb-2 text-[13px]' style={{ fontFamily: 'Urbanist' }}>Phone (Optional)</p>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className='bg-[#ECF2F7] rounded-[5px] text-[#3D3D3D] placeholder:text-gray-400 py-[13px] px-[16px] text-sm w-full outline-[#6367FF]' placeholder='Phone' style={{ fontFamily: 'Urbanist' }} />
            </div>
            <select onChange={(e)=>setRole(e.target.value)} className='bg-[#ECF2F7] rounded-[5px] text-[#3D3D3D] placeholder:text-gray-400 py-[11px] px-3 text-sm outline-[#6367FF] w-[150px] mt-3' defaultValue={1}>
              <option value="" hidden>Select role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <p className='text-red-600 leading-none'>{error === 'Please select user role' || error === 'Please select user role' ? error : null}</p>
            <div>
              <img src={previewImage} onClick={() => file.current.click()} className='w-20 rounded-full cursor-pointer' alt="profile_image" />
              <input type="file" ref={file} onChange={imageHandler} hidden />
            </div>
          </div>
          <button type='submit' className='bg-[#6367FF] text-white cursor-pointer font-medium text-sm py-3 px-12 rounded-full w-fit' style={{ fontFamily: 'Urbanist' }}>{loading ? 'loading...' : 'Sign Up'}</button>
          <p className='text-gray-800 mt-4 font-medium' style={{ fontFamily: 'Urbanist' }}>Already have an account? <Link onClick={() => { setSignupModel(false); setLoginModel(true) }} className='text-[#1fb6ac] font-medium' style={{ fontFamily: 'Urbanist' }}>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signin