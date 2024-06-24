"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookmarkIcon, StarIcon } from "@heroicons/react/24/solid";

const JobDetail = () => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const id = "1"; // Hardcoded for demonstration

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs/${id}`);
                setJob(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setLoading(false);
            }
        };

        fetchJobDetail();
    }, [id]);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    const handleApply = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Job not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex items-center mb-6">
                <img
                    src={job.companyLogo}
                    alt={`${job.companyName} logo`}
                    className="h-20 w-20 mr-6 rounded-full border-2 border-gray-300 shadow-sm"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{job.companyName}</h1>
                    <h2 className="text-xl text-gray-600">{job.jobRole}</h2>
                </div>
                {job.employabilityScore >= 80 && (
                    <StarIcon className="h-8 w-8 text-yellow-500 ml-auto" />
                )}
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Job Location</h3>
                <p className="text-gray-600">{job.location}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">About Us</h3>
                <p className="text-gray-600">{job.aboutCompany}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">About the Role</h3>
                <p className="text-gray-600">{job.aboutRole}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Salary</h3>
                <p className="text-gray-600">{job.salary}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Mandatory Criteria</h3>
                <p className="text-gray-600">{job.mandatoryCriteria}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Qualifications</h3>
                <ul className="list-disc pl-6 text-gray-600">
                    {job.qualifications.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Additional Info</h3>
                <p className="text-gray-600">{job.additionalInfo}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">What We Offer</h3>
                <p className="text-gray-600">{job.whatWeOffer}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Restrictions</h3>
                <p className="text-gray-600">{job.restrictions}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Apply By</h3>
                <p className="text-gray-600">{new Date(job.applyBy).toLocaleDateString()}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Employability Score</h3>
                <p className="text-gray-600">{job.employabilityScore}</p>
            </div>
            <div className="flex justify-between mt-6">
                <button
                    className={`flex items-center px-4 py-2 ${bookmarked ? 'bg-red-500' : 'bg-gray-500'} text-white rounded-lg hover:${bookmarked ? 'bg-red-700' : 'bg-gray-700'}`}
                    onClick={handleBookmark}
                >
                    <BookmarkIcon className={`h-6 w-6 mr-2 transition-transform ${bookmarked ? 'transform scale-110' : ''}`} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleApply}
                >
                    Apply
                </button>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
                            onClick={handleClosePopup}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-6">Successfully Applied for {job.jobRole}</h2>
                        <p className="text-gray-600">Your application has been submitted. We will get back to you soon!</p>
                        <button
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={handleClosePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetail;
