
"use client"
import { useState, useEffect, useRef } from 'react';
import RootLayout from '../layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


const VerifyPage = () => {
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showPhonePopup, setShowPhonePopup] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [goToInput, setGoToInput] = useState(false);
    const [emailCooldown, setEmailCooldown] = useState(0);
    const [phoneCooldown, setPhoneCooldown] = useState(0);
    const firstEmailInputRef = useRef(null);
    const firstPhoneInputRef = useRef(null);

    useEffect(() => {
        if (showPhonePopup && firstPhoneInputRef.current) {
            firstPhoneInputRef.current.focus();
        }
    }, [showPhonePopup]);

    useEffect(() => {
        if (showEmailPopup && firstEmailInputRef.current) {
            firstEmailInputRef.current.focus();
        }
    }, [showEmailPopup]);


    useEffect(() => {
        if (emailCooldown > 0) {
            const timer = setTimeout(() => setEmailCooldown(emailCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [emailCooldown]);

    useEffect(() => {
        if (phoneCooldown > 0) {
            const timer = setTimeout(() => setPhoneCooldown(phoneCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [phoneCooldown]);


    const router = useRouter();

    useEffect(() => {
        if (goToInput) {
            setTimeout(() => {
                router.push('/inputform');
            }, 10);
        }
    }, [goToInput, router]);

    const handleSendEmailOTP = async () => {
        console.log("handleSendEmailOTP")
        if (!email) {
            setEmailError('Please fill in your email to send OTP.');
            return;
        }

        setEmailError('');

        try {
            const response = await axios.post('http://localhost:5000/send-email-otp', { email });
            setShowEmailPopup(true);
            setEmailCooldown(120);
        } catch (error) {
            console.error('Error sending email OTP:', error);
        }
    };


    const handleSendPhoneOTP = async () => {
        console.log("handleSendPhoneOTP")
        if (!phone) {
            setPhoneError('Please fill in your phone number to send OTP.');
            return;
        }

        setPhoneError('');

        try {
            const response = await axios.post('http://localhost:5000/send-phone-otp', { phone });
            setShowPhonePopup(true);
            setPhoneCooldown(120);
        } catch (error) {
            console.error('Error sending phone OTP:', error);
        }
    };

    const handleVerifyEmail = async () => {

        const enteredOTP = Array.from(document.querySelectorAll('.email-otp-input')).map(input => input.value).join('');

        try {
            const response = await axios.post('http://localhost:5000/verify-email-otp', { otp: enteredOTP });
            setEmailVerified(true);
            setShowEmailPopup(false);
        } catch (error) {
            console.error('Error verifying email OTP:', error);
            setEmailError('Incorrect OTP. Please try again.');
        }
    };


    const handleVerifyPhone = async () => {

        const enteredOTP = Array.from(document.querySelectorAll('.phone-otp-input')).map(input => input.value).join('');

        try {
            const response = await axios.post('http://localhost:5000/verify-phone-otp', { otp: enteredOTP });

            setPhoneVerified(true);
            setShowPhonePopup(false);
        } catch (error) {
            console.error('Error verifying phone OTP:', error);
            setPhoneError('Incorrect OTP. Please try again.');
        }
    };

    const handleOTPInputChange = (e, index, type) => {
        const { value } = e.target;
        const nextSibling = document.querySelectorAll(`.${type}-otp-input`)[index + 1];

        if (value.length === 1 && nextSibling) {
            nextSibling.focus();
        }
    };

    const handleOTPKeyDown = (e, index, type) => {
        if (e.key === "Backspace") {
            const previousSibling = document.querySelectorAll(`.${type}-otp-input`)[index - 1];
            if (previousSibling) {
                previousSibling.focus();
            }
        }
    };



    const handleProceed = () => {
        if (emailVerified && phoneVerified) {
            setGoToInput(true);
        } else {
            if (!emailVerified) {
                setEmailError('Please verify your email.');
            }
            if (!phoneVerified) {
                setPhoneError('Please verify your phone number.');
            }
        }
    };


    return (
        <RootLayout>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Verify your details
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <div className="flex items-end justify-between">
                                    <div className="flex-1">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleSendEmailOTP}
                                        className="ml-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Send OTP
                                    </button>
                                </div>
                                {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                            </div>

                            <div>
                                <div className="flex items-end justify-between">
                                    <div className="flex-1">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="phone"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleSendPhoneOTP}
                                        className="ml-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Send OTP
                                    </button>
                                </div>
                                {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                            </div>

                            <div>
                                {goToInput && <Link href="/inputform">Proceed</Link>}
                                {!goToInput && (
                                    <button
                                        disabled={!emailVerified || !phoneVerified}
                                        onClick={handleProceed}
                                        className={`flex w-full justify-center rounded-md ${(!emailVerified || !phoneVerified) ? 'bg-blue-200' : 'bg-indigo-600'
                                            } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        Proceed
                                    </button>
                                )}
                            </div>


                        </form>
                    </div>

                </div>
            </div>

            {/* Email verification popup */}
            {showEmailPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <button
                            onClick={() => setShowEmailPopup(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">Email Verification</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            We have sent a code to your email <span className="font-bold">{email.replace(/(.{2}).+(@.+)/, "$1**$2")}</span>
                        </p>
                        <div className="flex space-x-2 justify-center mb-4">
                            {Array(4).fill('').map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="email-otp-input w-10 h-10 border border-gray-300 text-center rounded-md focus:ring-indigo-600 focus:border-indigo-600"
                                    onChange={(e) => handleOTPInputChange(e, index, 'email')}
                                    onKeyDown={(e) => handleOTPKeyDown(e, index, 'email')}
                                    ref={index === 0 ? firstEmailInputRef : null}
                                />
                            ))}
                        </div>
                        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                        <button
                            onClick={handleVerifyEmail}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-indigo-500"
                        >
                            Verify Account
                        </button>
                        <div className="text-center mt-4">
                            <a
                                href="#"
                                onClick={emailCooldown === 0 ? handleSendEmailOTP : null}
                                className={`text-indigo-600 hover:text-indigo-500 ${emailCooldown > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                {emailCooldown > 0 ? `Resend in ${emailCooldown}s` : "Didn't receive code? Resend again"}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Phone verification popup */}
            {showPhonePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <button
                            onClick={() => setShowPhonePopup(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">Phone Number Verification</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            We have sent a code to your phone number <span className="font-bold">{phone.replace(/(.{2}).+(.{2})/, "$1**$2")}</span>
                        </p>
                        <div className="flex space-x-2 justify-center mb-4">
                            {Array(4).fill('').map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="phone-otp-input w-10 h-10 border border-gray-300 text-center rounded-md focus:ring-indigo-600 focus:border-indigo-600"
                                    onChange={(e) => handleOTPInputChange(e, index, 'phone')}
                                    onKeyDown={(e) => handleOTPKeyDown(e, index, 'phone')}
                                    ref={index === 0 ? firstPhoneInputRef : null}
                                />
                            ))}
                        </div>
                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        <button
                            onClick={handleVerifyPhone}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-indigo-500"
                        >
                            Verify Account
                        </button>
                        <div className="text-center mt-4">
                            <a
                                href="#"
                                onClick={phoneCooldown === 0 ? handleSendPhoneOTP : null}
                                className={`text-indigo-600 hover:text-indigo-500 ${phoneCooldown > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                {phoneCooldown > 0 ? `Resend in ${phoneCooldown}s` : "Didn't receive code? Resend again"}
                            </a>
                        </div>
                    </div>
                </div>
            )}

        </RootLayout>
    );
};


export default VerifyPage;

