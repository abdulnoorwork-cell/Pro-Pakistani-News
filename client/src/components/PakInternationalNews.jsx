import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Heading from './Heading';
import loading_animation from '../../public/loading_animation.svg'

const PakInternationalNews = () => {
  const { blogs,navigate,loading } = useContext(AppContext);
  return (
    <div className='bg-[#eee] py-7 mb-6'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Pakistan News */}
          <div className='w-full'>
            <Heading text={"Pakistan"} boldtext={"News"} />
            <div>
              {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> : blogs?.filter(blog => blog.category === "Pakistan").slice(length - 3).reverse().map((blog, index) => (
                <div key={index} className='pak flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                  <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group md:w-[150px] sm:w-[130px] w-[120px] md:h-[80px] h-[70px]'>
                    <img src={blog?.image} className='w-full h-full group-hover:brightness-110 duration-300 cursor-pointer' alt="" />
                  </figure>
                  <h3 onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[17.6px] cursor-pointer leading-[22px] max-w-[300px] hover:text-[#585c68]'>{blog?.title}</h3>
                </div>
              ))}
            </div>
          </div>
          {/* International News */}
          <div className='w-full'>
            <Heading text={"International"} boldtext={"News"} />
            <div>
              {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> : blogs?.filter(blog => blog.category === "International").slice(length - 3).reverse().map((blog, index) => (
                <div key={index} className='international flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                  <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group md:w-[150px] sm:w-[130px] w-[120px] md:h-[80px] h-[70px]'>
                    <img src={blog?.image} className='w-full h-full group-hover:brightness-110 duration-300 cursor-pointer' alt="" />
                  </figure>
                  <h3 onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[17.6px] cursor-pointer leading-[22px] max-w-[300px] hover:text-[#585c68]'>{blog?.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PakInternationalNews