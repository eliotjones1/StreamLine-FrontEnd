import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../images/StreamLine_Transparent_Logo.png'
import PageTopIllustration from '../partials/PageTopIllustration';

export default function HeroHome() {
  const nav = useNavigate();

  return (
    <section>
      <div className="relative isolate grid grid-cols-2 gap-x-6 px-6 pt-14 lg:px-8">
        <PageTopIllustration/>

        <div className="mx-auto pt-16 pb:24 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48 col-span-1 col-start-1">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 bg-slate-900/5 dark:bg-white/5 p-2 ring-1 ring-white/10 hover:ring-gray-900/20">
              Announcing our deployment.{' '}
              <button onClick={() => nav('/news')} className="font-semibold text-sky-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-6xl">
            <span className="text-sky-600 dark:text-sky-500">StreamLine</span>  Your Subscriptions
            </h1>
            <p className="mt-6 text-lg leading-8">
              Optimize subscription services based on your unique interests and preferences. StreamLine uses cutting-edge technology to analyze your tastes and tailor a personalized selection of subscriptions just for you at a price you can afford.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => nav('/signup')}
                className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Get started
              </button>
              <button onClick={() => nav('/aboutus')} className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none col-span-1 col-start-2 overflow-hidden"
        >
          <div className="transform">
            <div className="grid grid-cols-3 gap-x-6 lg:gap-x-8">

              <div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                <div className="flex h-full w-full justify-center items-center">
                  <div className="self-end h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY2500_.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex h-full w-full justify-center items-center">
                  <div className="self-start h-64 w-44 overflow-hidden rounded-lg">
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1080_.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              <div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                <div className="flex h-full w-full justify-center items-center">
                  <div className="h-64 w-44 overflow-hidden rounded-lg">
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BMTdmZjBjZjQtY2JiNS00Y2ZlLTg2NzgtMjUzMGY2OTVmOWJiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX675_.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="h-64 w-44 overflow-hidden rounded-lg">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="h-64 w-44 overflow-hidden rounded-lg">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BNTg3NjcxYzgtYjljNC00Y2I2LWE3YmMtOTliZTkwYTE1MmZiXkEyXkFqcGdeQXVyNTY4NDc5MDE@._V1_FMjpg_UX1080_.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                <div className="flex h-full w-full justify-center items-center">
                  <div className="self-end h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BODA2Mjk0N2MtNGY0Mi00ZWFjLTkxODEtZDFjNDg4ZDliMGVmXkEyXkFqcGdeQXVyMzAzNTY3MDM@._V1_FMjpg_UY4000_.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex h-full w-full justify-center items-center">
                  <div className="self-start h-64 w-44 overflow-hidden rounded-lg">
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UY2048_.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
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
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
