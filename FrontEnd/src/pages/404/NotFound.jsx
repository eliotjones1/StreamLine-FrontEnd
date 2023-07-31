// Import Libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-sky-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => nav("/")}
              className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Go back home
            </button>
            <button onClick={() => nav("/support")} className="text-sm font-semibold">
              Contact Support <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}