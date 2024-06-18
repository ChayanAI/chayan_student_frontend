"use client";
import React, { useState } from 'react';

const ResumeBuilderView = () => {

    const [selectedView, setSelectedView] = useState('build'); // State to track selected view (build, customize, upload)
    const [selectedTemplate, setSelectedTemplate] = useState(0); // State to track selected template

    // Sample data for resume templates (replace with actual data or fetch dynamically)
    const templates = [
        { id: 1, name: 'Template 1' },
        { id: 2, name: 'Template 2' },
        { id: 3, name: 'Template 3' },
        { id: 4, name: 'Template 4' },
        { id: 5, name: 'Template 5' },
        { id: 6, name: 'Template 6' },
    ];

    const employabilityScore = 80; // Example score
    const employabilityTips = [
        'Include relevant keywords and skills.',
        'Quantify achievements with numbers.',
        'Use action verbs to start bullet points.',
        'Keep formatting clean and consistent.',
    ];
    const expectedScore = 95; // Example expected score

    const handleViewChange = (view) => {
        setSelectedView(view); // Update selected view
    };

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId); // Update selected template
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-4">
            {/* View selector buttons at the top */}
            <div className="flex justify-center mb-4">
                <button
                    className={`mr-4 px-4 py-2 border rounded ${selectedView === 'build' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleViewChange('build')}
                >
                    Build Resume
                </button>
                <button
                    className={`mr-4 px-4 py-2 border rounded ${selectedView === 'customize' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleViewChange('customize')}
                >
                    Customize Resume
                </button>
                <button
                    className={`px-4 py-2 border rounded ${selectedView === 'upload' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleViewChange('upload')}
                >
                    Upload JD
                </button>
            </div>

            {selectedView === 'build' && (
                <>
                    {/* Centered option buttons */}
                    <div className="flex justify-center mb-4 border-dotted">
                        <button className="px-4 py-2 border rounded">Option 1</button>
                        <button className="mx-4 px-4 py-2 border rounded">Option 2</button>
                        <button className="px-4 py-2 border rounded">Option 3</button>
                    </div>

                    <div className="flex">
                        {/* Left section - Template chooser */}
                        <div className="w-1/2 pr-4">
                            <h3 className="font-semibold mb-4">Choose / Change Template</h3>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className={`border rounded p-4 cursor-pointer ${selectedTemplate === template.id ? 'bg-yellow-200' : ''}`}
                                        onClick={() => handleTemplateSelect(template.id)}
                                    >
                                        <p className="text-center mt-2">{template.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dotted line separator */}
                        <div className="border-r-2 border-dotted"></div>

                        {/* Right section - Selected template details */}
                        <div className="w-1/2 pl-4">
                            <h3 className="font-bold mb-4">Resume</h3>
                            {selectedTemplate ? (
                                <div className="border rounded p-4 mb-4">
                                    <div className="relative">
                                        <div className="border rounded p-4 bg-gray-100 mb-4">
                                            <p className="text-center">{`Selected Template ${selectedTemplate}`}</p>
                                        </div>
                                        <div className="absolute bottom-2 left-2">
                                            <button className="text-blue-500 underline">Edit</button>
                                        </div>
                                        <div className="absolute bottom-2 right-2">
                                            <button className="text-blue-500 underline">Download</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Please select a template from the left.</p>
                            )}
                            <div className="border rounded p-4 mb-4">
                                <h4 className="font-semibold">Employability Score</h4>
                                <p>Score: {employabilityScore}%</p>
                                <h4 className="font-semibold mt-4">Tips</h4>
                                <ul className="list-disc list-inside">
                                    {employabilityTips.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                                <h4 className="font-semibold mt-4">Expected Score</h4>
                                <p>{expectedScore}%</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {selectedView === 'customize' && (
                <div>
                    <h3>Customize Resume View </h3>
                </div>
            )}

            {selectedView === 'upload' && (
                <div>
                    <h3>Upload JD View </h3>
                </div>
            )}
        </div>
    );
};

export default ResumeBuilderView;
