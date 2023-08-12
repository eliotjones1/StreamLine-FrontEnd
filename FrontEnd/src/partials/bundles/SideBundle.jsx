import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import default1 from '../../images/crackle-grey.png';
import default2 from '../../images/fv-grey.png';
import default3 from '../../images/tubi-grey.png';
import default4 from '../../images/hulu-grey.png';
import default5 from '../../images/netflix-grey.png';
import default6 from '../../images/hbo-grey.png';

function SideBundle({ bundle, userData, dashPin, isLeft }) {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToScroll: 1,
    slidesToShow: bundle.Images.length === 1 ? 1 : 2,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
  };
  const defaultImgs = isLeft ? [default1, default2, default3] : [default4, default5, default6];

  return (
    <div className="flex flex-basis-0 flex-1 flex-grow flex-col mt-8 overflow-hidden bg-slate-800 dark:bg-white rounded-lg shadow-xl">
      <div className="flex flex-col items-center p-4 font-semibold text-white bg-sky-600 dark:bg-slate-800">
        {bundle.Images.length === 0 ? 'Bundle Unavailable' : bundle.Title}
        <div className="flex items-center text-5xl text-white">
          {bundle.Total_Cost < 0.001 ? (
            <span className="font-bold">Free</span>
          ) : (
            <>
              <span className="text-3xl">$</span>
              {Number.isNaN(bundle.Total_Cost) ? (
                <span className="font-bold">0.00</span>
              ) : (
                <span className="font-bold">{parseFloat(bundle.Total_Cost).toFixed(2)}</span>
              )}
              <span className="text-2xl text-slate-800 dark:text-gray-200">/mo</span>
            </>
          )}
        </div>
      </div>

      <div className="px-8 py-4">
        <Slider {...settings}>
          {bundle.Images.length === 0
            ? defaultImgs.map((image, index) => (
                <div key={index}>
                  <img key={index} src={image} className="h-32 w-32 rounded-md" />
                </div>
              ))
            : bundle.Images.map((image, index) => (
                <div key={index}>
                  <img
                    src={'https://image.tmdb.org/t/p/w185/' + image}
                    className="h-32 w-32 hover:cursor-pointer rounded-md"
                    onClick={() => window.open(bundle.Links[index], '_blank')}
                  />
                </div>
              ))}
        </Slider>

        <p className="text-white dark:text-slate-800 pt-2 font-bold text-center">
          Accessible Content From Your List:
        </p>

        <div
          className="flex flex-wrap justify-center"
          style={{ height: '150px', overflowY: 'scroll' }}
        >
          {userData
            .sort((a, b) => {
              const aIsInBundle = bundle.Movies_and_TV_Shows.includes(a.title);
              return aIsInBundle === bundle.Movies_and_TV_Shows.includes(b.title)
                ? 0
                : aIsInBundle
                ? -1
                : 1;
            })
            .map((show, index) => {
              const isInBundle = bundle.Movies_and_TV_Shows.includes(show.title);
              const streamingProviders = show.streaming_providers;
              const flatrateProviders =
                streamingProviders && streamingProviders.flatrate
                  ? streamingProviders.flatrate
                  : [];
              const sharedProviders = flatrateProviders.filter((provider) =>
                bundle.Streaming_Services.includes(provider)
              );

              const firstCommonProvider = sharedProviders.length > 0 ? sharedProviders[0] : '';
              return (
                <div
                  key={index}
                  className="relative m-1"
                  style={{
                    filter: isInBundle ? 'none' : 'grayscale(100%)',
                    opacity: isInBundle ? '1' : '0.3',
                  }}
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
                      src={`https://image.tmdb.org/t/p/w185/${
                        bundle.Images[bundle.Streaming_Services.indexOf(firstCommonProvider)]
                      }`}
                      className="absolute top-0 right-0 h-8 w-8 rounded-full"
                      alt={firstCommonProvider}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {dashPin !== undefined && bundle.Images.length !== 0 && (
        <div className="flex px-8 pb-4 justfy-center">
          <button
            className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-sky-600 dark:bg-slate-800 text-white hover:bg-slate-700 rounded-lg"
            onClick={() => dashPin(bundle)}
          >
            Pin to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default SideBundle;
