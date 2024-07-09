import React from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import { CirclePlus, X } from 'lucide-react';

const Internships = ({ profileData, setProfileData, months }) => {
    return (
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
                    <Text name={'Start Date'}
                          value={(profileData.internships[index].start_date) ? (profileData.internships[index].start_date) : (profileData.internships[index].start_year + "-" + (months.indexOf(profileData.internships[index].start_month) + 1).toString().padStart(2, '0') + "-01")}
                          disp='start_date' index={index} list='internships'
                          setValue={setProfileData} type={'date'} col={3}/>
                    <Text name={'End Date'}
                          value={(profileData.internships[index].end_date) ? (profileData.internships[index].end_date) : (profileData.internships[index].end_year + "-" + (months.indexOf(profileData.internships[index].end_month) + 1).toString().padStart(2, '0') + "-01")}
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
    );
  };

export default Internships;
