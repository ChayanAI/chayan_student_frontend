import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';

const OpportunitiesView = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [likes, setLikes] = useState(20);
    const [liked, setLiked] = useState(false);
    const [applications, setApplications] = useState(20);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [skillRatings, setSkillRatings] = useState([]);

    useEffect(() => {
        // Fetch jobs data
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs');
                setJobs(response.data);
                setSelectedJob(response.data[0]); // Select the first job by default
                console.log("data", response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleApplyClick = () => {
        setIsModalOpen(true);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            fetchSkillsFromJob(); // Fetch skills when modal is opened
        }
    };

    // Fetch skills from selected job details
    const fetchSkillsFromJob = () => {
        const skills = [];
        if (selectedJob.skills_required && selectedJob.skills_required !== 'None') {
            skills.push({ skill: 'Skills Required', rating: 0 });
        }
        if (selectedJob.skills_preferred && selectedJob.skills_preferred !== 'None') {
            skills.push({ skill: 'Skills Preferred', rating: 0 });
        }
        setSkillRatings(skills);
    };

    // Function to handle applying now
    const handleApplyNow = () => {
        // Implement application submission logic here
        // For demo, just close the modal
        setIsModalOpen(false);
    };

    // Function to handle rating change for a skill
    const handleRatingChange = (index, rating) => {
        const updatedRatings = [...skillRatings];
        updatedRatings[index].rating = rating;
        setSkillRatings(updatedRatings);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md flex transition-transform duration-300" style={{ minHeight: '40rem', height: '52rem' }}>
            {/* Left Column: Job Cards */}
            <div className="w-1/4 pr-4 overflow-y-auto" style={{ height: '100%', width: '35%' }}>
                {jobs.map((job, index) => (
                    <div
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        className={`p-4 mb-4 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 ${selectedJob && selectedJob.id === job.id ? 'border-blue-500' : 'border-transparent'} hover:shadow-lg`}
                    >
                        <div className="flex items-center mb-2">
                            <img src={job.companyLogo || '/media/images/300-1.jpg'} alt={job.companyName} className="h-12 w-12 mr-4 rounded-full" />
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Location: {job.location}</p>
                        <p className="text-sm text-gray-600 mb-1">Salary: {job.salary}</p>
                        <p className="text-sm text-gray-600 mb-1">Apply by: {new Date(job.last_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 mb-1">Branch Required: {job.branch_required}</p>
                        <p className="text-sm text-gray-600 mb-1">CGPA Required: {job.cgpa_required}</p>
                        <div className="flex items-center mt-2">
                            <button className={`flex items-center bg-transparent outline-none border-0 text-gray-600 ${liked ? 'text-red-600' : 'hover:text-red-600'}`} onClick={handleLike}>
                                <FaHeart className={`mr-1 text-xl ${liked ? 'text-red-600' : ''}`} />
                                <span>{likes} Likes</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column: Job Details */}
            <div className="w-3/4 pl-4" style={{ height: '100%', overflowY: 'auto' }}>
                {selectedJob && (
                    <div className="p-6 bg-white rounded-lg shadow-md h-auto">
                        {/* Company Details */}
                        <div className="flex items-center mb-2">
                            {/* <img src={selectedJob.companyLogo || '/default-logo.png'} alt={selectedJob.companyName || 'Company Logo'} className="h-16 w-16 mr-4 rounded-full" /> */}
                            <div>
                                <h2 className="text-2xl mb-2 font-semibold">{selectedJob.companyName || 'Company Name'}</h2>
                                <div className="flex space-x-72">
                                    <p className="text-gray-600"><strong>Sector:</strong> {selectedJob.sector}</p>
                                    <p className="text-gray-600"><strong>Product:</strong> {selectedJob.product}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-4 space-x-48">
                            <p className="text-gray-800"><strong>Number of Employees:</strong> {selectedJob.num_employees || 'N/A'}</p>
                            <p className="text-gray-800"><strong>MNC:</strong> {selectedJob.is_mnc ? 'Yes' : 'No'}</p>
                        </div>

                        {/* Job Role Information */}
                        <div className="border p-4 rounded-lg mb-4">
                            <h2 className="text-xl font-semibold mb-2">{selectedJob.title}</h2>
                            <p className="text-gray-800 mb-2"><strong>Location:</strong> {selectedJob.location || 'N/A'}</p>
                            <div className="grid grid-cols-3 gap-4 text-gray-800 border border-gray-300">
                                {/* Header Row */}
                                <div className="col-span-1 bg-blue-600 text-white p-2"><strong>Requirements</strong></div>
                                <div className="col-span-1 bg-blue-600 text-white p-2"><strong>Must Have</strong></div>
                                <div className="col-span-1 bg-blue-600 text-white p-2"><strong>Good to Have</strong></div>

                                {/* Row 1 */}
                                <div className="p-2 border-t border-gray-300"><strong>CGPA</strong></div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.cgpa_required || 'None'}</div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.cgpa_preferred || 'None'}</div>

                                {/* Row 2 */}
                                <div className="p-2 border-t border-gray-300"><strong>Branch</strong></div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.branch_required || 'None'}</div>
                                <div className="p-2 border-t border-gray-300">N/A</div>

                                {/* Row 3 */}
                                <div className="p-2 border-t border-gray-300"><strong>Certification</strong></div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.certification_required || 'None'}</div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.certification_preferred || 'None'}</div>

                                {/* Row 4 */}
                                <div className="p-2 border-t border-gray-300"><strong>Skills</strong></div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.skills_required || 'None'}</div>
                                <div className="p-2 border-t border-gray-300">{selectedJob.skills_preferred || 'None'}</div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="border p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold mb-2">Job Description</h3>
                            <p className="text-gray-800 mb-2">{selectedJob.description}</p>
                        </div>

                        {/* Key Responsibilities */}
                        <div className="border p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold mb-2">Key Responsibilities</h3>
                            <ul className="list-disc list-inside text-gray-800">
                                {selectedJob.responsibilities_array.map((resp, index) => (
                                    <li key={index}>{resp}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Apply Button */}
                        <div className="flex justify-end mt-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition-transform duration-300 hover:scale-105" onClick={handleApplyClick}>
                                Apply Now <span>({applications} applied)</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Apply Now */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-2/3">
                        <h2 className="text-xl font-semibold mb-4">Claim Your Candidacy</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Self Rating</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending for Assessment</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {skillRatings.map((skill, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.skill}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {/* Star rating */}
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`cursor-pointer text-xl ${i < skill.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                            onClick={() => handleRatingChange(index, i + 1)}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pending</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-transform duration-300 hover:scale-105" onClick={handleApplyNow}>
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OpportunitiesView;
