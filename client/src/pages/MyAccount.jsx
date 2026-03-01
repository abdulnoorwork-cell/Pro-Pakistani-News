import React, { useEffect, useRef, useState } from 'react'
import { TfiAngleRight } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import { RiHomeLine } from "react-icons/ri";
import { LuCircleUser } from "react-icons/lu";
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import toast from 'react-hot-toast';
import profile from '../assets/profile_image.png';
// import PageBanner from '../components/PageBanner'
import { IoClose } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";

const MyAccount = () => {
    const [label, setLabel] = useState('My details')
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(false);
    const { userData, backendUrl, userId, fetchUser, token, navigate, userRole } = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profile_image, setProfile_Image] = useState('');
    const [previewImage, setPreviewImage] = useState(profile);

    const file = useRef();

    const fetchUserData = async () => {
        if (token) {
            try {
                let response = await axios.get(`${backendUrl}/api/user/user-data/${userId}`, { withCredentials: true })
                console.log(response.data[0])
                if (response.data) {
                    setName(response?.data[0]?.name)
                    setEmail(response?.data[0]?.email);
                    setPhone(response?.data[0]?.phone);
                    setPreviewImage(JSON.parse(response?.data[0]?.profile_image))
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const updateUserHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('profile_image', profile_image || '');
            let response = await axios.put(`${backendUrl}/api/user/update/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (response.data.success) {
                setLoading(false)
                toast.success(response.data.messege);
                setModel(false)
                fetchUser();
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.messege);
        }
    }

    const imageHandler = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            setProfile_Image(file)
            setPreviewImage(fileReader?.result)
        }
    }

    const logout = () => {
        localStorage.removeItem('User')
        toast.success('Logout Successfully')
        setTimeout(() => {
            window.location.reload()
            navigate('/login')
        }, 1000)
    }

    return (
        <div className='min-h-[95vh]'>
            {/* <PageBanner text={'My Account'} /> */}
            <div className='container mx-auto px-3'>
                <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-800 font-medium mt-8 mb-5">
                    <Link to={'/'}>
                        <span className='text-xl'>
                            <RiHomeLine />
                        </span>
                    </Link>
                    <TfiAngleRight />
                    <span className="text-[#249991] font-semibold">My Account</span>
                </div>
                <div className=''>
                    <div className='flex md:flex-row flex-col gap-6'>
                        {/* Sidebar */}
                        <div className='my_account_sidebar md:w-[250px] font-medium text-sm sm:text-[15px] w-full md:flex md:flex-col grid grid-cols-3 gap-2'>
                            <div onClick={() => setLabel('My details')} className={`flex items-center gap-2 px-3 py-2 rounded bg-[#f6f9fa] cursor-pointer`}>
                                <LuCircleUser />
                                <p className='text-gray-600' style={{ fontFamily: 'Urbanist' }}>My details</p>
                            </div>
                            <div onClick={() => setModel(true)} className='flex items-center gap-2 px-3 py-2 rounded cursor-pointer bg-[#f6f9fa]'>
                                <FaRegEdit />
                                <p className='text-gray-600' style={{ fontFamily: 'Urbanist' }}>Edit Profile</p>
                            </div>
                            <div onClick={logout} className='flex items-center gap-2 px-3 py-2 rounded cursor-pointer bg-[#f6f9fa]'>
                                <GrLogout />
                                <p className='text-gray-600' style={{ fontFamily: 'Urbanist' }}>Logout</p>
                            </div>
                        </div>
                        <div className='bg-[#f6f9fa] w-full rounded-lg p-6 sm:p-8'>
                            <p className='text-2xl font-semibold text-gray-800 mb-4'>My details</p>
                            <div className='flex items-center gap-3'>
                                <figure>
                                    <img src={userData?.image ? JSON.parse(userData?.image) : previewImage} className='w-[85px] h-[85px] rounded-full' alt="" />
                                </figure>
                                <p style={{fontFamily:'Lato'}} className='text-gray-800 font-semibold text-2xl'>{userData?.name}</p>
                            </div>
                            <div className='mt-5'>
                                <p style={{fontFamily:'Lato'}} className='text-gray-800 font-medium text-lg'>Email :</p>
                                <h6 className='text-gray-600 text-sm'>{userData?.email}</h6>
                            </div>
                            <div className='mt-5'>
                                <p style={{fontFamily:'Lato'}} className='text-gray-800 font-medium text-lg'>Phone :</p>
                                <h6 className='text-gray-600 text-sm'>{userData?.phone}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`relative ${model ? 'block' : 'hidden'}`}>
                <form onSubmit={updateUserHandler} className='bg-white sm:p-10 p-8 z-50 fixed rounded-lg top-[50%] left-[50%] max-w-[500px] w-[93%] mx-auto h-fit shadow-[0px_4px_40px_0px_rgba(0,0,0,0.06)]' style={{ transform: 'translate(-50%,-50%)' }}>
                    <span onClick={() => setModel(false)} className='absolute top-0 right-0 bg-red-500 text-white text-xl cursor-pointer p-1'><IoClose /></span>
                    <h3 className='text-xl font-semibold'>Update Profile</h3>
                    <div className='text-sm flex flex-col gap-4 mt-5'>
                        <div className='flex flex-col gap-1 text-gray-800 w-full'>
                            <label className='ml-1'>Full Name</label>
                            <input required onChange={(e) => setName(e.target.value)} name='name' value={name} className='border bg-[#f4f7fa] border-gray-300 py-[10px] rounded-[10px] px-3.5 w-full outline-none' type="name" placeholder='Full Name' />
                        </div>
                        <div className='flex flex-col gap-1 text-gray-800 w-full'>
                            <label className='ml-1'>Email Address</label>
                            <input required onChange={(e) => setEmail(e.target.value)} name='email' value={email} className='border bg-[#f4f7fa] border-gray-300 py-[10px] rounded-[10px] px-3.5 w-full outline-none' type="email" placeholder='Email Address' />
                        </div>
                        <div className='flex flex-col gap-1 text-gray-800 w-full'>
                            <label className='ml-1'>Phone</label>
                            <input required onChange={(e) => setPhone(e.target.value)} name='phone' value={phone} className='border bg-[#f4f7fa] border-gray-300 py-[10px] rounded-[10px] px-3.5 w-full outline-none' type="number" placeholder='Phone' />
                        </div>
                        <img src={previewImage} onClick={() => file.current.click()} className='w-[75px] h-[75px] rounded-full cursor-pointer mt-1' alt="profile image" />
                        <input type="file" ref={file} onChange={imageHandler} hidden />
                        <button type='submit' className='bg-[#249991] mt-4 text-white px-8 py-3 cursor-pointer rounded-full' style={{ fontFamily: 'Outfit' }}>{loading ? 'saving...' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
            {/* Overlay */}
            <div onClick={() => setModel(false)} className={`fixed top-0 left-0 right-0 bottom-0 h-screen w-full bg-black/50 z-30 ${model ? 'block' : 'hidden'}`}></div>
        </div>
    )
}

export default MyAccount