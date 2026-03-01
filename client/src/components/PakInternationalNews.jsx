import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const PakInternationalNews = () => {
  const { blogs,navigate } = useContext(AppContext);
  return (
    <div className='bg-[#eee] py-6 mb-6'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Pakistan News */}
          <div className='w-full'>
            <h5 className='py-[7px] pl-3.5 mb-2 sm:text-xl text-lg font-extrabold leading-[24px] text-[#008036] border-l-8 uppercase'>Pakistan</h5>
            <div>
              {blogs?.filter(blog => blog.category === "Pakistan").slice(length - 3).reverse().map((blog, index) => (
                <div key={index} className='pak flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                  <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group md:w-[150px] sm:w-[130px] w-[120px] md:h-[80px] h-[70px]'>
                    <img src={blog?.image} className='w-full h-full group-hover:brightness-110 duration-300 cursor-pointer' alt="" />
                  </figure>
                  <span onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[15px] cursor-pointer leading-[22.5px] w-[calc(100%-170px)] hover:text-[#585c68]'>{blog?.title}</span>
                </div>
              ))}
            </div>
          </div>
          {/* International News */}
          <div className='w-full'>
            <h5 className='py-[7px] pl-3.5 mb-2 sm:text-xl text-lg font-extrabold leading-[24px] text-[#002d62] border-l-8 uppercase'>International</h5>
            <div>
              {blogs?.filter(blog => blog.category === "International").slice(length - 3).reverse().map((blog, index) => (
                <div key={index} className='international flex items-center border-t border-[#dbdbdb] py-3 gap-2'>
                  <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='group md:w-[150px] sm:w-[130px] w-[120px] md:h-[80px] h-[70px]'>
                    <img src={blog?.image} className='w-full h-full group-hover:brightness-110 duration-300 cursor-pointer' alt="" />
                  </figure>
                  <span onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='font-black text-[#242a3a] text-[15px] cursor-pointer leading-[22.5px] w-[calc(100%-170px)] hover:text-[#585c68]'>{blog?.title}</span>
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