import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FaHeart, FaStar} from 'react-icons/fa';
import StarRating from "../../components/StarRating";

const OpportunitiesView = () => {
    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState()
    const [selectedJob, setSelectedJob] = useState(null);
    const [likes, setLikes] = useState(20);
    const [likedJobs, setLikedJobs] = useState(new Set());
    const [applications, setApplications] = useState(20);
    const [skillRatings, setSkillRatings] = useState({mustHave: [], goodToHave: []});
    const [appliedJobs, setAppliedJobs] = useState(new Set()); // Track applied jobs
    const [company, setCompany] = useState(''); // Store the company name
    const [loader, setLoader] = useState(false)
    const [ratingData, setRatingData] = useState({})

    const [rating, setRating] = useState(0);
    useEffect(() => {
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                setUserId(res.data.id)
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/getlikesbyId`, {user_id: res.data.id}).then((res) => {
                    let f = []
                    res.data.map((item) => {
                        f.push(item.job_id)
                    })
                    setLikedJobs(new Set(f))
                    // console.log(new Set(f))
                })

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getrating`, {user_id: res.data.id}).then((res) => {
                    // console.log(res.data)
                    res.data.map(async (item) => {
                        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getskillname`, {skill_id: item.skill_id}).then((res) => {
                            // console.log(res.data)
                            setRatingData((prev) => {
                                return ({...prev, [res.data.name]: item.rating})
                            })
                        })
                    })
                })
            })

            setLoader(true)
        })()

    }, [])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs`);
                setJobs(response.data);
                // console.log("hi", response.data)
                setSelectedJob(response.data[0]);
                fetchSkillsFromJob(response.data[0]);
                fetchCompany(response.data[0].recruiter_id);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleJobClick = (job) => {
        setSelectedJob(job);
        fetchSkillsFromJob(job);
        fetchCompany(job.recruiter_id);
    };

    const handleLike = async (jobId) => {
        await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
            setLikedJobs((prevSet) => {
                const newSet = new Set(prevSet);
                if (newSet.has(jobId)) {
                    axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/unlike`, {
                        user_id: res.data.id,
                        job_id: jobId
                    }).then((res) => {
                        newSet.delete(jobId);
                        setLikes((prevLikes) => ({
                            ...prevLikes,
                            [jobId]: (prevLikes[jobId] || 1) - 1,
                        }));
                    })

                } else {
                    axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/like`, {
                        user_id: res.data.id,
                        job_id: jobId
                    }).then((res) => {
                        newSet.add(jobId);
                        setLikes((prevLikes) => ({
                            ...prevLikes,
                            [jobId]: (prevLikes[jobId] || 0) + 1,
                        }));
                    })

                }
                // console.log(newSet)
                return newSet;
            });

        })

        // console.log(likedJobs)

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

        // Handle mustHaveSkills
        let mustHaveSkills = [];
        if (job.skills_required && job.skills_required !== 'None') {
            mustHaveSkills = job.skills_required.split(', ').map(skill => ({skill, rating: 0}));
        }

        // Handle goodToHaveSkills
        let goodToHaveSkills = [];
        if (job.skills_preferred && job.skills_preferred !== 'None') {
            goodToHaveSkills = job.skills_preferred.split(', ').map(skill => ({skill, rating: 0}));
        }

        setSkillRatings({mustHave: mustHaveSkills, goodToHave: goodToHaveSkills});
    };

    const fetchCompany = async (recruiterId) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: recruiterId});
            // console.log("li", response.data)
            setCompany(response.data || 'Company Name');
        } catch (error) {
            console.error('Error fetching company name:', error);
            setCompany('Company Name');
        }
    };


    // const handleRatingChange = (type, index, rating) => {
    //     const updatedRatings = {...skillRatings};
    //     updatedRatings[type][index].rating = rating;
    //     setSkillRatings(updatedRatings);
    // };

    const handleRatingChange = async (name, roundedrating) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/rate`, {
                user_id: userId,
                ratings: {[name]: roundedrating}
            })
        } catch (err) {
            alert(err.response.data)
        }
        console.log(ratingData)
        console.log('Selected rating:', name, roundedrating);
        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getrating`, {user_id: userId}).then((res) => {
            // console.log(res.data)
            res.data.map(async (item) => {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getskillname`, {skill_id: item.skill_id}).then((res) => {
                    // console.log(res.data)
                    setRatingData((prev) => {
                        return ({...prev, [res.data.name]: item.rating})
                    })
                })
            })
        })

        // Here you can send the rating to your backend
    };


    if (!loader) {
        return (<></>)
    } else {
        return (
            <div
                className="p-4 bg-white rounded-lg shadow-md flex transition-transform duration-300 overflow-y-auto border-2 border-[#C4C4CD]"
                style={{minHeight: '38rem', height: '39.8rem'}}>
                {/* Left Column: Job Cards */}
                <div className="w-1/5 pr-4 overflow-y-auto" style={{height: '100%', width: '27%'}}>
                    {jobs.map((job, index) => (
                        <div
                            key={job.id}
                            onClick={() => handleJobClick(job)}
                            className={`p-2 mb-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 ${selectedJob && selectedJob.id === job.id ? 'border-[#007fff] border-opacity-[40%] bg-[#007fff] bg-opacity-[5%]' : 'border-transparent bg-[#CDCDCD] bg-opacity-[18%]'} hover:shadow-lg`}
                        >
                            <div className="flex flex-col items-center justify-start mb-2 pb-[50px]">
                                <div className="flex items-center justify-between">
                                    <img
                                        src={job.companyLogo || '/media/images/amazon_PNG21.png'}
                                        alt={job.company_name}
                                        className="h-12 w-12 mr-3"
                                    />
                                    <h3 className={`text-lg font-semibold ${selectedJob && selectedJob.id === job.id ? ("text-[#007fff]") : ("")}`}>{job.title}</h3>
                                </div>
                                <div className="w-full text-left ml-[40px] ">


                                    <p className="text-[14px] text-gray-600 mb-1">CTC: {job.salary}</p>
                                    <p className="text-[14px] text-gray-600 mb-1">Last
                                        Date: {new Date(job.last_date).toLocaleDateString()}</p>
                                    <p className="text-[14px] text-gray-600 mb-1">Branch: {job.branch_required}</p>
                                    <p className="text-[14px] text-gray-600 mb-1">CGPA: {job.cgpa_required} and
                                        above</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                {/*<div className="flex flex-col items-center cursor-pointer" onClick={() => {*/}
                                {/*    handleLike(job.id)*/}
                                {/*}}>*/}
                                {/*<span*/}
                                {/*    className={`text-lg select-none ${likedJobs.has(job.id) ? 'text-blue-500' : 'text-green-500'}`}>{likedJobs.has(job.id) ? 'Liked' : 'Like'}</span>*/}
                                {/*    /!*<span className={`text-sm ${likedJobs.has(job.id) ? 'text-blue-500' : 'text-gray-600'}`}>{likes[job.id] || 0} {likedJobs.has(job.id) ? ' Students Liked' : 'Students Liked'}</span>*!/*/}
                                {/*</div>*/}
                                {/*<div className="flex flex-col items-center cursor-pointer" onClick={() => handleApply(job.id)}>*/}
                                {/*    <span className={`text-lg ${appliedJobs.has(job.id) ? 'text-blue-500' : 'text-green-500'}`}>{appliedJobs.has(job.id) ? 'Applied' : 'Apply'}</span>*/}
                                {/*    <span className={`text-sm ${appliedJobs.has(job.id) ? 'text-blue-500' : 'text-gray-600'}`}>{applications} {appliedJobs.has(job.id) ? 'Students Applied' : 'Students Applied'}</span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Job Details and Claim Candidacy */}
                <div className="w-4/5 pl-2 flex " style={{height: '100%'}}>
                    {selectedJob && (
                        <>
                            <div
                                className="w-2/3 p-4 pl-6 bg-white rounded-lg shadow-md h-auto mr-4 overflow-y-auto border-2 border-blue-600"
                                style={{height: '100%', width: '62%'}}>
                                {/* Company Details */}
                                <div className="flex items-left mb-2">
                                    <div>
                                        <h2 className="text-lg pt-0 mb-2 font-semibold">{company.company_name || 'Company Name'}</h2>
                                        <div className="flex space-x-32">
                                            <p className="text-gray-600 text-sm">Sector - {company.company_sector}</p>
                                            <p className="text-gray-600 text-sm">Product - {selectedJob.product}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mb-2 space-x-32">
                                    <p className="text-gray-800 text-sm"> {company.employee_count} Employees</p>
                                    <p className="text-gray-800 text-sm">MNC - {company.is_mnc ? 'Yes' : 'No'}</p>
                                </div>
                                {/*<div className="flex mb-2 pb-2 space-x-32 border-b border-dotted border-gray-300">*/}
                                {/*    <p className="text-gray-800 text-sm">  Head office - {company.office_address} </p>*/}
                                {/*</div>*/}

                                {/* Job Role Information */}
                                <div className="mb-2">
                                    <h2 className="text-lg font-semibold mb-1">{selectedJob.title}</h2>
                                    <p className="text-gray-800 text-sm mb-2">{selectedJob.department || Department} |
                                        Location - {company.office_address || 'N/A'}</p>
                                    <div
                                        className="grid grid-cols-3 gap-1 text-sm text-gray-800 ">
                                        {/* Header Row */}
                                        <div className="col-span-1 rounded-l-[8px] bg-blue-600 text-white text-center p-2">
                                            <strong></strong>
                                        </div>
                                        <div className="col-span-1 bg-blue-600 text-white text-center p-2"><strong>Must
                                            Have</strong></div>
                                        <div className="col-span-1 rounded-r-[8px] bg-blue-600 text-white text-center p-2"><strong>Good
                                            to
                                            Have</strong></div>

                                        {/* Row 1 */}
                                        <div className="p-2 rounded-l-[8px]  bg-[#D1D5DB] border-gray-300">CGPA/Pct</div>
                                        <div
                                            className="p-2 bg-[#D1D5DB] border-gray-300">{selectedJob.cgpa_required || 'None'}</div>
                                        <div
                                            className="p-2 rounded-r-[8px]  bg-[#D1D5DB] border-gray-300">{selectedJob.cgpa_preferred || 'None'}</div>

                                        {/* Row 2 */}
                                        <div className="p-2 rounded-l-[8px] bg-[#F1F1F1] border-gray-300">Branch</div>
                                        <div
                                            className="p-2 bg-[#F1F1F1] border-gray-300">{selectedJob.branch_required || 'None'}</div>
                                        <div className="p-2 rounded-r-[8px] bg-[#F1F1F1] border-gray-300">N/A</div>

                                        {/* Row 3 */}
                                        <div className="p-2 rounded-l-[8px] bg-[#D1D5DB] border-gray-300">Certification</div>
                                        <div
                                            className="p-2 bg-[#D1D5DB] border-gray-300">{selectedJob.certification_required || 'None'}</div>
                                        <div
                                            className="p-2 rounded-r-[8px] bg-[#D1D5DB] border-gray-300">{selectedJob.certification_preferred || 'None'}</div>

                                        {/* Row 4 */}
                                        <div className="p-2 rounded-l-[8px] bg-[#F1F1F1] border-gray-300">Skills</div>
                                        <div
                                            className="p-2  bg-[#F1F1F1] border-gray-300">{selectedJob.skills_required || 'None'}</div>
                                        <div
                                            className="p-2 rounded-r-[8px] bg-[#F1F1F1] border-gray-300">{selectedJob.skills_preferred || 'None'}</div>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div className="border p-4  rounded-lg mb-2">
                                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                                    <p className="text-gray-800 text-sm mb-2">{selectedJob.description}</p>
                                </div>

                                {/* Key Responsibilities */}
                                <div className="border p-4 rounded-lg mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-800">
                                        {selectedJob.responsibilities_array.map((resp, index) => (
                                            <li key={index}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Claim Your Candidacy */}
                            <div className=" p-2 bg-white rounded-lg shadow-md h-auto overflow-y-auto"
                                 style={{maxWidth: '100%'}}>
                                <h2 className="text-lg pt-2 text-center font-semibold mb-4">Claim Your Candidacy</h2>

                                {/* Must Have Skills */}
                                {skillRatings.mustHave.length > 0 ? (
                                    <>
                                        <h3 className="text-lg pl-2 font-semibold mb-2">Must Have Skills</h3>
                                        <table className="min-w-full divide-y divide-gray-200 mb-6">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-3 text-left text-xs font-medium  tracking-wider"></th>
                                                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 tracking-wider">Self
                                                    Rating <span className="text-red-500 text-xl">*</span></th>
                                                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900 tracking-wider">Assessment</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {skillRatings.mustHave.map((skill, index) => (
                                                <tr key={index}>
                                                    <td className="px-3 py-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</td>
                                                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">

                                                        <StarRating name={skill.skill} setRating={setRating}
                                                                    rating={ratingData[skill.skill]}
                                                                    onRatingChange={handleRatingChange}/>

                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-red-500">Pending</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (

                                    <div className="text-center text-gray-600 py-4">
                                        <h3 className="text-lg pl-2 font-semibold mb-2">Must Have Skills</h3>

                                        No Must Have Skills required for this job.
                                    </div>
                                )}

                                {/* Good to Have Skills */}
                                {skillRatings.goodToHave.length > 0 ? (
                                    <>
                                        <h3 className="text-lg pl-2 font-semibold mb-2">Good to Have Skills</h3>
                                        <table className="min-w-full divide-y divide-gray-200 mb-6">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-900  tracking-wider"></th>
                                                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900  tracking-wider">Self
                                                    Rating <span className="text-red-500 text-xl">*</span></th>
                                                <th className="px-3 py-3 text-left text-sm font-medium text-gray-900  tracking-wider">Assessment</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {skillRatings.goodToHave.map((skill, index) => (
                                                <tr key={index}>
                                                    <td className="px-3 py-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</td>
                                                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">

                                                        <StarRating name={skill.skill} setRating={setRating}
                                                                    rating={ratingData[skill.skill]}
                                                                    onRatingChange={handleRatingChange}/>


                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-sm text-red-500">Pending</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <div className="text-center text-gray-600 py-4">
                                        <h3 className="text-lg pl-2 font-semibold mb-2">Good to Have Skills</h3>

                                        No Good to Have Skills required for this job.
                                    </div>
                                )}

                                {/* Apply Button */}
                                <div className="flex justify-center mt-4 mb-4 gap-7" style={{marginTop: '-4px'}}>
                                    <div className="flex flex-col items-center cursor-pointer" onClick={() => {
                                        handleLike(selectedJob.id)
                                    }}>
                                <span
                                    className={` py-2 px-6 rounded transition-transform duration-300 ${likedJobs.has(selectedJob.id) ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}>{likedJobs.has(selectedJob.id) ? 'Liked' : 'Like'}</span>
                                        {/*<span className={`text-sm ${likedJobs.has(job.id) ? 'text-blue-500' : 'text-gray-600'}`}>{likes[job.id] || 0} {likedJobs.has(job.id) ? ' Students Liked' : 'Students Liked'}</span>*/}
                                    </div>

                                    <button
                                        className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded transition-transform duration-300 ">
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


}

export default OpportunitiesView;
