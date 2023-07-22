// Import Libraries
import React, { useRef } from 'react';
import axios from 'axios';

// Import Icons
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

import CTA from './CTA';

export default function Newsletter() {
  const inputEmail = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/recommendations/saveEmail/", {email: inputEmail.current.value}, {withCredentials: true})
    inputEmail.current.value = "";
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="relative isolate py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Subscribe to our newsletter.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-gray-400">
                  Unlock the full potential of your streaming subscriptions with our newsletter, featuring exclusive content on new releases, platform optimizations, and insider recommendations.
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
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <dl>
              {/*<dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">*/}
                <CTA/>
                {/*
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-slate-500/5 dark:bg-white/5 p-2 ring-1 ring-white/10">
                    <CalendarDaysIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold">
                    Monthly articles
                  </dt>
                  <dd className="mt-2 leading-7 text-slate-600 dark:text-gray-400">
                    Discover monthly insights and updates on streaming platforms and subscriptions.
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-slate-900/5 dark:bg-white/5 p-2 ring-1 ring-white/10">
                    <HandRaisedIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold">
                    No spam
                  </dt>
                  <dd className="mt-2 leading-7 text-slate-600 dark:text-gray-400">
                    Rest assured, we value your privacy and promise a spam-free newsletter experience.
                  </dd>
                </div>
                */}
              </dl>
            </div>
          </div>
          <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-sky-600 to-sky-600 opacity-30"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </form>
    </section>
  );
}