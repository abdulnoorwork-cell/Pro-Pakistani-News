import React, { useContext } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const ThreeCategorySection = () => {
    const { blogs,navigate } = useContext(AppContext);
    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-[15px]'>
                    <div className='pb-3 max-w-[380px] mx-auto'>
                        <div className='flex items-center justify-between'>
                            <h5 className='py-[7px] pl-3.5 mb-2 md:text-xl sm:text-lg font-extrabold leading-[24px] text-[#c0392b] border-l-8 uppercase'>Auto</h5>
                            <Link onClick={() => { scrollTo(0, 0) }} to={'/category/carbase'} className='uppercase text-[#c0392b] font-semibold leading-none py-1.5 px-3 flex items-center gap-2 text-sm'>Read More <span><FaLongArrowAltRight /></span></Link>
                        </div>
                        {blogs?.filter(blog => blog.category === "CarBase").slice(0, 1).map((blog, index) => {
                            return <div key={index}>
                                <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group relative md:h-[230px] sm:h-[200px] h-[160px] overflow-hidden'>
                                    <img src={blog?.image} className='cursor-pointer absolute top-0 bottom-0 left-0 right-0 w-full h-full group-hover:scale-110 duration-400' alt="" />
                                </figure>
                                <h4 onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black sm:text-[17.6px] text-[#242a3a] mt-[15px] hover:text-[#585c68] transition-all duration-200 cursor-pointer leading-[26px]'>{blog?.title}</h4>
                            </div>
                        })}
                    </div>
                    <div className='pb-3 max-w-[380px] mx-auto'>
                        <div className='flex items-center justify-between'>
                            <h5 className='py-[7px] pl-3.5 mb-2 md:text-xl sm:text-lg font-extrabold leading-[24px] text-[#000000] border-l-8 uppercase'>Business</h5>
                            <Link onClick={() => { scrollTo(0, 0) }} to={'/category/business'} className='uppercase text-[#000000] font-semibold leading-none py-1.5 px-3 flex items-center gap-2 text-sm'>Read More <span><FaLongArrowAltRight /></span></Link>
                        </div>
                        {blogs?.filter(blog => blog.category === "Business").slice(0, 1).map((blog, index) => {
                            return <div key={index}>
                                <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group relative md:h-[230px] sm:h-[200px] h-[160px] overflow-hidden'>
                                    <img src={blog?.image} className='cursor-pointer absolute top-0 bottom-0 left-0 right-0 w-full h-full group-hover:scale-110 duration-400' alt="" />
                                </figure>
                                <h4 onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black sm:text-[17.6px] text-[#242a3a] mt-[15px] hover:text-[#585c68] transition-all duration-200 cursor-pointer leading-[26px]'>{blog?.title}</h4>
                            </div>
                        })}
                    </div>
                    <div className='pb-3 max-w-[380px] mx-auto'>
                        <div className='flex items-center justify-between'>
                            <h5 className='py-[7px] pl-3.5 mb-2 md:text-xl sm:text-lg font-extrabold leading-[24px] text-[#2fc45b] border-l-8 uppercase'>Sports</h5>
                            <Link onClick={() => { scrollTo(0, 0) }} to={'/category/sports'} className='uppercase text-[#2fc45b] font-semibold leading-none py-1.5 px-3 flex items-center gap-2 text-sm'>Read More <span><FaLongArrowAltRight /></span></Link>
                        </div>
                        {blogs?.filter(blog => blog.category === "ProSports").slice(0, 1).map((blog, index) => {
                            return <div key={index}>
                                <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group relative md:h-[230px] sm:h-[200px] h-[160px] overflow-hidden'>
                                    <img src={blog?.image} className='cursor-pointer absolute top-0 bottom-0 left-0 right-0 w-full h-full group-hover:scale-110 duration-400' alt="" />
                                </figure>
                                <h4 onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black sm:text-[17.6px] text-[#242a3a] mt-[15px] hover:text-[#585c68] transition-all duration-200 cursor-pointer leading-[26px]'>{blog?.title}</h4>
                            </div>
                        })}
                    </div>
                </div>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-[15px]'>
                    {/* Carbase */}
                    <div>
                        {blogs?.filter(blog => blog.category === "CarBase").slice(length - 4).reverse().map((blog, index) => (
                            <div key={index} className='flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                                <img onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} src={blog?.image} className='sm:w-[140px] w-[130px] sm:h-[80px] h-[70px] duration-300 hover:brightness-125 cursor-pointer' alt="" />
                                <span onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[15px] cursor-pointer leading-[22.5px] sm:w-[calc(100%-170px)] w-full hover:text-[#585c68]'>{blog?.title}</span>
                            </div>
                        ))}
                    </div>
                    {/* Business */}
                    <div>
                        {blogs?.filter(blog => blog.category === "Business").slice(length - 4).reverse().map((blog, index) => (
                            <div key={index} className='flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                                <img onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} src={blog?.image} className='sm:w-[140px] w-[130px] sm:h-[80px] h-[70px] duration-300 hover:brightness-125 cursor-pointer' alt="" />
                                <span onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[15px] cursor-pointer leading-[22.5px] sm:w-[calc(100%-170px)] w-full hover:text-[#585c68]'>{blog?.title}</span>
                            </div>
                        ))}
                    </div>
                    {/* Sports */}
                    <div>
                        {blogs?.filter(blog => blog.category === "ProSports").slice(length - 4).reverse().map((blog, index) => (
                            <div key={index} className='flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                                <img onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} src={blog?.image} className='sm:w-[140px] w-[130px] sm:h-[80px] h-[70px] duration-300 hover:brightness-125 cursor-pointer' alt="" />
                                <span onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[15px] cursor-pointer leading-[22.5px] sm:w-[calc(100%-170px)] w-full hover:text-[#585c68]'>{blog?.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThreeCategorySection