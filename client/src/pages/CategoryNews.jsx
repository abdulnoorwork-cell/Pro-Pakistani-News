import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { FaAngleLeft, FaAngleRight, FaHome } from "react-icons/fa";
import NewsCard from '../components/NewsCard'
import axios from 'axios';
import loading_animation from '../../public/loading_animation.svg'

const CategoryNews = ({ category }) => {
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([]);
    const { backendUrl } = useContext(AppContext);

    const fetchCategoryBlogs = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendUrl}/api/blog/category/${category}`, { withCredentials: true });
            if (response.data) {
                setBlogs(response.data)
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryBlogs()
    }, [category])

    const [itemsPerPage, setItemsPerPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(6)
            }
            else if (window.innerWidth < 1024) {
                setItemsPerPage(8)
            }
            else if (window.innerWidth < 1280) {
                setItemsPerPage(8)
            }
            else {
                setItemsPerPage(12)
            }
        }
        updateItems()
        window.addEventListener('resize', updateItems);
        return () => window.removeEventListener('resize', updateItems)
    }, [])
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentBlogs = blogs.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(blogs?.length / itemsPerPage);

    return (
        <div>
            <div className="container mx-auto px-4 pb-10 pt-1 min-h-[90vh]">
                {/* Banner */}
                <div className='bg-[#f6f9fa] my-5'>
                    <h1 className='xl:text-[25px] sm:text-[22px] text-xl font-semibold text-[#242a3a] flex items-center leading-none'><span className='py-[13px] px-[17px] bg-[#eff4f5] mr-5'><FaHome /></span> {category}</h1>
                </div>
                {/* News */}
                <div>
                    {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> :
                        <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[15px]'>
                            {currentBlogs?.map((blog, index) => (
                                <NewsCard key={index} blog={blog} />
                            ))}
                        </div>
                    }
                </div>
                {/* Pagination Buttons */}
                {totalPages > 1 ? (
                    <div className='flex items-center justify-center gap-2 mt-10 flex-wrap'>

                        {/* Prev */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(currentPage - 1); scrollTo(0, 0) }}
                            className='bg-[#6367FF] text-white w-9 h-9 flex items-center justify-center cursor-pointer disabled:opacity-50 text-sm rounded-full'
                        >
                            <FaAngleLeft />
                        </button>

                        {/* Pages */}
                        {[
                            1,

                            ...(currentPage > 3 ? ["..."] : []),

                            ...Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                                Math.max(currentPage - (window.innerWidth < 640 ? 1 : 2), 0),
                                currentPage + (window.innerWidth < 640 ? 2 : 2)
                            ),

                            ...(currentPage < totalPages - 2 ? ["..."] : []),

                            totalPages
                        ]
                            .filter((item, index, arr) => arr.indexOf(item) === index)
                            .map((page, index) => (
                                <button
                                    key={index}
                                    onClick={() => { typeof page === "number" && setCurrentPage(page); scrollTo(0, 0) }}
                                    className='w-9 h-9 font-medium text-sm rounded-full border-none flex items-center justify-center'
                                    style={{
                                        background: currentPage === page ? "#1A1A1A" : "#F3F4F6",
                                        color: currentPage === page ? "white" : "#1A1A1A",
                                        cursor: page === "..." ? "default" : "pointer",
                                    }}
                                >
                                    {page}
                                </button>
                            ))}

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => { setCurrentPage(currentPage + 1); scrollTo(0, 0) }}
                            className='bg-[#6367FF] text-white w-9 h-9 flex items-center justify-center cursor-pointer disabled:opacity-50 text-sm rounded-full'
                        >
                            <FaAngleRight />
                        </button>

                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default CategoryNews