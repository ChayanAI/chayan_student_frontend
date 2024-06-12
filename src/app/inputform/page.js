"use client"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import AuthLayout from '../../components/AuthLayout';
import InputLayout from '../../components/InputLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const InputForm = () => {
    const [errors, setErrors] = useState({});
    const [prefilledData, setPrefilledData] = useState({});
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const nonEditableFields = ['first-name', 'date-of-birth'];

    const formData = {};

    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/form-details');
                console.log('Form details response:', response.data);
                setPrefilledData(response.data);
            } catch (error) {
                console.error('Error fetching form details:', error);
            }
        };

        fetchFormDetails();
    }, []);


    const handleSubmit = (e) => {

        setShowConfirmationPopup(true);
        e.preventDefault();
        const form = e.target;
        const newErrors = {};

        Array.from(form.elements).forEach(field => {
            if (field.name) {
                formData[field.name] = field.value;
            }
        });


        const requiredFields = [
            'first-name',
            'date-of-birth',
            'gender',
            'degree',
            'course-length',
            'course-started',
            'expected-graduation',
            'branch',
            'minor-branch',
            'cgpa',
            'sgpa',
            'class-12-board',
            'class-12-percentage'
        ];

        requiredFields.forEach(field => {
            if (!form[field].value) {
                newErrors[field] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setShowConfirmationPopup(true);
        }
    };

    const handleConfirmSave = async () => {
        try {
            const response = await axios.post('http://localhost:5000/submit-form', formData);
            setShowConfirmationPopup(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCancelSave = () => {
        setShowConfirmationPopup(false);
    }

    return (
        <InputLayout>
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <button
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cover photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={prefilledData['first-name'] || ''}
                                            disabled={prefilledData['first-name'] !== undefined}
                                        />
                                        {errors['first-name'] && <p className="text-red-500 text-xs">{errors['first-name']}</p>}
                                    </div>
                                </div>



                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="date-of-birth" className="block text-sm font-medium leading-6 text-gray-900">
                                        Date of Birth
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="date-of-birth"
                                            id="date-of-birth"
                                            autoComplete="bday"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={prefilledData['date-of-birth'] || ''}
                                            disabled={prefilledData['date-of-birth'] !== undefined}

                                        />
                                        {errors['date-of-birth'] && <p className="text-red-500 text-xs">{errors['date-of-birth']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                        Gender
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="gender"
                                            name="gender"
                                            autoComplete="gender"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['gender'] || ''}
                                            disabled={prefilledData['gender'] !== undefined}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>

                                        {errors['gender'] && <p className="text-red-500 text-xs">{errors['gender']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="home-town" className="block text-sm font-medium leading-6 text-gray-900">
                                        Home Town
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="home-town"
                                            name="home-town"
                                            autoComplete="home-town"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value="">Select Home Town</option>
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                            <option>United Kingdom</option>
                                            <option>Germany</option>
                                            <option>France</option>
                                            <option>India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Academic Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Provide your academic details.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="degree" className="block text-sm font-medium leading-6 text-gray-900">
                                        Degree
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            type="text"
                                            name="degree"
                                            id="degree"
                                            autoComplete="degree"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['degree'] || ''}
                                            disabled={prefilledData['degree'] !== undefined}

                                        >
                                            <option value="">Select Degree</option>
                                            <option value="Bachelor of Science">Bachelor of Science</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                        {errors['degree'] && <p className="text-red-500 text-xs">{errors['degree']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="course-length" className="block text-sm font-medium leading-6 text-gray-900">
                                        Course Length
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            type="text"
                                            name="course-length"
                                            id="course-length"
                                            autoComplete="course-length"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['course-length'] || ''}
                                            disabled={prefilledData['course-length'] !== undefined}

                                        >
                                            <option value="">Select Course Length</option>
                                            <option value="4 years">4 years</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                        {errors['course-length'] && <p className="text-red-500 text-xs">{errors['course-length']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="course-started" className="block text-sm font-medium leading-6 text-gray-900">
                                        Course Started
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="course-started"
                                            id="course-started"
                                            autoComplete="course-started"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={prefilledData['course-started'] || ''}
                                            disabled={prefilledData['course-started'] !== undefined}

                                        />
                                        {errors['course-started'] && <p className="text-red-500 text-xs">{errors['course-started']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="expected-graduation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Expected Graduation
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="expected-graduation"
                                            id="expected-graduation"
                                            autoComplete="expected-graduation"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={prefilledData['course-started'] || ''}
                                            disabled={prefilledData['course-started'] !== undefined}
                                        />
                                        {errors['expected-graduation'] && <p className="text-red-500 text-xs">{errors['expected-graduation']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                                        Branch
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            type="text"
                                            name="branch"
                                            id="branch"
                                            autoComplete="branch"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['branch'] || ''}
                                            disabled={prefilledData['branch'] !== undefined}

                                        >
                                            <option value="">Select Branch</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                        {errors['branch'] && <p className="text-red-500 text-xs">{errors['branch']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="minor-branch" className="block text-sm font-medium leading-6 text-gray-900">
                                        Minor Branch
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            type="text"
                                            name="minor-branch"
                                            id="minor-branch"
                                            autoComplete="minor-branch"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['minor-branch'] || ''}
                                            disabled={prefilledData['minor-branch'] !== undefined}

                                        >
                                            <option value="">Select Minor Branch</option>
                                            <option value="Mathematics">Mathematics</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                        {errors['minor-branch'] && <p className="text-red-500 text-xs">{errors['minor-branch']}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="cgpa" className="block text-sm font-medium leading-6 text-gray-900">
                                        CGPA
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="cgpa"
                                            id="cgpa"
                                            autoComplete="cgpa"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['cgpa'] || ''}
                                            disabled={prefilledData['cgpa'] !== undefined}

                                        />
                                        {errors['cgpa'] && <p className="text-red-500 text-xs">{errors['cgpa']}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="sgpa" className="block text-sm font-medium leading-6 text-gray-900">
                                        SGPA
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="sgpa"
                                            id="sgpa"
                                            autoComplete="sgpa"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                        {errors['sgpa'] && <p className="text-red-500 text-xs">{errors['sgpa']}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="class-12-board" className="block text-sm font-medium leading-6 text-gray-900">
                                        Class 12 Board
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="class-12-board"
                                            name="class-12-board"
                                            autoComplete="class-12-board"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['class-12-board'] || ''}
                                            disabled={prefilledData['class-12-board'] !== undefined}

                                        >
                                            <option value="">Select board</option>
                                            <option value="CBSE">CBSE</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                        {errors['class-12-board'] && <p className="text-red-500 text-xs">{errors['class-12-board']}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="class-12-percentage" className="block text-sm font-medium leading-6 text-gray-900">
                                        Class 12 percentage
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="class-12-percentage"
                                            id="class-12-percentage"
                                            autoComplete="class-12-percentage"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            value={prefilledData['class-12-percentage'] ? parseFloat(prefilledData['class-12-percentage'].replace('%', '')) || '' : ''}
                                            disabled={prefilledData['class-12-percentage'] !== undefined}

                                        />
                                        {errors['class-12-percentage'] && <p className="text-red-500 text-xs">{errors['class-12-percentage']}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Career Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Tell us about your career aspirations and skills.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="career-aspirations" className="block text-sm font-medium leading-6 text-gray-900">
                                        Career Aspirations
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio h-5 w-5 text-indigo-600" name="career-aspirations" value="option1" />
                                            <span className="ml-2 mr-4 text-gray-700">Option 1</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio h-5 w-5 text-indigo-600" name="career-aspirations" value="option2" />
                                            <span className="ml-2 mr-4 text-gray-700">Option 2</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio h-5 w-5 text-indigo-600" name="career-aspirations" value="option3" />
                                            <span className="ml-2 text-gray-700">Option 3</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                                        Skills
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" name="skills" value="skill1" />
                                            <span className="ml-2 mr-4 text-gray-700">Skill 1</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" name="skills" value="skill2" />
                                            <span className="ml-2 mr-4 text-gray-700">Skill 2</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" name="skills" value="skill3" />
                                            <span className="ml-2 text-gray-700">Skill 3</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => {
                                    // logic to go back to the previous step
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                {/* Confirmation Popup */}
                {showConfirmationPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <p className="text-lg font-semibold mb-4">Save Details?</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleConfirmSave}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 mr-4"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={handleCancelSave}
                                    className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </InputLayout>

    )
}

export default InputForm
