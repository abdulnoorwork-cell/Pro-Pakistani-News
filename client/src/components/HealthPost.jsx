import React, { useContext } from 'react'
import NewsCard from './NewsCard'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'
import Heading from './Heading'

const HealthPost = () => {
    const { blogs } = useContext(AppContext);
    return (
        <div className='container mx-auto px-4 mt-10 mb-6 pb-2.5'>
            <Heading text={'Health'} boldtext={"News"} />
            <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[15px]'>
                {blogs?.filter(blog => blog.category === "Health").slice(length - 8).reverse().map((blog,index)=>(
                    <NewsCard key={index} blog={blog} />
                ))}
            </div>
            <div>
                <Link onClick={()=>{scrollTo(0,0)}} to={'/category/health'} className='uppercase text-[#6367ff] font-semibold leading-none py-1.5 flex items-center gap-2 text-sm'>Read More <span><FaLongArrowAltRight /></span></Link>
            </div>
        </div>
    )
}

export default HealthPost