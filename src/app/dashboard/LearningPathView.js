import React, {useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import axios from "axios";

const LearningPathView = () => {
    const [careerPath, setCareerPath] = useState([])
    const [selectedView, setSelectedView] = useState('careerPaths'); // State to track selected view
    const [selectedCareer, setSelectedCareer] = useState(null); // State to track selected career (default to first career)
    const [selectedOpportunity, setSelectedOpportunity] = useState(1); // State to track selected opportunity (default to first opportunity)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: res.data.id}).then((res) => {
                    setCareerPath(res.data.career_path)
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
    const CareerJobs = {
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
                    <div className="w-1/5 pr-4 overflow-y-auto" style={{maxHeight: '36rem'}}>
                        <h3 className="text-center text-lg rounded-md border-2 border-blue-500 font-semibold mb-14 p-4">Career
                            Paths</h3>
                        {careerPath.map(option => (
                            <div className="text-center mb-10" key={option}>
                                <div
                                    className={`border text-lg rounded-lg p-2 mb-2 font-poppins cursor-pointer ${selectedCareer === option.id ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleCareerSelect(option)}
                                    style={{
                                        backgroundImage: selectedCareer === option ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                    }}
                                >
                                    <div className="text-center">{option}</div>
                                </div>
                                <div>
                                    <div className="text-md font-roboto text-center text-blue-700">Employability Score
                                        - 75%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dotted divider */}
                    <div className="w-0 border-r-2 border-dashed h-auto mb-10"></div>

                    {/* Right section - Skills mapped to selected career */}
                    <div className="w-4/5 pl-4 flex flex-col justify-between">
                        <h3 className="text-center text-lg border-2 rounded-md border-blue-500 font-semibold mb-6 p-4">Skills
                            for the Selected Career Path</h3>
                        {selectedCareer && CareerJobs[selectedCareer] ? (
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
                                    {CareerJobs[selectedCareer].map((skill, index) => (
                                        <tr key={index} className="mb-4">
                                            <td className="px-4 py-4 text-center">
                                                <div
                                                    className="border text-gray-900 p-2 rounded-md font-roboto bg-yellow-400">
                                                    {skill}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`inline-block w-4 h-4 mx-1 cursor-pointer  ${i < skill? 'text-yellow-500' : 'text-gray-300'}`}
                                                        // onClick={() => handleStarClick(index, i + 1)}
                                                    />
                                                ))}
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
                selectedView === 'opportunities' && (<></>
                    // <div className="flex p-8 h-full">
                    //     {/* Left section - Career options */}
                    //     <div className="w-1/5 pr-4 overflow-y-auto" style={{maxHeight: '32rem'}}>
                    //         <h3 className="text-center text-lg border-2 rounded-md border-blue-500 font-semibold mb-8 p-4">Opportunities</h3>
                    //         {opportunitiesOptions.map(option => (
                    //             <div className="text-center mb-6" key={option.id}>
                    //                 <div
                    //                     className={`border text-lg rounded-lg p-2 mb-1 cursor-pointer font-poppins ${selectedCareer === option.id ? 'bg-yellow-400' : ''}`}
                    //                     onClick={() => handleCareerSelect(option.id)}
                    //                     style={{
                    //                         backgroundImage: selectedCareer === option.id ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                    //                     }}
                    //                 >
                    //                     <div className="text-center">{option.name}</div>
                    //                 </div>
                    //                 <div>
                    //                     <div className="text-sm">
                    //                         {option.companyName} |
                    //                         <span
                    //                             className="text-blue-500 underline cursor-pointer">  View Job Details</span>
                    //                     </div>
                    //                     <div className="text-xs text-center text-gray-600">
                    //                         {option.appliedOn ? `Applied On - ${option.appliedOn}` : `Liked On - ${option.likedOn}`}
                    //                     </div>
                    //                     <div className="text-base text-center font-roboto text-blue-700">Employability Score
                    //                         - {option.employabilityScore}%
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         ))}
                    //     </div>
                    //
                    //     {/* Dotted line */}
                    //     <div className="w-0 border-r-2 border-dashed h-auto mb-10"></div>
                    //
                    //     {/* Right section - Skills mapped to selected career */}
                    //     <div className="w-4/5 pl-4 flex flex-col justify-between">
                    //         <h3 className="text-center text-lg border-2 rounded-md border-blue-500 font-semibold mb-6 p-4">Skills
                    //             for the Selected Opportunities of your Interest</h3>
                    //         {selectedCareer && skillsData[selectedCareer] ? (
                    //             <div className="overflow-x-auto h-full">
                    //                 <table className="min-w-full bg-white table-auto">
                    //                     <thead>
                    //                     <tr>
                    //                         <th className="px-4 py-2"></th>
                    //                         <th className="px-4 py-2 text-lg text-center">Self Rating</th>
                    //                         <th className="px-4 py-2 text-lg text-center">Assessment</th>
                    //                         <th className="px-4 py-2 text-lg text-center">Learning Path</th>
                    //                     </tr>
                    //                     </thead>
                    //                     <tbody className="gap-y-16">
                    //                     {skillsData[selectedCareer].map((skill, index) => (
                    //                         <tr key={index} className="mb-4">
                    //                             <td className="px-4 py-4 text-center">
                    //                                 <div className="border font-roboto p-2 rounded-md bg-yellow-400">
                    //                                     {skill.skill}
                    //                                 </div>
                    //                             </td>
                    //                             <td className="px-4 py-4 text-center">
                    //                                 {[...Array(5)].map((_, i) => (
                    //                                     <FaStar
                    //                                         key={i}
                    //                                         className={`inline-block w-4 h-4 mx-1 cursor-pointer  ${i < skill.selfRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    //                                         onClick={() => handleStarClick(index, i + 1)}
                    //                                     />
                    //                                 ))}
                    //                             </td>
                    //                             <td className="px-4 py-4 text-center">
                    //                                 <div
                    //                                     className={`${skill.assessment.includes('Pending') ? 'text-red-500' : skill.assessment.includes('Average') ? 'text-green-500' : 'text-yellow-500'}`}>
                    //                                     {skill.assessment}
                    //                                 </div>
                    //                                 {skill.completedDate && (
                    //                                     <div className="text-gray-500">
                    //                                         Completed on {skill.completedDate}
                    //                                     </div>
                    //                                 )}
                    //                             </td>
                    //                             {/*<td className="px-4 py-4 text-center">*/}
                    //                             {/*    {skill.learningPath.map((course, idx) => (*/}
                    //                             {/*        <div key={idx} className="text-blue-500">{course}</div>*/}
                    //                             {/*    ))}*/}
                    //                             {/*</td>*/}
                    //                         </tr>
                    //                     ))}
                    //                     </tbody>
                    //
                    //                 </table>
                    //             </div>
                    //         ) : (
                    //             <p>Please select a career option to see the mapped skills.</p>
                    //         )}
                    //     </div>
                    // </div>
                )
            }
        </div>
    );
    }

};

export default LearningPathView;
