import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import upload_area from '../../assets/upload_area.svg'
import { useContext } from 'react';
import Quill from 'quill';

const UpdateBlog = () => {
  const [blog, setBlog] = useState([]);
  const { blogId } = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null)
  const navigate = useNavigate()

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
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
        quillRef.current.root.innerHTML = response.data[0].description
        setCategory(response.data[0].category);
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
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('category', category)
      formData.append('image', image || '');

      const response = await axios.put(`${backendUrl}/api/blog/update/${blogId}`, formData, {
        headers: {
          Authorization: `${token}`
        },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success(response.data.messege);
        setLoading(false);
        setTimeout(() => {
          navigate('/admin/listblog')
        }, 1000)
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
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
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
        <p className='mt-4 font-medium text-sm'>Blog title</p>
        <input type="text" placeholder='Type...' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mt-2 p-2 min-h-10 text-gray-600 placeholder:font-light bg-[#f6fafd] border border-gray-300 outline-none rounded text-sm' required />
        <p className='mt-4 font-medium text-sm mb-2'>Blog Description</p>
        <div className='w-full relative'>
          <div ref={editorRef} className='w-full relative min-h-[160px] max-h-[360px] overflow-y-auto' required></div>
          {/* <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button> */}
        </div>
        <select defaultValue={category} value={category} onChange={(e) => setCategory(e.target.value)} className='w-fit mt-5 p-2 min-h-10 text-gray-600 bg-white border border-gray-400 outline-[#249991] rounded text-sm font-medium'>
          <option disabled value={0}>--Select Category--</option>
          <option value="Tech and Telecom">Tech and Telecom</option>
          <option value="Business">Business</option>
          <option value="CarBase">CarBase</option>
          <option value="ProSports">ProSports</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Pakistan">Pakistan</option>
          <option value="International">International</option>
          <option value="Social">Social</option>
          <option value="World Cup">World Cup</option>
        </select>
        <button type='submit' style={{ fontFamily: 'Poppins' }} className='mt-7 text-sm px-8 w-fit py-[10px] bg-[#6367FF] text-white rounded cursor-pointer'>{loading ? 'Updating...' : 'Save Changes'}</button>
      </div>
    </form>
  )
}

export default UpdateBlog