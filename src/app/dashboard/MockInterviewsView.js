"use client";
import React, { useState, useEffect } from 'react';

const MockInterviewsView = () => {
    const [isInstructionsRead, setIsInstructionsRead] = useState(false);
    const [activeView, setActiveView] = useState('practice');
    const [selectedInterview, setSelectedInterview] = useState(0);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFormat, setSelectedFormat] = useState('');
    const [selectedTimeLength, setSelectedTimeLength] = useState('');

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

    const handleInterviewClick = (index) => {
        setSelectedInterview(index);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-4">
            {/* Header with two view options */}
            <div className="flex justify-between items-center border-2 mb-3">
                <div
                    className={`flex-1 text-center border-r-2 cursor-pointer ${activeView === 'practice' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setActiveView('practice')}
                >
                    <h3 className="font-semibold">Practice 3rd AI Mock Interview</h3>
                </div>
                <div
                    className={`flex-1 text-center cursor-pointer ${activeView === 'history' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setActiveView('history')}
                >
                    <h3 className="font-semibold">My AI Interview History</h3>
                </div>
            </div>

            {activeView === 'practice' && (
                <div className="flex">
                    {/* Left section - 60% width */}
                    <div className="w-3/5 pr-4">
                        <div className="border rounded-lg p-4 ">
                            <h4 className="text-center mb-4 bg-green-400">Define Mock Interview Structure</h4>

                            {/* Select Role */}
                            <div className="mb-4">
                                <div className="flex gap-2 text-center">
                                    <div className="flex-none w-1/5 text-center mt-9">
                                        <span className="underline text-center">Select Role</span>
                                    </div>
                                    <div className="flex-grow grid grid-cols-3 gap-2">
                                        <button
                                            className={`border rounded p-2 ${selectedRole === 'Career Path' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedRole('Career Path')}
                                        >
                                            Career Path
                                        </button>
                                        <button
                                            className={`border rounded p-2 ${selectedRole === 'Role 1' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedRole('Role 1')}
                                        >
                                            Role 1
                                        </button>
                                        <button
                                            className={`border rounded p-2 ${selectedRole === 'Role 2' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedRole('Role 2')}
                                        >
                                            Role 2
                                        </button>
                                        <button
                                            className={`border rounded p-2 ${selectedRole === 'Jobs Liked/Applied' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedRole('Jobs Liked/Applied')}
                                        >
                                            Jobs Liked/Applied
                                        </button>
                                        <button
                                            className={`border rounded p-2 ${selectedRole === 'Role 3' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedRole('Role 3')}
                                        >
                                            Role 3
                                        </button>
                                        <button
                                            className={`border rounded p-2 ${selectedRole === 'Role 4' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedRole('Role 4')}
                                        >
                                            Role 4
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-dotted mb-4" />

                            {/* Select Format */}
                            <div className="mt-4 mb-4 text-center">
                                <div className="flex gap-2">
                                    <div className="flex-none w-1/5 mt-4">
                                        <span className="underline ">Select Format</span>
                                    </div>
                                    <div className="flex-grow flex flex-wrap gap-4">
                                        <div className="flex flex-col items-center">
                                            <button
                                                className={`border rounded pl-8 pr-8 pb-3 pt-3 ${selectedFormat === 'Format 1' ? 'bg-yellow-200' : ''}`}
                                                onClick={() => setSelectedFormat('Format 1')}
                                            >
                                                Technical
                                            </button>
                                            <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <button
                                                className={`border rounded pl-8 pr-8 pb-3 pt-3 ${selectedFormat === 'Format 2' ? 'bg-yellow-200' : ''}`}
                                                onClick={() => setSelectedFormat('Format 2')}
                                            >
                                                Behavioral
                                            </button>
                                            <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <button
                                                className={`border rounded pl-8 pr-8 pb-3 pt-3 ${selectedFormat === 'Format 3' ? 'bg-yellow-200' : ''}`}
                                                onClick={() => setSelectedFormat('Format 3')}
                                            >
                                                HR
                                            </button>
                                            <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-dotted mb-4" />

                            {/* Select Time Length */}
                            <div className="mb-4 text-center">
                                <div className="flex gap-2">
                                    <div className="flex-none w-1/5">
                                        <span className="underline">Select Time Length</span>
                                    </div>
                                    <div className="flex-grow flex gap-14">
                                        <button
                                            className={`border rounded pl-8 pr-8 pb-3 pt-3 ${selectedTimeLength === '15 min' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedTimeLength('15 min')}
                                        >
                                            15 min
                                        </button>
                                        <button
                                            className={`border rounded pl-8 pr-8 pb-3 pt-3 ${selectedTimeLength === '20 min' ? 'bg-yellow-200' : ''}`}
                                            onClick={() => setSelectedTimeLength('20 min')}
                                        >
                                            20 min
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dotted line between left and right sections */}
                    <div className="border-r-2 border-dotted"></div>

                    {/* Right section - 40% width */}
                    <div className="w-2/5 pl-4">
                        <h4 className="mb-4 font-bold text-lg">Flow of the Interview - Instructions</h4>
                        <div className="border rounded p-4 mb-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
                            {/* <p>Flow of the interview - Basic Instructions</p> */}
                            <ol className="list-decimal list-inside">
                                <li>Perform a quick system check to ensure your webcam, microphone, and internet connection are working properly.</li>
                                <li>Make sure you choose a quiet, well-lit space for the interview.</li>
                                <li>This is a 15/20-minute interview (format chosen) where the system will ask 4-5 questions. The questions will also be visible on your screen while you respond.</li>
                                <li>There will be a time limit for each question; you need to finish your response within the allotted time.</li>
                                <li>Once you finish your response to a question, click the 'Response Over' button. The system will then ask you the next question.</li>
                                <li>You will be evaluated on your body language, personality, response content, response structure, tone, and language.</li>
                                <li>During the interview, the system will provide you with live alerts if required so that you are able to understand the instance with the alert too.</li>
                                <li>After the interview is over, CHAYAN.Ai will provide you with detailed feedback about the interview for you to reflect upon.</li>
                                <li>You can connect with our expert with your feedback if needed.</li>
                            </ol>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="readInstructions"
                                className="mr-2"
                                onChange={(e) => setIsInstructionsRead(e.target.checked)}
                            />
                            <label htmlFor="readInstructions">I have read all the details and am ready for the mock interview</label>
                        </div>
                        <button
                            className="mx-auto block p-2 bg-blue-500 text-white rounded"
                            disabled={!isInstructionsRead}
                            onClick={() => { /* handle click event */ }}
                        >
                            Start
                        </button>
                    </div>
                </div>
            )}

            {activeView === 'history' && (
                <div>
                    <div className="flex">
                        {/* Left section - 50% width */}
                        <div className="w-1/2 pr-4">
                            {mockInterviews.map((interview, index) => (
                                <button
                                    key={interview.id}
                                    className={`border rounded p-2 mb-2 w-full ${selectedInterview === index ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handleInterviewClick(index)}
                                >
                                    {interview.title}
                                    <br />
                                    {`${interview.date} | ${interview.time}`}
                                    <br />
                                    {`${interview.careerPath} | ${interview.company}`}
                                    <br />
                                    {`${interview.format} | ${interview.timeLength}`}
                                </button>
                            ))}
                        </div>

                        {/* Right section - 50% width */}
                        <div className="w-1/2 pl-4">
                            <h4 className="mb-4">CHAYAN Assessment of the mock Interview</h4>
                            <div className="border rounded p-2 mb-4 overflow-y-auto" style={{ maxHeight: '200px' }}>
                                <p>{mockInterviews[selectedInterview].assessment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockInterviewsView;
