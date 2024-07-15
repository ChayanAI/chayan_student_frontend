import React, {useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import axios from "axios";
import SkillRating from "../../components/SkillRating";
import StarRating from "../../components/StarRating";
import CareerOption from '../../components/CareerOptions';
import JobCard from '../../components/JobCard';

const LearningPathView = () => {
    const [careerPath, setCareerPath] = useState([])
    const [likedJobs, setLikedJobs] = useState([])
    const [selectedView, setSelectedView] = useState('careerPaths'); // State to track selected view
    const [selectedCareer, setSelectedCareer] = useState(null); // State to track selected career (default to first career)
    const [selectedOpportunity, setSelectedOpportunity] = useState(1); // State to track selected opportunity (default to first opportunity)
    const [loader, setLoader] = useState(false)
    const [CareerJobs, setCareerJobs] = useState()
    const [ratingData, setRatingData] = useState({})

    const employabilityScore = 80; // Example score
    const employabilityTips = [
        'Include relevant keywords and skills.',
        'Quantify achievements with numbers.',
        'Use action verbs to start bullet points.',
        'Keep formatting clean and consistent.',
    ];
    const expectedScore = 95; // Example expected score

    useEffect(() => {
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: res.data.id}).then((res) => {
                    setCareerPath(res.data.career_path)
                })
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/getlikesbyId`,{user_id: res.data.id}).then((res)=>{
                    let f = []
                    res.data.map((item)=>{
                        f.push(item.job_id)
                    })
                    let a = new Set(f)
                    let x = Array.from(a)
                    let w = []
                    let q = {}
                    // console.log(x)
                    x.map(async(item)=>{
                      await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentjob/jobs/${item}`).then((res)=>{
                          w.push(res.data)
                          // console.log(res.data)
                          if(res.data.skills_required){
                              if(res.data.skills_required.includes(',')){
                              setCareerJobs((prev)=>({...prev,[res.data.title]: res.data.skills_required.split(', ')}))
                              // q={...q,[res.data.title]: res.data.skills_required.split(', ')}
                              // console.log(q)
                          }
                          else{
                              setCareerJobs((prev)=>({...prev,[res.data.title]: [res.data.skills_required]}))
                              // console.log(q)
                          }

                          }

                          // console.log(res.data)
                      })


                    })

                    // w.map((item)=>{
                    //     console.log('title', item.title)
                    //     console.log('skills', item.skills_required.split(", "))
                    //     q={...q, [item.title]: item.skills_required.split(", ")}
                    // })
                    // setCareerJobs(q)
                    setLikedJobs(w)

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


    // Sample data for career options and skills
    const careerOptions = [
        {id: 1, name: 'Software Developer', employabilityScore: 85},
        {id: 2, name: 'Data Scientist', employabilityScore: 78},
        {id: 3, name: 'Product Manager', employabilityScore: 90},
    ];

    const skillsData = {
        1: [
            {
                skill: 'JavaScript',
                selfRating: 3,
                assessment: 'Pending',
                completedDate: null,
                learningPath: ['Master JavaScript']
            },
            {
                skill: 'React',
                selfRating: 4,
                assessment: 'Average',
                completedDate: '01/01/2023',
                learningPath: ['Beginners course for React']
            },
            {
                skill: 'Node.js',
                selfRating: 2,
                assessment: 'Below Average',
                completedDate: '15/02/2023',
                learningPath: ['Learn Node.Js']
            },
        ],
        2: [
            {
                skill: 'Statistics',
                selfRating: 3,
                assessment: 'Pending',
                completedDate: null,
                learningPath: ['Master Statistics']
            },
            {
                skill: 'Machine Learning',
                selfRating: 4,
                assessment: 'Average',
                completedDate: '01/06/2023',
                learningPath: ['Basics of SQL']
            },
            {
                skill: 'Python',
                selfRating: 4,
                assessment: 'Average',
                completedDate: '01/06/2023',
                learningPath: ['Python Crash Course']
            },
        ],
        3: [
            {
                skill: 'Product Management',
                selfRating: 4,
                assessment: 'Pending',
                completedDate: null,
                learningPath: ['Complete course on Management']
            },
            {
                skill: 'User Experience',
                selfRating: 5,
                assessment: 'Average',
                completedDate: '01/09/2023',
                learningPath: ['Basics of UX']
            },
            {
                skill: 'Market Research',
                selfRating: 5,
                assessment: 'Above Average',
                completedDate: '02/09/2023',
                learningPath: ['Market Research 101']
            },
        ],
    };

    const opportunitiesOptions = [
        {
            id: 1,
            name: 'Full-Stack Developer',
            employabilityScore: 88,
            companyName: 'Google',
            likedOn: '12/05/2023',
            learningPath: ['Advanced NodeJS']
        },
        {
            id: 2,
            name: 'Data Scientist',
            employabilityScore: 90,
            companyName: 'Facebook',
            likedOn: '01/07/2023',
            learningPath: ['Complete Data Science Course']
        },
        {
            id: 3,
            name: 'Product Designer',
            employabilityScore: 82,
            companyName: 'Amazon',
            appliedOn: '20/06/2023',
            learningPath: ['Master User Experience']
        },
    ];

    const handleCareerSelect = (option) => {
        setSelectedCareer(option);
    };
    const CareerJobs1 = {
        ["Software Developer"]: [
            "Data Structure",
            "C++",
            "JavaScript",
            "Analytical Thinking"
        ],
        ["Data Scientist"]: [
            "Statistics",
            "Machine Learning",
            "Visualization",
            "Python"
        ],
        ["Product Manager"]: [
            "Project management",
            "Market Research",
            "User Experience",
            "Business Strategy"
        ],
        ["DevOps Engineer"]: [
            "CI/CD",
            "Cloud Platforms",
            "Scripts",
            "Infrastructure"
        ],
        ["Cybersecurity Analyst"]: [
            "Network Security",
            "Ethical Hacking",
            "Cryptography",
            "Risk Assessment"
        ],
        ["AI/ML Engineer"]: [
            "Machine Learning",
            "Neural Networks",
            "Deep Learning",
            "Python"
        ],
        ["Consultant"]: [
            "Analytical Skills",
            "Problem Solving",
            "Project Management",
            "Communication"
        ]
    }

    const handleStarClick = (skillIndex, rating) => {
        const newSkills = skillsData[selectedCareer].map((skill, index) => {
            if (index === skillIndex) {
                return {...skill, selfRating: rating};
            }
            return skill;
        });

        skillsData[selectedCareer] = newSkills;
    };

    if(!loader){
        return(<></>)
    }
    else{
        return (
        <div className="bg-white shadow-md border-2 border-blue-500 rounded-b-lg h-full w-full "
             style={{maxHeight: '38rem'}}>
            {/* Header with two view options */}
            <div className="flex justify-between mb-4 border-blue-500 border-b-2">
                <div
                    className={`w-1/2 text-xl text-center cursor-pointer font-lato ${selectedView === 'careerPaths' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-3`}
                    onClick={() => setSelectedView('careerPaths')}
                >
                    For Your Career Paths
                </div>
                <div
                    className={`w-1/2 text-xl text-center cursor-pointer font-lato ${selectedView === 'opportunities' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-3`}
                    onClick={() => setSelectedView('opportunities')}
                >
                    For the Opportunities of Your Interest
                </div>
            </div>

            {selectedView === 'careerPaths' && (
                <div className="flex p-8 h-full">
                    {/* Left section - Career options */}
                    <div className="w-1/4 pr-6 overflow-y-auto" style={{maxHeight: '36rem'}}>
                        
                        {careerPath.map(option => (
                            <CareerOption
                                key={option}
                                option={option}
                                selectedCareer={selectedCareer}
                                handleCareerSelect={handleCareerSelect}
                            />
                        ))}
                    </div>

                    {/* Dotted divider */}
                    <div className="w-0 border-r-2 border-dashed h-auto mb-10"></div>

                    {/* Right section - Skills mapped to selected career */}
                    <div className="w-3/4 pl-6 flex flex-col justify-between">
                        <h3 className="text-center text-lg border-2 rounded-md border-blue-500 font-semibold mb-6 p-4">Skills
                            for the Selected Career Path</h3>
                        {selectedCareer && CareerJobs1[selectedCareer] ? (
                            <div className="overflow-x-auto h-full">
                                <table className="min-w-full bg-white table-auto">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-2"></th>
                                        <th className="px-4 py-2 text-lg text-center">Self Rating</th>
                                        <th className="px-4 py-2 text-lg text-center">Assessment</th>
                                        <th className="px-4 py-2 text-lg text-center">Learning Path</th>
                                    </tr>
                                    </thead>
                                    <tbody className="gap-y-16">
                                    {CareerJobs1[selectedCareer].map((skill, index) => (
                                        <tr key={index} className="mb-4">
                                            <td className="px-4 py-4 text-center">
                                                <div
                                                    className="border text-gray-900 p-2 rounded-md font-roboto bg-yellow-400">
                                                    {skill}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {/*{[...Array(5)].map((_, i) => (*/}
                                                {/*    // <FaStar*/}
                                                {/*    //     key={i}*/}
                                                {/*    //     className={`inline-block w-4 h-4 mx-1 cursor-pointer  ${i < skill? 'text-yellow-500' : 'text-gray-300'}`}*/}
                                                {/*    //     // onClick={() => handleStarClick(index, i + 1)}*/}
                                                {/*    // />*/}
                                                {/*    */}
                                                {/*))}*/}
                                                <StarRating rating={ratingData[CareerJobs1[selectedCareer][index]]}/>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {/*<div*/}
                                                {/*    className={`${skill.assessment.includes('Pending') ? 'text-red-500' : skill.assessment.includes('Average') ? 'text-green-500' : 'text-yellow-500'}`}>*/}
                                                {/*    Pending*/}
                                                {/*</div>*/}
                                                <div
                                                    className='text-red-500'>
                                                    Pending
                                                </div>
                                                {/*{skill.completedDate && (*/}
                                                {/*    <div className="text-gray-500">*/}
                                                {/*        Completed on {skill.completedDate}*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </td>
                                            {/*<td className="px-4 py-4 text-center">*/}
                                            {/*    {skill.learningPath.map((course, idx) => (*/}
                                            {/*        <div key={idx} className="text-blue-500">{course}</div>*/}
                                            {/*    ))}*/}
                                            {/*</td>*/}
                                            <td className="px-4 py-4 text-center">
                                                -
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                </table>
                            </div>
                        ) : (
                            <p>Please select a career option to see the mapped skills.</p>
                        )}
                    </div>
                </div>
            )
            }

            {
                selectedView === 'opportunities' && (
                    <div className="flex p-8 h-full">
                        {/* Left section - Career options */}
                        <div className="w-1/4 pr-6 overflow-y-auto" style={{maxHeight: '30rem'}}>
                            {likedJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    selectedCareer={selectedCareer}
                                    handleCareerSelect={handleCareerSelect}
                                />
                            ))}
                        </div>

                        {/* Dotted line */}
                        <div className="w-0 border-r-2 border-dashed h-auto mb-10"></div>

                        {/* Right section - Skills mapped to selected career */}
                        <div className="w-3/4 pl-6 flex flex-col justify-between">
                            <h3 className="text-center text-gray-800 rounded-md font-semibold mb-6">Skills
                                for the Selected Opportunities of your Interest</h3>
                            {selectedCareer && CareerJobs[selectedCareer] ? (<>
                                <div className="overflow-x-auto h-full">
                                    <table className="table-spacing min-w-full bg-white table-auto">
                                        <thead>
                                        <tr>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2 text-sm text-center">Self Rating</th>
                                            <th className="px-4 py-2 text-sm text-center">Assessment</th>
                                            <th className="px-4 py-2 text-sm text-center">Learning Path</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {CareerJobs[selectedCareer].map((skill, index) => (
                                            <tr key={index} className="mb-4">
                                                <td className="text-center text-sm text-gray-800 font-medium">
                                                    <div className="font-roboto p-2 rounded-md">
                                                        {skill}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 text-center rounded-l-full bg-gray-200 border-l-[6px] border-y-[6px] border-l-white border-y-white">
                                                    <StarRating rating={ratingData[skill]}/>
                                                </td>
                                                <td className="px-3 py-3 text-center bg-gray-200 border-y-[6px] border-y-white">
                                                    <div
                                                        className='text-red-500'>
                                                        Pending
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 text-center rounded-r-full bg-gray-200 border-r-[6px] border-y-[6px] border-r-white border-y-white">
                                                    -
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>

                                    </table>
                                </div>
                                <div className="rounded p-4 mb-4">
                                    <div className="flex w-full text-center text-sm font-bold mb-3 gap-1">
                                        <h4 className="text-black">Employability Score</h4>
                                        <h4 className="text-black">-</h4>
                                        <h4 className="text-black">{employabilityScore}</h4>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2">Tips</h4>
                                    <ul className="list-disc list-outside text-xs">
                                        {employabilityTips.map((tip, index) => (
                                            <li className='ml-6 pl-1' key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                    <div className="flex w-full text-center text-xs font-medium gap-1 mt-3">
                                        <h4 className="text-blue-600">Expected Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{expectedScore}</h4>
                                    </div>
                                </div>
                            </>
                            ) : (
                                <p>Please select a career option to see the mapped skills.</p>
                            )}
                            
                        </div>
                    </div>
                )
            }
        </div>
    );
    }

};

export default LearningPathView;
