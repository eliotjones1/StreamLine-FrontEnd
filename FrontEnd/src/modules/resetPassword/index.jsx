import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '/src/modules/common/components';

export default function ResetPassword() {
  const nav = useNavigate();
  const email = useRef('');

  const reset_pwd = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://127.0.0.1:8000/api/password_reset/',
        { email: email.current.value },
        { withCredentials: true }
      )
      .then(() => {
        nav('/signin');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Forgot your password?</h1>
                <p className="text-xl text-slate-600 dark:text-gray-400">
                  We&apos;ll email you instructions on how to reset it.
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <form onSubmit={reset_pwd}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        ref={email}
                        placeholder="Email Address"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        type="submit"
                        className="colored-sky-btn w-full"
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  <button
                    className="text-link"
                    onClick={() => nav('/signin')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}