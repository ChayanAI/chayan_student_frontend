'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';
import { Text, Select, Block } from './Input'
import OtpInput from './OtpInput';
import SkillRating from './SkillRating';
import StarRating from './StarRating';
import { ToggleButton, ButtonRow } from './ToggleButton';
import { CircleCheckBig, CirclePlus } from 'lucide-react';

const MultiStepForm = () => {
  const [profileData, setProfileData] = useState({
    first_name: null,
    last_name: null,
    date_of_birth: null,
    city: null,
    gender: null,
    phone_number: null,
    email: null,
    college_name: null,
    degree: null,
    


  })
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleRatingChange = (rating) => {
    console.log('Selected rating:', rating);
    // STAR RATINGS
  };

  const steps = [
    'Personal Information',
    'Academics',
    'Professional Goals',
    'Skill Assessment',
    'Internships',
    'Projects',
    'Volunteer Experience',
    'Extra-Curricular Activities',
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col w-full gap-4">
        <h1 className="text-3xl font-bold p-8">Your Profile</h1>
        <div className="flex min-h-screen bg-white gap-6">
          <div className="w-1/4 p-8">
            <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
          </div>
          <div className="w-3/4 p-8">
            <form onSubmit={handleSubmit}>

              {/* Personal Information */}
              {currentStep === 0 && (
                <div>
                    <div className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b">
                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                        <Text name={'First Name'} col={'3'} />
                        <Text name={'Last Name'} col={'3'} />
                        <Text name={'Date of birth'} type={'date'} col={'3'} />
                        <Text name={'Hometown'} col={'3'} />
                        {/* <Select name={'Gender'} col={'4'} options={['Male', 'Female', 'Attack-Helicopter', 'Non-binary', 'Genderqueer', 'Genderfluid', 'Agender', 'Bigender', 'Androgynous', 'Two-Spirit', 'Gender Nonconforming', 'Pangender', 'Gender Variant', 'Intersex', 'Third Gender', 'Neutrois', 'Demiboy', 'Demigirl', 'Transgender', 'Trans Man', 'Trans Woman', 'Cisgender', 'Femme', 'Butch', 'Hijra', 'Kathoey', 'Faafafine', 'Muxe', 'X-gender', 'Polygender', 'Gender Apathetic', 'Androgyne', 'Aliagender', 'Cis Man', 'Cis Woman', 'Femme Person', 'Butch Person', 'Maverique', 'Novigender', 'Trigender', 'Two Spirit', 'Bakla', 'Mahuwahine', 'Mahukane', 'Xenogender']} /> */}
                        <ButtonRow label={'Gender'} col={4} buttonNames={['Male', 'Female', 'Others']} />
                        <Text name={'Phone Number'} type={'tel'} col={'3'} />
                        {/*<div className="col-span-1">*/}
                        {/*    /!* Here, use state to switch between the three responses below dhruv. I'm leaving button by default*!/*/}

                        {/*    /!* <button type="button" className="w-full px-4 py-1 mt-9 text-white bg-slate-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Verify</button> *!/*/}

                        {/*    <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">otp</label>*/}
                        {/*    <OtpInput numDigits={6} />*/}

                        {/*    /!* <div className='flex mt-10 text-blue-700 gap-1'><CircleCheckBig />Verified</div> *!/*/}
                        {/*</div>*/}
                        
                        {/* <div className='col-span-3'>
                          <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone Number
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                              <label htmlFor="country" className="sr-only">
                                Country
                              </label>
                              <select
                                id="country"
                                name="country"
                                autoComplete="country"
                                className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                              >
                                <option>+91</option>
                                <option>+1</option>
                                <option>+69</option>
                              </select>
                            </div>
                            <input
                              type="text"
                              name="phone-number"
                              id="phone-number"
                              className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="98765 43210"
                            />
                          </div>
                        </div> */}

                        <Text name={'Email'} type={'email'} col={'3'} />
                        <div className="col-span-1">
                            {/* Here, use state to switch between the three responses below dhruv. I'm leaving button by default*/}

                            {/*<button type="button" className="w-full px-4 py-1 mt-9 text-white bg-slate-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Verify</button>*/}

                            {/* <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">otp</label>
                            <OtpInput numDigits={6} /> */}

                            {/* <div className='flex mt-10 text-blue-700 gap-1'><CircleCheckBig />Verified</div> */}
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div></div>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            Next
                        </button>
                    </div>
                </div>
              )}
              {/* Academics */}
              {currentStep === 1 && (
                <div>
                    <div className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b">
                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                        <Text name={'College Name'} col={' col-span-full'} />
                        <Select name={'Degree'} col={'2'} options={['B.Tech', 'B.Comm', 'B.Sc']} />
                        <Text name={'Branch / Discipline'} col={'2'} />
                        <Text name={'Minor Branch'} col={'2'} />

                        {/* MM YYYY ONLY */}
                        <Text name={'Start Date'} type={'date'} col={'3'} /> 
                        <Text name={'End Date'} type={'date'} col={'3'} />

                        <ButtonRow label={'Length of the course'} col={' col-span-full'} buttonNames={['2 Years', '3 Years', '4 Years', '5 Years']} />
                        <Text name={'CGPA / Percentage'} col={'2'} />
                        <div className={`sm:col-span-4`}>
                          <label className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
                            SGPA / Sem. Percentages
                          </label>
                          <div className="mt-2">
                              <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
                                <div className="col-span-1"><input id='sgpa1' placeholder='Sem-1' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa2' placeholder='Sem-2' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa3' placeholder='Sem-3' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa4' placeholder='Sem-4' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa5' placeholder='Sem-5' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa6' placeholder='Sem-6' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa7' placeholder='Sem-7' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                                <div className="col-span-1"><input id='sgpa8' placeholder='Sem-8' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/></div>
                              </div>
                          </div>
                        </div>
                        <Select name={'12th Board'} col={3} options={['CBSE', 'ISC', 'State Board']} />
                        <Text name={'12th Percentage'} col={3} />
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next</button>
                    </div>
                </div>
              )}
              {/* Professional Goals */}
              {currentStep === 2 && (
                <div>
                    <div className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 border-b">
                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                        <ButtonRow label={'Career Objectives'} col={' col-span-full'} buttonsPerRow={4} buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8']} />
                        {/* Yaha par atleast ek jab select karo tab niche ke options dikhane hain dhruv. */}
                        <SkillRating label='Rate Yourself in each skill for your desired objective:' />
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next</button>
                    </div>
                </div>
              )}
              {/* Skill Verification */}
              {currentStep === 3 && (
                <div>
                    <div className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b">
                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                        <label className="block text-sm font-medium leading-6 text-gray-900 tracking-tight col-span-full">Certify Your Claimed Skills</label>
                        <div className="sm:col-span-1 bg-slate-500 h-fit rounded-md py-2 text-white text-center">Option 1</div>
                        <div className="col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex gap-6 px-auto mx-auto col-span-1">
                            <div className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                              <p className="bg-slate-50 rounded-md text-center px-6 sm:px-14 sm:px-auto py-1">Skill 1</p>
                              <StarRating onRatingChange={handleRatingChange} />
                            </div>
                            <div className="text-center">
                              <button type='button' className="px-5 py-1 text-blue-600 bg-slate-100 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Certify Yourself
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-6 px-auto mx-auto col-span-1">
                            <div className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                              <p className="bg-slate-50 rounded-md text-center px-6 sm:px-14 sm:px-auto py-1">Skill 2</p>
                              <StarRating onRatingChange={handleRatingChange} />
                            </div>
                            <div className="text-center">
                              <button type='button' className="px-5 py-1 text-blue-600 bg-slate-100 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Certify Yourself
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-6 px-auto mx-auto col-span-1">
                            <div className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                              <p className="bg-slate-50 rounded-md text-center px-6 sm:px-14 sm:px-auto py-1">Skill 3</p>
                              <StarRating onRatingChange={handleRatingChange} />
                            </div>
                            <div className="text-center">
                              <button type='button' className="px-5 py-1 text-blue-600 bg-slate-100 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Certify Yourself
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-6 px-auto mx-auto col-span-1">
                            <div className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                              <p className="bg-slate-50 rounded-md text-center px-6 sm:px-14 sm:px-auto py-1">Skill 4</p>
                              <StarRating onRatingChange={handleRatingChange} />
                            </div>
                            <div className="text-center">
                              <button type='button' className="px-5 py-1 text-blue-600 bg-slate-100 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Certify Yourself
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-6 px-auto mx-auto col-span-1">
                            <div className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                              <p className="bg-slate-50 rounded-md text-center px-6 sm:px-14 sm:px-auto py-1">Skill 5</p>
                              <StarRating onRatingChange={handleRatingChange} />
                            </div>
                            <div className="text-center">
                              <button type='button' className="px-5 py-1 text-blue-600 bg-slate-100 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Certify Yourself
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-6 px-auto mx-auto col-span-1">
                            <div className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                              <p className="bg-slate-50 rounded-md text-center px-6 sm:px-14 sm:px-auto py-1">Skill 6</p>
                              <StarRating onRatingChange={handleRatingChange} />
                            </div>
                            <div className="text-center">
                              <button type='button' className="px-5 py-1 text-blue-600 bg-slate-100 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                Certify Yourself
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next</button>
                    </div>
                </div>
              )}
              {/* Internships */}
              {currentStep === 4 && (
                <div>
                    <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                      {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                      <div className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                        <Text name={'Name of the Role'} col={' col-span-full'} />
                        <Text name={'Company Name'} col={4} />
                        <Text name={'Location'} col={2} />
                        {/* USE MM YYYY ONLY */}
                        <Text name={'Start Date'} type={'date'} col={3} />
                        <Text name={'End Date'} type={'date'} col={3} />
                        <Block name={'Responsibilities'} col={' col-span full'} rows={3} />
                        <Text name={'Achievements'} col={' col-span-full'} />
                        <ButtonRow label='Skills Displayed' col={' col-span-full'} buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']} />
                      </div>
                      <div className="flex items-center justify-center rounded-md">
                        <div className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                          <CirclePlus className='w-10 h-10 text-gray-600' />
                          <p className="text-sm text-gray-600">Add Internship</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next</button>
                    </div>
                </div>
              )}
              {/* Volunteer Experiences */}
              {currentStep === 5 && (
                <div>
                    <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                      {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                      <div className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                        <Text name={'Name of the Role'} col={' col-span-full'} />
                        <Text name={'Company Name'} col={4} />
                        <Text name={'Location'} col={2} />
                        {/* USE MM YYYY ONLY */}
                        <Text name={'Start Date'} type={'date'} col={3} />
                        <Text name={'End Date'} type={'date'} col={3} />
                        <Block name={'Responsibilities'} col={' col-span full'} rows={3} />
                        <Text name={'Achievements'} col={' col-span-full'} />
                        <ButtonRow label='Skills Displayed' col={' col-span-full'} buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']} />
                      </div>
                      <div className="flex items-center justify-center rounded-md">
                        <div className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                          <CirclePlus className='w-10 h-10 text-gray-600' />
                          <p className="text-sm text-gray-600">Add Experience</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next</button>
                    </div>
                </div>
              )}
              {/* Projects */}
              {currentStep === 6 && (
                <div>
                    <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                      {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                      <div className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                        <Text name={'Name of the Project'} col={' col-span-full'} />
                        <Text name={'Institution Name'} col={4} />
                        <Text name={'Location'} col={2} />
                        {/* USE MM YYYY ONLY */}
                        <Text name={'Start Date'} type={'date'} col={3} />
                        <Text name={'End Date'} type={'date'} col={3} />
                        <Block name={'Brief Description'} col={' col-span full'} rows={3} />
                        <Text name={'Achievements'} col={' col-span-full'} />
                        <ButtonRow label='Skills Displayed' col={' col-span-full'} buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']} />
                      </div>
                      <div className="flex items-center justify-center rounded-md">
                        <div className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                          <CirclePlus className='w-10 h-10 text-gray-600' />
                          <p className="text-sm text-gray-600">Add Project</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="button" onClick={handleNext} className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next</button>
                    </div>
                </div>
              )}
              {/* Extra-Curricular Activities */}
              {currentStep === 7 && (
                <div>
                    <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                      {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                      <div className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                        <Text name={'Activity Name'} col={' col-span-full'} />
                        <Text name={'Role / Position'} col={4} />
                        <Text name={'Location'} col={2} />
                        {/* USE MM YYYY ONLY */}
                        <Text name={'Start Date'} type={'date'} col={3} />
                        <Text name={'End Date'} type={'date'} col={3} />
                        <Block name={'Contribution'} col={' col-span full'} rows={3} />
                        <Text name={'Achievements'} col={' col-span-full'} />
                        <ButtonRow label='Skills Displayed' col={' col-span-full'} buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']} />
                      </div>
                      <div className="flex items-center justify-center rounded-md">
                        <div className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                          <CirclePlus className='w-10 h-10 text-gray-600' />
                          <p className="text-sm text-gray-600">Add Activity</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between px-2">
                        <button type="button" onClick={handleBack} className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back</button>
                        <button type="submit" className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Submit</button>
                    </div>
                </div>
              )}
            </form>
          </div>
        </div>
    </div>
    
    
  );
};

export default MultiStepForm;
