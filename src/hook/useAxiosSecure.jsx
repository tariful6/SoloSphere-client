import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials : true
})

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.response.use(res => {
        // console.log('response app asher agei thamiye dekhechi ki ache ar vitor');
        return res
    },
    async error =>{
        console.log('Error from axios interceptor', error.response)
        if(error.response.status === 401 || error.response.status === 403){
           await logOut()
            navigate('/signIn')
        }
        return Promise.reject(error)
    })

    // axios.interceptors.request
    return axiosSecure;
};

export default useAxiosSecure;