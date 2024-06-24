'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import ProgressBar from './ProgressBar';
import {Text, Select, Block} from './Input'
import OtpInput from './OtpInput';
import SkillRating from './SkillRating';
import StarRating from './StarRating';
import {ToggleButton, ButtonRow, ClickyButton} from './ToggleButton';
import {ChevronLeft, CircleCheckBig, CirclePlus, X} from 'lucide-react';
import axios from "axios";
import {useParams} from "next/navigation";
import VerticalNav from './VerticalNav';
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import Link from 'next/link';



const months=['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const EditProfile = ({userId}) => {
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
        (async () => {
            try {

                await axios.post('http://localhost:5000/user/getprofilebyId', {user_id: userId}).then((res) => {
                    // console.log(res.data)
                    setProfileData(res.data)

                })
                await axios.post('http://localhost:5000/get/findbyId', {userId: userId}).then((res) => {
                    // console.log(res.data)


                    setProfileData((prev) => ({...prev, email: res.data.email, phone_number: res.data.phone_number}))
                })
                await axios.post('http://localhost:5000/studentprofile/getinternbyId', {userId}).then((res) => {
                    // console.log(res.data)
                    // console.log(res.data.internships[0].start_year+"/"+(months.indexOf(res.data.internships[0].start_month)+1).toString().padStart(2,'0')+"/01")
                    // console.log((months.indexOf(res.data.internships[0].start_month)+1).toString().padStart(2,'0'))
                    setProfileData((prev) => ({
                        ...prev,
                        internships: (res.data.internships.length === 0) ? ([]) : (res.data.internships),
                        projects: (res.data.projects.length === 0) ? ([]) : (res.data.projects),
                        volunteers: (res.data.volunteers.length === 0) ? ([]) : (res.data.volunteers),
                        extra_curriculars: (res.data.extra_curriculars.length === 0) ? ([]) : (res.data.extra_curriculars)
                    }))
                })

            } catch (err) {
                alert(err.message)
            }


            setLoader(false)
        })()

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
            await axios.post('http://localhost:5000/studentprofile/submit-form', {
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
                sgpa: profileData.sgpa,
                class_12_board: profileData.class_12_board,
                class_12_percentage: profileData.class_12_percentage,
                internships: profileData.internships,
                projects: profileData.projects,
                volunteers: profileData.volunteers,
                extra_curriculars: profileData.extra_curriculars,
                college_name: profileData.college_name
            }).then((res) => console.log(res))
        } catch (err) {
            alert(err)
        }
        router.push('/dashboard');
    };
    if (loader) {
        return (<></>)
    } else {
        return (
            <div className="flex flex-col w-full gap-4 bg-gray-100 dark:bg-[#101117] dark:text-[#f8f8f8]">
                <div className="flex min-h-[calc(100vh-4rem)] gap-6 relative">
                    <div className="w-1/4 px-8 lg:px-16 dark:bg-[#1b1b21]">
                        <Link href={'/dashboard'} className="flex -ml-6 gap-2 pt-5 text-gray-500 font-semibold">
                            <ChevronLeft/>
                            Dashboard
                        </Link>
                        <h1 className="text-lg font-bold pt-8 pb-10">Edit your Profile</h1>
                        <VerticalNav currentStep={currentStep} setCurrentStep={setCurrentStep}/>
                    </div>
                    <div className="w-3/4 px-8 pt-8">
                        {/* Personal Information */}
                        {currentStep === 0 && (
                            <form onSubmit={handleNext}>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 mb-4">
                                    <h2 className="col-span-5 text-2xl dark:text-[#cdcdcf] font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 dark:bg-[#4373dc] rounded-md hover:bg-blue-700 hover:dark:bg-[#3f5688] focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 lg:w-[75%] ">
                                    <div className="col-span-full">
                                        <div className="mt-2 -ml-2 flex items-center gap-x-3">
                                            <img src='/media/images/300-1.jpg' alt='profile' className='h-24 w-24 ml-2 border-2 border-gray-400 rounded-[50%]' />
                                            {/* <UserCircleIcon className="h-24 w-24 text-gray-300" aria-hidden="true"/> */}
                                            <button
                                                type="button"
                                                className="rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                                          setValue={setProfileData} col={'3'}/>
                                    <Text name={'Last Name'} value={profileData.last_name} disp='last_name'
                                          setValue={setProfileData} col={'3'}/>
                                    <Text name={'Date of birth'} value={profileData.date_of_birth.slice(0, 10)}
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
                                        <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Get OTP'}
                                                      yellow={true}/>
                                    </div>
                                    <div className="flex col-span-3 relative grayscale opacity-80">
                                        <Text name={'Enter OTP'}
                                              setValue={setProfileData} type='tel' col={' w-full relative'}/>
                                        <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Validate'}
                                                      yellow={true}/>
                                    </div>

                                    <div className='flex col-span-3 relative'>
                                        <Text name={'Email'} isRequired={true}
                                              value={profileData.email}
                                              disp='email'
                                              setValue={setProfileData} type='email' col={' w-full'}/>
                                        <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Get OTP'}
                                                      yellow={true}/>
                                    </div>
                                    <div className="flex col-span-3 relative grayscale opacity-80">
                                        <Text name={'Enter OTP'}
                                              setValue={setProfileData} type='tel' col={' w-full relative'}/>
                                        <ClickyButton classes={'h-fit absolute right-0 bottom-0'} name={'Validate'}
                                                      yellow={true}/>
                                    </div>
                                </div>
                            </form>
                        )}
                        {/* Academics */}
                        {currentStep === 1 && (
                            <form onSubmit={handleNext}>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 mb-4">
                                    <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:w-[75%] lg:min-w-[580px] ">
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
                                    <Text name={'Start Date'} value={profileData.course_started.slice(0, 10)}
                                          isRequired={true} disp='course_started'
                                          setValue={setProfileData} type={'date'} col={'3'}/>
                                    <Text name={'End Date'} value={profileData.expected_graduation.slice(0, 10)}
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                                </div>
                            </form>
                        )}
                        {/* Professional Goals */}
                        {currentStep === 2 && (
                            <form onSubmit={handleNext}>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 mb-4">
                                    <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:w-[75%] lg:min-w-[580px]">
                                    <ButtonRow label={'Career Objectives'} col={' col-span-full'} buttonsPerRow={4}
                                               buttonNames={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8']}/>
                                    {/* Yaha par atleast ek jab select karo tab niche ke options dikhane hain dhruv. */}
                                    <SkillRating label='Rate Yourself in each skill for your desired objective:'/>
                                </div>
                            </form>
                        )}
                        {/* Skill Verification */}
                        {currentStep === 3 && (
                            <form onSubmit={handleNext}>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 mb-4">
                                    <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div
                                    className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7 lg:w-[80%] lg:min-w-[580px]">

                                    <label
                                        className="block text-sm font-medium leading-6 text-gray-900 tracking-tight col-span-full">Certify
                                        Your Claimed Skills</label>
                                    <div className='sm:col-span-2 flex flex-col gap-2'>
                                        <div className="w-full mb-5 text-center">
                                            <button type='button'
                                                    className="w-full max-w-40 bg-yellow-600 h-fit rounded-md py-2 font-semibold text-white text-center shadow-lg drop-shadow-lg hover:scale-105">Option
                                                1
                                            </button>
                                            <p className="text-blue-600 text-sm font-medium text-center">Employability:
                                                75%</p>
                                        </div>
                                        <div className="w-full mb-5 text-center grayscale">
                                            <button type='button'
                                                    className="w-full max-w-40 bg-yellow-600 h-fit rounded-md py-2 font-semibold text-white text-center shadow-lg drop-shadow-lg hover:scale-105">Option
                                                1
                                            </button>
                                            <p className="text-blue-600 text-sm font-medium text-center">Employability:
                                                75%</p>
                                        </div>
                                    </div>
                                    <div
                                        className="col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-8">
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
                                </div>
                            </form>
                        )}
                        {/* Internships */}
                        {currentStep === 4 && (
                            <form onSubmit={handleNext}>
                                <div>
                                    <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 pb-4 mb-4">
                                        <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                        <button type="button" onClick={handleBack}
                                                className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                        </button>
                                        <button type="button" onClick={handleSubmit}
                                                className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                        </button>
                                    </div>
                                    <div className="rounded-lg px-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                        {profileData.internships.map((x, index) => {
                                            return (
                                                <div
                                                    className="grid grid-cols-6 relative rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-300">
                                                    {index != 0 &&
                                                        <X className='absolute top-2 right-2 cursor-pointer'/>}
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
                                                          value={profileData.internships[index].start_year+"-"+(months.indexOf(profileData.internships[index].start_month)+1).toString().padStart(2,'0')+"-01"}
                                                          disp='start_date' index={index} list='internships'
                                                          setValue={setProfileData} type={'date'} col={3}/>
                                                    <Text name={'End Date'}
                                                          value={profileData.internships[index].end_year+"-"+(months.indexOf(profileData.internships[index].end_month)+1).toString().padStart(2,'0')+"-01"}
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
                                                className="bg-gray-200 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                                <CirclePlus className='w-10 h-10 text-gray-600'/>
                                                <p className="text-sm text-gray-600">Add Internship</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                        {/* Projects */}
                        {currentStep === 5 && (
                            <div>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 pb-4 mb-4">
                                    <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div className="rounded-lg px-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    {profileData.projects.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 relative rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-300">
                                            {index != 0 && <X className='absolute top-2 right-2 cursor-pointer'/>}
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
                                                  value={profileData.projects[index].start_year+"-"+(months.indexOf(profileData.projects[index].start_month)+1).toString().padStart(2,'0')+"-01"}
                                                  disp='start_date' index={index} list='projects'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.projects[index].end_year+"-"+(months.indexOf(profileData.projects[index].end_month)+1).toString().padStart(2,'0')+"-01"}
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
                                            className="bg-gray-200 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Project</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Volunteer */}
                        {currentStep === 6 && (
                            <div>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 pb-4 mb-4">
                                    <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div className="rounded-lg px-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    {profileData.volunteers.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 relative rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-300">
                                            {index != 0 && <X className='absolute top-2 right-2 cursor-pointer'/>}
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
                                                  value={profileData.volunteers[index].start_year+"-"+(months.indexOf(profileData.volunteers[index].start_month)+1).toString().padStart(2,'0')+"-01"}
                                                  disp='start_date' index={index} list='volunteers'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.volunteers[index].end_year+"-"+(months.indexOf(profileData.volunteers[index].end_month)+1).toString().padStart(2,'0')+"-01"}
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
                                            className="bg-gray-200 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Volunteers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Extra-Curricular Activities */}
                        {currentStep === 7 && (
                            <div>
                                <div className="grid grid-cols-7 grid-rows-1 space-x-4 px-10 pt-10 pb-4 mb-4">
                                    <h2 className="col-span-5 text-2xl font-semibold tracking-wide">{steps[currentStep]}</h2>
                                    <button type="button" onClick={handleBack}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-slate-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                            className="col-span-1 w-fit h-fit px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Save
                                    </button>
                                </div>
                                <div className="rounded-lg px-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    {profileData.extra_curriculars.map((x, index) => {
                                        return (<div
                                            className="grid grid-cols-6 relative rounded-md gap-x-2 gap-y-4 p-6 mb-6 bg-gray-300">
                                            {index != 0 && <X className='absolute top-2 right-2 cursor-pointer'/>}
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
                                                  value={profileData.extra_curriculars[index].start_year+"-"+(months.indexOf(profileData.extra_curriculars[index].start_month)+1).toString().padStart(2,'0')+"-01"}
                                                  disp='start_date' index={index}
                                                  list='extra_curriculars'
                                                  setValue={setProfileData} type={'date'} col={3}/>
                                            <Text name={'End Date'}
                                                  value={profileData.extra_curriculars[index].end_year+"-"+(months.indexOf(profileData.extra_curriculars[index].end_month)+1).toString().padStart(2,'0')+"-01"}
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
                                            className="bg-gray-200 flex flex-col gap-4 rounded-lg p-6 mb-6 justify-center items-center cursor-pointer border-2 border-gray-400 border-dashed hover:opacity-60">
                                            <CirclePlus className='w-10 h-10 text-gray-600'/>
                                            <p className="text-sm text-gray-600">Add Extra
                                                Curriculars</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>


        );
    }

};

export default EditProfile;
