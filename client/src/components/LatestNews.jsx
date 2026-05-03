import React, { useContext } from 'react'
import NewsCard from './NewsCard'
import Heading from './Heading'
import { AppContext } from '../context/AppContext'
import loading_animation from '../../public/loading_animation.svg'

const LatestNews = () => {
  const { blogs, loading } = useContext(AppContext);
  return (
    <div className='container mx-auto px-4 mt-12 pb-[50px]'>
      <Heading text="Latest" boldtext="News" />
      <div className='mx-auto'>
        {loading ? <img src={loading_animation} className='mx-auto' alt="loader" /> :
          <div className='news grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[15px]'>
            {blogs?.slice(length - 12).reverse().map((blog, index) => (
              <NewsCard key={index} blog={blog} />
            ))}
          </div>}
      </div>
      <div className='mt-[25px] flex justify-center'>
        <button type="submit" className='uppercase bg-[#6367FF] text-sm py-2.5 px-10 text-white transition-all duration-200 cursor-pointer hover:scale-110'>Show More +</button>
      </div>
    </div>
  )
}

export default LatestNews