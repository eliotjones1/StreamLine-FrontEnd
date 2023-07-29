// Import Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const nav = useNavigate();

  return (
    <section>
      <div className='space-y-4'>
        <h2 className="text-4xl font-bold tracking-tight">
          Join the Revolution
        </h2>
        <p className="mt-6 text-lg leading-8">
          The StreamLine team invites you to be part of our revolutionary movement that transforms the way users experience entertainment. Say goodbye to the complexities of managing multiple subscriptions and the frustration of content fragmentation. Embrace a return to the simplicity and convenience of a virtual cable box, tailored just for you. Our mission is clear: to provide effortless content access, empowering you to focus on what you love most - enjoying your favorite shows, movies, and sports.
        </p>
        <p className='text-lg leading-8'>
        Join us on this transformative journey as we lead the charge against the subscription chaos. StreamLine's user-centric platform brings together diverse content seamlessly, eliminating the hassle of switching between services. Discover a personalized entertainment experience like no other, with our intuitive interface and proprietary recommendation algorithms guiding you to your perfect content match. Whether you're a film fanatic, a sports enthusiast, or both, StreamLine has you covered. Embrace the revolution, and welcome to StreamLine, where simplicity and entertainment converge in harmony.
        </p>
      </div>

      <div className="mx-auto dark:text-slate-900 max-w-7xl my-16">
        <div className="relative isolate overflow-hidden bg-slate-900 dark:bg-white px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#0369a1" />
                <stop offset={1} stopColor="#0ea5e9" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto w-full py-6 text-white dark:text-slate-900 py-20">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Start using <span className="text-sky-600">StreamLine</span> today!
            </h2>
            <p className="mt-6 text-lg text-center leading-8">
              Use cutting-edge technology to deliver a personalized selection at an affordable price.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => nav('/signup')}
                className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </button>
              <button 
                onClick={() => nav('/aboutus')} 
                className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}