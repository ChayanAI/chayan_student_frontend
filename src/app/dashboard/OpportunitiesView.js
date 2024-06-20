import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';

const OpportunitiesView = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [likes, setLikes] = useState(20);
    const [likedJobs, setLikedJobs] = useState(new Set());
    const [applications, setApplications] = useState(20);
    const [skillRatings, setSkillRatings] = useState({ mustHave: [], goodToHave: [] });
    const [appliedJobs, setAppliedJobs] = useState(new Set()); // Track applied jobs

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/studentjob/jobs');
                setJobs(response.data);
                setSelectedJob(response.data[0]);
                fetchSkillsFromJob(response.data[0]);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleJobClick = (job) => {
        setSelectedJob(job);
        fetchSkillsFromJob(job);
    };

    const handleLike = (jobId) => {
        setLikedJobs((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(jobId)) {
                newSet.delete(jobId);
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [jobId]: (prevLikes[jobId] || 1) - 1,
                }));
            } else {
                newSet.add(jobId);
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [jobId]: (prevLikes[jobId] || 0) + 1,
                }));
            }
            return newSet;
        });
    };

    const handleApply = (jobId) => {
        setAppliedJobs((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.add(jobId);
            return newSet;
        });
        setLikes(likes + 1);
        setApplications(applications + 1);
    };

    const fetchSkillsFromJob = (job) => {
        const mustHaveSkills = job.skills_required !== 'None' ? job.skills_required.split(',').map(skill => ({ skill, rating: 0 })) : [];
        const goodToHaveSkills = job.skills_preferred !== 'None' ? job.skills_preferred.split(',').map(skill => ({ skill, rating: 0 })) : [];
        setSkillRatings({ mustHave: mustHaveSkills, goodToHave: goodToHaveSkills });
    };

    const handleRatingChange = (type, index, rating) => {
        const updatedRatings = { ...skillRatings };
        updatedRatings[type][index].rating = rating;
        setSkillRatings(updatedRatings);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex transition-transform duration-300 overflow-y-auto border-2 border-blue-500" style={{ minHeight: '40rem', height: '43rem' }}>
            {/* Left Column: Job Cards */}
            <div className="w-1/5 pr-4 overflow-y-auto" style={{ height: '100%', width: '27%' }}>
                {jobs.map((job, index) => (
                    <div
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        className={`p-2 mb-4 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 ${selectedJob && selectedJob.id === job.id ? 'border-blue-500' : 'border-transparent'} hover:shadow-lg`}
                    >
                        <div className="flex items-center mb-2">
                            <img
                                src={job.companyLogo || '/media/images/amazon_PNG21.png'}
                                alt={job.companyName}
                                className="h-12 w-12 mr-3" style={{ marginTop: '-5rem' }}
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <p className="text-sm text-gray-600 mb-1">Location: {job.location}</p>
                                <p className="text-sm text-gray-600 mb-1">CTC - {job.salary}</p>
                                <p className="text-sm text-gray-600 mb-1">Last Date - {new Date(job.last_date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600 mb-1">Branch - {job.branch_required}</p>
                                <p className="text-sm text-gray-600 mb-1">CGPA - {job.cgpa_required} and above</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => handleLike(job.id)}>
                                <span className={`text-lg ${likedJobs.has(job.id) ? 'text-blue-500' : 'text-green-500'}`}>{likedJobs.has(job.id) ? 'Liked' : 'Like'}</span>
                                <span className={`text-sm ${likedJobs.has(job.id) ? 'text-blue-500' : 'text-gray-600'}`}>{likes[job.id] || 0} {likedJobs.has(job.id) ? ' Students Liked' : 'Students Liked'}</span>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => handleApply(job.id)}>
                                <span className={`text-lg ${appliedJobs.has(job.id) ? 'text-blue-500' : 'text-green-500'}`}>{appliedJobs.has(job.id) ? 'Applied' : 'Apply'}</span>
                                <span className={`text-sm ${appliedJobs.has(job.id) ? 'text-blue-500' : 'text-gray-600'}`}>{applications} {appliedJobs.has(job.id) ? 'Students Applied' : 'Students Applied'}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>


            {/* Right Column: Job Details and Claim Candidacy */}
            <div className="w-4/5 pl-2 flex " style={{ height: '100%' }}>
                {selectedJob && (
                    <>
                        <div className="w-2/3 p-4 pl-6 bg-white rounded-lg shadow-md h-auto mr-4 overflow-y-auto border-2 border-blue-600" style={{ height: '100%', width: '62%' }}>
                            {/* Company Details */}
                            <div className="flex items-left mb-2">
                                <div>
                                    <h2 className="text-xl pt-0 mb-2 font-semibold">{selectedJob.companyName || 'Company Name'}</h2>
                                    <div className="flex space-x-32">
                                        <p className="text-gray-600">Sector - {selectedJob.sector}</p>
                                        <p className="text-gray-600">Product - {selectedJob.product}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mb-2 space-x-32">
                                <p className="text-gray-800"> {selectedJob.num_employees} 1-10 Employees</p>
                                <p className="text-gray-800">MNC - {selectedJob.is_mnc ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="flex mb-2 pb-2 space-x-32 border-b border-dotted border-gray-300">
                                <p className="text-gray-800"> {selectedJob.head_officd} Head office - </p>
                            </div>

                            {/* Job Role Information */}
                            <div className="mb-2">
                                <h2 className="text-xl font-semibold mb-1">{selectedJob.title}</h2>
                                <p className="text-gray-800 mb-2">Department | Location - {selectedJob.location || 'N/A'}</p>
                                <div className="grid grid-cols-3 gap-1 text-gray-800 border border-gray-300">
                                    {/* Header Row */}
                                    <div className="col-span-1 bg-blue-600 text-white text-center p-2"><strong></strong></div>
                                    <div className="col-span-1 bg-blue-600 text-white text-center p-2"><strong>Must Have</strong></div>
                                    <div className="col-span-1 bg-blue-600 text-white text-center p-2"><strong>Good to Have</strong></div>

                                    {/* Row 1 */}
                                    <div className="p-2   bg-gray-300 border-gray-300">CGPA/Pct</div>
                                    <div className="p-2  bg-gray-300 border-gray-300">{selectedJob.cgpa_required || 'None'}</div>
                                    <div className="p-2   bg-gray-300 border-gray-300">{selectedJob.cgpa_preferred || 'None'}</div>

                                    {/* Row 2 */}
                                    <div className="p-2  border-gray-300">Branch</div>
                                    <div className="p-2  border-gray-300">{selectedJob.branch_required || 'None'}</div>
                                    <div className="p-2  border-gray-300">N/A</div>

                                    {/* Row 3 */}
                                    <div className="p-2  bg-gray-300 border-gray-300">Certification</div>
                                    <div className="p-2  bg-gray-300 border-gray-300">{selectedJob.certification_required || 'None'}</div>
                                    <div className="p-2  bg-gray-300 border-gray-300">{selectedJob.certification_preferred || 'None'}</div>

                                    {/* Row 4 */}
                                    <div className="p-2  border-gray-300">Skills</div>
                                    <div className="p-2  border-gray-300">{selectedJob.skills_required || 'None'}</div>
                                    <div className="p-2  border-gray-300">{selectedJob.skills_preferred || 'None'}</div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="border p-4  rounded-lg mb-2">
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
                        </div>

                        {/* Claim Your Candidacy */}
                        <div className=" p-2 bg-white rounded-lg shadow-md h-auto overflow-y-auto" style={{ maxWidth: '100%' }}>
                            <h2 className="text-xl pt-2 text-center font-semibold mb-4">Claim Your Candidacy</h2>

                            {/* Must Have Skills */}
                            <h3 className="text-lg pl-2 font-semibold mb-2">Must Have Skills</h3>
                            <table className="min-w-full divide-y divide-gray-200 mb-6">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-3 text-left text-xs font-medium  tracking-wider"></th>
                                        <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 tracking-wider">Self Rating *</th>
                                        <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 tracking-wider">Assessment</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {skillRatings.mustHave.map((skill, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</td>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`cursor-pointer text-xl ${i < skill.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            onClick={() => handleRatingChange('mustHave', index, i + 1)}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-2 whitespace-nowrap text-sm text-red-500">Pending</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Good to Have Skills */}
                            <h3 className="text-lg pl-2 font-semibold mb-2">Good to Have Skills</h3>
                            <table className="min-w-full divide-y divide-gray-200 mb-6">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-900  tracking-wider"></th>
                                        <th className="px-3 py-3 text-left text-sm font-medium text-gray-900  tracking-wider">Self Rating *</th>
                                        <th className="px-3 py-3 text-left text-sm font-medium text-gray-900  tracking-wider">Assessment</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {skillRatings.goodToHave.map((skill, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</td>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`cursor-pointer text-xl ${i < skill.rating ? 'text-red-500' : 'text-gray-300'}`}
                                                            onClick={() => handleRatingChange('goodToHave', index, i + 1)}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-2 whitespace-nowrap text-sm text-red-500">Pending</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Apply Button */}
                            <div className="flex justify-center mt-4 mb-4" style={{ marginTop: '-4px' }}>
                                <button className="bg-blue-600 hover:bg-blue-800 text-white py-3 px-6 rounded transition-transform duration-300 hover:scale-105 ">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default OpportunitiesView;
