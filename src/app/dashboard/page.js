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
    const [currentStep, setCurrentStep] = useState(0);
    const [profileSections, setProfileSections] = useState([
      { title: 'Personal Information', filled: false, step: 0 },
      { title: 'Academics', filled: false, step: 1 },
      { title: 'Career Objectives', filled: true, step: 2 },
      { title: 'Skills Assessment', filled: true, step: 3 },
      { title: 'Internships', filled: false, step: 4 },
      { title: 'Projects', filled: false, step: 5 },
      { title: 'Volunteer work', filled: false, step: 6 },
      { title: 'Extra-curricular activities', filled: false, step: 7 },
      { title: 'Certificates', filled: false, step: 8 },
      { title: 'Awards & Distinctions', filled: false, step: 9 },
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
                    if (res.data.certificates.length > 0) {
                        setProfileSections((prev) => ([...prev.slice(0, 8), {
                            title: 'Certificates',
                            filled: true
                        }, ...prev.slice(9)]))
                        q += 1
                    }
                    if (res.data.awards.length > 0) {
                        setProfileSections((prev) => ([...prev.slice(0, 9), {
                            title: 'Awards & Distinctions',
                            filled: true
                        }, ...prev.slice(10)]))
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

        return `${studyYear}${suffix}`;
    }

    const handleSectionClick = (step) => {
        router.push(`/editprofile?step=${step}`);
        console.log("Current step from URL:", step);
    };

    const handlelogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentauth/clear`).then(() => {
            router.push('/login')
        })

    }

    if (!loader) {
        return (<></>)
    } else {
        return (
            <div className="w-full min-h-screen p-10 bg-gray-100 flex gap-6">

                {/* Left Profile container */}
                <div className="w-1/5 h-fit p-4 relative bg-white rounded-lg shadow-md flex flex-col items-center border border-[#C4C4CD]" style={{ zIndex: 1, top: '21%' }}>
                    <div className="absolute top-0 right-0 px-4 py-2 text-xs rounded-tr-lg rounded-bl-lg bg-red-600 text-white">Complete Profile</div>
                    <img
                        src={pfp?(pfp):('/media/images/300-1.jpg')} // Replace with actual image source
                        alt="Profile"
                        className="h-28 w-28 object-cover rounded-full border-4 border-white mt-6"
                        style={{zIndex: 1, top: '-27%', left: '9%'}}
                    />
                    <div className="px-3 mb-4 w-full text-xs text-center">
                        <p className="mb-1 text-right font-light text-gray-700">{parseInt(profileSections.filter(section => section.filled).length * 100 / profileSections.length)}% Complete</p>
                        <div className="w-full bg-[#FFF8E7] h-1 rounded-full">
                          <div className="bg-[#FDDD8C] h-1 rounded-full"
                               style={{ width: `${profileSections.filter(section => section.filled).length * 100 / profileSections.length}%` }}></div>
                        </div>
                    </div>
                    <div className="mx-auto mb-4 text-center">
                        <h2 className="text-lg font-semibold">{profile.first_name} {profile.last_name}</h2>
                        <p className="text-md text-gray-600">Web Developer</p>
                    </div>                    
                    <div className="w-full p-5 mx-4 mt-2 mb-4 bg-[#ECF5FF] rounded-lg flex flex-wrap gap-x-10">
                        <div className="flex flex-col my-2">
                            <p className="text-xs text-gray-400">Branch</p>
                            <p className="text-sm text-gray-600 font-medium">{profile.degree} - {profile.branch}</p>
                        </div>
                        <div className="flex flex-col my-2">
                            <p className="text-xs text-gray-400">Year</p>
                            <p className="text-sm text-gray-600 font-medium">{calculateYearOfStudy(profile.course_started)}</p>
                        </div>
                        <div className="flex flex-col my-2">
                            <p className="text-xs text-gray-400">CGPA</p>
                            <p className="text-sm text-gray-600 font-medium">{profile.cgpa}</p>
                        </div>
                        <div className="flex flex-col my-2">
                            <p className="text-xs text-gray-400">Personality</p>
                            <p className="text-sm text-gray-600 font-medium">INTJ</p>
                        </div>
                        <div className="flex flex-col my-2">
                            <p className="text-xs text-gray-400">College</p>
                            <p className="text-sm text-gray-600 font-medium">{profile.college_name}</p>
                        </div>
                    </div>
                    <div className="w-full px-4 flex flex-wrap gap-x-4 mb-4 text-center">
                        <p className="text-black font-medium text-sm mb-2">Incomplete Sections</p>
                        {profileSections.map((section, index) => (
                          !section.filled && (
                            <div
                              key={index}
                              onClick={() => handleSectionClick(index)}
                              className="flex cursor-pointer justify-between items-center mb-2 pb-1 text-xs"
                            >
                              <p className="text-white bg-red-600 px-4 py-2 rounded-tr-lg rounded-bl-lg">{section.title}</p>
                            </div>
                          )
                        ))}
                    </div>
                </div>

                {/* Profile Completion Section */}
                {/* <div className="p-6 pt-4 w-60 mt-40 bg-white rounded-lg shadow-md mb-4 border-2 border-blue-600 text-sm" style={{ width: '' }}>
                          <h2 className="text-lg font-semibold mb-2">My CHAYAN Profile</h2>
                          
                          
                </div> */}

                {/* Settings and Logout Buttons */}
                {/* <div
                            className="p-3 bg-white rounded-lg shadow-md flex justify-between items-center border-2 border-blue-600">
                            <Link href={'/editprofile'} className="flex items-center cursor-pointer">
                                <Settings/>
                                <span className=" ml-1 text-black-900 font-semibold">Settings</span>
                            </Link>
                            <div className="flex items-center">
                                <span onClick={handlelogout} className="text-blue-500 cursor-pointer">Logout</span>
                            </div>
                </div> */}


                {/* Right container */}
                <div className="w-4/5 h-fit">
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
        );

    }

};

export default Dashboard;
