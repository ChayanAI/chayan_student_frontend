'use client';

import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import ProgressBar from './ProgressBar';
import {Text, Select, Block, ComboBox} from './Input';
import OtpInput from './OtpInput';
import SkillRating from './SkillRating';
import StarRating from './StarRating';
import {ChevronLeft, CircleCheckBig, CirclePlus, X} from 'lucide-react';
import axios from "axios";
import VerticalNav from './VerticalNav';
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import PersonalInformation from './EditProfileSections/PersonalInformation';
import Academics from './EditProfileSections/Academics';
import ProfessionalGoals from './EditProfileSections/ProfessionalGoals';
import SkillsAssessment from './EditProfileSections/SkillsAssessment';
import Internships from './EditProfileSections/Internships';
import Projects from './EditProfileSections/Projects';
import VolunteerExperiences from './EditProfileSections/VolunteerExperiences';
import ExtraCurricularActivities from './EditProfileSections/ExtraCurricularActivities';
import Certificates from './EditProfileSections/Certificates';
import AwardsDistinctions from './EditProfileSections/AwardsDistinctions';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const EditProfile = ({userId}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stepParam = searchParams.get('step');

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
        }],
        career_path: []
    });

    const [loader, setLoader] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [ratingData, setRatingData] = useState({});
    const [selectedCareer, setselectedCareer] = useState();

    useEffect(() => {
        if (stepParam) {
            setCurrentStep(parseInt(stepParam));
        }
    }, [stepParam]);

    useEffect(() => {
        (async () => {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/user/getprofilebyId`, {user_id: userId}).then((res) => {
                    setProfileData((prev) => ({...prev, ...res.data}));
                });

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/get/findbyId`, {userId: userId}).then((res) => {
                    setProfileData((prev) => ({...prev, email: res.data.email, phone_number: res.data.phone_number}));
                });

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getinternbyId`, {userId}).then((res) => {
                    setProfileData((prev) => ({
                        ...prev,
                        internships: (res.data.internships.length === 0) ? ([{
                            title: null,
                            company_name: null,
                            location: null,
                            start_date: null,
                            end_date: null,
                            description: null,
                            summary: null
                        }]) : (res.data.internships),
                        projects: (res.data.projects.length === 0) ? ([{
                            title: null,
                            company_name: null,
                            location: null,
                            start_date: null,
                            end_date: null,
                            description: null,
                            summary: null
                        }]) : (res.data.projects),
                        volunteers: (res.data.volunteers.length === 0) ? ([{
                            title: null,
                            company_name: null,
                            location: null,
                            start_date: null,
                            end_date: null,
                            description: null,
                            summary: null
                        }]) : (res.data.volunteers),
                        extra_curriculars: (res.data.extra_curriculars.length === 0) ? ([{
                            title: null,
                            company_name: null,
                            location: null,
                            start_date: null,
                            end_date: null,
                            description: null,
                            summary: null
                        }]) : (res.data.extra_curriculars)
                    }));
                });

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getrating`, {user_id: userId}).then((res) => {
                    res.data.map(async (item) => {
                        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getskillname`, {skill_id: item.skill_id}).then((res) => {
                            setRatingData((prev) => {
                                return ({...prev, [res.data.name]: item.rating});
                            });
                        });
                    });
                });
            } catch (err) {
                alert(err.message);
            }
            setLoader(false);
        })();
    }, [userId]);

    const handleRatingChange = (rating) => {
        console.log('Selected rating:', rating);
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
        'Certificates',
        'Awards & Recognitions',
    ];

    const handleNext = (e) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (index) => {
        setCurrentStep(index);
    };

    const handlecancel = async () => {
        await router.push('/dashboard');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/update-form`, {
                user_id: userId,
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
                college_name: profileData.college_name,
                career_path: profileData.career_path
            }).then((res) => console.log(res));
        } catch (err) {
            alert(err.response.data);
        }
    };

    const CareerJobs = {
        ["Software Developer"]: [
            "Data Structure",
            "C++",
            "JavaScript",
            "Analytical Thinking"
        ],
        ["Data Scientist"]: [
            "Statistics",
            "Machine Learning",
            "Visualization",
            "Python"
        ],
        ["Product Manager"]: [
            "Project management",
            "Market Research",
            "User Experience",
            "Business Strategy"
        ],
        ["DevOps Engineer"]: [
            "CI/CD",
            "Cloud Platforms",
            "Scripts",
            "Infrastructure"
        ],
        ["Cybersecurity Analyst"]: [
            "Network Security",
            "Ethical Hacking",
            "Cryptography",
            "Risk Assessment"
        ],
        ["AI/ML Engineer"]: [
            "Machine Learning",
            "Neural Networks",
            "Deep Learning",
            "Python"
        ],
        ["Consultant"]: [
            "Analytical Skills",
            "Problem Solving",
            "Project Management",
            "Communication"
        ]
    };

    if (loader) {
        return (<></>);
    } else {
        return (
            <div className="flex flex-col w-full gap-4 bg-gray-100 dark:bg-[#101117] dark:text-[#f8f8f8]">
                <div className="flex min-h-[calc(100vh-4rem)] gap-6 relative">
                    <div className="w-1/4 px-8 lg:px-16 dark:bg-[#1b1b21]">
                        <Link href={'/dashboard'} className="flex -ml-6 gap-2 pt-5 text-gray-500 font-semibold">
                            <ChevronLeft />
                            Dashboard
                        </Link>
                        <h1 className="text-lg font-bold pt-8 pb-10">Edit your Profile</h1>
                        <VerticalNav currentStep={currentStep} setCurrentStep={setCurrentStep} />
                    </div>
                    <div className="w-3/4 px-8 pt-8">
                        <form className="space-y-8 divide-y divide-gray-200">
                        {console.log("Rendering step:", currentStep)}
                            {currentStep === 0 && <PersonalInformation profileData={profileData} setProfileData={setProfileData} />}
                            {currentStep === 1 && <Academics profileData={profileData} setProfileData={setProfileData} />}
                            {currentStep === 2 && <ProfessionalGoals profileData={profileData} setProfileData={setProfileData} setRatingData={setRatingData} />}
                            {currentStep === 3 && <SkillsAssessment profileData={profileData} setProfileData={setProfileData} selectedCareer={selectedCareer} setselectedCareer={setselectedCareer} CareerJobs={CareerJobs} ratingData={ratingData} />}
                            {currentStep === 4 && <Internships profileData={profileData} setProfileData={setProfileData} months={months} />}
                            {currentStep === 5 && <Projects profileData={profileData} setProfileData={setProfileData} months={months} />}
                            {currentStep === 6 && <VolunteerExperiences profileData={profileData} setProfileData={setProfileData} months={months} />}
                            {currentStep === 7 && <ExtraCurricularActivities profileData={profileData} setProfileData={setProfileData} months={months} />}
                            {currentStep === 8 && <Certificates profileData={profileData} setProfileData={setProfileData} months={months} />}
                            {currentStep === 9 && <AwardsDistinctions profileData={profileData} setProfileData={setProfileData} months={months} />}
                            <div className="flex justify-end">
                                <button type="button" onClick={handleSubmit} className="py-2 px-4 bg-green-600 text-white rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default EditProfile;
