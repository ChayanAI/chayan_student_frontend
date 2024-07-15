import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FaHeart, FaStar} from 'react-icons/fa';
import StarRating from "../../components/StarRating";

const OpportunitiesView = () => {
    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState()
    const [selectedJob, setSelectedJob] = useState(null);
    const [likes, setLikes] = useState(20);
    const [likedJobs, setLikedJobs] = useState([]);
    const [likedSection, setLikedSection] = useState([])
    const [applications, setApplications] = useState(20);
    const [skillRatings, setSkillRatings] = useState({mustHave: [], goodToHave: []});
    const [appliedJobs, setAppliedJobs] = useState([]); // Track applied jobs
    const [applicationList, setApplicationList] = useState([])
    const [company, setCompany] = useState(''); // Store the company name
    const [loader, setLoader] = useState(false)
    const [ratingData, setRatingData] = useState({})
    const [lj, setLj] = useState([])
    const [mode, setMode] = useState('Recommended')

    const [rating, setRating] = useState(0);
    const [recruiterProfiles, setRecruiterProfiles] = useState([])
    useEffect(() => {
        (async () => {
            // console.log("meow")
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                setUserId(res.data.id)

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/getlikesbyId`, {user_id: res.data.id}).then((res) => {
                    // console.log(res.data)
                    setLikedJobs(res.data)
                })
                // let lj = []
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/getlikedjobs`, {user_id: res.data.id}).then(async (res) => {
                    let a = []
                    await Promise.all((res.data).map(async (item) => {
                        await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs/${item.job_id}`).then((res1) => {
                            a.push(res1.data)
                            // console.log(res.data)
                            // console.log(res1.data)
                        })
                    }))
                    // console.log(a)
                    setLikedSection(a)

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
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/applications/getbyId`, {user_id: res.data.id}).then(async (res) => {
                    setApplicationList(res.data)
                    let a = []
                    await Promise.all((res.data).map(async (item) => {
                        await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs/${item.job_id}`).then((res1) => {
                            a.push(res1.data)
                            // console.log(res.data)
                            // console.log(res1.data)
                        })
                    }))
                    // console.log(a)
                    setAppliedJobs(a)
                })
            })
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofiles`).then((res) => {
                setRecruiterProfiles(res.data)
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
            if (likedJobs.filter((item) => item.job_id === jobId).length === 0) {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/like`, {
                    user_id: res.data.id,
                    job_id: jobId
                })

            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/unlike`, {
                    user_id: res.data.id,
                    job_id: jobId
                })
            }


            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/getlikesbyId`, {user_id: res.data.id}).then((res) => {
                // console.log(res.data)
                setLikedJobs(res.data)
            })

            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/getlikedjobs`, {user_id: res.data.id}).then(async (res) => {
                let a = []
                await Promise.all((res.data).map(async (item) => {
                    await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs/${item.job_id}`).then((res1) => {
                        a.push(res1.data)
                        // console.log(res.data)
                        // console.log(res1.data)
                    })
                }))
                // console.log(a)
                setLikedSection(a)


            })

            // console.log(newSet)

        });


        // console.log(likedJobs)

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


    async function toggleapply(job_id) {
        try {
            if (applicationList.filter((item) => item.job_id === job_id)?.length === 0) {

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/applications/apply`, {
                    job_id: job_id,
                    student_id: userId
                })
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/applications/withdraw`, {
                    job_id: job_id,
                    student_id: userId
                })
            }

        } catch (err) {
            alert(err.response.data)
        }


        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/applications/getbyId`, {user_id: userId}).then(async (res) => {
            setApplicationList(res.data)
            let a = []
            await Promise.all((res.data).map(async (item) => {
                await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs/${item.job_id}`).then((res1) => {
                    a.push(res1.data)
                    // console.log(res.data)
                    // console.log(res1.data)
                })
            }))
            // console.log(a)
            setAppliedJobs(a)
        })
    }

    if (!loader) {
        return (<></>)
    } else {
        return (
            <div
                className="p-4 bg-white rounded-lg shadow-md flex transition-transform duration-300 overflow-y-auto border-2 border-blue-500"
                style={{minHeight: '38rem', height: '39.8rem'}}>
                {/* Left Column: Job Cards */}
                <div className="w-1/5 pr-4 overflow-y-auto" style={{height: '100%', width: '27%'}}>
                    {(mode === 'Liked' ? (likedSection) : (mode === 'Recommended' ? jobs : (mode === 'Applied' ? (appliedJobs) : (jobs))))
                        .map((job, index) => (
                            <div
                                key={job.id}
                                onClick={() => handleJobClick(job)}
                                className={`p-2 mb-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 ${selectedJob && selectedJob.id === job.id ? 'border-[#007fff] border-opacity-[40%] bg-[#007fff] bg-opacity-[5%]' : 'border-transparent bg-[#CDCDCD] bg-opacity-[18%]'} hover:shadow-lg`}
                            >
                                <div className="flex flex-col items-center justify-start mb-1 pb-[30px]">
                                    <div className="flex items-center justify-between">
                                        <img
                                            src={job.companyLogo || '/media/images/amazon_PNG21.png'}
                                            alt={job.company_name}
                                            className="h-12 w-12 mr-3"
                                        />
                                        <div className="flex flex-col justify-start">
                                            <h3 className={`text-lg font-semibold ${selectedJob && selectedJob.id === job.id ? ("text-[#007fff]") : ("")}`}>{job.title}</h3>
                                            <div className="flex gap-1 text-xs">
                                                <div className="text-[#696974]">
                                                    {(recruiterProfiles.find((item) => item.user_id === job.recruiter_id))?.company_name}
                                                </div>
                                                <div className="mt-[-1px] text-[#696974]">|</div>
                                                <div className="text-[#696974]">
                                                    {(recruiterProfiles.find((item) => item.user_id === job.recruiter_id))?.office_address}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full text-left ml-[40px] mt-[20px]">


                                        <p className="text-[14px] text-gray-600 mb-1">CTC: {job.salary}</p>
                                        <p className="text-[14px] text-gray-600 mb-1">Last
                                            Date: {new Date(job.last_date).toLocaleDateString()}</p>
                                        <p className="text-[14px] text-gray-600 mb-1">Branch: {job.branch_required}</p>
                                        <p className="text-[14px] text-gray-600 mb-1">CGPA: {job.cgpa_required} and
                                            above</p>
                                        {/*<p className="text-[14px] text-gray-600 mb-1">{(recruiterProfiles.find((item)=>item.user_id===job.recruiter_id))?.company_name}</p>*/}
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
                    <div
                        className="w-2/3 p-4 py-[30px] pl-6 bg-white rounded-lg shadow-md h-auto mr-4 overflow-y-auto"
                        style={{height: '100%', width: '62%'}}>
                        {selectedJob && (
                            <>

                                {/* Company Details */}
                                <div className="flex flex-col items-left mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-1">{selectedJob.title}</h2>
                                        {/*<h2 className="text-lg pt-0 mb-2 font-semibold">{company.company_name || 'Company Name'}</h2>*/}
                                        {/*<div className="flex space-x-32">*/}
                                        {/*    <p className="text-gray-600 text-sm">Sector - {company.company_sector}</p>*/}
                                        {/*    <p className="text-gray-600 text-sm">Product - {selectedJob.product}</p>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="flex gap-2">
                                        <div
                                            className="text-sm pt-0 mb-2 text-[#696974]">{company.company_name || 'Company Name'}</div>
                                        <div className="mt-[-3px] text-[#696974]">|</div>
                                        <div
                                            className="text-sm pt-0 mb-2 text-[#696974]">{company.office_address || 'Company Address'}</div>
                                    </div>
                                    <div className="flex justify-center mt-4 mb-4 gap-7 mb-[-5px]">
                                        <div className="flex flex-col items-center cursor-pointer" onClick={() => {
                                            handleLike(selectedJob.id)
                                        }}>
                                <span
                                    className={`select-none rounded-[8px] transition-transform duration-300 ${likedJobs.filter((item) => item.job_id === selectedJob.id).length !== 0 ? 'bg-blue-600  py-[4px] pb-[5px] px-6  text-white' : ' px-6 bg-white text-blue-600 py-[2px] pb-[3px] border-[2px] border-blue-600'}`}>{likedJobs.filter((item) => item.job_id === selectedJob.id).length !== 0 ? 'Liked' : 'Like'}</span>
                                            {/*<span className={`text-sm ${likedJobs.has(job.id) ? 'text-blue-500' : 'text-gray-600'}`}>{likes[job.id] || 0} {likedJobs.has(job.id) ? ' Students Liked' : 'Students Liked'}</span>*/}
                                        </div>

                                        <button
                                            onClick={() => toggleapply(selectedJob.id)}
                                            className=" select-none bg-blue-600 hover:bg-blue-800 pb-[5px] text-white py-[4px] px-6 rounded-[8px] transition-transform duration-300 ">
                                            {applicationList.filter((item) => item.job_id === selectedJob.id)?.length === 0 ? ("Apply Now") : ("Withdraw")}
                                        </button>

                                    </div>
                                    <div
                                        className="flex my-[15px] text-sm text-[#696974] justify-between bg-[#FAFAFB] rounded-[10px] px-[15px] py-[10px]">
                                        <div className="flex flex-col">
                                            <div>Sector</div>
                                            <div className="text-black font-semibold">{company.company_sector}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>Product</div>
                                            <div className="text-black font-semibold">{selectedJob.product}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>Employees</div>
                                            <div className="text-black font-semibold">{company.employee_count}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>Head Office</div>
                                            <div
                                                className="text-black font-semibold">{company.office_address || 'N/A'}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>MNC</div>
                                            <div
                                                className="text-black font-semibold">{company.is_mnc ? 'Yes' : 'No'}</div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="flex mb-2 space-x-32">*/}
                                {/*    <p className="text-gray-800 text-sm"> {company.employee_count} Employees</p>*/}
                                {/*    <p className="text-gray-800 text-sm">MNC - {company.is_mnc ? 'Yes' : 'No'}</p>*/}
                                {/*</div>*/}
                                {/*<div className="flex mb-2 pb-2 space-x-32 border-b border-dotted border-gray-300">*/}
                                {/*    <p className="text-gray-800 text-sm">  Head office - {company.office_address} </p>*/}
                                {/*</div>*/}

                                {/* Job Role Information */}
                                <div className="mb-2">
                                    {/* Claim Your Candidacy */}
                                    <div className=" p-2 bg-white rounded-lg shadow-md h-auto overflow-y-auto"
                                         style={{maxWidth: '100%'}}>
                                        {/* Must Have Skills */}
                                        {skillRatings.mustHave.length > 0 ? (
                                            <div className="mb-4">
                                                <h3 className="text-md pl-2 font-semibold text-[#92929D] mb-2 ">Must
                                                    Have
                                                    Skills</h3>

                                                <div className="bg-white">
                                                    {skillRatings.mustHave.map((skill, index) => (
                                                        <div key={index}
                                                             className="ml-[20px] flex items-center justify-start mb-[5px]">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M7.814 21C7.814 21.414 7.478 21.75 7.064 21.75H5C3.483 21.75 2.25 20.517 2.25 19V17.035C2.25 16.621 2.586 16.285 3 16.285C3.414 16.285 3.75 16.621 3.75 17.035V19C3.75 19.689 4.311 20.25 5 20.25H7.064C7.478 20.25 7.814 20.586 7.814 21ZM21 16.24C20.586 16.24 20.25 16.576 20.25 16.99V19C20.25 19.689 19.689 20.25 19 20.25H17.099C16.685 20.25 16.349 20.586 16.349 21C16.349 21.414 16.685 21.75 17.099 21.75H19C20.517 21.75 21.75 20.516 21.75 19V16.99C21.75 16.576 21.414 16.24 21 16.24ZM19 2.25H16.901C16.487 2.25 16.151 2.586 16.151 3C16.151 3.414 16.487 3.75 16.901 3.75H19C19.689 3.75 20.25 4.311 20.25 5V6.866C20.25 7.28 20.586 7.616 21 7.616C21.414 7.616 21.75 7.28 21.75 6.866V5C21.75 3.484 20.517 2.25 19 2.25ZM7.064 2.25H5C3.483 2.25 2.25 3.483 2.25 5V7.089C2.25 7.503 2.586 7.839 3 7.839C3.414 7.839 3.75 7.503 3.75 7.089V5C3.75 4.311 4.311 3.75 5 3.75H7.064C7.478 3.75 7.814 3.414 7.814 3C7.814 2.586 7.478 2.25 7.064 2.25Z"
                                                                    fill="#2FAD1B"/>
                                                                <path
                                                                    d="M14.849 21C14.849 21.414 14.513 21.75 14.099 21.75H10.065C9.651 21.75 9.315 21.414 9.315 21C9.315 20.586 9.651 20.25 10.065 20.25H14.099C14.513 20.25 14.849 20.586 14.849 21ZM21 9.116C20.586 9.116 20.25 9.452 20.25 9.866V13.99C20.25 14.404 20.586 14.74 21 14.74C21.414 14.74 21.75 14.404 21.75 13.99V9.866C21.75 9.452 21.414 9.116 21 9.116ZM10.064 3.75H13.901C14.315 3.75 14.651 3.414 14.651 3C14.651 2.586 14.315 2.25 13.901 2.25H10.064C9.65 2.25 9.314 2.586 9.314 3C9.314 3.414 9.65 3.75 10.064 3.75ZM3 9.339C2.586 9.339 2.25 9.675 2.25 10.089V14.034C2.25 14.448 2.586 14.784 3 14.784C3.414 14.784 3.75 14.448 3.75 14.034V10.089C3.75 9.675 3.414 9.339 3 9.339Z"
                                                                    fill="#D0D0D0"/>
                                                                <rect x="7" y="7" width="10" height="10" fill="#2FAD1B"
                                                                      fill-opacity="0.5"/>
                                                            </svg>

                                                            <div
                                                                className="px-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</div>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        ) : (

                                            <div className="text-center text-gray-600 py-4">
                                                <h3 className="text-lg pl-2 font-semibold mb-2">Must Have Skills</h3>

                                                No Must Have Skills required for this job.
                                            </div>
                                        )}

                                        {/* Good to Have Skills */}
                                        {skillRatings.goodToHave.length > 0 ? (
                                            <>
                                                <h3 className="text-md pl-2 font-semibold text-[#92929D] mb-2">Good to
                                                    Have
                                                    Skills</h3>
                                                {skillRatings.goodToHave.map((skill, index) => (
                                                    <div key={index}
                                                         className="ml-[20px] flex items-center justify-start mb-[5px]">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.814 21C7.814 21.414 7.478 21.75 7.064 21.75H5C3.483 21.75 2.25 20.517 2.25 19V17.035C2.25 16.621 2.586 16.285 3 16.285C3.414 16.285 3.75 16.621 3.75 17.035V19C3.75 19.689 4.311 20.25 5 20.25H7.064C7.478 20.25 7.814 20.586 7.814 21ZM21 16.24C20.586 16.24 20.25 16.576 20.25 16.99V19C20.25 19.689 19.689 20.25 19 20.25H17.099C16.685 20.25 16.349 20.586 16.349 21C16.349 21.414 16.685 21.75 17.099 21.75H19C20.517 21.75 21.75 20.516 21.75 19V16.99C21.75 16.576 21.414 16.24 21 16.24ZM19 2.25H16.901C16.487 2.25 16.151 2.586 16.151 3C16.151 3.414 16.487 3.75 16.901 3.75H19C19.689 3.75 20.25 4.311 20.25 5V6.866C20.25 7.28 20.586 7.616 21 7.616C21.414 7.616 21.75 7.28 21.75 6.866V5C21.75 3.484 20.517 2.25 19 2.25ZM7.064 2.25H5C3.483 2.25 2.25 3.483 2.25 5V7.089C2.25 7.503 2.586 7.839 3 7.839C3.414 7.839 3.75 7.503 3.75 7.089V5C3.75 4.311 4.311 3.75 5 3.75H7.064C7.478 3.75 7.814 3.414 7.814 3C7.814 2.586 7.478 2.25 7.064 2.25Z"
                                                                fill="#7B7B7B"/>
                                                            <path
                                                                d="M14.849 21C14.849 21.414 14.513 21.75 14.099 21.75H10.065C9.651 21.75 9.315 21.414 9.315 21C9.315 20.586 9.651 20.25 10.065 20.25H14.099C14.513 20.25 14.849 20.586 14.849 21ZM21 9.116C20.586 9.116 20.25 9.452 20.25 9.866V13.99C20.25 14.404 20.586 14.74 21 14.74C21.414 14.74 21.75 14.404 21.75 13.99V9.866C21.75 9.452 21.414 9.116 21 9.116ZM10.064 3.75H13.901C14.315 3.75 14.651 3.414 14.651 3C14.651 2.586 14.315 2.25 13.901 2.25H10.064C9.65 2.25 9.314 2.586 9.314 3C9.314 3.414 9.65 3.75 10.064 3.75ZM3 9.339C2.586 9.339 2.25 9.675 2.25 10.089V14.034C2.25 14.448 2.586 14.784 3 14.784C3.414 14.784 3.75 14.448 3.75 14.034V10.089C3.75 9.675 3.414 9.339 3 9.339Z"
                                                                fill="#D0D0D0"/>
                                                            <rect x="7" y="7" width="10" height="10" fill="#7B7B7B"
                                                                  fill-opacity="0.5"/>
                                                        </svg>


                                                        <div
                                                            className="px-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</div>
                                                    </div>
                                                ))}

                                            </>
                                        ) : (
                                            <div className="text-center text-gray-600 py-4">
                                                <h3 className="text-lg pl-2 font-semibold mb-2">Good to Have Skills</h3>

                                                No Good to Have Skills required for this job.
                                            </div>
                                        )}

                                        {/* Apply Button */}

                                    </div>

                                    {/*<p className="text-gray-800 text-sm mb-2">{selectedJob.department || Department} |*/}
                                    {/*    Location - {company.office_address || 'N/A'}</p>*/}
                                    {/*<div*/}
                                    {/*    className="grid grid-cols-3 gap-1 text-sm text-gray-800 ">*/}
                                    {/*    /!* Header Row *!/*/}
                                    {/*    <div*/}
                                    {/*        className="col-span-1 rounded-l-[8px] bg-blue-600 text-white text-center p-2">*/}
                                    {/*        <strong></strong>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-span-1 bg-blue-600 text-white text-center p-2"><strong>Must*/}
                                    {/*        Have</strong></div>*/}
                                    {/*    <div*/}
                                    {/*        className="col-span-1 rounded-r-[8px] bg-blue-600 text-white text-center p-2">*/}
                                    {/*        <strong>Good*/}
                                    {/*            to*/}
                                    {/*            Have</strong></div>*/}

                                    {/*    /!* Row 1 *!/*/}
                                    {/*    <div className="p-2 rounded-l-[8px]  bg-[#D1D5DB] border-gray-300">CGPA/Pct*/}
                                    {/*    </div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 bg-[#D1D5DB] border-gray-300">{selectedJob.cgpa_required || 'None'}</div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 rounded-r-[8px]  bg-[#D1D5DB] border-gray-300">{selectedJob.cgpa_preferred || 'None'}</div>*/}

                                    {/*    /!* Row 2 *!/*/}
                                    {/*    <div className="p-2 rounded-l-[8px] bg-[#F1F1F1] border-gray-300">Branch</div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 bg-[#F1F1F1] border-gray-300">{selectedJob.branch_required || 'None'}</div>*/}
                                    {/*    <div className="p-2 rounded-r-[8px] bg-[#F1F1F1] border-gray-300">N/A</div>*/}

                                    {/*    /!* Row 3 *!/*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 rounded-l-[8px] bg-[#D1D5DB] border-gray-300">Certification*/}
                                    {/*    </div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 bg-[#D1D5DB] border-gray-300">{selectedJob.certification_required || 'None'}</div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 rounded-r-[8px] bg-[#D1D5DB] border-gray-300">{selectedJob.certification_preferred || 'None'}</div>*/}

                                    {/*    /!* Row 4 *!/*/}
                                    {/*    <div className="p-2 rounded-l-[8px] bg-[#F1F1F1] border-gray-300">Skills</div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2  bg-[#F1F1F1] border-gray-300">{selectedJob.skills_required || 'None'}</div>*/}
                                    {/*    <div*/}
                                    {/*        className="p-2 rounded-r-[8px] bg-[#F1F1F1] border-gray-300">{selectedJob.skills_preferred || 'None'}</div>*/}
                                    {/*</div>*/}


                                </div>

                                {/* Job Description */}
                                {/*<div className="border p-4  rounded-lg mb-2">*/}
                                {/*    <h3 className="text-lg font-semibold mb-2">Job Description</h3>*/}
                                {/*    <p className="text-gray-800 text-sm mb-2">{selectedJob.description}</p>*/}
                                {/*</div>*/}

                                {/* Key Responsibilities */}
                                <div className="border p-4 rounded-lg mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-800">
                                        {selectedJob.responsibilities_array.map((resp, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="mt-[5px]">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                                                              stroke="#FDDD8C" stroke-width="2"/>
                                                    </svg>
                                                </div>
                                                <div>{resp}</div>


                                            </div>
                                        ))}
                                    </ul>
                                </div>

                            </>
                        )}
                    </div>
                    {/*{Right Section}*/}
                    <div className=" w-1/3 flex flex-col items-center gap-[30px] justify-center">
                        <div
                            onClick={() => {
                                setMode('Recommended')
                                setSelectedJob(jobs[0])
                            }
                            }
                            className={`w-[60%] cursor-pointer rounded-[8px] text-blue-600 ${mode === 'Recommended' ? (" py-[6px] pb-[7px] bg-blue-600 text-white") : (" py-[4px] pb-[5px] border-[2px] border-blue-600 bg-white")} text-center`}>
                            Recommended

                        </div>
                        <div
                            onClick={() => {
                                setMode('Liked')
                                setSelectedJob(null)
                            }}
                            className={`w-[60%] cursor-pointer rounded-[8px] text-blue-600 ${mode === 'Liked' ? (" py-[6px] pb-[7px] bg-blue-600 text-white") : (" py-[4px] pb-[5px] border-[2px] border-blue-600 bg-white")} text-center`}>
                            Liked
                        </div>
                        <div
                            onClick={() => {
                                setMode('Applied')
                                setSelectedJob(null)
                            }}
                            className={`w-[60%] cursor-pointer rounded-[8px] text-blue-600 ${mode === 'Applied' ? (" py-[6px] pb-[7px] bg-blue-600 text-white") : (" py-[4px] pb-[5px] border-[2px] border-blue-600 bg-white")} text-center`}>
                            Applied

                        </div>
                        <div
                            onClick={() => setMode('Archived')}
                            className={`w-[60%] cursor-pointer rounded-[8px] text-blue-600 ${mode === 'Archived' ? (" py-[6px] pb-[7px] bg-blue-600 text-white") : (" py-[4px] pb-[5px] border-[2px] border-blue-600 bg-white")} text-center`}>
                            Archived

                        </div>

                    </div>


                    {/*<div className=" p-2 bg-white rounded-lg shadow-md h-auto overflow-y-auto"*/}
                    {/*     style={{maxWidth: '100%'}}>*/}
                    {/*    /!* Must Have Skills *!/*/}
                    {/*    {skillRatings.mustHave.length > 0 ? (*/}
                    {/*        <>*/}
                    {/*            <h3 className="text-md pl-2 font-semibold text-[#92929D] mb-2">Must Have*/}
                    {/*                Skills</h3>*/}
                    {/*            <table*/}
                    {/*                className="min-w-full divide-y divide-gray-200 mb-6 bg-[#EFEFEF] rounded-[5px]">*/}
                    {/*                <thead className="bg-gray-50">*/}
                    {/*                <tr>*/}
                    {/*                    <th className="px-3 py-3 text-left text-xs font-medium  tracking-wider"></th>*/}
                    {/*                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">Self*/}
                    {/*                        Rating <span className="text-red-500 text-xl">*</span></th>*/}
                    {/*                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 tracking-wider">Assessment</th>*/}
                    {/*                </tr>*/}
                    {/*                </thead>*/}
                    {/*                <tbody className="bg-white divide-y divide-gray-200">*/}
                    {/*                {skillRatings.mustHave.map((skill, index) => (*/}
                    {/*                    <tr key={index}>*/}
                    {/*                        <td className="px-3 py-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</td>*/}
                    {/*                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">*/}

                    {/*                            <StarRating name={skill.skill} setRating={setRating}*/}
                    {/*                                        rating={ratingData[skill.skill]}*/}
                    {/*                                        onRatingChange={handleRatingChange}/>*/}

                    {/*                        </td>*/}
                    {/*                        <td className="px-6 py-2 whitespace-nowrap text-sm text-red-500">Pending</td>*/}
                    {/*                    </tr>*/}
                    {/*                ))}*/}
                    {/*                </tbody>*/}
                    {/*            </table>*/}
                    {/*        </>*/}
                    {/*    ) : (*/}

                    {/*        <div className="text-center text-gray-600 py-4">*/}
                    {/*            <h3 className="text-lg pl-2 font-semibold mb-2">Must Have Skills</h3>*/}

                    {/*            No Must Have Skills required for this job.*/}
                    {/*        </div>*/}
                    {/*    )}*/}

                    {/*    /!* Good to Have Skills *!/*/}
                    {/*    {skillRatings.goodToHave.length > 0 ? (*/}
                    {/*        <>*/}
                    {/*            <h3 className="text-md pl-2 font-semibold mb-2 text-[#92929D]">Good to Have*/}
                    {/*                Skills</h3>*/}
                    {/*            <table*/}
                    {/*                className="min-w-full divide-y divide-gray-200 mb-6 bg-[#EFEFEF] rounded-[5px]">*/}
                    {/*                <thead className="bg-gray-50">*/}
                    {/*                <tr>*/}
                    {/*                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900  tracking-wider"></th>*/}
                    {/*                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900  tracking-wider">Self*/}
                    {/*                        Rating <span className="text-red-500 text-xl">*</span></th>*/}
                    {/*                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900  tracking-wider">Assessment</th>*/}
                    {/*                </tr>*/}
                    {/*                </thead>*/}
                    {/*                <tbody className="bg-white divide-y divide-gray-200">*/}
                    {/*                {skillRatings.goodToHave.map((skill, index) => (*/}
                    {/*                    <tr key={index}>*/}
                    {/*                        <td className="px-3 py-3 whitespace-normal text-sm font-medium text-gray-900 w-32 break-words">{skill.skill}</td>*/}
                    {/*                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">*/}

                    {/*                            <StarRating name={skill.skill} setRating={setRating}*/}
                    {/*                                        rating={ratingData[skill.skill]}*/}
                    {/*                                        onRatingChange={handleRatingChange}/>*/}


                    {/*                        </td>*/}
                    {/*                        <td className="px-6 py-2 whitespace-nowrap text-sm text-red-500">Pending</td>*/}
                    {/*                    </tr>*/}
                    {/*                ))}*/}
                    {/*                </tbody>*/}
                    {/*            </table>*/}
                    {/*        </>*/}
                    {/*    ) : (*/}
                    {/*        <div className="text-center text-gray-600 py-4">*/}
                    {/*            <h3 className="text-lg pl-2 font-semibold mb-2">Good to Have Skills</h3>*/}

                    {/*            No Good to Have Skills required for this job.*/}
                    {/*        </div>*/}
                    {/*    )}*/}

                    {/*    /!* Apply Button *!/*/}

                    {/*</div>*/}


                </div>

            </div>
        )
    }


}

export default OpportunitiesView;
