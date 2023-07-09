import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import Header from '../partials/Header';

function SignUp() {
  const nav = useNavigate();

  const sign_up = (event) => {
    event.preventDefault();
    let pswd = document.getElementById('password').value;
    let confirm_pswd = document.getElementById('confirm-password').value;

    if (pswd !== confirm_pswd) {
      // Add Error Modal
      document.getElementById('password').value = '';
      document.getElementById('confirm-password').value = '';
    } else {
      let data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
      };
      axios.post('http://127.0.0.1:8000/api/auth/register', data).then(response => {
        console.log('success');
        const new_data = {
          email: data.email,
          password: data.password,
        }
        
        axios.post('http://127.0.0.1:8000/api/auth/login', new_data,  { withCredentials: true }).then(response => {
        Cookies.set('session', JSON.stringify(response.data), {
          path: '/',
          secure: true,
          sameSite: 'strict',
        });      
        nav('/new-sub');
      }).catch(error => {
        // Add Error Modal
      });
      }).catch(error => {
        // Add Error Modal
      });
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                <h1 className="h1">Welcome! We exist to make streaming easier.</h1>
              </div>

              <div className="max-w-sm mx-auto">
                <form onSubmit={sign_up}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="flex flex-row w-full px-3">
                      <div className="flex flex-col">
                        <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">First Name<span className="text-red-600">*</span></label>
                        <input id="first-name" type="text" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="First Name" required />
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                        <input id="last-name" type="text" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Last Name" required />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Email Address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Password" minLength="8" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="confirmpswd">Confirm Password <span className="text-red-600">*</span></label>
                      <input id="confirm-password" type="password" className="form-input w-full text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-slate-900" placeholder="Password" minLength="8" required />
                    </div>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-gray-500 text-center">
                    I agree to be contacted by StreamLine about this offer as per the StreamLine <Link to="#" className="underline text-slate-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-slate-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button type="submit" className="btn text-white bg-sky-600 hover:bg-sky-700 w-full">Sign up</button>
                    </div>
                  </div>
                </form>
                <div className="text-slate-600 dark:text-gray-400 text-center mt-6">
                  Already using StreamLine? <button onClick={() => nav('/signin')} className="text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Sign In</button>
                </div>
              </div>

            </div>
          </div>
      </main>
    </div>
  );
}

export default SignUp;