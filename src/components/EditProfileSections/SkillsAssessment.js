import React from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import StarRating from '../StarRating';

const SkillsAssessment = ({ profileData, setProfileData, selectedCareer, setselectedCareer, CareerJobs, ratingData }) => {
    return (
        <div
        className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7 lg:w-[80%] lg:min-w-[580px]">

        <label
            className="block text-sm font-medium leading-6 text-gray-900 tracking-tight col-span-full">Certify
            Your Claimed Skills</label>
        <div className='sm:col-span-2 flex flex-col gap-2'>
            {profileData.career_path.map((career) => {
                return (
                    <div className="w-full mb-5 text-center">
                        <button type='button' onClick={() => setselectedCareer(career)}
                                className={`w-full max-w-40 ${selectedCareer === career ? ("bg-yellow-600") : ("bg-slate-500")} h-fit rounded-md py-2 font-semibold text-white text-center shadow-lg drop-shadow-lg hover:scale-105`}>{career}

                        </button>
                        <p className="text-blue-600 text-sm font-medium text-center">Employability:
                            75%</p>
                    </div>)
            })}


        </div>
        <div
            className="col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-8">

            {selectedCareer ? (<>
                {CareerJobs[selectedCareer].map((item,index) => {
                    return (<div className="flex gap-4 px-auto mx-auto col-span-1">
                        <div
                            className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                            <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">{CareerJobs[selectedCareer][index]}</p>
                            <StarRating rating={ratingData[CareerJobs[selectedCareer][index]]}/>
                        </div>
                        <div className="text-center mt-1">
                            <button type='button'
                                    className="text-blue-600 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Assess Yourself
                            </button>
                        </div>
                    </div>)
                })}

            </>) : (<></>)}


        </div>
    </div>
    );
  };

export default SkillsAssessment;
