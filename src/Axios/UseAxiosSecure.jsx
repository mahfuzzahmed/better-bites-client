import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext, useEffect } from 'react';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const UseAxiosSecure = () => {
    const{signOutUser} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response 
        },error=>{
            if(error.status === 401 || error.status === 403){
                signOutUser()
                .then(()=>{
                    navigate('/login')
                })
                .catch(err=> console.log(err))
            }
            return Promise.reject(error)
        })
    },[])
    return axiosInstance
};

export default UseAxiosSecure;