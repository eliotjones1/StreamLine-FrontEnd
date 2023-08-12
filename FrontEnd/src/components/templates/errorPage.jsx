import React from 'react';

// Import Molecules
import ButtonAndArrowBtn from '../molecules/buttonAndArrowBtn';

export default function NotFound({ errNum, errName, errMessage }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-sky-600">{errNum}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{errName}</h1>
          <p className="mt-6 mb-10 text-base leading-7 text-gray-600 dark:text-gray-400">
            {errMessage}
          </p>
          <ButtonAndArrowBtn arrowBtnText={'Contact Support'} newNavURL={'/support'} />
        </div>
      </main>
    </div>
  );
}
