import React from 'react';

import noimage from '../../images/no-image.jpg';

export default function Mission(){
  return (
    <div className='grid grid-cols-2 space-x-6 mb-20 w-full'>
      <div className='col-start-1 space-y-2'>
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight">
          Our Mission
        </h2>
        <p className='text-lg leading-8'>
          At <span className='text-sky-600 font-semibold'>StreamLine</span>, our mission is simple: to revolutionize the subscription industry and make content access effortless for all. We understand the frustration faced by casual entertainment users who are overwhelmed by managing multiple subscriptions and figuring out what content is available on each platform. Unfortunately, many companies take advantage of this complexity, making it challenging for users optimally access the content that truly interests them. 
        </p>
        <p className='text-lg leading-8'>
          Our commitment is to simplify this process entirely. We firmly believe that accessing your favorite content should be simple, cost-efficient, and tailored specifically for you. With our user-friendly interface and proprietary recommendation algorithms, we aim to streamline your subscription journey, allowing you to focus on enjoying the content you love the most.
        </p>
        
        <p className='text-lg leading-8'>
          Say goodbye to the time and effort spent searching for what's available on each service. With StreamLine, you can optimize your entertainment experience and indulge in the content that brings you joy. Welcome to a world of effortless content access - welcome to <span className='text-sky-600 font-semibold'>StreamLine</span>.
        </p>
      </div>

      <div className='col-start-2 flex justify-center'>
        <img src={noimage}/>
      </div>
    </div>
  );
}