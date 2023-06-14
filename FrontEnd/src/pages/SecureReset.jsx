import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { PageIllustration } from '../partials';

function ResetPassword() {
  const nav = useNavigate();

  const reset_pwd = (event) => {
    event.preventDefault();
    let pswd = document.getElementById('new-password').value;
    let confirm_pswd = document.getElementById('confirm-password').value;
    
    if (pswd !== confirm_pswd) {
      // Add Error Modal
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';
    } else {
      let data = {
        "token": window.location.search.substring(1),
        "password": document.getElementById('new-password').value
      }
      axios.post('http://127.0.0.1:8000/api/password_reset/confirm/', data).then(() => {
        nav('/signin');
      }).catch(error => {
        // Add Error Modal
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4"><span className="text-sky-500">StreamLine</span> Password Reset</h1>
              </div>
              
              <div className="max-w-sm mx-auto">
                <form onSubmit={reset_pwd}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">New Password</label>
                      <input id="new-password" type="password" className="form-input w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-gray-300" placeholder="Password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">Confirm New Password</label>
                      <input id="confirm-password" type="password" className="form-input w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-gray-300" placeholder="Confirm Password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button type="submit" className="btn text-white bg-sky-600 hover:bg-sky-700 w-full">Reset Password</button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default ResetPassword;