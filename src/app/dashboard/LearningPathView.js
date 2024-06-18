import React, { useState } from 'react';

const LearningPathView = () => {
    const [selectedView, setSelectedView] = useState('careerPaths'); // State to track selected view
    const [selectedCareer, setSelectedCareer] = useState(1); // State to track selected career (default to first career)

    // Sample data for career options and skills
    const careerOptions = [
        { id: 1, name: 'Software Engineer' },
        { id: 2, name: 'Data Analyst' },
        { id: 3, name: 'Product Manager' },
    ];

    const skillsData = {
        1: [
            { skill: 'JavaScript', selfRating: 3, assessment: 'Pending', learningPath: ['Course 1', 'Course 2'] },
            { skill: 'React', selfRating: 4, assessment: 'Average (Completed on 01 Jan 2023)', learningPath: ['Course 3', 'Course 4'] },
            { skill: 'Node.js', selfRating: 2, assessment: 'Below Average (Completed on 15 Feb 2023)', learningPath: ['Course 5', 'Course 6'] },
        ],
        2: [
            { skill: 'Python', selfRating: 3, assessment: 'Pending', learningPath: ['Course 7', 'Course 8'] },
            { skill: 'SQL', selfRating: 4, assessment: 'Average (Completed on 01 Mar 2023)', learningPath: ['Course 9', 'Course 10'] },
        ],
        3: [
            { skill: 'Project Management', selfRating: 4, assessment: 'Pending', learningPath: ['Course 11', 'Course 12'] },
            { skill: 'Agile Methodology', selfRating: 5, assessment: 'Average (Completed on 01 Apr 2023)', learningPath: ['Course 13', 'Course 14'] },
        ],
    };

    const handleCareerSelect = (careerId) => {
        setSelectedCareer(careerId);
    };

    const handleStarClick = (skillIndex, rating) => {
        const newSkills = skillsData[selectedCareer].map((skill, index) => {
            if (index === skillIndex) {
                return { ...skill, selfRating: rating };
            }
            return skill;
        });

        skillsData[selectedCareer] = newSkills;
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Header with two view options */}
            <div className="flex justify-between mb-4">
                <div
                    className={`w-1/2 text-center cursor-pointer ${selectedView === 'careerPaths' ? 'bg-blue-500 text-white' : ''} px-4 py-2 rounded`}
                    onClick={() => setSelectedView('careerPaths')}
                >
                    For Your Career Paths
                </div>
                <div
                    className={`w-1/2 text-center cursor-pointer ${selectedView === 'opportunities' ? 'bg-blue-500 text-white' : ''} px-4 py-2 rounded`}
                    onClick={() => setSelectedView('opportunities')}
                >
                    Opportunities of Your Interest
                </div>
            </div>

            {selectedView === 'careerPaths' && (
                <div className="flex">
                    {/* Left section - Career options */}
                    <div className="w-1/5 pr-4">
                        <h3 className="font-semibold mb-4">Career Options</h3>
                        {careerOptions.map(option => (
                            <div
                                key={option.id}
                                className={`border rounded p-2 mb-2 cursor-pointer ${selectedCareer === option.id ? 'bg-yellow-200' : ''}`}
                                onClick={() => handleCareerSelect(option.id)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>

                    {/* Right section - Skills mapped to selected career */}
                    <div className="w-4/5 pl-4">
                        <h3 className="font-semibold mb-4">Skills Mapped to Selected Career</h3>
                        {selectedCareer && skillsData[selectedCareer] ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">Skill</th>
                                            <th className="px-4 py-2 border">Self Rating</th>
                                            <th className="px-4 py-2 border">Assessment</th>
                                            <th className="px-4 py-2 border">Learning Path</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {skillsData[selectedCareer].map((skill, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-2 border">{skill.skill}</td>
                                                <td className="px-4 py-2 border">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`inline-block w-4 h-4 mx-1 cursor-pointer ${i < skill.selfRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                            onClick={() => handleStarClick(index, i + 1)}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="px-4 py-2 border">{skill.assessment}</td>
                                                <td className="px-4 py-2 border">
                                                    {skill.learningPath.map((course, idx) => (
                                                        <div key={idx}>{course}</div>
                                                    ))}
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
            )}

            {selectedView === 'opportunities' && (
                <div className="flex">
                    {/* Left section - Career options */}
                    <div className="w-1/5 pr-4">
                        <h3 className="font-semibold mb-4">Career Options</h3>
                        {careerOptions.map(option => (
                            <div
                                key={option.id}
                                className={`border rounded p-2 mb-2 cursor-pointer ${selectedCareer === option.id ? 'bg-yellow-200' : ''}`}
                                onClick={() => handleCareerSelect(option.id)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>

                    {/* Right section - Skills mapped to selected career */}
                    <div className="w-4/5 pl-4">
                        <h3 className="font-semibold mb-4">Skills Mapped to Selected Career</h3>
                        {selectedCareer && skillsData[selectedCareer] ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">Skill</th>
                                            <th className="px-4 py-2 border">Self Rating</th>
                                            <th className="px-4 py-2 border">Assessment</th>
                                            <th className="px-4 py-2 border">Learning Path</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {skillsData[selectedCareer].map((skill, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-2 border">{skill.skill}</td>
                                                <td className="px-4 py-2 border">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`inline-block w-4 h-4 mx-1 cursor-pointer ${i < skill.selfRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                            onClick={() => handleStarClick(index, i + 1)}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="px-4 py-2 border">{skill.assessment}</td>
                                                <td className="px-4 py-2 border">
                                                    {skill.learningPath.map((course, idx) => (
                                                        <div key={idx}>{course}</div>
                                                    ))}
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
            )}
        </div>
    );
};

export default LearningPathView;
