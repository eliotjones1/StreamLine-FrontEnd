// Import Libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Icons
import { CheckIcon } from '@heroicons/react/20/solid'

// Import Components
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageTopIllustration from '../../partials/PageTopIllustration';

const BasicFeatures = [
  'Monthly Subscription Change Alerts',
  'Personalized Optimization Bundles',
  'Warning on Upcoming Payments',
  'Monthly Newsletter',
]

const PremiumFeatures = [
  'Automated Subscription Enrollment',
  'Automated Subscription Cancellation',
  'All Basic Membership Features',
]

export default function Pricing() {
  const nav = useNavigate();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow">
        <PageTopIllustration/>
        <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Discover Our Pricing Options</h2>
          </div>

            <div className="bg-white dark:bg-slate-900 mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-slate-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight">Premium Membership</h3>
                <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
                  Our Premium Membership automates essential features and benefits designed to enhance your streaming experience. Enjoy access to a range of core services and valuable resources effortlessly. 
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-sky-600">What’s included</h4>
                  <div className="h-px flex-auto bg-slate-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-white sm:grid-cols-2 sm:gap-6"
                >
                  {PremiumFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-sky-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md">
                <div className="rounded-2xl h-full bg-slate-50 dark:bg-slate-700 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8 ">
                  <p className="text-base font-semibold">Premium</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight">$2.99</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">/ Month</span>
                  </p>
                  <button
                    onClick={() => nav('/payment')}
                    className="mt-10 block w-full rounded-md bg-sky-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Get access
                  </button>
                </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-slate-200 sm:mt-4 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight">Basic Membership</h3>
                <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
                  Our Basic Membership offers essential features and benefits designed to enhance your streaming experience. Enjoy access to a range of core services and valuable resources. 
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-sky-600">What’s included</h4>
                  <div className="h-px flex-auto bg-slate-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-white sm:grid-cols-2 sm:gap-6"
                >
                  {BasicFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-sky-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl h-full bg-slate-50 dark:bg-slate-700 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold">Basic</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight">$0.99</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">/ Month</span>
                    </p>
                    <button
                      onClick={() => nav('/payment')}
                      className="mt-10 block w-full rounded-md bg-sky-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                    >
                      Get access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}