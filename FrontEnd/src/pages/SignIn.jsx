import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

function SignIn() {
  const nav = useNavigate();
  function sign_in(event){
    event.preventDefault();
    let data = {
      "email": document.getElementById('email').value,
      "password": document.getElementById('password').value
    };
    axios.post('http://127.0.0.1:8000/api/auth/login', data).then((response) => {
      const sessionJSON = JSON.stringify(response.data);
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000));
      document.cookie = `session=${sessionJSON}; expires=${expirationDate.toUTCString()}; path=/`;
      nav('/user-dash');
    }).catch((error) => {
      console.log(error);
      alert("Invalid Username or Password!");
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                <h1 className="h1">Welcome back! We exist to make streaming easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto ">
                <form onSubmit={sign_in} to="/">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Email Address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-800 dark:text-gray-400 ml-2">Keep me signed in</span>
                        </label>
                        <Link to="/reset-password" className="text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-sky-600 hover:bg-sky-700 w-full" type="submit">Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 dark:text-gray-400 text-center mt-6">
                  Don’t have an account? <button onClick={() => nav('/signup')} className="text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Sign up</button>
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