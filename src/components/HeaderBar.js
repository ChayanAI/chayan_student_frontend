"use client";

import {useEffect, useState} from 'react';
import {BellIcon} from '@heroicons/react/24/outline';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import NavOverlay from './NavOverlay';
import axios from "axios";

export default function HeaderBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [pfp, setPfp] = useState("/media/images/Profile.svg")
    const [darkMode, setDarkMode] = useState(false);
    const [loader, setLoader] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    useEffect(() => {
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async(res)=>{
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: res.data.id}).then((res)=>{
                    setFirstName(res.data.first_name)
                    res.data.last_name?(setLastName(res.data.last_name)):(setLastName(""))

                })


                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/getpfpbyId`, {userId: res.data.id})
                .then((x) => {
                    for (let y = 0; y < x.data[0].length; y++) {
                        setPfp("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                        // console.log("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                    }
                });
            })

            setLoader(true)
        })()
    }, [])
    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };
    if (!loader) {
        return (<header></header>)
    } else {
        return (
            <header
                className="hidden md:flex justify-between items-center px-16 py-3 bg-white dark:bg-[#161618] z-50 relative">
                <div className="flex justify-center items-center">
                    <img src="/media/images/NavLogo.svg" alt="Chayan.ai" className="h-9"/>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
                        {darkMode ? <SunIcon className="w-6 h-6 text-yellow-500"/> :
                            <MoonIcon className="w-6 h-6 text-gray-500"/>}
                    </button>
                    <button onClick={toggleOverlay}
                            className="p-2 flex gap-2 items-center rounded-full focus:outline-none">
                        <img src={pfp} alt="Profile" className="w-10 h-10 object-cover rounded-[8px]"/>
                        <img src="/media/images/ChevronDown.svg" alt="open"/>
                    </button>
                </div>
                {isOpen && <NavOverlay firstName={firstName} lastName={lastName} pfp={pfp} darkMode={darkMode} setDarkMode={setDarkMode}/>}
            </header>
        );
    }

}
