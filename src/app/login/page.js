"use client"
import { useState, useEffect } from 'react';
import AuthLayout from '../../components/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [goToVerification, setGoToVerification] = useState(false);
  const [userId, setUserId] = useState();
  const [selectedButton, setSelectedButton] = useState(null); // State to track the selected button

  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (goToVerification) {
      router.push(`/studentprofile/${userId}`);
    }
  }, [goToVerification, router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username cannot be blank');
      return;
    }

    if (!password) {
      setPasswordError('Password cannot be blank');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentauth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        setUserId(response.data.user_id);
        setIsLoggedIn(true);
        handleGoToVerification();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUsernameError('Invalid username or password');
        setPasswordError('Invalid username or password');
      } else {
        setUsernameError('An error occurred');
        setPasswordError('An error occurred');
      }
    }
  };

  const handleGoToVerification = () => {
    setGoToVerification(true);
  };

  return (
    <AuthLayout>
      <div className="flex min-h-full flex-col lg:flex-row justify-center py-12 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="lg:w-7/12 bg-gray-100 p-8 order-1 lg:order-1">
          <img
            className="mx-48 mb-12 h-96 w-auto"
            src="/media/images/agency.png"
            alt="Your Company"
          />
          <h2 className="mt-4 mb-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-700">
            Comprehensive, Personalized and Effective
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Chayan.AI is an AI-driven interview preparation platform using personalized skill assessments,
            mock AI interviews, and resume building tools.</p>
        </div>
        {/* Right Section */}
        <div className="lg:w-5/12 h-auto bg-white p-12 shadow sm:rounded-lg sm:px-12 order-2 lg:order-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-16 w-auto"
              src="/media/images/chayan_logo.png"
              alt="Your Company"
            />
            <h2 className="mt-4  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="space-y-6 pl-24 pr-24" onSubmit={handleLogin}>
            <div className="mt-12 flex justify-center space-x-6">
              <button
                type="button"
                className={`inline-flex items-center justify-center w-26 px-6 py-2 border rounded-md font-medium text-sm ${selectedButton === 'student' ? 'bg-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setSelectedButton('student')}
              >
                Student
              </button>
              <button
                type="button"
                className={`inline-flex items-center justify-center w-26 px-4 py-2 border rounded-md font-medium text-sm ${selectedButton === 'recruiter' ? 'bg-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setSelectedButton('recruiter')}
              >
                Recruiter
              </button>
              <button
                type="button"
                className={`inline-flex items-center justify-center w-24 px-4 py-2 border rounded-md font-medium text-sm ${selectedButton === 'admin' ? 'bg-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setSelectedButton('admin')}
              >
                Admin
              </button>
            </div>
            {/* <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />

              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or with username</span>
              </div>
            </div> */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${usernameError ? 'ring-red-500' : ''
                    }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && (
                  <p className="mt-2 text-sm text-red-600">{usernameError}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${passwordError ? 'ring-red-500' : ''
                    }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-3 mr-2 block text-sm leading-6 text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-500">
              Not a member yet?{' '}
              <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
            <div className="mt-4">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </Link>
              {' | '}
              <Link href="/plans" className="text-sm text-gray-500 hover:text-gray-700">
                Plans
              </Link>
              {' | '}
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
