import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from '../partials/Header';

function SignIn() {
  const nav = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckboxChange = (event) => {
    event.preventDefault();
    setIsChecked(event.target.checked);
  };

  const signIn = (event) => {
    event.preventDefault();
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      keepSignedIn: isChecked,
    };
    axios.post('http://127.0.0.1:8000/api/auth/login', data,  { withCredentials: true }).then(response => {
      Cookies.set('session', JSON.stringify(response.data), {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
       // Extract cookies from the response headers
       const setCookieHeader = response.headers.get('set-cookie');
      nav('/user-dash');
    }).catch(error => {
      // Add Error Modal
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      <Header />

      <main className="grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                <h1 className="h1">Welcome back! We exist to make streaming easier.</h1>
              </div>

              <div className="max-w-sm mx-auto ">
                <form onSubmit={signIn} to="/">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">
                        Email
                        <span className="text-red-600">*</span>
                      </label>
                      <input id="email" type="email" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Email Address" required />
                      
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="password">
                        Password
                        <span className="text-red-600">*</span>
                      </label>
                      <input id="password" type="password" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                          <span className="text-gray-800 dark:text-gray-400 ml-2">Keep me signed in</span>
                        </label>
                        <button type="button" onClick={() => nav('/reset-password')} className="text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-sky-600 rounded-md hover:bg-sky-700 w-full" type="submit">Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 dark:text-gray-400 text-center mt-6">
                  Don&apos;t have an account?
                  {' '}
                  <button type="button" onClick={() => nav('/signup')} className="text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out"> Sign up</button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
