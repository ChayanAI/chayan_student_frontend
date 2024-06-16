"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './dashboardv1.module.css';
import moment from 'moment';

const StudentDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedView, setSelectedView] = useState('companiesFollowing');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs');
                setJobs(response.data);
                console.log("data", response.data)
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const renderJobCard = (job) => {
        // Calculate days remaining to apply
        const daysRemaining = Math.ceil((new Date(job.last_date) - new Date()) / (1000 * 60 * 60 * 24));

        // Format date for display
        const applyByDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(job.last_date));

        // Determine color based on days remaining
        let colorClass = '';
        if (daysRemaining < 14) {
            colorClass = 'bg-red-500';
        } else if (daysRemaining > 14) {
            colorClass = 'bg-yellow-500';
        } else {
            colorClass = 'bg-blue-500'; // Default color if exactly 14 days remaining
        }

        return (
            <div
                key={job.id}
                className={`${styles.jobCard} rounded-lg shadow-md mb-4 relative overflow-hidden border border-transparent hover:border-blue-500`}
                style={{ transition: 'border-color 0.3s ease' }}
            >
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-300 flex-shrink-0">
                            <img
                                src={job.companyLogo || '/media/images/300-1.jpg'}
                                alt={`${job.companyName} logo`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <div className={`text-white text-base font-semibold rounded-full px-4 py-2 ${colorClass}`}>
                            {daysRemaining} days remaining
                        </div>
                        {/* <div className={`absolute right-0 top-0 -mt-1.5 w-0 h-0 border-t-2 border-r-2 border-b-2 ${colorClass}`}></div> */}
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2">Job Profile - {job.title}</h2>
                    <h3 className="text-lg font-medium text-gray-500 mb-4">Skills Looking For -</h3>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="my-4">
                        {job.skills_required.split(',').map((skill, index) => (
                            <div key={index} className="flex items-center justify-between border-dotted border-gray-400 border-b-2 py-4">
                                <p className="text-base text-gray-600">{skill.trim()}</p>
                                <p className="text-base text-gray-600">High</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between" style={{ marginTop: '35px' }}>
                        <div className="flex flex-col items-center border-dotted border-gray-400 border-2 rounded-lg p-4">
                            <p className="text-lg text-gray-600 font-bold mb-1">
                                {applyByDate}
                            </p>
                            <p className="text-base text-gray-400">
                                Expected Date
                            </p>
                        </div>
                        <div className="flex flex-col items-center border-dotted border-gray-400 border-2 rounded-lg p-4">
                            <p className="text-lg text-gray-600 font-bold mb-1">
                                ${job.salary.toLocaleString()}
                            </p>
                            <p className="text-base text-gray-400">
                                Package
                            </p>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end p-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Learning Path
                    </button>
                </div>
            </div>
        );
    };




    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(jobs.length / itemsPerPage)));
    };

    const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleButtonClick = (view) => {
        setSelectedView(view);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6 flex space-x-8">
            <div className="flex-2 w-full">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="mt-6 flex items-center">
                            <img
                                src="/media/images/300-1.jpg"
                                alt="Profile"
                                className="h-36 w-36 rounded-md mr-6"
                                style={{ objectFit: 'cover', marginRight: '2rem' }}
                            />
                            <div>
                                <h1 className="text-2xl font-semibold">Amit Malakar</h1>
                                <p className="mt-1 text-gray-700">Student | B. Tech, 2nd Year</p>
                                <div className="flex mt-8 space-x-10">
                                    <div className="p-4 rounded-md border border-black border-dotted text-center" style={{ width: '13rem' }}>
                                        <p className="text-2xl font-bold">10</p>
                                        <p className="text-gray-600">Companies Following</p>
                                    </div>
                                    <div className="p-4 rounded-md border border-black border-dotted text-center" style={{ width: '15rem' }}>
                                        <p className="text-2xl font-bold">5</p>
                                        <p className="text-gray-600">Learning Path (Courses)</p>
                                    </div>
                                    <div className="p-4 rounded-md border border-black border-dotted text-center" style={{ width: '10rem' }}>
                                        <p className="text-2xl font-bold">3</p>
                                        <p className="text-gray-600">Mock Interviews</p>
                                    </div>
                                    <div className="mt-4 text-right" style={{ marginLeft: '4rem' }}>
                                        <p className="text-gray-600 mb-1">Profile Completion: 80%</p>
                                        <div className="w-full bg-gray-200 h-2 rounded-full">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-8 space-x-2">
                        <button
                            className={`${styles.button} ${selectedView === 'companiesFollowing' ? styles.active : ''}`}
                            onClick={() => handleButtonClick('companiesFollowing')}
                            style={{ fontSize: '1.2rem' }}
                        >
                            Companies Following
                        </button>
                        <button
                            className={`${styles.button} ${selectedView === 'resume' ? styles.active : ''}`}
                            onClick={() => handleButtonClick('resume')}
                            style={{ fontSize: '1.2rem' }}
                        >
                            AI Powered Resume
                        </button>
                        <button
                            className={`${styles.button} ${selectedView === 'mockInterviews' ? styles.active : ''}`}
                            onClick={() => handleButtonClick('mockInterviews')}
                            style={{ fontSize: '1.2rem' }}
                        >
                            AI Powered Mock Interviews
                        </button>
                        <button
                            className={`${styles.button} ${selectedView === 'skillAssessment' ? styles.active : ''}`}
                            onClick={() => handleButtonClick('skillAssessment')}
                            style={{ fontSize: '1.2rem' }}
                        >
                            Skill Assessment
                        </button>
                        <button
                            className={`${styles.button} ${selectedView === 'quickInterviewTips' ? styles.active : ''}`}
                            onClick={() => handleButtonClick('quickInterviewTips')}
                            style={{ fontSize: '1.2rem' }}
                        >
                            Quick Interview Tips
                        </button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full">
                    {selectedView === 'companiesFollowing' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Companies Following</h2>
                            <div className={styles.jobCardsContainer}>
                                {paginatedJobs.map(renderJobCard)}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    &lt; Previous
                                </button>
                                <span>Page {currentPage}</span>
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={handleNextPage}
                                    disabled={currentPage === Math.ceil(jobs.length / itemsPerPage)}
                                >
                                    Next &gt;
                                </button>
                            </div>
                        </div>
                    )}
                    {selectedView === 'resume' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">AI Powered Resume</h2>
                        </div>
                    )}
                    {selectedView === 'mockInterviews' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">AI Powered Mock Interviews</h2>
                        </div>
                    )}
                    {selectedView === 'skillAssessment' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Skill Assessment</h2>
                        </div>
                    )}
                    {selectedView === 'quickInterviewTips' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Quick Interview Tips</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
