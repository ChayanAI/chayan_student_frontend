"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const ResumeBuilderView = () => {

    const [selectedView, setSelectedView] = useState('build'); // State to track selected view (build, customize, upload)
    const [selectedTemplate, setSelectedTemplate] = useState(1); // State to track selected template
    const [selectedPath, setSelectedPath] = useState(0) // State to chose career path

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
        <div className="bg-white shadow-md border-2 border-blue-500 h-fit w-full rounded-b-lg" style={{ maxHeight: '42.8rem' }}>
            {/* View selector buttons at the top */}
            <div className="flex justify-between mb-4 border-b-2 border-b-blue-600">
                <div
                    className={`w-1/3 text-xl text-center cursor-pointer border-r-2 border-r-blue-500 ${selectedView === 'build' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-4`}
                    onClick={() => handleViewChange('build')}
                >
                    Build Resume
                </div>
                <div
                    className={`w-1/3 text-xl text-center cursor-pointer border-r-2 border-r-blue-600 ${selectedView === 'customize' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-4`}
                    onClick={() => handleViewChange('customize')}
                >
                    Customize Resume
                </div>
                <div
                    className={`w-1/3 text-xl text-center cursor-pointer ${selectedView === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-4 py-4`}
                    onClick={() => handleViewChange('upload')}
                >
                    Upload JD
                </div>
            </div>

            {selectedView === 'build' && (
                <>
                    {/* Centered option buttons */}
                    <div className="flex justify-evenly mb-4 border-dashed">
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 0 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(0)}
                            style={{
                                backgroundImage: selectedPath === 0 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >Option 1</button>
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 1 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(1)}
                            style={{
                                backgroundImage: selectedPath === 1 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >Option 2</button>
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 2 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(2)}
                            style={{
                                backgroundImage: selectedPath === 2 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >Option 3</button>
                    </div>

                    <div className="flex border-t-2 border-dashed">
                        {/* Left section - Template chooser */}
                        <div className="w-1/2 p-6 text-center justify-center">
                            <h3 className="font-bold mb-4">Choose / Change Template</h3>
                            <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className={`border-[3px] rounded p-4 mx-auto cursor-pointer w-36 h-48 ${selectedTemplate === template.id ? 'border-yellow-500' : 'border-[#48749c]'}`}
                                        onClick={() => handleTemplateSelect(template.id)}
                                    >
                                        <p className="text-center mt-2">{template.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dotted line separator */}
                        <div className="border-r-2 border-dashed"></div>

                        {/* Right section - Selected template details */}
                        <div className="w-1/2 h-fit p-6 flex">
                            <div className="flex flex-col w-1/2 text-center pl-2 pr-6">
                                <h3 className="font-bold mb-4">Resume</h3>
                                {selectedTemplate ? (
                                    <div className="rounded p-4 border-2 lg:min-h-72 border-yellow-500 mb-4">
                                        <p className="text-center">{`Selected Template ${selectedTemplate}`}</p>
                                    </div>                                    
                                ) : (
                                    <p>Please select a template from the left.</p>
                                )}
                                <div className="flex justify-between">
                                    <Link href={'/studentprofile'} className='text-blue-600 font-bold'>Edit</Link>
                                    <Link href={'/studentprofile'} className='text-blue-600 font-bold'>Download</Link>
                                </div>
                                <Link href={'/studentprofile'} className='text-gray-500 mt-3 font-bold'>Edit Experience</Link>
                            </div>
                            <div className="flex flex-col w-1/2 justify-center">
                                <div className="rounded p-4 mb-4">
                                    <div className="flex w-full text-center text-md lg:text-lg font-bold gap-1">
                                        <h4 className="text-blue-600">Employability Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{employabilityScore}</h4>
                                    </div>
                                    <h4 className="font-semibold mt-4">Tips</h4>
                                    <ul className="list-square list-outside">
                                        {employabilityTips.map((tip, index) => (
                                            <li className='ml-4 pl-1' key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                    <div className="flex w-full text-center text-sm font-medium gap-1 ml-4 mt-4">
                                        <h4 className="text-blue-600">Expected Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{expectedScore}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {selectedView === 'customize' && (
                <>
                    {/* Centered option buttons */}
                    <div className="flex justify-evenly mb-4 border-dashed">
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 0 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(0)}
                            style={{
                                backgroundImage: selectedPath === 0 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >Option 1</button>
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 1 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(1)}
                            style={{
                                backgroundImage: selectedPath === 1 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >Option 2</button>
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 2 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(2)}
                            style={{
                                backgroundImage: selectedPath === 2 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >Option 3</button>
                    </div>

                    <div className="flex border-t-2 border-dashed">
                        {/* Left section - Template chooser */}
                        <div className="w-1/2 p-6 text-center justify-center">
                            <h3 className="font-bold mb-4">Choose / Change Template</h3>
                            <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className={`border-[3px] rounded p-4 mx-auto cursor-pointer w-36 h-48 ${selectedTemplate === template.id ? 'border-yellow-500' : 'border-[#48749c]'}`}
                                        onClick={() => handleTemplateSelect(template.id)}
                                    >
                                        <p className="text-center mt-2">{template.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dotted line separator */}
                        <div className="border-r-2 border-dashed"></div>

                        {/* Right section - Selected template details */}
                        <div className="w-1/2 p-6 h-fit flex">
                            <div className="flex flex-col w-1/2 text-center pl-2 pr-6">
                                <h3 className="font-bold mb-4">Resume</h3>
                                {selectedTemplate ? (
                                    <div className="rounded p-4 border-2 lg:min-h-72 border-yellow-500 mb-4">
                                        <p className="text-center">{`Selected Template ${selectedTemplate}`}</p>
                                    </div>                                    
                                ) : (
                                    <p>Please select a template from the left.</p>
                                )}
                                <div className="flex justify-between">
                                    <Link href={'/studentprofile'} className='text-blue-600 font-bold'>Edit</Link>
                                    <Link href={'/studentprofile'} className='text-blue-600 font-bold'>Download</Link>
                                </div>
                                <Link href={'/studentprofile'} className='text-gray-500 mt-3 font-bold'>Edit Experience</Link>
                            </div>
                            <div className="flex flex-col w-1/2 justify-center">
                                <div className="rounded p-4 mb-4">
                                    <div className="flex w-full text-center text-md lg:text-lg font-bold gap-1">
                                        <h4 className="text-blue-600">Employability Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{employabilityScore}</h4>
                                    </div>
                                    <h4 className="font-semibold mt-4">Tips</h4>
                                    <ul className="list-square list-outside">
                                        {employabilityTips.map((tip, index) => (
                                            <li className='ml-4 pl-1' key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                    <div className="flex w-full text-center text-sm font-medium gap-1 ml-4 mt-4">
                                        <h4 className="text-blue-600">Expected Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{expectedScore}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {selectedView === 'upload' && (
                <>
                    {/* Centered option buttons */}
                    <div className="flex justify-evenly mb-4 border-dashed">
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 0 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(0)}
                            style={{
                                backgroundImage: selectedPath === 0 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >JD 1</button>
                        <button className={`px-16 py-2 text-lg border rounded ${selectedPath == 1 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-500 font-semibold'}`} 
                            onClick={() => setSelectedPath(1)}
                            style={{
                                backgroundImage: selectedPath === 1 ? 'radial-gradient(closest-side, #FAF9F6, #FFBF00)' : 'radial-gradient(closest-side, #FAF9F6, #D3D3D3)'
                            }}
                            >JD 2</button>
                        <button className={`px-8 py-2 text-lg border-2 border-dashed border-[#48749c] rounded bg-gray-300 text-blue-600 font-semibold`} 
                            onClick={() => setSelectedPath(2)}
                            ><span className='mr-2'>+ Upload New JD</span></button>
                    </div>

                    <div className="flex border-t-2 border-dashed">
                        {/* Left section - Template chooser */}
                        <div className="w-1/2 p-6 text-center justify-center">
                            <h3 className="font-bold mb-4">Choose / Change Template</h3>
                            <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className={`border-[3px] rounded p-4 mx-auto cursor-pointer w-36 h-48 ${selectedTemplate === template.id ? 'border-yellow-500' : 'border-[#48749c]'}`}
                                        onClick={() => handleTemplateSelect(template.id)}
                                    >
                                        <p className="text-center mt-2">{template.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dotted line separator */}
                        <div className="border-r-2 border-dashed"></div>

                        {/* Right section - Selected template details */}
                        <div className="w-1/2 p-6 h-fit flex">
                            <div className="flex flex-col w-1/2 text-center pl-2 pr-6">
                                <h3 className="font-bold mb-4">Resume</h3>
                                {selectedTemplate ? (
                                    <div className="rounded p-4 border-2 lg:min-h-72 border-yellow-500 mb-4">
                                        <p className="text-center">{`Selected Template ${selectedTemplate}`}</p>
                                    </div>                                    
                                ) : (
                                    <p>Please select a template from the left.</p>
                                )}
                                <div className="flex justify-between">
                                    <Link href={'/studentprofile'} className='text-blue-600 font-bold'>Edit</Link>
                                    <Link href={'/studentprofile'} className='text-blue-600 font-bold'>Download</Link>
                                </div>
                                <Link href={'/studentprofile'} className='text-gray-500 mt-3 font-bold'>Edit Experience</Link>
                            </div>
                            <div className="flex flex-col w-1/2 justify-center">
                                <div className="rounded p-4 mb-4">
                                    <div className="flex w-full text-center text-md lg:text-lg font-bold gap-1">
                                        <h4 className="text-blue-600">Employability Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{employabilityScore}</h4>
                                    </div>
                                    <h4 className="font-semibold mt-4">Tips</h4>
                                    <ul className="list-square list-outside">
                                        {employabilityTips.map((tip, index) => (
                                            <li className='ml-4 pl-1' key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                    <div className="flex w-full text-center text-sm font-medium gap-1 ml-4 mt-4">
                                        <h4 className="text-blue-600">Expected Score</h4>
                                        <h4 className="text-gray-800">-</h4>
                                        <h4 className="text-blue-600">{expectedScore}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResumeBuilderView;
