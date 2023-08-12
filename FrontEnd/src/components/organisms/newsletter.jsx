// Import Libraries
import React, { useContext, useRef } from 'react';
import axios from 'axios';

// Import Contexts
import { ModalContext } from '../../contexts/ModalContext';

export default function Newsletter() {
  const inputEmail = useRef('');
  const { setOpen500Modal } = useContext(ModalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(
        'http://127.0.0.1:8000/api/recommendations/saveEmail/',
        { email: inputEmail.current.value },
        { withCredentials: true }
      )
      .catch((error) => {
        setOpen500Modal(true);
      });
    inputEmail.current.value = '';
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="relative isolate py-16 sm:py-24 lg:py-32">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Subscribe to our newsletter.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-gray-400">
            Unlock the full potential of your streaming subscriptions with our newsletter, featuring
            exclusive content on new releases, platform optimizations, and insider recommendations.
          </p>
          <div className="mt-6 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              ref={inputEmail}
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            <button type="submit" className="colored-sky-btn">
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
