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

  const router = useRouter();

  useEffect(() => {
    if (goToVerification) {
      router.push('/verify');
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
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setPopupVisible(true);
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
    setPopupVisible(false);
    setGoToVerification(true);
  };

  return (
    <AuthLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleLogin}>
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
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
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
            {popupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">Login successful</p>
                  <p className="mt-2">Go to the verification page.</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleGoToVerification}
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go to Verification
                    </button>
                    <button
                      onClick={() => setPopupVisible(false)}
                      className="ml-3 rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M19.6 10.23c0-.67-.06-1.31-.16-1.93H10v3.64h5.52c-.24 1.31-.94 2.41-1.92 3.14v2.6h3.1c1.81-1.67 2.86-4.14 2.86-7.15z"
                        fill="#4285F4"
                      />
                      <path
                        d="M13.32 14.04c-.79.53-1.8.85-2.82.85-2.17 0-4-1.46-4.66-3.43H2.66v2.6A7.982 7.982 0 0010 18c2.17 0 4.03-.72 5.32-1.96l-2-1.66z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.68 10.36a4.77 4.77 0 010-3.14V4.61H2.66c-.75 1.45-1.17 3.1-1.17 4.86 0 1.76.42 3.41 1.17 4.86L6.68 10.36z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10 4.07c1.18 0 2.26.41 3.1 1.23l2.34-2.34C13.79 1.9 11.98 1.2 10 1.2c-2.92 0-5.41 1.68-6.64 4.13L6.68 7.23a4.757 4.757 0 013.32-3.16z"
                        fill="#EA4335"
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 .3C4.48.3 0 4.78 0 10.3c0 4.42 2.87 8.17 6.84 9.49.5.1.68-.21.68-.47 0-.23-.01-.82-.01-1.61-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.11-1.49-1.11-1.49-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.91 1.53 2.39 1.09 2.97.83.09-.66.36-1.1.65-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0110 4.57c.85.004 1.71.11 2.5.32 1.9-1.3 2.75-1.02 2.75-1.02.55 1.41.2 2.45.1 2.71.64.7 1.02 1.6 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.69.91.69 1.83 0 1.32-.01 2.39-.01 2.72 0 .26.18.58.69.47A10.025 10.025 0 0020 10.3C20 4.78 15.52.3 10 .3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
