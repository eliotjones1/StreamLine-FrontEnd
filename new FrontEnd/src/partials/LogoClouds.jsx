import React from "react";
import { useNavigate } from 'react-router-dom';

import Netflix from '../images/Netflix_Logo.png'
import DisneyPlus from '../images/Disney_Plus_Logo.png'
import AmazonPrimeVideo from '../images/Amazon_Prime_Video_Logo.png'
import HBOMax from "../images/HBO_Max_Logo.png"
import Hulu from "../images/Hulu_Logo.png"

function LogoClouds() {
  const nav = useNavigate();

  return (
      <div className="grid gap-y-3 mx-auto py-40 max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8">
          Unlock the Best of Popular Platforms
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-18 w-full object-contain lg:col-span-1"
            src={Hulu}
            alt="Hulu"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-18 w-full object-contain lg:col-span-1"
            src={DisneyPlus}
            alt="Disney+"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-18 w-full object-contain lg:col-span-1"
            src={Netflix}
            alt="Netflix"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-18 w-full object-contain sm:col-start-2 lg:col-span-1"
            src={AmazonPrimeVideo}
            alt="Amazon Prime Video"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-18 w-full object-contain sm:col-start-auto lg:col-span-1"
            src={HBOMax}
            alt="HBO Max"
            width={158}
            height={48}
          />
        </div>
        
        <div className="flex flex-col items-center w-full pt-10">
        <div className="relative isolate flex items-center rounded-full gap-x-6 overflow-hidden bg-slate-900/5 dark:bg-white/5 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6">
            <strong className="font-semibold">Streaming Optimization Perfected: </strong>
              Harness the Power of <strong className="font-semibold">150+</strong> Platforms and More!
            </p>
            <button
              className="font-semibold text-sky-600 hover:text-sky-700 dark:hover:text-sky-500"
              onClick={() => nav('/456789')}
            >
              See the full list <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
        </div>
        

      </div>
  )
}

export default LogoClouds;