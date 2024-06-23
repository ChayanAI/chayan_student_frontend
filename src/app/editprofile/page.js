'use client'
import EditProfile from '../../components/EditProfile';
import {useEffect, useState} from "react";
import axios from "axios";
 axios.defaults.withCredentials = true
const StudentProfile = () => {
    const [success, setSuccess] = useState(false)
    const [userId, setuserId] = useState()
    useEffect(() => {
        (async () => {
            const user = await axios.get('http://localhost:5000/auth/verify')
            setuserId(user.data.id)
            setSuccess(true)
        })()
    }, [])

    if(!success){
        return <></>
    }
    else{
       return <EditProfile userId={userId}/>;
    }

};

export default StudentProfile;