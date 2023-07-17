// Import Libraries
import React from 'react';

export default function About() {
  return (
    <section className='py-16'>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 lg:px-8">
        <div className='row-start-1'>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Why StreamLine?
          </h2>
          <p className="max-w-4xl mt-6 text-lg leading-8">
            In the age of television and the rise of cord cutting, the entertainment landscape has undergone a remarkable transformation. With the emergence of numerous streaming providers, the industry has become a battleground for exclusive content rights. This shift has led to a fragmentation of shows and movies across various platforms, making it increasingly challenging for users to navigate and access their favorite content.
          </p>
          <p className="max-w-4xl mt-6 text-lg leading-8">
            We at StreamLine became frustrated having to deal with the complexities of navigating this environment, especially since we are fans of so many different television and movie franchises. We wanted to create a platform that would allow users to easily find and access their favorite content, regardless of which streaming service it was on.
          </p>
          <p className="max-w-4xl mt-6 text-lg leading-8">
            Our website allows you to create watchlists so you can keep track of all of your favorite entertainment, and our proprietary algorithm will help suggest streaming services to get the most out of your money. We offer a subscription management service, which will automatically adjust your streaming subscriptions as your watchlist changes month-to-month, so you can focus on enjoying your favorite content at a lower price. 
          </p>
        </div>
      </div>
    </section>
  );
}