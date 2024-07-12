"use client"
import React, {useEffect, useState} from 'react';
import {Briefcase, FileText, Moon} from 'lucide-react';
import Link from 'next/link'
import axios from "axios";
import {useRouter} from "next/navigation";

const NavOverlay = ({firstName, lastName, pfp, darkMode, setDarkMode}) => {
    const router = useRouter()
    const handleCheckboxChange = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);

    }
    const handlelogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentauth/clear`).then(() => {
            router.push('/login')
        })

    }

    return (
        <div className="absolute top-20 right-16 w-72 bg-white shadow-lg rounded-lg p-4 text-[#92929D]">
            <div className="flex items-center mb-4 bg-[#F4F4F4] rounded-xl p-4">
                <img src={pfp} alt="Profile" className="w-10 h-10 object-cover mr-4 rounded-[8px]"/>
                <div className="flex flex-col">
                    <span className="font-medium text-black">{firstName + " " + lastName}</span>
                </div>
            </div>
            <hr className='my-2 text-[#F4F4F4]'/>
            <div className="flex items-center px-4 py-3 cursor-pointer font-medium">
                <Briefcase className="mr-2"/>
                <span>My Jobs</span>
            </div>
            <div className="flex items-center px-4 py-3 cursor-pointer font-medium">
                <FileText className="mr-2"/>
                <span>My Resume</span>
            </div>
            <div className="flex items-center px-4 py-3 cursor-pointer font-medium">
                <Moon className="mr-2"/>
                <span>Dark Mode</span>
                <label className='flex cursor-pointer select-none items-center ml-auto'>
                    <div className='relative'>
                        <input
                            type='checkbox'
                            checked={darkMode}
                            onChange={handleCheckboxChange}
                            className='sr-only'
                        />
                        <div
                            className={`block h-6 w-10 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                        <div
                            className={`dot absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition ${darkMode ? 'translate-x-4' : ''}`}></div>
                    </div>
                </label>
            </div>
            <hr className='my-2 text-[#F4F4F4]'/>
            <Link href={'/editprofile'}>
                <div className="flex items-center px-4 py-2 cursor-pointer font-medium">
                    <span>Account Settings</span>
                </div>
            </Link>
            <div onClick={handlelogout} className="flex items-center px-4 py-2 text-red-500 cursor-pointer font-medium">
                <span>Log Out</span>
            </div>
        </div>
    );


}

export default NavOverlay;
