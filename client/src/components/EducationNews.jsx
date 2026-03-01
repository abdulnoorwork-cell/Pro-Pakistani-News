import React, { useContext } from 'react'
import NewsCard from './NewsCard'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const EducationNews = () => {
    const {blogs} = useContext(AppContext);
    return (
        <div className='container mx-auto px-4 mt-10 pb-2.5'>
            <h5 className='py-[7px] pl-3.5 mb-2 text-xl font-extrabold leading-[24px] text-[#8e44ad] border-l-8 uppercase'>Education</h5>
            <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[15px]'>
                {blogs?.filter(blog => blog.category === "Education").slice(length - 4).reverse().map((blog,index)=>(
                    <NewsCard key={index} blog={blog} />
                ))}
            </div>
            <div>
                <Link onClick={()=>{scrollTo(0,0)}} to={'/category/education'} className='uppercase mb-3.5 text-[#8e44ad] font-semibold leading-none py-1.5 flex items-center gap-2 text-sm'>Read More <span><FaLongArrowAltRight /></span></Link>
            </div>
        </div>
    )
}

export default EducationNews