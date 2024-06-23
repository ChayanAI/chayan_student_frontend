'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import ProgressBar from './ProgressBar';
import {Text, Select, Block} from './Input'
import OtpInput from './OtpInput';
import SkillRating from './SkillRating';
import StarRating from './StarRating';
import {ToggleButton, ButtonRow, ClickyButton} from './ToggleButton';
import {CircleCheckBig, CirclePlus} from 'lucide-react';
import axios from "axios";
import {useParams} from "next/navigation";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const MultiStepForm = ({userId}) => {
    const params = useParams()


    const [profileData, setProfileData] = useState({
        first_name: null,
        last_name: null,
        date_of_birth: null,
        city: null,
        gender: null,
        phone_number: null,
        email: null,
        college_name: null,
        degree: 'B.Tech',
        branch: null,
        minor_branch: null,
        course_started: null,
        expected_graduation: null,
        course_length: null,
        cgpa: null,
        sgpa: {
            sem1: null,
            sem2: null,
            sem3: null,
            sem4: null,
            sem5: null,
            sem6: null,
            sem7: null,
            sem8: null,
        },
        class_12_board: 'CBSE',
        class_12_percentage: null,
        internships: [
            {
                title: null,
                company_name: null,
                location: null,
                start_date: null,
                end_date: null,
                description: null,
                summary: null
            }
        ],
        projects: [
            {
                title: null,
                company_name: null,
                location: null,
                start_date: null,
                end_date: null,
                description: null,
                summary: null
            }
        ],
        volunteers: [{
            title: null,
            company_name: null,
            location: null,
            start_date: null,
            end_date: null,
            description: null,
            summary: null
        }],
        extra_curriculars: [{
            title: null,
            company_name: null,
            location: null,
            start_date: null,
            end_date: null,
            description: null,
            summary: null
        }]


    })
    const router = useRouter();
    const [loader, setLoader] = useState(true)
    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        try {
            axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/get/findbyId`, {userId: userId}).then((res) => {

                setProfileData((prev) => ({...prev, email: res.data.email, phone_number: res.data.phone_number}))
            })
        } catch (err) {
            alert(err.response.data)
        }


        setLoader(false)
    }, [])
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

    const handleNext = (e) => {
        e.preventDefault()
        console.log(profileData)
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
        console.log(profileData)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/submit-form`, {
                user_id: params.userId,
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                date_of_birth: profileData.date_of_birth,
                gender: profileData.gender,
                city: profileData.city,
                degree: profileData.degree,
                course_length: profileData.course_length,
                course_started: profileData.course_started,
                expected_graduation: profileData.expected_graduation,
                branch: profileData.branch,
                minor_branch: profileData.minor_branch,
                cgpa: profileData.cgpa,
                sgpa:profileData.sgpa,
                class_12_board: profileData.class_12_board,
                class_12_percentage: profileData.class_12_percentage,
                internships: profileData.internships,
                projects: profileData.projects,
                volunteers: profileData.volunteers,
                extra_curriculars: profileData.extra_curriculars,
                college_name: profileData.college_name
            }).then((res)=>console.log(res))
        } catch (err) {
            alert(err)
        }
        router.push('/dashboard');
    };
    if (loader) {
        return (<></>)
    } else {
        return (
            <div className="flex flex-col w-full gap-4">
                <h1 className="text-3xl font-bold p-8">Your Profile</h1>
                <div className="flex min-h-screen bg-white gap-6">
                    <div className="w-1/4 p-8">
                        <ProgressBar currentStep={currentStep} onStepClick={handleStepClick}/>
                    </div>
                    <div className="w-3/4 p-8">
                        {/* Personal Information */}
                        {currentStep === 0 && (
                                <form onSubmit={handleNext}>
                                    <div>
                                        <div
                                            className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 border-b lg:w-[60%] ">
                                            {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                                            <div className="col-span-full">
                                              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Profile Photo
                                              </label>
                                              <div className="mt-2 flex items-center gap-x-3">
                                                <UserCircleIcon className="h-20 w-20 text-gray-300" aria-hidden="true" />
                                                <button
                                                  type="button"
                                                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                  Change
                                                </button>
                                                <button
                                                  type="button"
                                                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </div>
                                            <Text name={'First Name'} value={profileData.first_name} isRequired={true}
                                                  disp='first_name'
                                                  setValue={setProfileData} col={'3'} />
                                            <Text name={'Last Name'} value={profileData.last_name} disp='last_name'
                                                  setValue={setProfileData} col={'3'}/>
                                            <Text name={'Date of birth'} value={profileData.date_of_birth}
                                                  isRequired={true}
                                                  disp='date_of_birth'
                                                  setValue={setProfileData} type={'date'} col={'3'}/>
                                            <Text name={'Hometown'} value={profileData.city} disp='city'
                                                  setValue={setProfileData} col={'3'}/>
                                            <ButtonRow label={'Gender'} value={profileData.gender} disp='gender'
                                                       setValue={setProfileData} col={4}
                                                       buttonNames={['Male', 'Female', 'Others']}/>

                                            <div className="flex col-span-3 relative">
                                                <Text name={'Phone Number'} isRequired={true}
                                                  value={profileData.phone_number}
                                                  disp='phone_number'
                                                  setValue={setProfileData} type='tel' col={' w-full'}/>
                                                <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Get OTP'} yellow={true} />
                                            </div>
                                            <div className="flex col-span-3 relative grayscale opacity-80">
                                                <Text name={'Enter OTP'}
                                                  setValue={setProfileData} type='tel' col={' w-full relative'} />
                                                <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Validate'} yellow={true} />
                                            </div>

                                            <div className='flex col-span-3 relative'>
                                                <Text name={'Email'} isRequired={true}
                                                  value={profileData.email}
                                                  disp='email'
                                                  setValue={setProfileData} type='email' col={'3'} />
                                                <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Get OTP'} yellow={true} />
                                            </div>
                                            <div className="flex col-span-3 relative grayscale opacity-80">
                                                <Text name={'Enter OTP'}
                                                  setValue={setProfileData} type='tel' col={' w-full relative'} />
                                                <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Validate'} yellow={true} />
                                            </div>
                                            
                                            <div className="w-full flex justify-between col-span-full mt-4">
                                                <div></div>
                                                <button type='submit'
                                                        className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                        )}
                        {/* Academics */}
                        {currentStep === 1 && (
                                <form onSubmit={handleNext}>
                                <div>
                                    <div className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b lg:w-[60%] lg:min-w-[580px] ">
                                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                                        <Text name={'College Name'} value={profileData.college_name}
                                              isRequired={true} disp='college_name'
                                              setValue={setProfileData}
                                              col={' col-span-full'}/>
                                        <Select name={'Degree'} isRequired={true} value={profileData.degree}
                                                disp='degree'
                                                setValue={setProfileData} col={'2'}
                                                options={['B.Tech', 'B.Comm', 'B.Sc']}/>
                                        <Text name={'Branch / Discipline'} isRequired={true}
                                              value={profileData.branch} disp='branch'
                                              setValue={setProfileData} col={'2'}/>
                                        <Text name={'Minor Branch'} value={profileData.minor_branch}
                                              disp='minor_branch'
                                              setValue={setProfileData} col={'2'}/>

                                        {/* MM YYYY ONLY */}
                                        <Text name={'Start Date'} value={profileData.course_started}
                                              isRequired={true} disp='course_started'
                                              setValue={setProfileData} type={'date'} col={'3'}/>
                                        <Text name={'End Date'} value={profileData.expected_graduation}
                                              isRequired={true}
                                              disp='expected_graduation' setValue={setProfileData}
                                              type={'date'} col={'3'}/>

                                        <ButtonRow label={'Length of the course'}
                                                   value={profileData.course_length}
                                                   disp='course_length' setValue={setProfileData}
                                                   col={' col-span-full'}
                                                   buttonNames={['2 Years', '3 Years', '4 Years', '5 Years']}/>
                                        <Text name={'CGPA / Percentage'} isRequired={true}
                                              value={profileData.cgpa} disp='cgpa'
                                              setValue={setProfileData} col={'2'}/>
                                        <div className={`sm:col-span-4`}>
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
                                                SGPA / Sem. Percentages
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem1}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem1: e.target.value
                                                            }
                                                        }))} id='sgpa1' placeholder='Sem-1'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem2}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem2: e.target.value
                                                            }
                                                        }))} id='sgpa2' placeholder='Sem-2'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem3}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem3: e.target.value
                                                            }
                                                        }))} id='sgpa3' placeholder='Sem-3'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem4}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem4: e.target.value
                                                            }
                                                        }))} id='sgpa4' placeholder='Sem-4'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem5}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem5: e.target.value
                                                            }
                                                        }))} id='sgpa5' placeholder='Sem-5'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem6}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem6: e.target.value
                                                            }
                                                        }))} id='sgpa6' placeholder='Sem-6'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem7}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem7: e.target.value
                                                            }
                                                        }))} id='sgpa7' placeholder='Sem-7'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                    <div className="col-span-1"><input
                                                        value={profileData.sgpa.sem8}
                                                        onChange={(e) => setProfileData((prev) => ({
                                                            ...prev,
                                                            sgpa: {
                                                                ...prev.sgpa,
                                                                sem8: e.target.value
                                                            }
                                                        }))} id='sgpa8' placeholder='Sem-8'
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Select name={'12th Board'} value={profileData.class_12_board}
                                                isRequired={true} disp='class_12_board'
                                                setValue={setProfileData} col={3}
                                                options={['CBSE', 'ISC', 'State Board']}/>
                                        <Text name={'12th Percentage'} isRequired={true}
                                              value={profileData.class_12_percentage}
                                              disp='class_12_percentage' setValue={setProfileData} col={3}/>
                                        <div className="w-full flex justify-between px-2 col-span-full mt-4">
                                            <button type="button" onClick={handleBack}
                                                    className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                            </button>
                                            <button type="submit"
                                                    className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </form>
                        )}
                        {/* Professional Goals */}
                        {currentStep === 2 && (
                                <form onSubmit={handleNext}>
                                    <div
                                        className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 border-b lg:w-[70%] lg:min-w-[580px]">
                                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                                        <ButtonRow label={'Career Objectives'} col={' col-span-full'} buttonsPerRow={4}
                                                   buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8']}/>
                                        {/* Yaha par atleast ek jab select karo tab niche ke options dikhane hain dhruv. */}
                                        <SkillRating label='Rate Yourself in each skill for your desired objective:'/>
                                        <div className="w-full flex justify-between px-2 col-span-full mt-4">
                                            <button type="button" onClick={handleBack}
                                                    className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                            </button>
                                            <button type="submit"
                                                    className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        )}
                        {/* Skill Verification */}
                        {currentStep === 3 && (
                                <form onSubmit={handleNext}>
                                    <div
                                        className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7 border-b lg:w-[80%] lg:min-w-[580px]">
                                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900 tracking-tight col-span-full">Certify
                                            Your Claimed Skills</label>
                                        <div className='sm:col-span-2 flex flex-col gap-2'>
                                            <div className="w-full mb-5 text-center">
                                                <button type='button' className="w-full max-w-40 bg-yellow-600 h-fit rounded-md py-2 font-semibold text-white text-center shadow-lg drop-shadow-lg hover:scale-105">Option 1</button>
                                                <p className="text-blue-600 text-sm font-medium text-center">Employability: 75%</p>
                                            </div>
                                            <div className="w-full mb-5 text-center grayscale">
                                                <button type='button' className="w-full max-w-40 bg-yellow-600 h-fit rounded-md py-2 font-semibold text-white text-center shadow-lg drop-shadow-lg hover:scale-105">Option 1</button>
                                                <p className="text-blue-600 text-sm font-medium text-center">Employability: 75%</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-8">
                                            <div className="flex gap-4 px-auto mx-auto col-span-1">
                                                <div
                                                    className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                                                    <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">Skill
                                                        1</p>
                                                    <StarRating onRatingChange={handleRatingChange}/>
                                                </div>
                                                <div className="text-center mt-1">
                                                    <button type='button'
                                                            className="text-blue-600 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                                        Assess Yourself
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 px-auto mx-auto col-span-1">
                                                <div
                                                    className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                                                    <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">Skill
                                                        2</p>
                                                    <StarRating onRatingChange={handleRatingChange}/>
                                                </div>
                                                <div className="text-center mt-1">
                                                    <button type='button'
                                                            className="text-blue-600 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                                        Assess Yourself
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 px-auto mx-auto col-span-1">
                                                <div
                                                    className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                                                    <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">Skill
                                                        3</p>
                                                    <StarRating onRatingChange={handleRatingChange}/>
                                                </div>
                                                <div className="text-center mt-1">
                                                    <button type='button'
                                                            className="text-blue-600 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                                        Assess Yourself
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 px-auto mx-auto col-span-1">
                                                <div
                                                    className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                                                    <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">Skill
                                                        4</p>
                                                    <StarRating onRatingChange={handleRatingChange}/>
                                                </div>
                                                <div className="text-center mt-1">
                                                    <button type='button'
                                                            className="text-blue-600 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                                        Assess Yourself
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 px-auto mx-auto col-span-1">
                                                <div
                                                    className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                                                    <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">Skill
                                                        5</p>
                                                    <StarRating onRatingChange={handleRatingChange}/>
                                                </div>
                                                <div className="text-center mt-1">
                                                    <button type='button'
                                                            className="text-blue-600 rounded-md hover:bg-white focus:outline-none focus:bg-blue-500 focus:text-white">
                                                        Assess Yourself
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between px-2 col-span-full mt-4">
                                            <button type="button" onClick={handleBack}
                                                    className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                            </button>
                                            <button type="submit"
                                                    className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        )}
                        {/* Internships */}
                        {currentStep === 4 && (
                            <form onSubmit={handleNext}>
                            <div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                                    {profileData.internships.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                                            <Text name={'Name of the Role'}
                                                  value={profileData.internships[index].title}
                                                  disp='title' list='internships' index={index}
                                                  setValue={setProfileData} col={' col-span-full'}/>
                                            <Text name={'Company Name'}
                                                  value={profileData.internships[index].company_name}
                                                  disp='company_name' list='internships' index={index}
                                                  setValue={setProfileData} col={4}/>
                                            <Text name={'Location'}
                                                  value={profileData.internships[index].location}
                                                  disp='location' list='internships' index={index}
                                                  setValue={setProfileData} col={2}/>
                                            {/* USE MM YYYY ONLY */}
                                            <Text name={'Start Date'}
                                                  value={profileData.internships[index].start_date}
                                                  disp='start_date' index={index} list='internships'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.internships[index].end_date}
                                                  disp='end_date' list='internships' index={index}
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Block name={'Responsibilities'}
                                                   value={profileData.internships[index].description}
                                                   disp='description'
                                                   index={index} list='internships'
                                                   setValue={setProfileData}
                                                   col={' col-span full'} rows={3}/>
                                            <Text name={'Achievements'}
                                                  value={profileData.internships[index].summary}
                                                  disp='summary' index={index} list='internships'
                                                  setValue={setProfileData} col={' col-span-full'}/>

                                            <ButtonRow label='Skills Displayed' col={' col-span-full'}
                                                       buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']}/>
                                        </div>)
                                    })}
                                    {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}

                                    <div className="flex items-center justify-center rounded-md">
                                        <div
                                            onClick={() => {
                                                setProfileData((prev) => ({
                                                    ...prev, internships: [...prev.internships, {
                                                        title: null,
                                                        company_name: null,
                                                        location: null,
                                                        start_date: null,
                                                        end_date: null,
                                                        description: null,
                                                        summary: null
                                                    }]
                                                }))
                                            }}
                                            className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Internship</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between px-2">
                                    <button type="button" onClick={handleBack}
                                            className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                    </button>
                                    <button type="submit"
                                            className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next
                                    </button>
                                </div>
                            </div>
                            </form>
                        )}
                        {/* Projects */}
                        {currentStep === 5 && (
                            <div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                                    {profileData.projects.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                                            <Text name={'Name of the Role'}
                                                  value={profileData.projects[index].title}
                                                  disp='title' list='projects' index={index}
                                                  setValue={setProfileData} col={' col-span-full'}/>
                                            <Text name={'Company Name'}
                                                  value={profileData.projects[index].company_name}
                                                  disp='company_name' list='projects' index={index}
                                                  setValue={setProfileData} col={4}/>
                                            <Text name={'Location'}
                                                  value={profileData.projects[index].location}
                                                  disp='location' list='projects' index={index}
                                                  setValue={setProfileData} col={2}/>
                                            {/* USE MM YYYY ONLY */}
                                            <Text name={'Start Date'}
                                                  value={profileData.projects[index].start_date}
                                                  disp='start_date' index={index} list='projects'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.projects[index].end_date}
                                                  disp='end_date' list='projects' index={index}
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Block name={'Responsibilities'}
                                                   value={profileData.projects[index].description}
                                                   disp='description'
                                                   index={index} list='projects'
                                                   setValue={setProfileData}
                                                   col={' col-span full'} rows={3}/>
                                            <Text name={'Achievements'}
                                                  value={profileData.projects[index].summary}
                                                  disp='summary' index={index} list='projects'
                                                  setValue={setProfileData} col={' col-span-full'}/>

                                            <ButtonRow label='Skills Displayed' col={' col-span-full'}
                                                       buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']}/>
                                        </div>)
                                    })}
                                    {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}

                                    <div className="flex items-center justify-center rounded-md">
                                        <div
                                            onClick={() => {
                                                setProfileData((prev) => ({
                                                    ...prev, projects: [...prev.projects, {
                                                        title: null,
                                                        company_name: null,
                                                        location: null,
                                                        start_date: null,
                                                        end_date: null,
                                                        description: null,
                                                        summary: null
                                                    }]
                                                }))
                                            }}
                                            className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Project</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between px-2">
                                    <button type="button" onClick={handleBack}
                                            className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                    </button>
                                    <button type="button" onClick={handleNext}
                                            className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Volunteer */}
                        {currentStep === 6 && (
                            <div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                                    {profileData.volunteers.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                                            <Text name={'Name of the Role'}
                                                  value={profileData.volunteers[index].title}
                                                  disp='title' list='volunteers' index={index}
                                                  setValue={setProfileData} col={' col-span-full'}/>
                                            <Text name={'Institution Name'}
                                                  value={profileData.volunteers[index].company_name}
                                                  disp='company_name' list='volunteers' index={index}
                                                  setValue={setProfileData} col={4}/>
                                            <Text name={'Location'}
                                                  value={profileData.volunteers[index].location}
                                                  disp='location' list='volunteers' index={index}
                                                  setValue={setProfileData} col={2}/>
                                            {/* USE MM YYYY ONLY */}
                                            <Text name={'Start Date'}
                                                  value={profileData.volunteers[index].start_date}
                                                  disp='start_date' index={index} list='volunteers'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.volunteers[index].end_date}
                                                  disp='end_date' list='volunteers' index={index}
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Block name={'Brief Description'}
                                                   value={profileData.volunteers[index].description}
                                                   disp='description'
                                                   index={index} list='volunteers'
                                                   setValue={setProfileData}
                                                   col={' col-span full'} rows={3}/>
                                            <Text name={'Achievements'}
                                                  value={profileData.volunteers[index].summary}
                                                  disp='summary' index={index} list='volunteers'
                                                  setValue={setProfileData} col={' col-span-full'}/>

                                            <ButtonRow label='Skills Displayed' col={' col-span-full'}
                                                       buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']}/>
                                        </div>)
                                    })}
                                    {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}

                                    <div className="flex items-center justify-center rounded-md">
                                        <div
                                            onClick={() => {
                                                setProfileData((prev) => ({
                                                    ...prev, volunteers: [...prev.volunteers, {
                                                        title: null,
                                                        company_name: null,
                                                        location: null,
                                                        start_date: null,
                                                        end_date: null,
                                                        description: null,
                                                        summary: null
                                                    }]
                                                }))
                                            }}
                                            className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Volunteers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between px-2">
                                    <button type="button" onClick={handleBack}
                                            className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                    </button>
                                    <button type="button" onClick={handleNext}
                                            className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Extra-Curricular Activities */}
                        {currentStep === 7 && (
                            <div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-b">
                                    {profileData.extra_curriculars.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-200">
                                            <Text name={'Activity Name'}
                                                  value={profileData.extra_curriculars[index].title}
                                                  disp='title' list='extra_curriculars' index={index}
                                                  setValue={setProfileData} col={' col-span-full'}/>
                                            <Text name={'Role/Position'}
                                                  value={profileData.extra_curriculars[index].company_name}
                                                  disp='company_name' list='extra_curriculars'
                                                  index={index}
                                                  setValue={setProfileData} col={4}/>
                                            <Text name={'Location'}
                                                  value={profileData.extra_curriculars[index].location}
                                                  disp='location' list='extra_curriculars' index={index}
                                                  setValue={setProfileData} col={2}/>
                                            {/* USE MM YYYY ONLY */}
                                            <Text name={'Start Date'}
                                                  value={profileData.extra_curriculars[index].start_date}
                                                  disp='start_date' index={index}
                                                  list='extra_curriculars'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.extra_curriculars[index].end_date}
                                                  disp='end_date' list='extra_curriculars' index={index}
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Block name={'Contribution'}
                                                   value={profileData.extra_curriculars[index].description}
                                                   disp='description'
                                                   index={index} list='extra_curriculars'
                                                   setValue={setProfileData}
                                                   col={' col-span full'} rows={3}/>
                                            <Text name={'Achievements'}
                                                  value={profileData.extra_curriculars[index].summary}
                                                  disp='summary' index={index} list='extra_curriculars'
                                                  setValue={setProfileData} col={' col-span-full'}/>

                                            <ButtonRow label='Skills Displayed' col={' col-span-full'}
                                                       buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4']}/>
                                        </div>)
                                    })}
                                    {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}

                                    <div className="flex items-center justify-center rounded-md">
                                        <div
                                            onClick={() => {
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    extra_curriculars: [...prev.extra_curriculars, {
                                                        title: null,
                                                        company_name: null,
                                                        location: null,
                                                        start_date: null,
                                                        end_date: null,
                                                        description: null,
                                                        summary: null
                                                    }]
                                                }))
                                            }}
                                            className="bg-gray-100 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Extra
                                                Curriculars</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between px-2">
                                    <button type="button" onClick={handleBack}
                                            className="px-8 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Back
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>


        );
    }

};

export default MultiStepForm;
