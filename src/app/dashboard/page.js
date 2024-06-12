"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StudentDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedView, setSelectedView] = useState('companiesFollowing');

    useEffect(() => {
        // Fetch jobs data
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs');
                console.log(response.data)
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();

    })

    const renderJobCard = (job) => (
        <div key={job.id} className="p-4 bg-white rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-2">
                <img src={job.companyLogo} alt={`${job.companyName} logo`} className="h-12 w-12 mr-4 rounded-full" />
                <div>
                    <h2 className="text-lg font-semibold">{job.companyName}</h2>
                    <p className="text-sm text-gray-500">Role : {job.jobRole}</p>
                    <p className="text-sm text-gray-500">Location: {job.location}</p>
                    <p className="text-sm text-gray-500">Salary: ${job.salary.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Apply by: {new Date(job.applyBy).toLocaleDateString()}</p>
                    <div className="mt-2">
                        <p className="text-sm text-gray-600"><span className="font-semibold">Key Responsibilities:</span></p>
                        {/* <ul className="list-disc pl-5">
                            {job.keyResponsibilities.slice(0, 2).map((responsibility, index) => (
                                <li key={index} className="text-sm text-gray-600">{responsibility}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className="max-w-10xl mx-auto p-6 flex space-x-8">
            <div className="flex-2">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img src="https://via.placeholder.com/100" alt="Profile" className="h-24 w-24 rounded-full mr-6" />
                            <div>
                                <h1 className="text-2xl font-semibold">Amit Malakar</h1>
                                <p className="text-gray-600">Student | B. Tech, 2nd Year</p>
                                <div className="flex mt-5 space-x-10">
                                    <div className="p-2 rounded-md border border-black text-center">
                                        <p className="text-2xl font-bold">10</p>
                                        <p className="text-gray-600">Companies Following</p>
                                    </div>
                                    <div className="p-2 rounded-md border border-black text-center">
                                        <p className="text-2xl font-bold">5</p>
                                        <p className="text-gray-600">Learning Path (Courses)</p>
                                    </div>
                                    <div className="p-2 rounded-md border border-black text-center">
                                        <p className="text-2xl font-bold">3</p>
                                        <p className="text-gray-600">Mock Interviews</p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4 space-x-4">
                                    <button
                                        className={`p-2 rounded ${selectedView === 'companiesFollowing' ? 'text-blue-500' : 'text-gray-600 hover:font-bold'}`}
                                        onClick={() => setSelectedView('companiesFollowing')}
                                    >
                                        Companies Following
                                    </button>
                                    <button
                                        className={`p-2 rounded ${selectedView === 'resume' ? 'text-blue-500' : 'text-gray-600 hover:font-bold'}`}
                                        onClick={() => setSelectedView('resume')}
                                    >
                                        AI Powered Resume
                                    </button>
                                    <button
                                        className={`p-2 rounded ${selectedView === 'mockInterviews' ? 'text-blue-500' : 'text-gray-600 hover:font-bold'}`}
                                        onClick={() => setSelectedView('mockInterviews')}
                                    >
                                        AI Powered Mock Interviews
                                    </button>
                                    <button
                                        className={`p-2 rounded ${selectedView === 'skillAssessment' ? 'text-blue-500' : 'text-gray-600 hover:font-bold'}`}
                                        onClick={() => setSelectedView('skillAssessment')}
                                    >
                                        Skill Assessment
                                    </button>
                                    <button
                                        className={`p-2 rounded ${selectedView === 'quickInterviewTips' ? 'text-blue-500' : 'text-gray-600 hover:font-bold'}`}
                                        onClick={() => setSelectedView('quickInterviewTips')}
                                    >
                                        Quick Interview Tips
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600 mb-1">Profile Completion: 80%</p>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    {selectedView === 'companiesFollowing' && (
                        <div style={{ overflowX: 'auto' }}>
                            <h2 className="text-xl font-semibold mb-4">Companies Following</h2>
                            <div className="flex space-x-4">
                                {jobs.map(renderJobCard)}
                            </div>
                        </div>
                    )}

                    {selectedView === 'resume' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">AI Powered Resume</h2>
                            {/* Add content for AI Powered Resume */}
                        </div>
                    )}
                    {selectedView === 'mockInterviews' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">AI Powered Mock Interviews</h2>
                            {/* Add content for AI Powered Mock Interviews */}
                        </div>
                    )}
                    {selectedView === 'skillAssessment' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Skill Assessment</h2>
                            {/* Add content for Skill Assessment */}
                        </div>
                    )}
                    {selectedView === 'quickInterviewTips' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Quick Interview Tips</h2>
                            {/* Add content for Quick Interview Tips */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
