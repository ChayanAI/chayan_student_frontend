"use client";
import React, { useState, useEffect } from 'react';

const ResumeBuilderView = () => {

    const [selectedView, setSelectedView] = useState('build'); // State to track selected view (build, customize, upload)
    const [selectedTemplate, setSelectedTemplate] = useState(0); // State to track selected template

    // Sample data for resume templates (replace with actual data or fetch dynamically)
    const templates = [
        { id: 1, name: 'Template 1', imageUrl: '/template1.png' },
        { id: 2, name: 'Template 2', imageUrl: '/template2.png' },
        { id: 3, name: 'Template 3', imageUrl: '/template3.png' },
        { id: 4, name: 'Template 4', imageUrl: '/template4.png' },
        { id: 5, name: 'Template 5', imageUrl: '/template5.png' },
        { id: 6, name: 'Template 6', imageUrl: '/template6.png' },
    ];

    // Dummy data for employability score and tips (replace with actual data or API call)
    const employabilityScore = 85; // Example score
    const employabilityTips = 'Include relevant keywords and skills to improve your resume.';

    const handleViewChange = (view) => {
        setSelectedView(view); // Update selected view
    };

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId); // Update selected template
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Build/Customize Resume</h2>

            {/* View selector buttons */}
            <div className="flex mb-4">
                <button
                    className={`mr-4 px-4 py-2 border rounded ${selectedView === 'build' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleViewChange('build')}
                >
                    Option 1 (Build)
                </button>
                <button
                    className={`mr-4 px-4 py-2 border rounded ${selectedView === 'customize' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleViewChange('customize')}
                >
                    Option 2 (Customize)
                </button>
                <button
                    className={`px-4 py-2 border rounded ${selectedView === 'upload' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleViewChange('upload')}
                >
                    Option 3 (Upload JD)
                </button>
            </div>

            {/* Content based on selected view */}
            <div className="flex">
                {/* Left section - Template chooser */}
                <div className="w-1/2 pr-4">
                    <h3 className="font-semibold mb-4">Choose and Change Template</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {templates.map(template => (
                            <div
                                key={template.id}
                                className={`border rounded cursor-pointer ${selectedTemplate === template.id ? 'border-blue-500' : ''}`}
                                onClick={() => handleTemplateSelect(template.id)}
                            >
                                <img src={template.imageUrl} alt={template.name} className="w-full h-auto rounded" />
                                <p className="text-center mt-2">{template.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right section - Selected template details */}
                <div className="w-1/2 pl-4">
                    <h3 className="font-semibold mb-4">Selected Template to Edit and Download</h3>
                    <div className="border rounded p-4 mb-4">
                        <img src={templates[selectedTemplate - 1]?.imageUrl} alt={templates[selectedTemplate - 1]?.name} className="w-full h-auto rounded" />
                    </div>
                    <div className="border rounded p-4 mb-4">
                        {/* Placeholder for editing options */}
                        <p>Editing options for the selected template.</p>
                    </div>
                    <button className="bg-blue-500 text-white rounded px-4 py-2 mb-4">Download Resume</button>

                    {/* Employability score and tips */}
                    <div className="border rounded p-4">
                        <h3 className="font-semibold mb-2">Employability Score</h3>
                        <p>Score: {employabilityScore}</p>
                        <p className="mb-4">Tips: {employabilityTips}</p>
                        <p>Expected Score: Add expected score here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilderView;
