import React from 'react';

function FeaturesBlocks() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Discover StreamLine's Cutting-Edge Features</h2>
            <p className="text-xl text-slate-600 dark:text-gray-400">StreamLine's innovative features make subscription management effortless. Explore our selection of tools designed to save you time and simplify your streaming experience.</p>
          </div>

          {/* Blocks */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st Block */}
            <div className="relative flex flex-col items-center" data-aos="fade-up"  data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-sky-600" width="64" height="64" rx="32" />
                <path className="stroke-current text-sky-100" d="M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-sky-300" d="M43 42h-9M43 37h-9" strokeLinecap="square" strokeWidth="2" />
              </svg>
              <h4 className=" h4 mb-2 text-center">Automated Subscription Management</h4>
              <p className="text-lg text-slate-600 dark:text-gray-400 text-center">Our subscription management feature handles the hassle of switching subscriptions for you, working with your budget, so you don't have to worry about a thing.</p>
            </div>
            
            {/* 2nd Block */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle className="fill-current text-sky-600" cx="32" cy="32" r="32" />
                <path className="stroke-current text-sky-100" strokeWidth="2" strokeLinecap="square" d="M21 23h22v18H21z" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-sky-300" d="M26 28h12M26 32h12M26 36h5" strokeWidth="2" strokeLinecap="square" />
              </svg>
              <h4 className="h4 mb-2">Instant Notifications</h4>
              <p className="text-lg text-slate-600 dark:text-gray-400 text-center">Stay on top of your subscription services with StreamLine's Notifications feature. Get real-time alerts for new subscriptions, renewals, billing cycles, and price changes.</p>
            </div>

            {/* 3rd Block */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-sky-600" width="64" height="64" rx="32" />
                <g transform="translate(22 21)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-sky-100" d="M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5" />
                  <circle className="stroke-current text-sky-300" cx="13" cy="9" r="3" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Tailored Content</h4>
              <p className="text-lg text-slate-600 dark:text-gray-400 text-center">StreamLines use machine learning helps recommend current subscriptions based on your specified interests and newly released content. Say goodbye to endless scrolling and let us handle the hard work for you.</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
