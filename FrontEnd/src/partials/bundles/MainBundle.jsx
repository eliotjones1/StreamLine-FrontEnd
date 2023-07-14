import React from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MainBundle({ bundle, userData, dashPin }) {
  const location = useLocation();
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToScroll: 1,
    slidesToShow: location.pathname === '/user-dash' ? bundle.Images.length <= 4 ? bundle.Images.length : 4 : bundle.Images.length === 1 ? 1 : 2,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
  };
  const cost = parseFloat(bundle.Total_Cost).toFixed(2);
  console.log(bundle)
  return (
    <div className={location.pathname === '/user-dash' ? 'flex flex-col max-w-4xl mx-auto h-full dark:bg-white overflow-hidden transform bg-slate-50  rounded-lg shadow-xl' : 'z-10 flex flex-1 flex-basis-0 flex-grow flex-col mt-8 overflow-hidden transform bg-slate-50 dark:bg-white rounded-lg shadow-xl md:scale-110'}>
      <div className="flex flex-col items-center px-8 py-4 text-white bg-slate-800 dark:bg-sky-600">
        <span className="text-xl font-bold">{bundle.Title}</span>
        <span className="font-thin">{bundle.Subheader}</span>
        <div className="flex text-5xl items-center">
          {
            cost < 0.001
              ? <span className="font-bold">Free</span>
              : (
                <>
                  <span className="text-3xl">$</span>
                  <span className="font-bold">{cost}</span>
                  <span className="text-2xl text-gray-200">/mo</span>
                </>
              )
          }
        </div>
      </div>

      <div className="px-8 py-4">

        <Slider {...settings}>
          {bundle.Images.map((image, index) => (
            <div key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${image}`}
                className="h-32 w-32 hover:cursor-pointer rounded-md"
                onClick={() => window.open(bundle.Links[index], '_blank')}
              />
            </div>
          ))}
        </Slider>

        <p className="text-slate-800 pt-2 font-bold text-center">
          Accessible Content From Your List:
        </p>

        <div className="flex flex-wrap justify-center " style={{ height: '150px', overflowY: 'scroll' }}>
          { userData.sort((a, b) => {
            const aIsInBundle = bundle.Movies_and_TV_Shows.includes(a.title);
            const bIsInBundle = bundle.Movies_and_TV_Shows.includes(b.title);
            return aIsInBundle === bIsInBundle ? 0 : aIsInBundle ? -1 : 1;
          }).map((show, index) => {
            const isInBundle = bundle.Movies_and_TV_Shows.includes(show.title);
            const streamingProviders = show.streaming_providers;
            const flatrateProviders = streamingProviders && streamingProviders.flatrate ? streamingProviders.flatrate : [];
            const sharedProviders = flatrateProviders.filter((provider) => bundle.Streaming_Services.includes(provider));
            const firstCommonProvider = sharedProviders.length > 0 ? sharedProviders[0] : '';
            return (
              <div
                key={index}
                className="relative m-1"
                style={{ filter: isInBundle ? 'none' : 'grayscale(100%)', opacity: isInBundle ? '1' : '0.3' }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w185/${show.poster_path}`}
                  className="rounded-md"
                  width="92.5"
                  height="139"
                  alt={show.title}
                />
                {isInBundle && firstCommonProvider && (
                <img
                  src={`https://image.tmdb.org/t/p/w185/${bundle.Images[bundle.Streaming_Services.indexOf(firstCommonProvider)]}`}
                  className="absolute top-0 right-0 h-8 w-8 rounded-full"
                  alt={firstCommonProvider}
                />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {
        dashPin !== undefined
        && (
        <div className="flex px-8 pb-4 justfy-center">
          <button type="button" className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-slate-800 dark:bg-sky-600 text-white rounded-lg shadow-lg" onClick={() => dashPin(bundle)}>Pin to Dashboard</button>
        </div>
        )
      }
    </div>
  );
}

export default MainBundle;
