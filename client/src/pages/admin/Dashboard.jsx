import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import dashboard_icon_1 from '../../assets/dashboard_icon_1.svg'
import dashboard_icon_4 from '../../assets/dashboard_icon_4.svg'
import { useContext } from 'react'
import cross_icon from '../../assets/cross_icon.svg'
import edit_icon from '../../assets/edit_icon.png'

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const { backendUrl, navigate, token } = useContext(AppContext);

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
    fetchBlogs();
  }, [])

  return (
    <div className='flex-1 px-4 py-8 lg:px-10'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-3 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={dashboard_icon_1} className='w-14' alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{blogs.length}</p>
            <p className='text-gray-500 text-sm'>My News</p>
          </div>
        </div>
      </div>
      {/* blogs */}
      <div className='max-w-4xl'>
        <div className='flex items-center gap-3 mb-4 mt-7 text-[#3e484e]'>
          <img src={dashboard_icon_4} alt="" />
          <p className='font-semibold'>Recent News</p>
        </div>
        <div className='blog_list_title bg-[#6367FF] text-white font-semibold text-xs uppercase p-3 border-b sm:grid lg:grid-cols-[1fr_3fr_1fr_1fr_1fr] sm:grid-cols-[1fr_3fr_1fr_1fr] gap-2 hidden'>
          <label>News</label>
          <label>Title</label>
          <label className='mx-auto'>Category</label>
          <label className=' max-lg:hidden mx-auto'>Date</label>
          <label className='mx-auto'>Action</label>
        </div>
        {blogs.length > 0 ?
          <div className='relative w-full text-sm overflow-x-auto shadow rounded-lg scrollbar-hide bg-white max-sm:max-h-[70vh]'>
            <div className='w-full text-sm'>
              {blogs.length > 0 ?
                <div>
                  {blogs?.slice(length - 6).reverse().map((blog, index) => (
                    <div key={index} className='blog_list border-b text-[#4e5c64] font-medium border-gray-300 text-sm sm:p-3 p-4 grid lg:grid-cols-[1fr_3fr_1fr_1fr_1fr] sm:grid-cols-[1fr_3fr_1fr_1fr] gap-2.5 items-center'>
                      <figure className=''>
                        <img className='main_image sm:h-9 sm:w-[70px] h-[60px] max-sm:mx-auto' src={blog.image} alt="" />
                      </figure>
                      <p className='leading-[1.3em] max-sm:w-[200px] max-sm:text-center max-sm:mx-auto' style={{ fontFamily: 'Urbanist' }}>{blog.title}</p>
                      <p className='leading-[1.3em] mx-auto max-sm:text-[#249991]' style={{ fontFamily: 'Urbanist' }}>{blog.category}</p>
                      <p className=' max-lg:hidden mx-auto' style={{ fontFamily: 'Urbanist' }}>{new Date(blog.created_At).toDateString()}</p>
                      <figure className=' flex text-sm items-center gap-2 mx-auto'>
                        <img src={edit_icon} onClick={() => { navigate(`/admin/updateblog/${blog._id}`) }} alt="" className='md:h-[20px] md:w-[20px] h-5 W-5 hover:scale-110 transition-all cursor-pointer' />
                        <img src={cross_icon} onClick={() => deleteBlog(blog._id)} alt="" className='md:h-[20px] md:w-[20px] h-5 W-5 border border-red-400 rounded-full hover:scale-110 transition-all cursor-pointer' />
                      </figure>
                    </div>
                  ))}
                </div> :
                <div className='text-gray-800 font-medium text-[16px] text-center py-10'>You don,t have any blogs</div>}
            </div>
          </div> : <div className='font-medium min-h-[100px] text-sm flex items-center justify-center text-center bg-white rounded-md max-w-2xl'>You don,t have any blogs</div>}
      </div>
    </div >
  )
}

export default Dashboard