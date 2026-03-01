import axios from "axios";
import React, { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [userData,setUserData]=useState([]);
    const [ blogs,setBogs ] = useState([]);
    const [ search,setSearch ] = useState("");
    const [authenticated,setAuthenticated]=useState(localStorage.getItem('User')?JSON.parse(localStorage.getItem('User')) : undefined);
    const token = authenticated?.token;
    const userId = authenticated?.data[0]?._id
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const userRole = authenticated?.data[0].role;
    const fetchUserData = async () =>{
        try {
            let response =await axios.get(`${backendUrl}/api/user/user-data/${userId}`);
            if(response.data){
                setUserData(response.data[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchBlogs = async ()=>{
        try {
            let response =await axios.get(`${backendUrl}/api/blog/get-blogs`);
            if(response.data){
                setBogs(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = async () =>{
        try {
            let response =await axios.get(`${backendUrl}/api/blog/search-blogs?q=${search}`,{withCredentials:true});
            if (response.data){
                setBogs(response.data)
                scrollTo(0,0)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleClearSearch = () => {
        setSearch("");
        setBogs([]);
        fetchBlogs();
        scrollTo(0,0)
    }

    useEffect(()=>{
        fetchUserData();
        fetchBlogs();
    },[])
    const values = {
        navigate,
        backendUrl,
        token,
        userData,
        userId,
        userRole,
        blogs,
        handleSearch,
        search,
        setSearch,
        handleClearSearch
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;