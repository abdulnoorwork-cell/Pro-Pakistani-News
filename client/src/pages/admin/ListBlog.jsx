import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import cross_icon from '../../assets/cross_icon.svg'
import { useContext } from 'react';
import edit_icon from '../../assets/edit_icon.png'

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { backendUrl, navigate,token } = useContext(AppContext);

  const fetchBlogs = async () => {
    let response = await axios.get(`${backendUrl}/api/blog/get-own-blogs`, { 
      headers: {
        Authorization: `${token}`
      },
      withCredentials: true
     })
    if (response.data) {
      setBlogs(response.data);
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/blog/delete/${blogId}`, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.messege)
        await fetchBlogs();
      }
    } catch (error) {
      toast.error(error.response.data.messege);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 px-4 py-8 lg:py-10 lg:px-14 bg-blue-50/50'>
      <h1 className='text-gray-800 font-medium'>Blogs List</h1>
      <div className='relative max-h-[80vh] mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <div className='w-full text-sm text-gray-800'>
          <div className='blog_list_title text-xs uppercase p-3 border-b text-gray-800 font-semibold grid sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-[1fr_2fr_1fr] gap-2'>
            <label className=' l:px-6'>News</label>
            <label className=''>Title</label>
            <label className=' max-sm:hidden'>Category</label>
            <label className=' max-sm:hidden'>Date</label>
            <label className='mx-auto'>Action</label>
          </div>
          {blogs.length>0 ? 
          <div>
            {blogs?.reverse().map((blog, index) => (
              <div key={index} className='blog_list border-b border-gray-300 text-sm p-3 grid sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-[1fr_2fr_1fr] gap-2 items-center'>
                <figure className=''>
                  <img className='main_image h-8 w-14' src={blog.image} alt="" />
                </figure>
                <p className=' leading-[1.3em]'>{blog.title}</p>
                <p className=' max-sm:hidden'>{blog.category}</p>
                <p className=' max-sm:hidden'>{new Date(blog.created_At).toDateString()}</p>
                <figure className=' flex text-sm items-center gap-2 mx-auto'>
                  <img src={edit_icon} onClick={() => { navigate(`/admin/updateblog/${blog._id}`) }} alt="" className='md:h-[20px] md:w-[20px] h-5 W-5 hover:scale-110 transition-all cursor-pointer' />
                  <img src={cross_icon} onClick={() => deleteBlog(blog._id)} alt="" className='md:h-[20px] md:w-[20px] h-5 W-5 border border-red-400 rounded-full hover:scale-110 transition-all cursor-pointer' />
                </figure>
              </div>
            ))}
          </div> : 
          <div className='text-gray-800 font-medium text-[16px] text-center py-10'>You don,t have any blogs</div>}
        </div>
      </div>
    </div>
  )
}

export default ListBlog