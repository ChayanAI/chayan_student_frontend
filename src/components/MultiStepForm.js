'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import ProgressBar from './ProgressBar';
import {Text, Select, Block, ComboBox} from './Input'
import OtpInput from './OtpInput';
import SkillRating from './SkillRating';
import StarRating from './StarRating';
import {ToggleButton, ButtonRow, ClickyButton} from './ToggleButton';
import {CircleCheckBig, CirclePlus} from 'lucide-react';
import axios from "axios";
import {useParams} from "next/navigation";
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'

const MultiStepForm = ({userId}) => {
    const params = useParams()
    const [pfp, setPfp] = useState('/media/images/300-1.jpg')


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


    })
    const router = useRouter();
    const [loader, setLoader] = useState(true)
    const [currentStep, setCurrentStep] = useState(0);
    const [ratingData, setRatingData] = useState({})
    useEffect(() => {
        (async () => {
            try {

                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/get/findbyId`, {userId: userId}).then((res) => {

                    setProfileData((prev) => ({...prev, email: res.data.email, phone_number: res.data.phone_number}))
                })


                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getrating`, {user_id: userId}).then((res) => {
                    // console.log(res.data)
                    res.data.map(async (item) => {
                        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getskillname`, {skill_id: item.skill_id}).then((res) => {
                            // console.log(res.data)
                            setRatingData((prev) => {
                                return ({...prev, [res.data.name]: item.rating})
                            })
                        })
                    })
                })
            } catch (err) {
                alert(err.response.data)
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
        // console.log(profileData.career_path)
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
                sgpa: profileData.sgpa,
                class_12_board: profileData.class_12_board,
                class_12_percentage: profileData.class_12_percentage,
                internships: profileData.internships,
                projects: profileData.projects,
                volunteers: profileData.volunteers,
                extra_curriculars: profileData.extra_curriculars,
                college_name: profileData.college_name,
                career_path: profileData.career_path
            }).then((res) => console.log(res))
        } catch (err) {
            alert(err)
        }
        router.push('/dashboard');
    };
    const [selectedCareer, setselectedCareer] = useState()
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
    }

    async function handlepfpdelete() {
        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/deletepfp`, {userId}).then(() => {
            setPfp('/media/images/300-1.jpg')
        })
    }

    async function handlepfpchange(e) {
        let postid = userId
        let file = e.target.files[0]
        let blob = file.slice(0, file.size, "image/jpeg, image/png");
        let newFile = new File([blob], `${postid}.jpeg`, {type: "image/jpeg, image/png"});
        let formData = new FormData();
        formData.append("imgfile", newFile);
        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/upload`, formData).then((res) => {
            // console.log(res)
        }).then(async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/getpfp`, formData)
                .then((x) => {
                    for (let y = 0; y < x.data[0].length; y++) {
                        // console.log(x.data[0][y]);
                        setPfp("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                        // console.log("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                    }
                });
        })

    }


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
                                        className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 border-b lg:w-[75%] ">
                                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                                        <div className="col-span-full">
                                            <label htmlFor="photo"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Profile Photo
                                            </label>
                                            <div className="mt-2 flex items-center gap-x-3">
                                                <img src={pfp ? (pfp) : ('/media/images/300-1.jpg')} alt='profile'
                                                     className='w-24 h-24 object-cover ml-2 border-2 border-gray-400 rounded-[50%]'/>
                                                <input onChange={(e) => handlepfpchange(e)} type="file" name="imgfile"
                                                       accept="image/jpeg, image/png" id="imgfile"/>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    Change
                                                </button>
                                                <button
                                                    onClick={handlepfpdelete}
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
                                        <Text name={'Date of birth'} value={profileData.date_of_birth}
                                              isRequired={true}
                                              disp='date_of_birth'
                                              setValue={setProfileData} type={'date'} col={'3'}/>
                                        <ComboBox name={'Hometown'} value={profileData.city} disp='city'
                                                  setValue={setProfileData} col={'3'} isRequired={true}
                                                  options={["Mumbai, Maharashtra", "Delhi, Delhi", "Bengaluru, Karnataka", "Ahmedabad, Gujarat", "Hyderabad, Telangana", "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Pune, Maharashtra", "Jaipur, Rajasthan", "Surat, Gujarat", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh", "Nagpur, Maharashtra", "Patna, Bihar", "Indore, Madhya Pradesh", "Thane, Maharashtra", "Bhopal, Madhya Pradesh", "Visakhapatnam, Andhra Pradesh", "Vadodara, Gujarat", "Firozabad, Uttar Pradesh", "Ludhiana, Punjab", "Rajkot, Gujarat", "Agra, Uttar Pradesh", "Siliguri, West Bengal", "Nashik, Maharashtra", "Faridabad, Haryana", "Patiala, Punjab", "Meerut, Uttar Pradesh", "Kalyan-Dombivali, Maharashtra", "Vasai-Virar, Maharashtra", "Varanasi, Uttar Pradesh", "Srinagar, Jammu and Kashmir", "Dhanbad, Jharkhand", "Jodhpur, Rajasthan", "Amritsar, Punjab", "Raipur, Chhattisgarh", "Allahabad, Uttar Pradesh", "Coimbatore, Tamil Nadu", "Jabalpur, Madhya Pradesh", "Gwalior, Madhya Pradesh", "Vijayawada, Andhra Pradesh", "Madurai, Tamil Nadu", "Guwahati, Assam", "Chandigarh, Chandigarh", "Hubli-Dharwad, Karnataka", "Amroha, Uttar Pradesh", "Moradabad, Uttar Pradesh", "Gurgaon, Haryana", "Aligarh, Uttar Pradesh", "Solapur, Maharashtra", "Ranchi, Jharkhand", "Jalandhar, Punjab", "Tiruchirappalli, Tamil Nadu", "Bhubaneswar, Odisha", "Salem, Tamil Nadu", "Warangal, Telangana", "Mira-Bhayandar, Maharashtra", "Thiruvananthapuram, Kerala", "Bhiwandi, Maharashtra", "Saharanpur, Uttar Pradesh", "Guntur, Andhra Pradesh", "Amravati, Maharashtra", "Bikaner, Rajasthan", "Noida, Uttar Pradesh", "Jamshedpur, Jharkhand", "Bhilai Nagar, Chhattisgarh", "Cuttack, Odisha", "Kochi, Kerala", "Udaipur, Rajasthan", "Bhavnagar, Gujarat", "Dehradun, Uttarakhand", "Asansol, West Bengal", "Nanded-Waghala, Maharashtra", "Ajmer, Rajasthan", "Jamnagar, Gujarat", "Ujjain, Madhya Pradesh", "Sangli, Maharashtra", "Loni, Uttar Pradesh", "Jhansi, Uttar Pradesh", "Pondicherry, Puducherry", "Nellore, Andhra Pradesh", "Jammu, Jammu and Kashmir", "Belagavi, Karnataka", "Raurkela, Odisha", "Mangaluru, Karnataka", "Tirunelveli, Tamil Nadu", "Malegaon, Maharashtra", "Gaya, Bihar", "Tiruppur, Tamil Nadu", "Davanagere, Karnataka", "Kozhikode, Kerala", "Akola, Maharashtra", "Kurnool, Andhra Pradesh", "Bokaro Steel City, Jharkhand", "Rajahmundry, Andhra Pradesh", "Ballari, Karnataka", "Agartala, Tripura", "Bhagalpur, Bihar", "Latur, Maharashtra", "Dhule, Maharashtra", "Korba, Chhattisgarh", "Bhilwara, Rajasthan", "Brahmapur, Odisha", "Mysore, Karnataka", "Muzaffarpur, Bihar", "Ahmednagar, Maharashtra", "Kollam, Kerala", "Raghunathganj, West Bengal", "Bilaspur, Chhattisgarh", "Shahjahanpur, Uttar Pradesh", "Thrissur, Kerala", "Alwar, Rajasthan", "Kakinada, Andhra Pradesh", "Nizamabad, Telangana", "Sagar, Madhya Pradesh", "Tumkur, Karnataka", "Hisar, Haryana", "Rohtak, Haryana", "Panipat, Haryana", "Darbhanga, Bihar", "Kharagpur, West Bengal", "Aizawl, Mizoram", "Ichalkaranji, Maharashtra", "Tirupati, Andhra Pradesh", "Karnal, Haryana", "Bathinda, Punjab", "Rampur, Uttar Pradesh", "Shivamogga, Karnataka", "Ratlam, Madhya Pradesh", "Modinagar, Uttar Pradesh", "Durg, Chhattisgarh", "Shillong, Meghalaya", "Imphal, Manipur", "Hapur, Uttar Pradesh", "Ranipet, Tamil Nadu", "Anantapur, Andhra Pradesh", "Arrah, Bihar", "Karimnagar, Telangana", "Parbhani, Maharashtra", "Etawah, Uttar Pradesh", "Bharatpur, Rajasthan", "Begusarai, Bihar", "New Delhi, Delhi", "Chhapra, Bihar", "Kadapa, Andhra Pradesh", "Ramagundam, Telangana", "Pali, Rajasthan", "Satna, Madhya Pradesh", "Vizianagaram, Andhra Pradesh", "Katihar, Bihar", "Hardwar, Uttarakhand", "Sonipat, Haryana", "Nagercoil, Tamil Nadu", "Thanjavur, Tamil Nadu", "Murwara (Katni), Madhya Pradesh", "Naihati, West Bengal", "Sambhal, Uttar Pradesh", "Nadiad, Gujarat", "Yamunanagar, Haryana", "English Bazar, West Bengal", "Eluru, Andhra Pradesh", "Munger, Bihar", "Panchkula, Haryana", "Raayachuru, Karnataka", "Panvel, Maharashtra", "Deoghar, Jharkhand", "Ongole, Andhra Pradesh", "Nandyal, Andhra Pradesh", "Morena, Madhya Pradesh", "Bhiwani, Haryana", "Porbandar, Gujarat", "Palakkad, Kerala", "Anand, Gujarat", "Purnia, Bihar", "Baharampur, West Bengal", "Barmer, Rajasthan", "Morvi, Gujarat", "Orai, Uttar Pradesh", "Bahraich, Uttar Pradesh", "Sikar, Rajasthan", "Vellore, Tamil Nadu", "Singrauli, Madhya Pradesh", "Khammam, Telangana", "Mahesana, Gujarat", "Silchar, Assam", "Sambalpur, Odisha", "Rewa, Madhya Pradesh", "Unnao, Uttar Pradesh", "Hugli-Chinsurah, West Bengal", "Raiganj, West Bengal", "Phusro, Jharkhand", "Adityapur, Jharkhand", "Alappuzha, Kerala", "Bahadurgarh, Haryana", "Machilipatnam, Andhra Pradesh", "Rae Bareli, Uttar Pradesh", "Jalpaiguri, West Bengal", "Bharuch, Gujarat", "Pathankot, Punjab", "Hoshiarpur, Punjab", "Baramula, Jammu and Kashmir", "Adoni, Andhra Pradesh", "Jind, Haryana", "Tonk, Rajasthan", "Tenali, Andhra Pradesh", "Kancheepuram, Tamil Nadu", "Vapi, Gujarat", "Sirsa, Haryana", "Navsari, Gujarat", "Mahbubnagar, Telangana", "Puri, Odisha", "Robertson Pet, Karnataka", "Erode, Tamil Nadu", "Batala, Punjab", "Haldwani-cum-Kathgodam, Uttarakhand", "Vidisha, Madhya Pradesh", "Saharsa, Bihar", "Thanesar, Haryana", "Chittoor, Andhra Pradesh", "Veraval, Gujarat", "Lakhimpur, Uttar Pradesh", "Sitapur, Uttar Pradesh", "Hindupur, Andhra Pradesh", "Santipur, West Bengal", "Balurghat, West Bengal", "Ganjbasoda, Madhya Pradesh", "Moga, Punjab", "Proddatur, Andhra Pradesh", "Srinagar, Uttarakhand", "Medinipur, West Bengal", "Habra, West Bengal", "Sasaram, Bihar", "Hajipur, Bihar", "Bhuj, Gujarat", "Shivpuri, Madhya Pradesh", "Ranaghat, West Bengal", "Shimla, Himachal Pradesh", "Tiruvannamalai, Tamil Nadu", "Kaithal, Haryana", "Rajnandgaon, Chhattisgarh", "Godhra, Gujarat", "Hazaribag, Jharkhand", "Bhimavaram, Andhra Pradesh", "Mandsaur, Madhya Pradesh", "Dibrugarh, Assam", "Kolar, Karnataka", "Bankura, West Bengal", "Mandya, Karnataka", "Dehri-on-Sone, Bihar", "Madanapalle, Andhra Pradesh", "Malerkotla, Punjab", "Lalitpur, Uttar Pradesh", "Bettiah, Bihar", "Pollachi, Tamil Nadu", "Khanna, Punjab", "Neemuch, Madhya Pradesh", "Palwal, Haryana", "Palanpur, Gujarat", "Guntakal, Andhra Pradesh", "Nabadwip, West Bengal", "Udupi, Karnataka", "Jagdalpur, Chhattisgarh", "Motihari, Bihar", "Pilibhit, Uttar Pradesh", "Dimapur, Nagaland", "Mohali, Punjab", "Sadulpur, Rajasthan", "Rajapalayam, Tamil Nadu", "Dharmavaram, Andhra Pradesh", "Kashipur, Uttarakhand", "Sivakasi, Tamil Nadu", "Darjiling, West Bengal", "Chikkamagaluru, Karnataka", "Gudivada, Andhra Pradesh", "Baleshwar Town, Odisha", "Mancherial, Telangana", "Srikakulam, Andhra Pradesh", "Adilabad, Telangana", "Yavatmal, Maharashtra", "Barnala, Punjab", "Nagaon, Assam", "Narasaraopet, Andhra Pradesh", "Raigarh, Chhattisgarh", "Roorkee, Uttarakhand", "Valsad, Gujarat", "Ambikapur, Chhattisgarh", "Giridih, Jharkhand", "Chandausi, Uttar Pradesh", "Purulia, West Bengal", "Patan, Gujarat", "Bagaha, Bihar", "Hardoi, Uttar Pradesh", "Achalpur, Maharashtra", "Osmanabad, Maharashtra", "Deesa, Gujarat", "Nandurbar, Maharashtra", "Azamgarh, Uttar Pradesh", "Ramgarh, Jharkhand", "Firozpur, Punjab", "Baripada Town, Odisha", "Karwar, Karnataka", "Siwan, Bihar", "Rajampet, Andhra Pradesh", "Pudukkottai, Tamil Nadu", "Anantnag, Jammu and Kashmir", "Tadpatri, Andhra Pradesh", "Satara, Maharashtra", "Bhadrak, Odisha", "Kishanganj, Bihar", "Suryapet, Telangana", "Wardha, Maharashtra", "Ranibennur, Karnataka", "Amreli, Gujarat", "Neyveli (TS), Tamil Nadu", "Jamalpur, Bihar", "Marmagao, Goa", "Udgir, Maharashtra", "Tadepalligudem, Andhra Pradesh", "Nagapattinam, Tamil Nadu", "Buxar, Bihar", "Aurangabad, Bihar", "Jehanabad, Bihar", "Phagwara, Punjab", "Khair, Uttar Pradesh", "Sawai Madhopur, Rajasthan", "Kapurthala, Punjab", "Chilakaluripet, Andhra Pradesh", "Aurangabad, Maharashtra", "Malappuram, Kerala", "Rewari, Haryana", "Nagaur, Rajasthan", "Sultanpur, Uttar Pradesh", "Nagda, Madhya Pradesh", "Port Blair, Andaman and Nicobar Islands", "Lakhisarai, Bihar", "Panaji, Goa", "Tinsukia, Assam", "Itarsi, Madhya Pradesh", "Kohima, Nagaland", "Balangir, Odisha", "Nawada, Bihar", "Jharsuguda, Odisha", "Jagtial, Telangana", "Viluppuram, Tamil Nadu", "Amalner, Maharashtra", "Zirakpur, Punjab", "Tanda, Uttar Pradesh", "Tiruchengode, Tamil Nadu", "Nagina, Uttar Pradesh", "Yemmiganur, Andhra Pradesh", "Vaniyambadi, Tamil Nadu", "Sarni, Madhya Pradesh", "Theni Allinagaram, Tamil Nadu", "Margao, Goa", "Akot, Maharashtra", "Sehore, Madhya Pradesh", "Mhow Cantonment, Madhya Pradesh", "Kot Kapura, Punjab", "Makrana, Rajasthan", "Pandharpur, Maharashtra", "Miryalaguda, Telangana", "Shamli, Uttar Pradesh", "Seoni, Madhya Pradesh", "Ranibandh, West Bengal", "Rishikesh, Uttarakhand", "Shahdol, Madhya Pradesh", "Medininagar (Daltonganj), Jharkhand", "Arakkonam, Tamil Nadu", "Washim, Maharashtra", "Sangrur, Punjab", "Bodhan, Telangana", "Fazilka, Punjab", "Palacole, Andhra Pradesh", "Keshod, Gujarat", "Sullurpeta, Andhra Pradesh", "Wadhwan, Gujarat", "Gurdaspur, Punjab", "Vatakara, Kerala", "Tura, Meghalaya", "Narnaul, Haryana", "Kharar, Punjab", "Yadgir, Karnataka", "Ambejogai, Maharashtra", "Ankleshwar, Gujarat", "Savarkundla, Gujarat", "Paradip, Odisha", "Virudhachalam, Tamil Nadu", "Kanhangad, Kerala", "Kadi, Gujarat", "Srivilliputhur, Tamil Nadu", "Gobindgarh, Punjab", "Tindivanam, Tamil Nadu", "Mansa, Punjab", "Taliparamba, Kerala", "Manmad, Maharashtra", "Tanuku, Andhra Pradesh", "Rayachoti, Andhra Pradesh", "Virudhunagar, Tamil Nadu", "Koyilandy, Kerala", "Jorhat, Assam", "Karjat, Maharashtra", "Kavali, Andhra Pradesh", "Mandapeta, Andhra Pradesh", "Srikalahasti, Andhra Pradesh", "Nellikuppam, Tamil Nadu", "Ramnagar, Uttarakhand", "Sihor, Gujarat", "Nellikuppam, Tamil Nadu", "Ramnagar, Uttarakhand", "Sihor, Gujarat", "Nellikuppam, Tamil Nadu", "Ramnagar, Uttarakhand", "Sihor, Gujarat"]}
                                        />
                                        <ButtonRow label={'Gender'} value={profileData.gender} disp='gender'
                                                   setValue={setProfileData} col={4} isRequired={true}
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
                                    <div
                                        className="bg-gray-200 rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b lg:w-[75%] lg:min-w-[580px] ">
                                        {/* <h2 className="text-2xl font-semibold mb-4 tracking-wide">{steps[currentStep]}</h2> */}
                                        <ComboBox name={'College Name'} value={profileData.college_name}
                                                  isRequired={true} disp='college_name'
                                                  setValue={setProfileData}
                                                  col={' col-span-full'}
                                                  options={["IIT Roorkee", "IIT Bombay", "IIT Kanpur", "IIT Kharagpur", "IIT Madras", "IIT Delhi", "IIT Guwahati", "IIT Hyderabad", "IIT Ropar", "IIT Gandhinagar", "IIT Mandi", "IIT Indore", "IIT Kochi", "Amity Noida", "Amity Lucknow", "Amity Pune", "JSS Noida", "SRCC", "Hindu College", "Delhi University", "LSR", "Mumbai University"]}/>
                                        <Select name={'Degree'} isRequired={true} value={profileData.degree}
                                                disp='degree'
                                                setValue={setProfileData} col={'2'}
                                                options={["B.Tech", "B.A", "B.Com", "B.Des", "B.Arch", "B.B.A", "B.C.A.", "LLB", "BFA", "BMM", "BJMC", "B.Sc", "B.Sc Agriculture"]}/>
                                        <Select name={'Branch / Discipline'} isRequired={true}
                                                value={profileData.branch} disp='branch'
                                                setValue={setProfileData} col={'2'}
                                                options={["Computer Science", "Electrical Engineering", "Civil Engineering", "Mechanical", "Electronics", "Aerospace", "Chemical", "Production and Industrial", "Metallurgy", "Hydrology", "Earthquake", "IT", "Nuclear", "Biotech", "Environmental", "Petroleum", "Automobile"]}/>
                                        <Select name={'Minor Branch'} value={profileData.minor_branch}
                                                disp='minor_branch'
                                                setValue={setProfileData} col={'2'}
                                                options={["Computer Science", "Electrical Engineering", "Civil Engineering", "Mechanical", "Electronics", "Aerospace", "Chemical", "Production and Industrial", "Metallurgy", "Hydrology", "Earthquake", "IT", "Nuclear", "Biotech", "Environmental", "Petroleum", "Automobile"]}/>

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
                                                SGPA / Semester Percentages
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
                                    className="rounded-lg p-10 mb-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:w-[75%] lg:min-w-[580px] bg-gray-200">
                                    <ButtonRow type='multi' value={profileData.career_path} disp='career_path'
                                               setValue={setProfileData} label={'Career Objectives'}
                                               col={' col-span-full'} buttonsPerRow={4}
                                               buttonNames={['Software Developer', 'Data Scientist', 'Product Manager', "DevOps Engineer", "Cybersecurity Analyst", "AI/ML Engineer", "Consultant"]}/>
                                    {/* Yaha par atleast ek jab select karo tab niche ke options dikhane hain dhruv. */}
                                    <SkillRating fetchdata={setRatingData} careers={profileData.career_path}
                                                 label='Rate Yourself in each skill for your desired objective:'/>
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
                                            {CareerJobs[selectedCareer].map((item, index) => {
                                                return (<div className="flex gap-4 px-auto mx-auto col-span-1">
                                                    <div
                                                        className="flex sm:flex-col gap-x-6 mb-2 md:justify-stretch text-center">
                                                        <p className="bg-yellow-400 rounded-md text-center sm:px-auto py-1">{CareerJobs[selectedCareer][index]}</p>
                                                        <StarRating
                                                            rating={ratingData[CareerJobs[selectedCareer][index]]}/>
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
                                                       col={' col-span-full'} rows={3}/>
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
                                                   col={' col-span-full'} rows={3}/>
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
                                                   col={' col-span-full'} rows={3}/>
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
                                                   col={' col-span-full'} rows={3}/>
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
