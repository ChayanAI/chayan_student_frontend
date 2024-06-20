import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const LearningPathView = () => {
    const [selectedView, setSelectedView] = useState('careerPaths'); // State to track selected view
    const [selectedCareer, setSelectedCareer] = useState(1); // State to track selected career (default to first career)

    // Sample data for career options and skills
    const careerOptions = [
        { id: 1, name: 'Web Developer', employabilityScore: 85 },
        { id: 2, name: 'DevOps Engineer', employabilityScore: 78 },
        { id: 3, name: 'AI Engineer', employabilityScore: 90 },
    ];

    const skillsData = {
        1: [
            { skill: 'JavaScript', selfRating: 3, assessment: 'Pending', completedDate: null, learningPath: ['Master JavaScript'] },
            { skill: 'React', selfRating: 4, assessment: 'Average', completedDate: '01/01/2023', learningPath: ['Beginners course for React'] },
            { skill: 'Node.js', selfRating: 2, assessment: 'Below Average', completedDate: '15/02/2023', learningPath: ['Learn Node.Js'] },
        ],
        2: [
            { skill: 'AWS', selfRating: 3, assessment: 'Pending', completedDate: null, learningPath: ['Master AWS'] },
            { skill: 'SQL', selfRating: 4, assessment: 'Average', completedDate: '01/06/2023', learningPath: ['Basics of SQL'] },
        ],
        3: [
            { skill: 'Probability and Stats', selfRating: 4, assessment: 'Pending', completedDate: null, learningPath: ['Complete course on Probability'] },
            { skill: 'Neural Networks', selfRating: 5, assessment: 'Average', completedDate: '01/09/2023', learningPath: ['Basics of Neural Networks'] },
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
        <div className="bg-white shadow-md border-2 border-blue-500 h-full w-full " style={{ maxHeight: '42.8rem' }}>
            {/* Header with two view options */}
            <div className="flex justify-between mb-4">
                <div
                    className={`w-1/2 text-xl text-center cursor-pointer ${selectedView === 'careerPaths' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-4`}
                    onClick={() => setSelectedView('careerPaths')}
                >
                    For Your Career Paths
                </div>
                <div
                    className={`w-1/2 text-xl text-center cursor-pointer ${selectedView === 'opportunities' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-4`}
                    onClick={() => setSelectedView('opportunities')}
                >
                    For the Opportunities of Your Interest
                </div>
            </div>

            {selectedView === 'careerPaths' && (
                <div className="flex p-8 h-full">
                    {/* Left section - Career options */}
                    <div className="w-1/5 pr-4 overflow-y-auto" style={{ maxHeight: '40rem' }}>
                        <h3 className="text-center text-xl border-2 border-blue-500 font-semibold mb-14 p-4">Career Paths</h3>
                        {careerOptions.map(option => (
                            <div className="text-center mb-14" key={option.id}>
                                <div
                                    className={`border rounded-lg p-2 mb-2 cursor-pointer ${selectedCareer === option.id ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleCareerSelect(option.id)}
                                    style={{
                                        backgroundImage: selectedCareer === option.id ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                    }}
                                >
                                    <div className="text-center">{option.name}</div>
                                </div>
                                <div>
                                    <div className="text-lg text-center text-blue-700">Employability Score - {option.employabilityScore}%</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right section - Skills mapped to selected career */}
                    <div className="w-4/5 pl-4 flex flex-col justify-between">
                        <h3 className="text-center text-xl border-2 border-blue-500 font-semibold mb-6 p-4">Skills for the Selected Career Path</h3>
                        {selectedCareer && skillsData[selectedCareer] ? (
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
                                        {skillsData[selectedCareer].map((skill, index) => (
                                            <tr key={index} className="mb-4">
                                                <td className="px-4 py-4 text-center">
                                                    <div className="border  p-4 bg-yellow-400">
                                                        {skill.skill}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`inline-block w-4 h-4 mx-1 cursor-pointer  ${i < skill.selfRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                            onClick={() => handleStarClick(index, i + 1)}
                                                        />
                                                    ))}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className={`${skill.assessment.includes('Pending') ? 'text-red-500' : skill.assessment.includes('Average') ? 'text-green-500' : 'text-yellow-500'}`}>
                                                        {skill.assessment}
                                                    </div>
                                                    {skill.completedDate && (
                                                        <div className="text-gray-500">
                                                            Completed on {skill.completedDate}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {skill.learningPath.map((course, idx) => (
                                                        <div key={idx} className="text-blue-500">{course}</div>
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
            )
            }

            {
                selectedView === 'opportunities' && (
                    <div className="flex p-8 h-full">
                        {/* Left section - Career options */}
                        <div className="w-1/5 pr-4 overflow-y-auto" style={{ maxHeight: '40rem' }}>
                            <h3 className="text-center text-xl border-2 border-blue-500 font-semibold mb-14 p-4">Career Paths</h3>
                            {careerOptions.map(option => (
                                <div className="text-center mb-14" key={option.id}>
                                    <div
                                        className={`border rounded-lg p-2 mb-2 cursor-pointer ${selectedCareer === option.id ? 'bg-yellow-400' : ''}`}
                                        onClick={() => handleCareerSelect(option.id)}
                                        style={{
                                            backgroundImage: selectedCareer === option.id ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                                        }}
                                    >
                                        <div className="text-center">{option.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg text-center text-blue-700">Employability Score - {option.employabilityScore}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right section - Skills mapped to selected career */}
                        <div className="w-4/5 pl-4 flex flex-col justify-between">
                            <h3 className="text-center text-xl border-2 border-blue-500 font-semibold mb-6 p-4">Skills for the Selected Career Path</h3>
                            {selectedCareer && skillsData[selectedCareer] ? (
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
                                            {skillsData[selectedCareer].map((skill, index) => (
                                                <tr key={index} className="mb-4">
                                                    <td className="px-4 py-4 text-center">
                                                        <div className="border  p-4 bg-yellow-400">
                                                            {skill.skill}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={`inline-block w-4 h-4 mx-1 cursor-pointer  ${i < skill.selfRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                                onClick={() => handleStarClick(index, i + 1)}
                                                            />
                                                        ))}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <div className={`${skill.assessment.includes('Pending') ? 'text-red-500' : skill.assessment.includes('Average') ? 'text-green-500' : 'text-yellow-500'}`}>
                                                            {skill.assessment}
                                                        </div>
                                                        {skill.completedDate && (
                                                            <div className="text-gray-500">
                                                                Completed on {skill.completedDate}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        {skill.learningPath.map((course, idx) => (
                                                            <div key={idx} className="text-blue-500">{course}</div>
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
                )
            }
        </div >
    );
};

export default LearningPathView;
