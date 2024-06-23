"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { Settings, CircleStop, CircleCheck } from 'lucide-react';

import OpportunitiesView from './OpportunitiesView';
import LearningPathView from './LearningPathView';
import ResumeBuilderView from './ResumeBuilderView';
import MockInterviewsView from './MockInterviewsView';
import { useNavigate } from 'react-router-dom';
import Link from 'next/link';
import {useRouter} from "next/navigation";


const Dashboard = () => {
    const router = useRouter()
    const [userData, setUserdata] = useState(null)
    const [profile, setProfile] = useState(null);
    const [progress, setProgress] = useState(80); // Example progress, you can fetch actual completion progress
    const [profileSections, setProfileSections] = useState([
        { title: 'Personal Information', filled: true },
        { title: 'Academics', filled: false }, // Example, replace with actual logic
        { title: 'Career Objectives', filled: true },
        { title: 'Skills Assessment', filled: false }, // Example, replace with actual logic
        { title: 'Projects', filled: true },
        { title: 'Internships', filled: true },
        { title: 'Volunteer work', filled: true },
        { title: 'Extra-curricular activities', filled: false },
        { title: 'Certifications', filled: false },
        { title: 'Awards and Recognition', filled: false },
        { title: 'Any Other Distinction', filled: true },
    ]);
    const [selectedSection, setSelectedSection] = useState('exploreOpportunities');
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        (async () => {
            await axios.get('http://localhost:5000/auth/verify').then(async (res) => {
                setUserdata(res.data)
                await axios.post('http://localhost:5000/user/getprofilebyId', { user_id: res.data.id }).then((res) => {
                    setProfile(res.data)
                    console.log(res.data)
                })
            })
            setLoader(true)
        })()


    }, []);

    const handlelogout=async()=>{
        await axios.get('http://localhost:5000/studentauth/clear').then(()=>{
            router.push('/login')
        })

    }
    if (!loader) {
        return (<></>)
    }
    else {
        return (
            <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col">
                {/* Header */}
                <div className="w-full p-6 bg-blue-600 text-white shadow-md mb-6 relative">
                    <h1 className="text-3xl text-center font-bold">CHAYAN - YOUR PLACEMENT COACH</h1>

                </div>


                <div className="flex flex-1">
                    {/* Left container */}
                    <div className="w-1/5 pr-8">
                        {/* Profile Card */}
                        <div className=" p-4 pb- w-60 bg-white rounded-lg shadow-md flex flex-col items-center absolute border-2 border-blue-600" style={{ zIndex: 1, top: '20%' }}>
                            <img
                                src="/media/images/300-1.jpg" // Replace with actual image source
                                alt="Profile"
                                className="h-28 w-28 rounded-full  shadow-lg absolute"
                                style={{ zIndex: 1, top: '-15%', left: '9%' }}
                            />
                            <div className="w-full mt-16 mb-4 text-left">
                                <h2 className="text-lg  font-semibold">Amit Malakar</h2>
                                <p className="text-sm ">B.Tech - Chemical | 2nd Year</p>
                                <p className="text-sm ">CGPA : 9.17 | Personality: Good</p>
                            </div>
                            <div className="w-full" style={{ marginTop: '-10px', }}>
                                <h2 className="text-lg font-semibold mb-2 text-left">Career Objectives</h2>
                                <ul className="list-disc list-inside text-sm space-y-2">
                                    <li className=" ">Web Developer</li>
                                    <li className=" ">DevOps Engineer</li>
                                    <li className=" ">AI Engineer</li>
                                </ul>
                            </div>
                        </div>

                        {/* Profile Completion Section */}
                        <div className=" p-6 pt-4 w-60 bg-white rounded-lg shadow-md mb-4 mt-60 border-2 border-blue-600 text-sm" style={{ width: '' }}>
                            <h2 className="text-lg font-semibold mb-2">My CHAYAN Profile</h2>
                            <div className="mb-4 text-sm">
                                <p className="mb-2">Profile Completion: {progress}%</p>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                            {profileSections.map((section, index) => (
                                <div key={index} className="flex justify-between items-left mb-2 border-b border-dotted border-gray-300 pb-1" >
                                    <p>{section.title}</p>
                                    {section.filled ? (
                                        <CircleCheck className="h-4 w-4 rounded-full text-green-600 bg-green-100 mt-1" />
                                    ) : (
                                        <CircleStop className="h-4 w-4 rounded-full text-red-600 bg-red-100 mt-1" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Settings and Logout Buttons */}
                        <div className="p-3 bg-white rounded-lg shadow-md flex justify-between items-center border-2 border-blue-600">
                            <Link href={'/editprofile'} className="flex items-center cursor-pointer">
                                <Settings />
                                <span className=" ml-1 text-black-900 font-semibold">Settings</span>
                            </Link>
                            <div className="flex items-center">
                                <span onClick={handlelogout} className="text-blue-500 cursor-pointer">Logout</span>
                            </div>
                        </div>

                    </div>

                    {/* Right container */}
                    <div className="w-full" style={{ marginTop: '-6px', marginLeft: '-8px' }}>
                        {/* Top section */}
                        <div className="w-full" style={{ marginBottom: '-.8rem' }}>
                            <div className="grid grid-cols-4 gap-8">
                                <div
                                    className={`relative overflow-hidden p-6 rounded-2xl shadow-md cursor-pointer ${selectedSection === 'exploreOpportunities' ? 'border-2 border-blue-500 hover:shadow-xl' : 'border-2 border-gray-300 hover:shadow-xl'}`}
                                    onClick={() => setSelectedSection('exploreOpportunities')}
                                    style={{
                                        marginBottom: '2rem',
                                        backgroundImage: selectedSection === 'exploreOpportunities' ? 'radial-gradient(closest-side, #2563EB, #00008B)' : 'radial-gradient(closest-side, #E5E7EB, #A9A9A9)'
                                    }}
                                >
                                    <h2 className={`text-2xl text-center font-semibold ${selectedSection === 'exploreOpportunities' ? 'text-white' : 'text-black opacity-50'}`}>
                                        Explore Opportunities
                                    </h2>
                                    <p className={`text-base text-center ${selectedSection === 'exploreOpportunities' ? 'text-white' : 'text-black opacity-50'}`}>
                                        Liked: 10 | Applied: 3
                                    </p>
                                    {selectedSection === 'exploreOpportunities' && <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{ borderBottom: '10px solid transparent', borderTop: '10px solid white' }}></div>}
                                </div>
                                <div
                                    className={`relative overflow-hidden p-6 rounded-2xl shadow-md cursor-pointer ${selectedSection === 'learningGap' ? 'border-2 border-blue-500 hover:shadow-xl' : 'border-2 border-gray-300 hover:shadow-xl'}`}
                                    onClick={() => setSelectedSection('learningGap')}
                                    style={{
                                        marginBottom: '2rem',
                                        backgroundImage: selectedSection === 'learningGap' ? 'radial-gradient(closest-side, #2563EB, #00008B)' : 'radial-gradient(closest-side, #E5E7EB, #A9A9A9)'
                                    }}
                                >
                                    <h2 className={`text-2xl text-center font-semibold ${selectedSection === 'learningGap' ? 'text-white' : 'text-black opacity-50'}`}>
                                        Skill Gap and Learning Path
                                    </h2>
                                    {selectedSection === 'learningGap' && <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{ borderBottom: '10px solid transparent', borderTop: '10px solid white' }}></div>}
                                </div>
                                <div
                                    className={`relative overflow-hidden p-6 rounded-2xl shadow-md cursor-pointer ${selectedSection === 'buildResume' ? 'border-2 border-blue-500 hover:shadow-xl' : 'border-2 border-gray-300 hover:shadow-xl'}`}
                                    onClick={() => setSelectedSection('buildResume')}
                                    style={{
                                        marginBottom: '2rem',
                                        backgroundImage: selectedSection === 'buildResume' ? 'radial-gradient(closest-side, #2563EB, #00008B)' : 'radial-gradient(closest-side, #E5E7EB, #A9A9A9)'
                                    }}
                                >
                                    <h2 className={`text-2xl text-center font-semibold ${selectedSection === 'buildResume' ? 'text-white' : 'text-black opacity-50'}`}>
                                        Build/ Customize Resume
                                    </h2>
                                    <p className={`text-base text-center ${selectedSection === 'buildResume' ? 'text-white' : 'text-black opacity-50'}`}>
                                        Download
                                    </p>
                                    {selectedSection === 'buildResume' && <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{ borderBottom: '10px solid transparent', borderTop: '10px solid white' }}></div>}
                                </div>
                                <div
                                    className={`relative overflow-hidden p-6 rounded-2xl shadow-md cursor-pointer ${selectedSection === 'mockInterviews' ? 'border-2 border-blue-500 hover:shadow-xl' : 'border-2 border-gray-300 hover:shadow-xl'}`}
                                    onClick={() => setSelectedSection('mockInterviews')}
                                    style={{
                                        marginBottom: '2rem',
                                        backgroundImage: selectedSection === 'mockInterviews' ? 'radial-gradient(closest-side, #2563EB, #00008B)' : 'radial-gradient(closest-side, #E5E7EB, #A9A9A9)'
                                    }}
                                >
                                    <h2 className={`text-2xl text-center pl-2 font-semibold ${selectedSection === 'mockInterviews' ? 'text-white' : 'text-black opacity-50'}`}>
                                        AI - Mock Interviews
                                    </h2>
                                    <p className={`text-base text-center ${selectedSection === 'mockInterviews' ? 'text-white' : 'text-black opacity-50'}`}>
                                        2/6 interviews practiced
                                    </p>
                                    {selectedSection === 'mockInterviews' && <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{ borderBottom: '10px solid transparent', borderTop: '10px solid white' }}></div>}
                                </div>
                            </div>
                        </div>
                        {selectedSection === 'exploreOpportunities' && <OpportunitiesView />}
                        {selectedSection === 'learningGap' && <LearningPathView />}
                        {selectedSection === 'buildResume' && <ResumeBuilderView />}
                        {selectedSection === 'mockInterviews' && <MockInterviewsView />}
                    </div>

                </div>
            </div>
        );

    }

};

export default Dashboard;
