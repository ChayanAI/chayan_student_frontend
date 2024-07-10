import React from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import { CirclePlus, X } from 'lucide-react';
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'

const AwardsDistinctions = ({ profileData, setProfileData, months }) => {
    return (
        <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {profileData.extra_curriculars.map((x, index) => {
            return (<div
                className="grid grid-cols-6 relative rounded-md gap-x-6 gap-y-4 p-6 mb-6 bg-gray-300">
                {index != 0 && <X className='absolute top-2 right-2 cursor-pointer'/>}
                <Text name={'Award/Recognition Name'}
                      value={profileData.extra_curriculars[index].title}
                      disp='title' list='extra_curriculars' index={index}
                      setValue={setProfileData} col={' col-span-full'} isRequired={true}/>
                <Text name={'Date of Issuance'}
                      value={(profileData.extra_curriculars[index].start_date)?(profileData.extra_curriculars[index].start_date):(profileData.extra_curriculars[index].start_year + "-" + (months.indexOf(profileData.extra_curriculars[index].start_month) + 1).toString().padStart(2, '0') + "-01")}
                      disp='start_date' index={index}
                      list='extra_curriculars' isRequired={true}
                      setValue={setProfileData} type={'date'} col={3}/>
                <Text name={"Provider's Name"}
                      value={profileData.extra_curriculars[index].company_name}
                      disp='company_name' list='extra_curriculars'
                      index={index} isRequired={true}
                      setValue={setProfileData} col={3}/>
                <Text name={'Platform'}
                      value={profileData.extra_curriculars[index].location}
                      disp='location' list='extra_curriculars' index={index}
                      setValue={setProfileData} col={' col-span-full'}/>
                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Upload Certificate <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed bg-gray-100 border-gray-900/25 px-6 py-4">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
            </div>)
        })}

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
                <p className="text-sm text-gray-600">Add Award/Recognition</p>
            </div>
        </div>
    </div>
    );
  };

export default AwardsDistinctions;
