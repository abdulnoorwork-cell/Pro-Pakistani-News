import axios from "axios";
import React, { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [blogs, setBogs] = useState([]);
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : undefined);
    const token = authenticated?.token;
    const userId = authenticated?.user._id
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const userRole = authenticated?.user.role;
    const [loading,setLoading]=useState(false);
    const fetchUserData = async () => {
        try {
            let response = await axios.get(`${backendUrl}/api/user/user-data/${userId}`);
            if (response.data) {
                setUserData(response.data[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchBlogs = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendUrl}/api/blog/get-blogs`);
            if (response.data) {
                setBogs(response.data)
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchBlogs();
    }, [])

    const values = {
        navigate,
        backendUrl,
        token,
        userData,
        userId,
        userRole,
        blogs,
        fetchBlogs,
        fetchUserData,
        loading
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;