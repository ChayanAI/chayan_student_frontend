import React from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import { ArrowRightLeft, Calendar} from 'lucide-react';

function formatDate(inputDate) {
  const date = new Date(inputDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

const Academics = ({ profileData, setProfileData }) => {
  return (
    <div className="rounded-lg px-10 pb-10 mb-[100px] grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 ">
        <ComboBox name={'University'} value={profileData.college_name}
                  isRequired={true} disp='college_name'
                  setValue={setProfileData}
                  col={'3'}
                  options={["IIT Roorkee", "IIT Bombay", "IIT Kanpur", "IIT Kharagpur", "IIT Madras", "IIT Delhi", "IIT Guwahati", "IIT Hyderabad", "IIT Ropar", "IIT Gandhinagar", "IIT Mandi", "IIT Indore", "IIT Kochi", "Amity Noida", "Amity Lucknow", "Amity Pune", "JSS Noida", "SRCC", "Hindu College", "Delhi University", "LSR", "Mumbai University"]}/>
        <Select name={'Degree'} isRequired={true} value={profileData.degree}
                disp='degree'
                setValue={setProfileData} col={'3'}
                options={['B.Tech', 'B.Comm', 'B.Sc']}/>

        <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor='start-end-date' className="block text-xs font-medium ml-1 leading-6 text-gray-400 dark:text-[#dcdcdc]">
            Start Date / End Date <span className="text-red-700">*</span>
            </label>
            <div className="flex items-center w-full bg-gray-200 h-fit px-2 rounded-lg text-sm">
                <input
                    type="date"
                    className="py-1.5 bg-gray-200 text-gray-700 focus:outline-none border-0 date-picker-transparent"
                    value="2012-01-22"
                />
                <ArrowRightLeft className="mx-4 text-gray-500" size={18} />
                <input
                    type="date"
                    className="py-1.5 bg-gray-200 text-gray-700 focus:outline-none border-0 date-picker-transparent"
                    value="2016-01-22"
                />
                <Calendar className="ml-4 text-gray-500" size={18} />
            </div>
        </div>

        <Select name={'Branch / Discipline'} isRequired={true}
                value={profileData.branch} disp='branch'
                setValue={setProfileData} col={'2'}
                options={["Computer Science", "Electrical Engineering", "Civil Engineering", "Mechanical", "Electronics", "Aerospace", "Chemical", "Production and Industrial", "Metallurgy", "Hydrology", "Earthquake", "IT", "Nuclear", "Biotech", "Environmental", "Petroleum", "Automobile"]}/>
        <Select name={'Minor Branch'} value={profileData.minor_branch}
                disp='minor_branch'
                setValue={setProfileData} col={'2'}
                options={["Computer Science", "Electrical Engineering", "Civil Engineering", "Mechanical", "Electronics", "Aerospace", "Chemical", "Production and Industrial", "Metallurgy", "Hydrology", "Earthquake", "IT", "Nuclear", "Biotech", "Environmental", "Petroleum", "Automobile"]}/>

        {/* <Text name={'Start Date'} value={formatDate(profileData.course_started)}
              isRequired={true} disp='course_started'
              setValue={setProfileData} type={'date'} col={'3'}/>
        <Text name={'End Date'} value={formatDate(profileData.expected_graduation)}
              isRequired={true}
              disp='expected_graduation' setValue={setProfileData}
              type={'date'} col={'3'}/> */}
        

        <ButtonRow label={'Length of the course'}
                   value={profileData.course_length}
                   disp='course_length' setValue={setProfileData}
                   col={'2'}
                   buttonNames={['2 Years', '3 Years', '4 Years', '5 Years']}/>
        <div className="col-span-4"></div>
        <Text name={'CGPA / Percentage'} isRequired={true}
              value={profileData.cgpa} disp='cgpa'
              setValue={setProfileData} col={'1'}/>
        <div className={`sm:col-span-4`}>
            <label
                className="block text-xs font-medium ml-1 leading-6 text-gray-400 dark:text-[#dcdcdc]">
                SGPA / Sem. Percentages
            </label>
            <div className="mt-2">
                <div
                    className="grid grid-cols-4 gap-x-6 gap-y-6 md:grid-cols-8">
                    <div className="col-span-1"><input
                        value={profileData.sgpa.sem1}
                        onChange={(e) => setProfileData((prev) => ({
                            ...prev,
                            sgpa: {
                                ...prev.sgpa,
                                sem1: e.target.value
                            }
                        }))} id='sgpa1' placeholder='Sem-1'
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
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
                        className="block w-full rounded-lg bg-gray-50 text-center border-0 py-1.5 text-gray-900 dark:bg-[#d0cfd1] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
        </div>
        <Select name={'12th Board'} value={profileData.class_12_board}
                isRequired={true} disp='class_12_board'
                setValue={setProfileData} col={2}
                options={['CBSE', 'ISC', 'State Board']}/>
        <Text name={'12th Percentage'} isRequired={true}
              value={profileData.class_12_percentage}
              disp='class_12_percentage' setValue={setProfileData} col={2}/>
    </div>
  );
};

export default Academics;
// PersonalInformation
// Academics
// ProfessionalGoals
// SkillAssessment
// Internships
// Projects
// VolunteerExperience
// ExtraCurricularActivities
// Certificates
// AwardsRecognitions
