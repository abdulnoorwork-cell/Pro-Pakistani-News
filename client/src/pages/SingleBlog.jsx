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
                setBlog(response.data[0])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBlogData();
    }, [blog_id])
    console.log(blog)
    return (
        <div>
            <div className="container mx-auto px-4 mt-[26px]">
                <h1 style={{ fontFamily: 'Lato' }} className='single_blog_title 2xl:text-[40px] lg:text-4xl sm:text-3xl text-[26px] sm:leading-[1.3em] leading-[1.2em] font-black text-[#242a3a]'>{blog?.title}</h1>
                <h6 style={{ fontFamily: 'Lato' }} className='text-[#242a3a] tracking-tight 2xl:text-lg font-medium mt-[15px] mb-5'>By <span className='text-[#249991]'>{blog?.name}</span> | Published | <span className=''>{new Date(blog?.created_At).toDateString()}</span></h6>
                <figure>
                    <img src={blog?.image} className='w-full sm:mb-8 mb-6' alt="" />
                </figure>
                <div dangerouslySetInnerHTML={{__html: blog?.description}} className='text-[#313131] 2xl:text-lg sm:pr-6 sm:pb-8 pb-6 leading-[27px]' style={{fontFamily:'Andada Pro'}}></div>
            </div>
        </div>
    )
}

export default SingleBlog