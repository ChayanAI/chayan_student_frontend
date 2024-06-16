"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';

import OpportunitiesView from './OpportunitiesView';
import LearningPathView from './LearningPathView';
import ResumeBuilderView from './ResumeBuilderView';
import MockInterviewsView from './MockInterviewsView';


const Dashboard = () => {
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

    useEffect(() => {
        // Fetch profile data
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile');
                console.log(response.data);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-md mb-6">
                <h1 className="text-4xl text-center font-bold">CHAYAN - YOUR PLACEMENT COACH</h1>

            </div>


            <div className="flex flex-1">
                {/* Left container */}
                <div className="w-1/4 pr-6">
                    {/* Profile Card */}
                    <div className="mb-4 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                        <img
                            src="/media/images/300-1.jpg" // Replace with actual image source
                            alt="Profile"
                            className="h-24 w-24 rounded-full mb-4 shadow-lg"
                        />
                        <div className="w-full mb-4">
                            <h2 className="text-xl text-center font-semibold">Amit Malakar</h2>
                            <p className="text-sm text-center">B.Tech | 2nd Year</p>
                            <p className="text-sm text-center">CGPA: 9.17 | Personality: Good</p>
                        </div>
                        <div className="w-full">
                            <h2 className="text-xl font-semibold mb-2 text-center">Career Objectives</h2>
                            <ul className="list-disc list-inside text-sm space-y-2">
                                <li className="border-b border-dotted border-gray-300 pb-1">Web Developer</li>
                                <li className="border-b border-dotted border-gray-300 pb-1">DevOps Engineer</li>
                                <li className="border-b border-dotted border-gray-300 pb-1">AI Engineer</li>
                            </ul>
                        </div>
                    </div>

                    {/* Profile Completion Section */}
                    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-semibold mb-2">My CHAYAN Profile</h2>
                        <div className="mb-4">
                            <p className="mb-2">Profile Completion: {progress}%</p>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        {profileSections.map((section, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 border-b border-dotted border-gray-300 pb-1">
                                <p>{section.title}</p>
                                {section.filled ? (
                                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                ) : (
                                    <div className="h-4 w-4 rounded-full bg-red-500"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Settings and Logout Buttons */}
                    <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                        <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 0h1a2 2 0 002-2V7a2 2 0 00-2-2h-2.586A1.5 1.5 0 0017 3.414L14.586 1A2 2 0 0013 0H7a2 2 0 00-2 2v2.586A1.5 1.5 0 004.414 6L2 8.414V13a2 2 0 002 2h1m8-4h1a1 1 0 011 1v1a1 1 0 01-1 1h-1"></path>
                            </svg>
                            Settings
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Right container */}
                <div className="w-3/4 pl-6">
                    {/* Top section */}
                    <div className="mb-6">
                        <div className="grid grid-cols-4 gap-4">
                            <div
                                className={`p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 ${selectedSection === 'exploreOpportunities' ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setSelectedSection('exploreOpportunities')}
                            >
                                <h2 className="text-2xl text-center font-semibold mb-2">Explore Opportunities</h2>
                                <p className="text-lg text-center">Liked: 10 | Applied: 3</p>
                            </div>
                            <div
                                className={`p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 ${selectedSection === 'learningGap' ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setSelectedSection('learningGap')}
                            >
                                <h2 className="text-2xl text-center font-semibold mb-2">Skill Gap and Learning Path</h2>
                            </div>
                            <div
                                className={`p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 ${selectedSection === 'buildResume' ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setSelectedSection('buildResume')}
                            >
                                <h2 className="text-2xl text-center font-semibold mb-2">Build/ Customize Resume</h2>
                                <p className="text-lg text-center">Download</p>
                            </div>
                            <div
                                className={`p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 ${selectedSection === 'mockInterviews' ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setSelectedSection('mockInterviews')}
                            >
                                <h2 className="text-2xl text-center font-semibold mb-2">Mock Interviews</h2>
                                <p className="text-lg text-center">2/6 interviews practiced</p>
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
};

export default Dashboard;
