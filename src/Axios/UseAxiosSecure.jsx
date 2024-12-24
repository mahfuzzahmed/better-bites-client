import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext, useEffect } from 'react';


const axiosInstance = axios.create({
    baseURL: 'https://server-side-alpha-ecru.vercel.app',
    withCredentials: true
})

const UseAxiosSecure = () => {
    const{userLogOut} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response 
        },error=>{
            if(error.status === 401 || error.status === 403){
                userLogOut()
                .then(()=>{
                    navigate('/auth/login')
                })
                .catch(err=> {
                    // console.log(err)
                })
            }
            return Promise.reject(error)
        })
    },[navigate, userLogOut])
    return axiosInstance
};

export default UseAxiosSecure;