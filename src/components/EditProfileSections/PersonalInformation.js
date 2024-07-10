import React, {useEffect, useState} from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import axios from "axios";

function formatDate(inputDate) {
    const date = new Date(inputDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

const PersonalInformation = ({userId, profileData, setProfileData}) => {
    const [loader, setLoader] = useState(false)
    const [pfp, setPfp] = useState('/media/images/300-1.jpg')
    useEffect(() => {
        (async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/getpfpbyId`, {userId})
                .then((x) => {
                    for (let y = 0; y < x.data[0].length; y++) {
                        setPfp("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                        // console.log("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                    }
                });
            setLoader(true)
        })()
    }, [])

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

    async function handlepfpdelete() {
        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/pfp/deletepfp`, {userId}).then(() => {
            setPfp('/media/images/300-1.jpg')
        })
    }

    if (!loader) {
        return (<></>)
    } else {
        return (
            <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 lg:w-[75%] ">
                <div className="col-span-full">
                    <div className="mt-2 -ml-2 flex items-center gap-x-3">
                        <img src={pfp ? (pfp) : ('/media/images/300-1.jpg')} alt='profile'
                             className='h-24 w-24 object-cover ml-2 border-2 border-gray-400 rounded-[50%]'/>
                        <input onChange={(e) => handlepfpchange(e)} type="file" name="imgfile"
                                                       accept="image/jpeg, image/png" id="imgfile"/>
                        <button
                            type="button"
                            className="rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                <Text name={'Date of birth'} value={formatDate(profileData.date_of_birth)}
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
            </div>
        );
    }

};

export default PersonalInformation;
