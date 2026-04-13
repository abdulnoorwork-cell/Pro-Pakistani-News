import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout'
import Home from './pages/Home'
import Signin from './pages/Signin';
import { Toaster } from 'react-hot-toast';
import MyAccount from './pages/MyAccount';
import { AppContext } from './context/AppContext';
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import UpdateBlog from './pages/admin/UpdateBlog'
import "quill/dist/quill.snow.css";
import CategoryNews from './pages/CategoryNews';
import SingleBlog from './pages/SingleBlog';
import Contact from './pages/Contact'
import AllNews from './pages/AllNews';

const App = () => {

  const { token, userRole } = useContext(AppContext);
  useEffect(()=>{
    const interval = setInterval(()=>{
      const expiryTime = localStorage.getItem('expiryTime');
      if(!expiryTime) return;
      if(Date.now()>expiryTime){
        localStorage.removeItem();
        localStorage.removeItem('expiryTime');

        window.location.href = "/signin"
        window.location.reload();
      }
    },60000)
    return ()=> clearInterval(interval)
  },[])

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/my-account' element={token ? <MyAccount /> : <Signin />} />
          <Route path='/category/tech' element={<CategoryNews category="Tech and Telecom" />} />
          <Route path='/category/business' element={<CategoryNews category="Business" />} />
          <Route path='/category/carbase' element={<CategoryNews category="CarBase" />} />
          <Route path='/category/sports' element={<CategoryNews category="ProSports" />} />
          <Route path='/category/education' element={<CategoryNews category="Education" />} />
          <Route path='/category/health' element={<CategoryNews category="Health" />} />
          <Route path='/category/world-cup' element={<CategoryNews category="World Cup" />} />
          <Route path='/category/pakistan' element={<CategoryNews category="Pakistan" />} />
          <Route path='/category/international' element={<CategoryNews category="International" />} />
          <Route path='/category/social' element={<CategoryNews category="Social" />} />
          <Route path='/blog/blog-detail/:blog_id' element={<SingleBlog />} />
          <Route path='/all-news' element={<AllNews />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        {userRole === "admin" ? <Route path='/admin' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='addblog' element={<AddBlog />} />
          <Route path='listblog' element={<ListBlog />} />
          <Route path='updateblog/:blogId' element={<UpdateBlog />} />
        </Route> : null}
      </Routes>
      <Toaster />
    </div>
  )
}

export default App