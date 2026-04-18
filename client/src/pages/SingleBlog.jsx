import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const SingleBlog = () => {
    const [blog, setBlog] = useState([])
    const { blog_id } = useParams();
    const { backendUrl } = useContext(AppContext);
    const fetchBlogData = async () => {
        try {
            let response = await axios.get(`${backendUrl}/api/blog/blog-detail/${blog_id}`, { withCredentials: true });
            if (response.data) {
                setBlog(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBlogData();
    }, [blog_id])

    const cleanHTML = blog?.description
        ?.replace(/style="[^"]*color:[^";]+;?[^"]*"/gi, "")
        ?.replace(/color:[^;"]+;?/gi, "");

    return (
        <div>
            <div className="container mx-auto px-4 mt-[26px] pb-10">
                <h1 className='single_blog_title 2xl:text-[40px] lg:text-4xl sm:text-3xl text-[26px] font-black text-[#242a3a] leading-none'>{blog?.title}</h1>
                <h6 style={{ fontFamily: 'Montserrat' }} className='text-[#242a3a] tracking-tight text-sm sm:text-base mt-[15px] mb-5'>By <span className='text-[#6367FF]'>{blog?.name}</span> | Published | <span className=''>{new Date(blog?.created_At).toDateString()}</span></h6>
                <figure>
                    <img src={blog?.image} className='w-full sm:mb-8 mb-6' alt="" />
                </figure>
                <div dangerouslySetInnerHTML={{ __html: cleanHTML }} className='text-gray-500 text-sm sm:text-base sm:pr-6 sm:pb-8 pb-6'></div>
            </div>
        </div>
    )
}

export default SingleBlog