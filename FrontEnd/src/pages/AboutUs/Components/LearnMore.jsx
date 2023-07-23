// Import Libraries
import React from 'react';

import streamLineLogo from "../../../images/StreamLine_Transparent_Logo.png";

export default function About() {
  return (
    <section className='grid grid-cols-2'>
      <div className='col-start-1'>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join the StreamLine Revolution
          </h2>
          <p className="mt-6 text-lg leading-8">
            In the era of cord-cutting and the streaming obsession, the entertainment landscape has transformed significantly. With the rise of numerous streaming providers, the industry has become a battleground for exclusive content rights, leading to a fragmentation of shows and movies across various platforms. As a result, users often find it increasingly challenging to navigate and access their favorite content.
          </p>
          <p className='mt-6 text-lg leading-8'>
            At StreamLine, our passion for countless television and movie franchises inspired us to create a solution to this problem. We envisioned a platform that would allow users to easily find and access their favorite content, regardless of which streaming service it was on.
          </p>
          <p className="mt-6 text-lg leading-8">
            Our website offers the convenience of creating personalized watchlists, enabling you to keep track of all your favorite entertainment in one place. Leveraging our proprietary algorithm, we suggest streaming services that best match your preferences, ensuring you get the most out of your money.
          </p>
          <p className="mt-6 text-lg leading-8">
            Say goodbye to the hassle of managing multiple subscriptions with our subscription management service. As your watchlist evolves month-to-month, our service automatically adjusts your streaming subscriptions, allowing you to focus on enjoying your favorite content at a lower price.
          </p>
          <p className="mt-6 text-lg leading-8">
            Join us at StreamLine and experience a seamless streaming experience tailored to your entertainment preferences.
          </p>
      </div>

      <div className='col-start-2 flex justify-center ml-12'>
          
      </div>
    </section>
    
  );
}