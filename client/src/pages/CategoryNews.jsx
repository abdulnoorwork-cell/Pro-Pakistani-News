import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard'

const CategoryNews = ({ category }) => {
    const { blogs } = useContext(AppContext);
    return (
        <div>
            <div className="container mx-auto px-4">
                {/* Banner */}
                <div className='bg-[#f6f9fa] my-5'>
                    <h1 className='xl:text-[25px] sm:text-[22px] text-xl font-semibold text-[#242a3a] flex items-center leading-none'><span className='py-[13px] px-[17px] bg-[#eff4f5] mr-5'><FaHome /></span> {category}</h1>
                </div>
                {/* News */}
                <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[15px]'>
                    {blogs?.filter(blog => blog.category === category).map((blog, index) => (
                        <NewsCard key={index} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryNews