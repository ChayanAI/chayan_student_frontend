"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FaHeart} from 'react-icons/fa';
import {Settings, CircleStop, CircleCheck} from 'lucide-react';

import OpportunitiesView from './OpportunitiesView';
import LearningPathView from './LearningPathView';
import ResumeBuilderView from './ResumeBuilderView';
import MockInterviewsView from './MockInterviewsView';
import {useNavigate} from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from "next/navigation";


const Dashboard = () => {
    const router = useRouter()
    const [pfp, setPfp] = useState('/media/images/300-1.jpg')
    const [userData, setUserdata] = useState(null)
    const [profile, setProfile] = useState(null);
    const [progress, setProgress] = useState(36.3); // Example progress, you can fetch actual completion progress
    const [profileSections, setProfileSections] = useState([
        {title: 'Personal Information', filled: false},
        {title: 'Academics', filled: false}, // Example, replace with actual logic
        {title: 'Career Objectives', filled: true},
        {title: 'Skills Assessment', filled: true}, // Example, replace with actual logic
        {title: 'Internships', filled: false},
        {title: 'Projects', filled: false},
        {title: 'Volunteer work', filled: false},
        {title: 'Extra-curricular activities', filled: false},
        {title: 'Certificates', filled: false},
        {title: 'Awards & Distinctions', filled: false},
        {title: 'Distinctions', filled: false},

    ]);
    const [exp, setExp] = useState()
    const [selectedSection, setSelectedSection] = useState('exploreOpportunities');
    const [loader, setLoader] = useState(false)
    const [c, setC] = useState(2)
    useEffect(() => {
        (async () => {
            let q = 0
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                setUserdata(res.data)
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: res.data.id}).then((res) => {
                    setProfile(res.data)
                    // console.log(res.data)
                    if (res.data.first_name) {
                        setProfileSections((prev) => ([...prev.slice(0, 0), {
                            title: 'Personal Information',
                            filled: true
                        }, ...prev.slice(1)]))
                        q += 1
                    }
                    if (res.data.college_name) {
                        setProfileSections((prev) => ([...prev.slice(0, 1), {
                            title: 'Academics',
                            filled: true
                        }, ...prev.slice(2)]))
                        q += 1
                    }


                })
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/getpfpbyId`, {userId: res.data.id})
                .then((x) => {
                    for (let y = 0; y < x.data[0].length; y++) {
                        setPfp("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                        // console.log("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                    }
                });
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getinternbyId`, {userId: res.data.id}).then((res) => {
                    if (res.data.internships.length > 0) {
                        setProfileSections((prev) => ([...prev.slice(0, 4), {
                            title: 'Internships',
                            filled: true
                        }, ...prev.slice(5)]))
                        q += 1
                    }
                    if (res.data.projects.length > 0) {
                        setProfileSections((prev) => ([...prev.slice(0, 5), {
                            title: 'Projects',
                            filled: true
                        }, ...prev.slice(6)]))
                        q += 1
                    }
                    if (res.data.volunteers.length > 0) {
                        setProfileSections((prev) => ([...prev.slice(0, 6), {
                            title: 'Volunteers',
                            filled: true
                        }, ...prev.slice(7)]))
                        q += 1
                    }
                    if (res.data.extra_curriculars.length > 0) {
                        setProfileSections((prev) => ([...prev.slice(0, 7), {
                            title: 'Extra-curricular activities',
                            filled: true
                        }, ...prev.slice(8)]))
                        q += 1
                    }

                })
            })


            setC(q + 2)

            setLoader(true)
        })()


    }, []);


    const calculateYearOfStudy = (startDateString) => {
        const startDate = new Date(startDateString);
        const now = new Date();
        let yearDifference = now.getFullYear() - startDate.getFullYear();

        if (now.getMonth() < startDate.getMonth() ||
            (now.getMonth() === startDate.getMonth() && now.getDate() < startDate.getDate())) {
            yearDifference -= 1;
        }

        let studyYear = yearDifference + 1;
        let suffix = 'th';

        if (studyYear % 10 === 1 && studyYear % 100 !== 11) suffix = 'st';
        else if (studyYear % 10 === 2 && studyYear % 100 !== 12) suffix = 'nd';
        else if (studyYear % 10 === 3 && studyYear % 100 !== 13) suffix = 'rd';

        return `${studyYear}${suffix} Year`;
    }

    const handlelogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentauth/clear`).then(() => {
            router.push('/login')
        })

    }

    if (!loader) {
        return (<></>)
    } else {
        return (
            <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col">
                {/* Header */}
                <div className="w-full py-14 bg-blue-600 text-white shadow-md mb-6 relative">
                    <h1 className="text-[2.5rem] pl-12 text-center font-extrabold font-lato">CHAYAN - YOUR PLACEMENT
                        COACH</h1>

                </div>


                <div className="flex flex-1">
                    {/* Left container */}
                    <div className="w-1/5 pr-8">
                        {/* Profile Card */}
                        <div className=" p-4 w-60 bg-white rounded-lg shadow-md flex flex-col items-center absolute border-2 border-blue-600" style={{ zIndex: 1, top: '21%' }}>

                            <img
                                src={pfp?(pfp):('/media/images/300-1.jpg')} // Replace with actual image source
                                alt="Profile"
                                className="h-28 w-28 object-cover rounded-full absolute border-4 border-white"
                                style={{zIndex: 1, top: '-15%', left: '9%'}}
                            />
                            <div className="w-full mt-16 mb-4 text-left">
                                <h2 className="text-lg  font-semibold">{profile.first_name} {profile.last_name}</h2>
                                <p className="text-sm ">{profile.degree} - {profile.branch} | {calculateYearOfStudy(profile.course_started)}</p>
                                <p className="text-sm ">CGPA : {profile.cgpa} | Personality: INTJ</p>
                            </div>
                            <div className="w-full" style={{marginTop: '-10px',}}>
                                <h2 className="text-lg font-semibold mt-1 text-left">Career Objectives</h2>
                                <ul className="list-disc list-inside text-sm">
                                    {profile.career_path.map((path)=>{
                                        return(<li className=" ">{path}</li>)
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* Profile Completion Section */}
                        <div className=" p-6 pt-4 w-60 mt-40 bg-white rounded-lg shadow-md mb-4 border-2 border-blue-600 text-sm" style={{ width: '' }}>
                            <h2 className="text-lg font-semibold mb-2">My CHAYAN Profile</h2>
                            <div className="mb-4 text-sm">
                                <p className="mb-2">Profile Completion: {parseInt(c * 100 / 11)}%</p>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                                         style={{width: `${c * 100 / 11}%`}}></div>
                                </div>
                            </div>
                            {profileSections.map((section, index) => (
                                <div key={index}
                                     onClick={()=>router.push('/editprofile')}
                                     className="flex cursor-pointer justify-between items-left mb-2 border-b border-dotted border-gray-300 pb-1">
                                    <p>{section.title}</p>
                                    {section.filled ? (
                                        <CircleCheck className="h-4 w-4 rounded-full text-green-600 bg-green-100 mt-1"/>
                                    ) : (
                                        <CircleStop className="h-4 w-4 rounded-full text-red-600 bg-red-100 mt-1"/>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Settings and Logout Buttons */}
                        <div
                            className="p-3 bg-white rounded-lg shadow-md flex justify-between items-center border-2 border-blue-600">
                            <Link href={'/editprofile'} className="flex items-center cursor-pointer">
                                <Settings/>
                                <span className=" ml-1 text-black-900 font-semibold">Settings</span>
                            </Link>
                            <div className="flex items-center">
                                <span onClick={handlelogout} className="text-blue-500 cursor-pointer">Logout</span>
                            </div>
                        </div>

                    </div>

                    {/* Right container */}
                    <div className="w-full h-fit" style={{marginTop: '-6px', marginLeft: '-8px'}}>
                        {/* Top section */}
                        <div className="w-full" style={{marginBottom: '-.8rem'}}>
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
                                    {/*<p className={`text-base text-center ${selectedSection === 'exploreOpportunities' ? 'text-white' : 'text-black opacity-50'}`}>*/}
                                    {/*    Liked: 10 | Applied: 3*/}
                                    {/*</p>*/}
                                    {selectedSection === 'exploreOpportunities' &&
                                        <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{
                                            borderBottom: '10px solid transparent',
                                            borderTop: '10px solid white'
                                        }}></div>}
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
                                    {selectedSection === 'learningGap' &&
                                        <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{
                                            borderBottom: '10px solid transparent',
                                            borderTop: '10px solid white'
                                        }}></div>}
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
                                    {selectedSection === 'buildResume' &&
                                        <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{
                                            borderBottom: '10px solid transparent',
                                            borderTop: '10px solid white'
                                        }}></div>}
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
                                    {/*<p className={`text-base text-center ${selectedSection === 'mockInterviews' ? 'text-white' : 'text-black opacity-50'}`}>*/}
                                    {/*    2/6 interviews practiced*/}
                                    {/*</p>*/}
                                    {selectedSection === 'mockInterviews' &&
                                        <div className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0" style={{
                                            borderBottom: '10px solid transparent',
                                            borderTop: '10px solid white'
                                        }}></div>}
                                </div>
                            </div>
                        </div>
                        {selectedSection === 'exploreOpportunities' && <OpportunitiesView/>}
                        {selectedSection === 'learningGap' && <LearningPathView/>}
                        {selectedSection === 'buildResume' && <ResumeBuilderView/>}
                        {selectedSection === 'mockInterviews' && <MockInterviewsView/>}
                    </div>

                </div>
            </div>
        );

    }

};

export default Dashboard;
