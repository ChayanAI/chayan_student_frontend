"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const MockInterviewsView = () => {
    const router = useRouter();

    const [careerPath, setCareerPath] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(()=>{
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: res.data.id}).then((res) => {
                    setCareerPath(res.data.career_path)
                })
            })

            setLoader(true)
        })()
    },[])

    const [isInstructionsRead, setIsInstructionsRead] = useState(false);
    const [activeView, setActiveView] = useState('practice');
    const [selectedInterview, setSelectedInterview] = useState(1);
    const [selectedRole, setSelectedRole] = useState();
    const [selectedRoleSelect, setSelectedRoleSelect] = useState(0);
    const [selectedFormat, setSelectedFormat] = useState(0);
    const [selectedTimeLength, setSelectedTimeLength] = useState('15 min');
    
    const mockInterviews = [
        {
            id: 1,
            title: '1st Mock Interview',
            date: '01 Jan 2023',
            time: '10:00 AM',
            careerPath: 'Software Engineer',
            company: 'TechCorp',
            format: 'Technical Interview',
            timeLength: '20 min',
            assessment: 'Assessment content for 1st Mock Interview.',
        },
        {
            id: 2,
            title: '2nd Mock Interview',
            date: '15 Feb 2023',
            time: '2:30 PM',
            careerPath: 'Data Analyst',
            company: 'DataTech',
            format: 'Behavioral Interview',
            timeLength: '15 min',
            assessment: 'Assessment content for 2nd Mock Interview.',
        },
        // Add more mock interviews as needed
    ];

    const selectedInterviewDetails = mockInterviews.find(
        (interview) => interview.id === selectedInterview
    );

    
    const getNumberWithSuffix = (num) => {
        const lastDigit = num % 10;
        const lastTwoDigits = num % 100;
      
        let suffix;
      
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
          suffix = 'th';
        } else {
          switch (lastDigit) {
            case 1:
              suffix = 'st';
              break;
            case 2:
              suffix = 'nd';
              break;
            case 3:
              suffix = 'rd';
              break;
            default:
              suffix = 'th';
          }
        }
        return `${num}${suffix}`;
    };

    const handleInterviewClick = (index) => {
        setSelectedInterview(index);
    };
    if(!loader){
        return(<></>)
    }
    else{
        return (
        <div className="bg-white shadow-md border-2 border-blue-500 h-fit w-full rounded-b-lg min-h-[35rem]">
            {/* Header with two view options */}
            <div className="flex justify-between mb-6 border-b-2 border-blue-500">
                <div
                    className={`w-1/2 text-xl font-lato text-center cursor-pointer ${activeView === 'practice' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-3`}
                    onClick={() => setActiveView('practice')}
                >
                    For Your Career Paths
                </div>
                <div
                    className={`w-1/2 text-xl font-lato text-center cursor-pointer ${activeView === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-3`}
                    onClick={() => setActiveView('history')}
                >
                    For the Opportunities of Your Interest
                </div>
            </div>

            {activeView === 'practice' && (
                <div className="flex h-full">
                    {/* Left section - 60% width */}
                    <div className="w-3/5">
                        <div className="p-4 pt-0">
                            <div className="px-10 py-1 rounded-xl mx-auto w-fit text-center mb-4 bg-green-600 font-semibold text-lg text-white">Define Mock Interview Structure</div>

                            {/* Select Role */}
                            <div className="mt-8 py-2 pr-4">
                                <div className="flex gap-4 text-center">
                                    <div className="flex-none w-1/5 text-center mt-9">
                                        <span className="underline underline-offset-2 font-bold text-center">Select Role</span>
                                    </div>
                                    <div className="flex flex-col gap-2 w-fit mr-2">

                                        <button className={`px-4 py-2 text-md border rounded font-semibold font-poppins shadow-md ${selectedRoleSelect === 0 ? 'bg-slate-700 text-white' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                            onClick={() => setSelectedRoleSelect(0)}
                                            style={{
                                                // backgroundImage: selectedRoleSelect === 0 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                            }}
                                            >Career Path</button>
                                        <button className={`px-4 py-2 text-md border rounded font-semibold font-poppins shadow-md ${selectedRoleSelect === 1 ? 'bg-slate-700 text-white' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                            onClick={() => setSelectedRoleSelect(1)}
                                            style={{
                                                // backgroundImage: selectedRoleSelect === 1 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                            }}
                                            >Jobs Liked/Applied</button>
                                    </div>
                                    <div className="flex-grow grid grid-cols-2 gap-2">
                                        {careerPath.map((path)=>{
                                            return(<button
                                            className={`px-4 py-2 text-md border rounded font-medium shadow-md ${selectedRole === path ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                            onClick={() => setSelectedRole(path)}
                                            style={{
                                                backgroundImage: selectedRole === path ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                            }}
                                        >
                                                {path}
                                        </button>)
                                        })}

                                        {/*<button*/}
                                        {/*    className={`px-4 py-2 text-md border rounded font-medium shadow-md ${selectedRole === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}*/}
                                        {/*    onClick={() => setSelectedRole(0)}*/}
                                        {/*    style={{*/}
                                        {/*        backgroundImage: selectedRole === 0 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    Role 1*/}
                                        {/*</button>*/}
                                        {/*<button*/}
                                        {/*    className={`px-4 py-2 text-md border rounded font-medium shadow-md ${selectedRole === 1 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}*/}
                                        {/*    onClick={() => setSelectedRole(1)}*/}
                                        {/*    style={{*/}
                                        {/*        backgroundImage: selectedRole === 1 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    Role 2*/}
                                        {/*</button>*/}
                                        {/*<button*/}
                                        {/*    className={`px-4 py-2 text-md border rounded font-medium shadow-md ${selectedRole === 2 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}*/}
                                        {/*    onClick={() => setSelectedRole(2)}*/}
                                        {/*    style={{*/}
                                        {/*        backgroundImage: selectedRole === 2 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    Role 3*/}
                                        {/*</button>*/}
                                        {/*<button*/}
                                        {/*    className={`px-4 py-2 text-md border rounded font-medium shadow-md ${selectedRole === 3 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}*/}
                                        {/*    onClick={() => setSelectedRole(3)}*/}
                                        {/*    style={{*/}
                                        {/*        backgroundImage: selectedRole === 3 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    Role 4*/}
                                        {/*</button>*/}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-t-2 border-dashed my-4" />

                            {/* Select Format */}
                            <div className="py-2 pr-4">
                                <div className="flex gap-4 text-center">
                                    <div className="flex-none w-1/5 mt-4">
                                        <span className="underline underline-offset-2 font-bold text-center">Select Format</span>
                                    </div>
                                    <div className="flex-grow flex flex-wrap gap-4">
                                        <div className="flex flex-col w-[30%] items-center">
                                            <button
                                                className={`px-4 py-2 w-full text-md border rounded font-medium shadow-md ${selectedFormat === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                                onClick={() => setSelectedFormat(0)}
                                                style={{
                                                    backgroundImage: selectedFormat === 0 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                                }}
                                            >
                                                Technical
                                            </button>
                                            <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                        </div>
                                        <div className="flex flex-col w-[30%] items-center">
                                            <button
                                                className={`px-4 py-2 w-full text-md border rounded font-medium shadow-md ${selectedFormat === 1 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                                onClick={() => setSelectedFormat(1)}
                                                style={{
                                                    backgroundImage: selectedFormat === 1 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                                }}
                                            >
                                                Behavioral
                                            </button>
                                            <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                        </div>
                                        <div className="flex flex-col w-[30%] items-center">
                                            <button
                                                className={`px-4 py-2 w-full text-md border rounded font-medium shadow-md ${selectedFormat === 2 ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                                onClick={() => setSelectedFormat(2)}
                                                style={{
                                                    backgroundImage: selectedFormat === 2 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                                }}
                                            >
                                                HR
                                            </button>
                                            <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-t-2 border-dashed my-4" />

                            {/* Select Time Length */}
                            <div className="py-2 pr-4">
                                <div className="flex gap-4 text-center">
                                    <div className="flex-none w-1/5">
                                        <span className="underline underline-offset-2 font-bold text-center">Select Time Length</span>
                                    </div>
                                    <div className="flex-grow flex gap-4">
                                        <button
                                            className={`px-8 py-2 w-[30%] text-md border rounded font-medium shadow-md ${selectedTimeLength === '15 min' ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                            onClick={() => setSelectedTimeLength('15 min')}
                                            style={{
                                                backgroundImage: selectedTimeLength === '15 min' ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                            }}
                                        >
                                            15 min
                                        </button>
                                        <button
                                            className={`px-8 py-2 w-[30%] text-md border rounded font-medium shadow-md ${selectedTimeLength === '20 min' ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                            onClick={() => setSelectedTimeLength('20 min')}
                                            style={{
                                                backgroundImage: selectedTimeLength === '20 min' ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                            }}
                                        >
                                            20 min
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dotted line between left and right sections */}
                    <div className="border-r-2 border-dashed mb-4"></div>

                    {/* Right section - 40% width */}
                    <div className="w-2/5 pl-4">
                        <h4 className="mb-4 ml-6 font-bold text-lg">Flow of the Interview - Instructions</h4>
                        <ol className="list-decimal list-outside text-sm px-6 text-gray-800">
                            <li className='leading-tight pt-1 pl-1'>Perform a quick system check to ensure your webcam, microphone, and internet connection are working properly.</li>
                            <li className='leading-tight pt-1 pl-1'>Make sure you choose a quiet, well-lit space for the interview.</li>
                            <li className='leading-tight pt-1 pl-1'>This is a 15/20-minute interview (format chosen) where the system will ask 4-5 questions. The questions will also be visible on your screen while you respond.</li>
                            <li className='leading-tight pt-1 pl-1'>There will be a time limit for each question; you need to finish your response within the allotted time.</li>
                            <li className='leading-tight pt-1 pl-1'>Once you finish your response to a question, click the 'Response Over' button. The system will then ask you the next question.</li>
                            <li className='leading-tight pt-1 pl-1'>You will be evaluated on your body language, personality, response content, response structure, tone, and language.</li>
                            <li className='leading-tight pt-1 pl-1'>During the interview, the system will provide you with live alerts if required so that you are able to understand the instance with the alert too.</li>
                            <li className='leading-tight pt-1 pl-1'>After the interview is over, CHAYAN.Ai will provide you with detailed feedback about the interview for you to reflect upon.</li>
                            <li className='leading-tight pt-1 pl-1'>You can connect with our expert with your feedback if needed.</li>
                        </ol>
                        <div className="flex my-4">
                            <input
                                type="checkbox"
                                id="readInstructions"
                                className="mx-2 mt-2 w-3 h-3 border-2 border-blue-600 focus:ring-transparent"
                                onChange={(e) => setIsInstructionsRead(e.target.checked)}
                            />
                            <label htmlFor="readInstructions">I have read all the details and am ready for the mock interview</label>
                        </div>
                        <button
                            className={`mx-auto block px-8 mb-4 py-2 text-white rounded ${!isInstructionsRead ? 'bg-blue-400' : 'bg-blue-600 shadow-lg hover:scale-105' }`}
                            disabled={!isInstructionsRead}
                            onClick={() => {router.push(`/interview`)}}
                        >
                            Start
                        </button>
                    </div>
                </div>
            )}

            {activeView === 'history' && (
                <div className="flex h-full">
                        {/* Left section - 50% width */}
                        <div className="w-3/5 px-4">
                                <div className="flex gap-12">
                                    <div className="w-2/5 flex flex-col gap-y-6 my-8">
                                        {mockInterviews.map((interview) => (
                                            <button
                                                className={`px-4 py-2 text-md border rounded font-medium shadow-md ${selectedInterview === interview.id ? 'bg-yellow-400 text-black' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                                onClick={() => setSelectedInterview(interview.id)}
                                                style={{
                                                    backgroundImage: selectedInterview === interview.id ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                                }}
                                            >{getNumberWithSuffix(interview.id)} Mock Interview</button>
                                        ))}
                                    </div>
                                    <div className="w-3/5 flex flex-col">
                                        <div className="px-4 py-4 border-b-2 border-dashed flex flex-col gap-4">
                                            <p className="">{`${selectedInterviewDetails.date} | ${selectedInterviewDetails.time}`}</p>
                                            <p className="">{`${selectedInterviewDetails.careerPath} | ${selectedInterviewDetails.company}`}</p>
                                            <p className="">{`${selectedInterviewDetails.format} | ${selectedInterviewDetails.timeLength}`}</p>
                                        </div>
                                        <div className="px-4 py-4 flex flex-col gap-4 min-h-40">
                                            <p className="mr-12">Youtube Video link with video thumbnail for the interview</p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        {/* Dotted line between left and right sections */}
                        <div className="border-r-2 border-dashed mb-4"></div>

                        {/* Right section - 50% width */}
                        <div className="w-2/5 px-4">
                            <h4 className="font-bold text-lg mb-4">CHAYAN Assessment of the mock Interview</h4>
                            <div className="border rounded p-2 mb-4 overflow-y-auto" style={{ maxHeight: '200px' }}>
                                <p>{selectedInterviewDetails.assessment}</p>
                            </div>
                        </div>
                </div>
            )}
        </div>
    );
    }

};

export default MockInterviewsView;
