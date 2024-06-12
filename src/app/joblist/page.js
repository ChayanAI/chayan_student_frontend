"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookmarkIcon, StarIcon } from '@heroicons/react/24/solid';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [showAppliedPopup, setShowAppliedPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
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
    }, []);

    const fetchJobDetails = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
            setSelectedJob(response.data);
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    const handleBookmarkJob = (jobId) => {
        setBookmarkedJobs([...bookmarkedJobs, jobId]);
    };


    const handleClosePopup = () => {
        setShowAppliedPopup(false);
    };


    const handleBookmarkClick = (jobId) => {
        const isBookmarked = bookmarkedJobs.includes(jobId);
        if (!isBookmarked && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                handleBookmarkJob(jobId);
                setIsAnimating(false);
            }, 1000); // Adjust the duration as needed
        }
    };

    const handleApplyJob = (jobId) => {
        setAppliedJobs([...appliedJobs, jobId]);
        setShowAppliedPopup(true);
        if (!bookmarkedJobs.includes(jobId)) {
            setBookmarkedJobs([...bookmarkedJobs, jobId]);
        }
    };


    const handleJobClick = (jobId) => {
        fetchJobDetails(jobId);
    };

    const renderJobCard = (job) => {
        const isBookmarked = bookmarkedJobs.includes(job.id);
        const isApplied = appliedJobs.includes(job.id);

        return (
            <div
                key={job.id}
                className="p-4 bg-white rounded-lg mb-8 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => handleJobClick(job.id)}
            >
                <div className="flex items-center mb-4">
                    <img src={job.companyLogo} alt={`${job.companyName} logo`} className="h-12 w-12 mr-4 rounded-full" />
                    <div>
                        <h2 className="text-lg font-semibold">{job.companyName}</h2>
                        <h3 className="text-md">{job.jobRole}</h3>
                    </div>
                    {job.employabilityScore >= 80 && (
                        <StarIcon className="h-6 w-6 text-yellow-500 ml-auto" />
                    )}
                </div>
                <div className="mb-4">
                    {/* <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                    <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
                    <p className="text-gray-600"><strong>Mandatory Criteria:</strong> {job.mandatoryCriteria}</p>
                    <p className="text-gray-600"><strong>Key Responsibilities:</strong></p>
                    <ul className="list-disc pl-5">
                        {job.keyResponsibilities && job.keyResponsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul> */}

                    <p className="text-gray-600"><strong>Apply By:</strong> {new Date(job.applyBy).toLocaleDateString()}</p>
                    <p className="text-gray-600"><strong>Employability Score:</strong> {job.employabilityScore}</p>
                </div>
                <div className="flex justify-between">
                    <button
                        className={`px-4 py-2 rounded ${isBookmarked ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkClick(job.id);
                        }}
                    >
                        <BookmarkIcon className={`h-6 w-6 ${isBookmarked ? 'text-white' : 'text-gray-500'} ${isAnimating ? 'animate-ping' : ''}`} />
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${isApplied ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleApplyJob(job.id);
                        }}
                    >
                        {isApplied ? 'Applied' : 'Apply'}
                    </button>
                    {job.employabilityScore < 80 && (
                        <button className="px-4 py-2 rounded bg-yellow-500 text-white">
                            Learning Path
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const sortedJobs = [...jobs].sort((a, b) => {
        const aApplied = appliedJobs.includes(a.id);
        const bApplied = appliedJobs.includes(b.id);
        const aBookmarked = bookmarkedJobs.includes(a.id);
        const bBookmarked = bookmarkedJobs.includes(b.id);

        if (aApplied && bApplied) {
            return new Date(a.applyBy) - new Date(b.applyBy);
        }
        if (aApplied && !bApplied) return -1;
        if (!aApplied && bApplied) return 1;
        if (aBookmarked && bBookmarked) {
            return new Date(a.applyBy) - new Date(b.applyBy);
        }
        if (aBookmarked && !bBookmarked) return -1;
        if (!aBookmarked && bBookmarked) return 1;

        return new Date(a.applyBy) - new Date(b.applyBy);
    });

    return (
        <div className="flex max-w-6xl mx-auto px-4 py-6 h-screen">
            <div className={`${selectedJob ? 'w-1/3' : 'w-full'} pr-4 overflow-y-auto`}>
                <h1 className="text-3xl font-semibold mb-8">Job Listings</h1>
                {sortedJobs.map(renderJobCard)}
            </div>
            {selectedJob && (
                <div className="w-2/3 pl-4 overflow-y-auto">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">{selectedJob.companyName}</h2>
                        <h3 className="text-xl mb-4">{selectedJob.jobRole}</h3>
                        <img src={selectedJob.companyLogo} alt={`${selectedJob.companyName} logo`} className="h-16 w-16 mb-4 rounded-full" />
                        <p className="text-gray-600 mb-4"><strong>Location:</strong> {selectedJob.location}</p>
                        <p className="text-gray-600 mb-4"><strong>Salary:</strong> {selectedJob.salary}</p>
                        <p className="text-gray-600 mb-4"><strong>Openings:</strong> {selectedJob.openings}</p>
                        <p className="text-gray-600 mb-4"><strong>Mandatory Criteria:</strong> {selectedJob.mandatoryCriteria}</p>
                        {/* <p className="text-gray-600 mb-4"><strong>Key Responsibilities:</strong></p> */}
                        {selectedJob && selectedJob.keyResponsibilities && (
                            <>
                                <p className="text-gray-600 mb-4"><strong>Responsibilities:</strong></p>
                                <ul className="list-disc pl-5 mb-4">
                                    {selectedJob.responsibilities.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ul>

                            </>
                        )}

                        <p className="text-gray-600 mb-4"><strong>Apply By:</strong> {new Date(selectedJob.applyBy).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-4"><strong>Employability Score:</strong> {selectedJob.employabilityScore}</p>
                        <p className="text-gray-600 mb-4"><strong>Department:</strong> {selectedJob.department}</p>
                        {/* <p className="text-gray-600 mb-4"><strong>Responsibilities:</strong> {selectedJob.responsibilities}</p> */}
                        <p className="text-gray-600 mb-4"><strong>Product:</strong> {selectedJob.product}</p>
                        <p className="text-gray-600 mb-4"><strong>Sector:</strong> {selectedJob.sector}</p>
                        <p className="text-gray-600 mb-4"><strong>CGPA Required:</strong> {selectedJob.cgpa_required}</p>
                        <p className="text-gray-600 mb-4"><strong>Percentage Required:</strong> {selectedJob.percentage_required}%</p>
                        <p className="text-gray-600 mb-4"><strong>Certification Required:</strong> {selectedJob.certification_required}</p>
                        <p className="text-gray-600 mb-4"><strong>Skills Required:</strong> {selectedJob.skills_required}</p>
                        <p className="text-gray-600 mb-4"><strong>CGPA Preferred:</strong> {selectedJob.cgpa_preferred}</p>
                        <p className="text-gray-600 mb-4"><strong>Percentage Preferred:</strong> {selectedJob.percentage_preferred}%</p>
                        <p className="text-gray-600 mb-4"><strong>Branch Preferred:</strong> {selectedJob.branch_preferred}</p>
                    </div>
                </div>
            )}
            {showAppliedPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <p className="text-xl font-semibold mb-4">Applied Successfully</p>
                        <div className="flex justify-end">
                            {selectedJob?.employabilityScore < 80 && (
                                <button className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 mr-4">
                                    Go to Learning Path
                                </button>
                            )}
                            <button
                                className="rounded-md bg-gray-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300"
                                onClick={handleClosePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobListing;
