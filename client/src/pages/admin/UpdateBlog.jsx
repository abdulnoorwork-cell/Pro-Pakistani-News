import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import upload_area from '../../assets/upload_area.svg'
import { useContext } from 'react';

const UpdateBlog = () => {
  const [blog,setBlog] = useState([ ]);
  const {blogId} = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null)
  const navigate = useNavigate()

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const { backendUrl, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const fetchBog = async () => {
    try {
      let response = await axios.get(`${backendUrl}/api/blog/blog-detail/${blogId}`, { withCredentials: true });
      if (response.data) {
        setBlog(response.data[0])
        setTitle(response.data[0].title);
        setDescription(response.data[0].description);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBog();
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image || '');

      const response = await axios.put(`${backendUrl}/api/blog/update/${blogId}`, formData, {
        withCredentials: true
      })
      if (response.data.success) {
        toast.success(response.data.messege);
        setLoading(false);
        setTimeout(()=>{
          navigate('/admin/listblog')
        },1000)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      toast.error(error.response.data.messege)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current === new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  console.log(blog)

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 px-4 py-8 lg:py-10 lg:px-14 bg-blue-50/50 text-gray-600 h-full min-h-[95vh]'>
      <div className='bg-white flex flex-col w-full max-w-3xl p-6 md:p-10 shadow rounded'>
        <label htmlFor="image">
          <img src={!image ? blog.image : URL.createObjectURL(image)} className='rounded cursor-pointer max-h-24 max-w-24' alt="" />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} hidden id='image' />
        </label>
        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type...' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mt-2 p-2 min-h-10 text-gray-600 placeholder:font-light bg-[#f6fafd] border border-gray-300 outline-none rounded text-sm' required />
        <p className='mt-4'>Blog Description</p>
        <div className='w-full relative'>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full mt-2 p-2 border border-gray-300 bg-[#f6fafd] outline-none rounded h-[150px] text-sm' required></textarea>
          {/* <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button> */}
        </div>
        <button type='submit' className='mt-7 text-sm px-8 w-fit py-[10px] bg-[#994CF5] text-white rounded cursor-pointer'>{loading ? 'Updating...' : 'Save Changes'}</button>
      </div>
    </form>
  )
}

export default UpdateBlog