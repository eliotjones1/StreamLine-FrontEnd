import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/modules/common/hooks';
import { Header } from '/src/modules/common/components';

export default function SignUp() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const firstName = useRef('');
  const lastName = useRef('');
  const email = useRef('');
  const password = useRef('');
  const confirmPassword = useRef(false);

  const confirmPasswordMatch = (event) => {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      alert('Passwords do not match!');
    } else {
      signUp({
        email: email.current.value,
        password: password.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
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
              <form onSubmit={confirmPasswordMatch}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="flex flex-row w-full px-3 space-x-2">
                    <div className="flex flex-col">
                      <label
                        className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                        htmlFor="first-name"
                      >
                        First Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        ref={firstName}
                        placeholder="First Name"
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                        htmlFor="last-name"
                      >
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        ref={lastName}
                        placeholder="Last Name"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-red-600">*</span>
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
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      ref={password}
                      placeholder="Password"
                      minLength={8}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                      htmlFor="confirmpswd"
                    >
                      Confirm Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      ref={confirmPassword}
                      placeholder="Password"
                      minLength="8"
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="text-sm text-slate-700 dark:text-gray-500 text-center">
                  I agree to be contacted by StreamLine about this offer as per the StreamLine{' '}
                  <a
                    to="#"
                    className="underline cursor-pointer text-slate-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-slate-200 hover:no-underline transition duration-150 ease-in-out"
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button type="submit" className="colored-sky-btn w-full">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-slate-600 dark:text-gray-400 text-center mt-6">
                Already using StreamLine?{' '}
                <button onClick={() => nav('/signin')} className="text-link">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
