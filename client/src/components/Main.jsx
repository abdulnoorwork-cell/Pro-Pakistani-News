import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import loading_animation from '../../public/loading_animation.svg'

const Main = () => {
    const { blogs,navigate,loading } = useContext(AppContext);
    return (
        <div className='main container mx-auto lg:h-[390px] md:h-[700px] sm:h-[600px] h-[500px] px-4 flex flex-col lg:flex-row items-center mt-[33px] py-[3px] mb-5 gap-[6px] text-white'>
            {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> : blogs?.slice(length - 1).reverse().map((blog, index) => (
                <div onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} key={index} className='main_img group relative lg:w-[50%] md:w-[80%] w-full h-full overflow-hidden cursor-pointer'>
                    <img src={blog?.image} className='h-full w-full absolute left-0 right-0 top-0 bottom-0 group-hover:scale-110 transition-all duration-500' alt="" />
                    <div className='group-hover:translate-y-0 translate-y-3 transition-all duration-500 w-full min-h-11 absolute left-0 bottom-0 px-5 py-[17px]' style={{ backgroundImage: 'linear-gradient(360deg, #000 0, rgba(0, 0, 0, .48) 68%, rgba(0, 0, 0, .03) 100%)' }}>
                        <h3 className='font-bold letter tracking-tight text-2xl leading-[1.2em]'>{blog?.title}</h3>
                        <p className='group-hover:opacity-100 opacity-0 transition-all duration-300 text-xs mt-1.5 text-gray-300 font-medium' style={{ fontFamily: 'Urbanist' }}>{new Date(blog?.created_At).toDateString()}</p>
                    </div>
                </div>
            ))}
            <div className='main_images h-full lg:w-[50%] md:w-[80%] w-full grid grid-cols-2 gap-[6px] overflow-hidden'>
                {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> : blogs?.slice(length - 4).reverse().map((blog, index) => (
                    <div onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} key={index} className='group relative w-full h-full cursor-pointer bg-center bg-no-repeat bg-cover overflow-hidden'>
                        <img src={blog?.image} className='absolute w-full h-full top-0 bottom-0 left-0 right-0 transition-all duration-500 group-hover:scale-110' alt="" />
                        <div className='content w-full group-hover:translate-y-0 translate-y-3 transition-all duration-500 w-full min-h-11 absolute left-0 bottom-0 px-5 py-[17px]' style={{ backgroundImage: 'linear-gradient(360deg, #000 0, rgba(0, 0, 0, .48) 68%, rgba(0, 0, 0, .03) 100%)' }}>
                            <h3 className='font-bold sm:text-lg text-[17px] leading-[1.2em] tracking-tight'>{blog?.title}</h3>
                            <p className='group-hover:opacity-100 opacity-0 transition-all duration-300 text-xs mt-1.5 text-gray-300 font-medium' style={{ fontFamily: 'Urbanist' }}>{new Date(blog?.created_At).toDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main