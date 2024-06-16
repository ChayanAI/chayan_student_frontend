"use client";
import React, { useState, useEffect } from 'react';


const MockInterviewsView = () => {

    const [isInstructionsRead, setIsInstructionsRead] = useState(false);
    const [activeView, setActiveView] = useState('practice');
    const [selectedInterview, setSelectedInterview] = useState(0); // State to track selected interview

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
        setSelectedInterview(index); // Update selected interview index
    };
    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Mock Interviews</h2>

            {/* Header with two view options */}
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                <div
                    className={`flex-1 text-center border-r-2 cursor-pointer ${activeView === 'practice' ? 'bg-gray-200' : ''}`}
                    onClick={() => setActiveView('practice')}
                >
                    <h3 className="font-semibold">Practice 3rd AI Mock Interview</h3>
                </div>
                <div
                    className={`flex-1 text-center cursor-pointer ${activeView === 'history' ? 'bg-gray-200' : ''}`}
                    onClick={() => setActiveView('history')}
                >
                    <h3 className="font-semibold">My AI Interview History</h3>
                </div>
            </div>

            {activeView === 'practice' && (
                <div className="flex">
                    {/* Left section - 60% width */}
                    <div className="w-3/5 pr-4">
                        <h4 className="text-center mb-4">Define Mock Interview Structure</h4>

                        {/* Horizontal tabs for role, format, and time length */}
                        <div className="mb-4">
                            <h5 className="mb-2">Select Role</h5>
                            <div className="grid grid-cols-3 gap-2">
                                <button className="border rounded p-2">Role 1</button>
                                <button className="border rounded p-2">Role 2</button>
                                <button className="border rounded p-2">Role 3</button>
                                <button className="border rounded p-2">Role 4</button>
                                <button className="border rounded p-2">Role 5</button>
                                <button className="border rounded p-2">Role 6</button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5 className="mb-2">Select Format</h5>
                            <div className="flex gap-4">
                                <button className="border rounded p-2">Format 1</button>
                                <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                <button className="border rounded p-2">Format 2</button>
                                <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                                <button className="border rounded p-2">Format 3</button>
                                <div className="text-blue-500 underline cursor-pointer">Read Details</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5 className="mb-2">Select Time Length</h5>
                            <div className="flex gap-4">
                                <button className="border rounded p-2">15 min</button>
                                <button className="border rounded p-2">20 min</button>
                            </div>
                        </div>
                    </div>

                    {/* Right section - 40% width */}
                    <div className="w-2/5 pl-4">
                        <h4 className="mb-4">Flow of the Interview - Instructions</h4>
                        <div className="border rounded p-2 mb-4 overflow-y-auto" style={{ maxHeight: '200px' }}>
                            <p>Instruction content</p>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="readInstructions"
                                className="mr-2"
                                onChange={(e) => setIsInstructionsRead(e.target.checked)}
                            />
                            <label htmlFor="readInstructions">I have read the instructions</label>
                        </div>
                        <button
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
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
                    {/* Content for My AI Interview History */}
                    <div className="flex">
                        {/* Left section - 50% width */}
                        <div className="w-1/2 pr-4">
                            <h3 className="font-semibold mb-4">My AI Interview History</h3>
                            {/* Buttons for each interview */}
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
                                {/* Display assessment content based on selected interview */}
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
