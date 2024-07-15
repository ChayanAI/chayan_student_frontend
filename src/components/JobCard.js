// JobCard.js
import React from 'react';

const JobCard = ({ job, selectedCareer, handleCareerSelect }) => {
    return (
        <div className="text-center mb-0" key={job.id}>
            <div
                className={`border rounded-lg text-sm p-2 mb-0 font-poppins cursor-pointer ${selectedCareer === job.title ? 'bg-sky-200 text-teal-800 font-semibold' : 'bg-gray-200 text-gray-500'}`}
                onClick={() => {
                    handleCareerSelect(job.title);
                }}
            >
                <div className="text-center">{job.title}</div>
            </div>
            <div className={`-mt-1 mb-2 rounded-b-md py-1 px-2 w-fit ml-auto border-[3px] ${selectedCareer === job.title ? 'border-sky-200 text-black font-semibold' : 'border-gray-200 text-gray-600'}`}>
                <div className="text-xs font-roboto text-center">Employability Score - 75%</div>
            </div>
            <div className='mb-6'>
                <div className={`text-xs flex justify-between px-3 py-1 border-t-2 border-x rounded-t-lg ${selectedCareer === job.title ? 'border-sky-200 text-sky-600' : 'border-gray-300 text-gray-400'}`}>
                    <span className="text-left font-medium">Google</span>
                    <span className="text-right cursor-pointer">View Job Details</span>
                </div>
                <div className="text-xs text-left ml-3 text-gray-400">
                    Liked On -
                    <span className="text-gray-500 font-medium"> 12/06/24</span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
