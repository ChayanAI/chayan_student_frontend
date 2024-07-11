import React, {useEffect, useState} from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import {CirclePlus, X} from 'lucide-react';
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import axios from "axios";

const AwardsDistinctions = ({userId, profileData, setProfileData, months}) => {
    const [proofs, setProofs] = useState({})
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        (async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/proof/getpfpbyId`, {userId}).then((res) => {
                res.data.map((item) => {
                    setProofs((prev) => ({
                        ...prev,
                        [item.id]: `https://storage.googleapis.com/chayan-proofs/${item.proof}/${item.id}.jpeg`
                    }))
                })
                // console.log(res.data)

            })
            setLoader(true)
        })()
    }, [])

    function formatDate(inputDate) {
        if (inputDate) {
            const date = new Date(inputDate)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${year}-${month}-${day}`
        }

    }

    async function handleupload(e, id) {
        // console.log(id)
        let postid = id
        let file = e.target.files[0]
        let blob = file.slice(0, file.size, "image/jpeg, image/png");
        let newFile = new File([blob], `${postid}.jpeg`, {type: "image/jpeg, image/png"});
        let formData = new FormData();
        formData.append("file-upload", newFile);
        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/proof/upload`, formData).then((res) => {

        }).then(async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/proof/getpfp`, formData)
                .then((x) => {
                    for (let y = 0; y < x.data[0].length; y++) {
                        // console.log(x.data[0][y]);
                        setProofs((prev) => ({
                            ...prev,
                            [id]: `https://storage.googleapis.com/chayan-proofs/${x.data[0][y].id}`
                        }))
                        // console.log(proofs)
                        // console.log("https://storage.googleapis.com/chayan-profile-picture/" + x.data[0][y].id)
                    }
                })
        })


    }

    if (!loader) {
        return (<></>)
    } else {
        return (
            <div className="rounded-lg p-10 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {profileData.awards.map((x, index) => {
                    return (<div
                        className="grid grid-cols-6 relative rounded-md gap-x-6 gap-y-4 p-6 mb-6 bg-gray-300">
                        {index != 0 && <X className='absolute top-2 right-2 cursor-pointer'/>}
                        <Text name={'Certificate Name'}
                              value={profileData.awards[index].name}
                              disp='name' list='awards' index={index}
                              setValue={setProfileData} col={' col-span-full'} isRequired={true}/>
                        <Text name={'Date of Issuance'}
                              value={formatDate(profileData.awards[index].issuance_date)}
                              disp='issuance_date' index={index}
                              list='awards' isRequired={true}
                              setValue={setProfileData} type={'date'} col={3}/>
                        <Text name={"Provider's Name"}
                              value={profileData.awards[index].provider_name}
                              disp='provider_name' list='awards'
                              index={index} isRequired={true}
                              setValue={setProfileData} col={3}/>
                        <Text name={'Platform'}
                              value={profileData.awards[index].platform}
                              disp='platform' list='awards' index={index}
                              setValue={setProfileData} col={' col-span-full'}/>
                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Upload Certificate <span className="text-red-700">*</span>
                            </label>
                            <div
                                className="mt-2 flex justify-center items-center rounded-lg border border-dashed bg-gray-100 border-gray-900/25 px-6 py-4">
                                <div className="text-center flex items-center justify-center flex-col">
                                    {proofs[profileData.awards[index].id] ? (
                                        <img src={proofs[profileData.awards[index].id]} alt='profile'
                                             className='h-24 w-28 object-cover ml-2 border-2 border-black rounded-[6%]'/>) : (
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>)}
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor={profileData.awards[index].id}
                                            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input onChange={(e) => handleupload(e, profileData.awards[index].id)}
                                                   accept="image/jpeg, image/png" id={profileData.awards[index].id}
                                                   name="file-upload"
                                                   type="file" className="sr-only"/>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG or JPG up to 5MB</p>
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
                                awards: [...prev.awards, {
                                    name: null,
                                    issuance_date: null,
                                    provider_name: null,
                                    platform: null
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
    }

};

export default AwardsDistinctions;
