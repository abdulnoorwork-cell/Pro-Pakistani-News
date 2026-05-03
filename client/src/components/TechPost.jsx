import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import Heading from './Heading';
import loading_animation from '../../public/loading_animation.svg'

const TechPost = () => {
    const { blogs,navigate,loading } = useContext(AppContext);
    return (
        <div className='bg-[rgba(28,28,28,1)] py-6 mb-[24px]'>
            <div className="container mx-auto px-4">
                <Heading text="Tech and Telecom" />
                <div className='text-white flex flex-col lg:flex-row gap-8'>
                    {loading ? <div className='w-full'><img src={loading_animation} className='mx-auto' alt="loader" /></div> : blogs?.filter(blog => blog.category === "Tech and Telecom").slice(length - 1).reverse().map((blog, index) => (
                        <div onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} key={index} className='group relative overflow-hidden lg:w-[33%] max-w-[430px] h-[360px] cursor-pointer'>
                            <img src={blog?.image} className='h-full w-full absolute top-0 bottom-0 left-0 right-0 group-hover:scale-110 duration-500' alt="" />
                            <div className='w-full min-h-11 absolute left-0 right-auto bottom-0 px-5 py-[17px]' style={{ backgroundImage: 'linear-gradient(360deg, #000 0, rgba(0, 0, 0, .48) 68%, rgba(0, 0, 0, .03) 100%)' }}>
                                <h3 className='font-bold letter tracking-tight text-2xl leading-[1.2em]'>{blog?.title}</h3>
                            </div>
                        </div>
                    ))}
                    <div className='grid md:grid-cols-2 gap-3 lg:w-[67%] w-full text-[#f0f0f0]'>
                        {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> : blogs?.filter(blog => blog.category === "Tech and Telecom").slice(length - 6).reverse().map((blog, index) => (
                            <div onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} key={index} className='group cursor-pointer flex items-center gap-2 pb-3 border-b border-[rgb(36,42,58)] h-fit'>
                                <figure className='relative overflow-hidden xl:h-[88px] h-[80px] xl:w-[150px] w-[130px]'>
                                    <img src={blog?.image} className='w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0 group-hover:scale-110 duration-400' alt="" />
                                </figure>
                                <h6 className='font-extrabold leading-[22px] sm:text-[17.6px] sm:w-[calc(100%-170px)] w-full'>{blog?.title}</h6>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Link to={'/category/tech'} onClick={()=>{scrollTo(0,0)}} className='uppercase text-[#3498db] leading-none py-1.5 flex items-center gap-2'>Read More <span><FaLongArrowAltRight /></span></Link>
                </div>
            </div>
        </div>
    )
}

export default TechPost