import React from 'react';
import { ArrowTrendingUpIcon, WindowIcon, CurrencyDollarIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import FeatImage01 from '../images/Search_Light_Mode.png';
import FeatImage02 from '../images/Dash_Light_Mode.png';

function FeaturesZigzag() {
  return (
    <section>
      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-600 to-sky-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(75% 45%, 100% 65%, 90% 25%, 85% 0%, 80% 5%, 70% 30%, 55% 60%, 50% 70%, 45% 55%, 40% 35%, 25% 75%, 0% 65%, 20% 100%, 30% 75%, 75% 95%, 75% 45%, 100% 100%, 0% 100%)',
            }}
          />
        </div>


        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-12">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:w-full">
                <p className="text-base font-semibold leading-7 text-sky-600 dark:text-sky-400">More content. Less searching.</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">Personalized Streaming</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-300">
                  Experience personalized streaming like never before! Our platform delivers custom recommendations to match your unique tastes. Immerse yourself in captivating content curated just for you. Unlock a universe of entertainment made personal.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src={FeatImage01}
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 lg:max-w-lg">
                <ul role="list" className="space-y-6 text-slate-600 dark:text-gray-400">
                  <li className="flex gap-x-3">
                    <MagnifyingGlassIcon className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-slate-900 dark:text-white">Discover Content.</strong> StreamLine your search and discover shows and movies across streaming services. Elevate your viewing experience effortlessly.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CurrencyDollarIcon className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-slate-900 dark:text-white">Free Bundle Suggestions.</strong> Simply provide us with your desired viewing content to curate a personalized bundle of the best streaming services. Stream smarter, save more, no work required.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-5 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:col-start-2 lg:pl-4 ">
              <div className="lg:w-full">
                <p className="text-base font-semibold leading-7 text-sky-600 dark:text-sky-400">More content. Less hastle.</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">Subscription Optimization</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-300">
                  Discover the power of subscription optimization and start saving today. Our intuitive platform simplifies subscription management, providing valuable insights and tailored recommendations. Take charge of your finances effortlessly and maximize your savings.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 lg:row-start-5 lg:overflow-hidden">
            <img
              className="float-right w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] lg:col-start-2"
              src={FeatImage02}
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-6 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pl-4 lg:col-start-2">
              <div className="max-w-xl text-base leading-7 lg:max-w-lg">
                <ul role="list" className="space-y-6 text-slate-600 dark:text-gray-400">
                  <li className="flex gap-x-3">
                    <WindowIcon className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-slate-900 dark:text-white">Subscription Dashboard.</strong> Take control of your subscriptions in one place. Never miss a chance to save with easy management of renewals, upgrades, and cancellations.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ArrowTrendingUpIcon className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-slate-900 dark:text-white">Smart Recommendations.</strong> Unlock significant savings with personalized recommendations based on your usage patterns. Say goodbye to unused services and hello to optimized subscriptions.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-sky-600 to-sky-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(80% 40%, 100% 60%, 100% 30%, 85% 0%, 80% 5%, 72% 30%, 58% 60%, 50% 65%, 42% 60%, 28% 30%, 20% 60%, 0% 45%, 15% 100%, 20% 75%, 80% 95%, 80% 40%, 100% 100%, 0% 100%)',
            }}
          />
        </div>

      </div>
    </section>
  );
}

export default FeaturesZigzag;