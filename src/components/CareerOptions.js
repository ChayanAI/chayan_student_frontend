//CareerOptions.js

import React from 'react';

const CareerOption = ({ option, selectedCareer, handleCareerSelect }) => {
    return (
        <div className="text-center mb-10" key={option}>
            <div
                className={`border rounded-lg text-sm p-2 mb-0 font-poppins cursor-pointer ${selectedCareer === option ? 'bg-sky-200 text-teal-800 font-semibold' : 'bg-gray-200 text-gray-500'}`}
                onClick={() => handleCareerSelect(option)}
            >
                <div className="text-center">{option}</div>
            </div>
            <div className={`-mt-1 rounded-b-md py-1 px-2 w-fit ml-auto ${selectedCareer === option ? 'border-2 border-sky-200 text-black font-semibold' : 'border-2 border-gray-200 text-gray-600'}`}>
                <div className="text-xs font-roboto text-center">Employability Score - 75%</div>
            </div>
        </div>
    );
};

export default CareerOption;

