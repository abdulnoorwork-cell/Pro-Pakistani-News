import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const NewsCard = ({blog}) => {
    const {navigate} = useContext(AppContext);
    return (
        <div className='news_card group mb-[15px]'>
            <figure onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='relative lg:h-[170px] h-[140px] cursor-pointer overflow-hidden'>
                <img src={blog?.image} className='w-full h-full absolute top-0 bottom-0 left-0 right-0 group-hover:scale-110 duration-400' alt="blog_image" />
            </figure>
            <div className='mt-2'>
                <p className='text-[#17a2b8] font-bold text-[12.8px] leading-[19.2px]'>{new Date(blog?.created_At).toDateString()}</p>
            </div>
            <h6 onClick={()=>{navigate(`/blog/blog-detail/${blog?._id}`);scrollTo(0,0)}} className='w-full font-black cursor-pointer text-[#242a3a] py-[7.5px] leading-[1.2em] text-sm lg:text-base'>{blog?.title}</h6>
        </div>
    )
}

export default NewsCard