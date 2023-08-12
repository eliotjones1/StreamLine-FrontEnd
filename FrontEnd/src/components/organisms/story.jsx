import React from 'react';

import ryanHeadshot from '../../images/Ryan_Headshot.jpg';
import noimage from '../../images/no-image.jpg';

export default function Story() {
  return (
    <section className="space-y-4 my-20">
      <div className="font-bold mb-1">
        <p className="text-4xl ">Our Story</p>
        <p className="text-2xl">From Inspiration to Innovation</p>
      </div>
      <p className="text-lg leading-8">
        At <span className="text-sky-600 font-semibold">StreamLine</span>, our journey began during
        a senior project class at Stanford University. As passionate entertainment enthusiasts, our
        founding team shared a deep love for classic cinema franchises such as Star Wars and a
        profound appreciation for the excitement of live sports. However, we couldn't overlook the
        challenges posed by the transition from cable boxes, which offered all-in-one entertainment
        solutions, to the fragmentation of content in the subscription landscape.
      </p>
      <p className="text-lg leading-8">
        Fueled by our collective frustration with managing multiple subscriptions and the complexity
        of accessing desired content effortlessly, a vision started to take shape. We set out to
        revolutionize the subscription industry by creating a groundbreaking platform that would
        optimize and automate this process.
      </p>
      {images()}
      <p className="text-lg leading-8">
        With a strong focus on putting users at the core of our platform design, we aimed to develop
        a seamless and user-friendly interface. Our dedicated team worked tirelessly to design
        proprietary recommendation algorithms, ensuring that users could effortlessly navigate their
        subscription journey and access content that aligned perfectly with their interests.
      </p>
      <p className="text-lg leading-8">
        As <span className="text-sky-600 font-semibold">StreamLine</span> took shape, we saw an
        opportunity to empower entertainment enthusiasts worldwide by eliminating unnecessary
        complexities. Our platform became a place where users could easily discover and enjoy
        premium content, allowing them to focus solely on their entertainment journey.
      </p>
      {quote()}
      <p className="text-lg leading-8">
        Today, <span className="text-sky-600 font-semibold">StreamLine</span> stands as a
        trailblazer in the world of entertainment access, reshaping how content is consumed and
        enjoyed. Our journey is far from over, and our vision is as strong as ever. We aspire to be
        the go-to platform for millions of users, delivering an optimized and personalized
        entertainment experience that exceeds expectations.
      </p>
    </section>
  );
}

function quote() {
  return (
    <section className="relative isolate overflow-hidden bg-white p-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-900 opacity-20 dark:opacity-100" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-slate-900 shadow-xl shadow-sky-600/10 ring-1 ring-sky-50 dark:ring-sky-950 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure className="mt-10">
          <blockquote className="text-center text-sky-600 text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Our journey with StreamLine has been about simplifying the complicated and bringing
              joy back to content discovery. We're thrilled to share this innovative platform with
              the world.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img className="mx-auto h-10 w-10 rounded-full" src={ryanHeadshot} />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold">Ryan Dunn</div>
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="fill-gray-900 dark:fill-white"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-gray-600 dark:text-white">Co-Founder & ___ of StreamLine</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function images() {
  const imgs = [noimage, noimage, noimage, noimage, noimage, noimage, noimage, noimage];
  return (
    <div className="py-10">
      <div className="flex w-full h-64 justify-center">
        {imgs.map((imgSrc, index) => (
          <img src={imgSrc} key={index} />
        ))}
      </div>
    </div>
  );
}
