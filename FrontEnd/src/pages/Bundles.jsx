import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Header, PageIllustration, Footer } from '../partials';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import default1 from "../images/crackle-grey.png";
import default2 from "../images/fv-grey.png";
import default3 from "../images/tubi-grey.png";
import default4 from "../images/hulu-grey.png";
import default5 from "../images/netflix-grey.png";
import default6 from "../images/hbo-grey.png";

function Bundles() {
  const [bundles, setBundles] = useState([]);
  const [media, setMedia] = useState([]);
  const [progress, setProgress] = useState(0);
  const [settings1, setSettings1] = useState({});
  const [settings2, setSettings2] = useState({});
  const [settings3, setSettings3] = useState({});
  const nav = useNavigate();
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  

  

  const fetchData = async () => {
    try {
      let optimizeData;
      let budget;

      if (session !== undefined) {
        let { data } = await axios.get(`http://127.0.0.1:8000/returnData/?email=${session.email}`);
        optimizeData = data.media;
        setMedia(data.media);
        budget = JSON.parse(data.budget);
      } else {
        optimizeData = JSON.parse(localStorage.getItem('selectedContent'));
        setMedia(optimizeData);
        budget = JSON.parse(localStorage.getItem('budget'));
      }

      let { data } = await axios.post('http://127.0.0.1:8000/optimize/', [...optimizeData, budget]);
      setBundles(data);
      setSettings1({
        infinite: true,
        speed: 3000,
        slidesToScroll: 1,
        slidesToShow: data[0].Images.length === 1 ? 1 : 2,
        autoplay: true,
        autoplaySpeed: 0,
        arrows: false,
      });
      setSettings2({
        infinite: true,
        speed: 3000,
        slidesToScroll: 1,
        slidesToShow: data[1].Images.length === 1 ? 1 : 2,
        autoplay: true,
        autoplaySpeed: 0,
        arrows: false,
      });
      setSettings3({
        infinite: true,
        speed: 3000,
        slidesToScroll: 1,
        slidesToShow: data[2].Images.length === 1 ? 1 : 2,
        autoplay: true,
        autoplaySpeed: 0,
        arrows: false,
      });
    } catch (error) {
      alert("An Internal Server Error Occured!");
      nav('/search');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    // Get progress every 5 seconds
    const interval = setInterval(async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/getProgress/');
      if (data.progress > progress) {
        setProgress(data.progress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dashPin = (bundle)=> {
    axios.post("http://127.0.0.1:8000/saveBundle/", [session.email, bundle]);
    nav('/user-dash')
  }

  if (bundles.length !== 3){
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        {
          bundles.length === 0 ?
          <>
            <p className="font-bold pb-4">Loading...</p>
            { progress <= 100 ? 
              <div className="w-40 h-4 bg-gray-200 rounded">
              <div
                className="h-full bg-blue-500 rounded"
                style={{ 
                  width: `${progress}%`, 
                  transition: 'width 1s ease-in-out'
                }}
              ></div>
            </div>
             : 
             <svg className="animate-spin h-12 w-12 text-sky-600" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
             <path className="opacity-75" fill="none" strokeLinecap="round" stroke="currentColor" 
             strokeWidth="4" d="M12,2 a 10,10 0 0,1 10,10"/>
              </svg>
            }
            
          </>
          :
          <>
            <p className="text-2xl text-sky-600 font-extrabold mb-2">No Bundles Available</p>
            <p className="font-semibold text-slate-800 dark:text-white mb-4">Sorry, there are no possible bundles available based on your selection and budget.</p>
            <button className="btn bg-sky-600 text-white hover:bg-sky-700 h-[40px]" onClick={() => nav('/search')}>Return to Content</button>
          </>
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow mb-12">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <div>
          <section>
            <div className="relative pt-20 md:pt-28">
              <div className="max-w-3xl mx-auto text-center pb-4 md:pb-8">
                  <h1 className="h1 mb-4" data-aos="fade-up">
                    <span className="text-sky-500">StreamLine</span> Bundles
                  </h1>
                  <p className="text-xl text-slate-800 dark:text-gray-400 mb-2" data-aos="fade-up" data-aos-delay="200">
                    StreamLine your entertainment experience with our curated bundles. We've handpicked the best streaming combinations based on your preferences, so you can enjoy all your favorite content on a budget you can afford.
                  </p>
                </div>
            </div>
          </section>
          
          <section className='flex items-center justify-center w-full'>
            <div className="flex items-center justify-center w-full max-w-6xl">
              <div className="flex flex-basis-0 flex-1 flex-grow flex-col mt-8 overflow-hidden bg-slate-800 dark:bg-white rounded-lg shadow-xl">
                <div className="flex flex-col items-center p-4 bg-sky-600 dark:bg-slate-800">
                {
                  bundles[0].Images.length === 0 ?
                  <span className="font-semibold text-white">Bundle Unavailable</span>
                  :
                  <span className="font-semibold text-white">{bundles[0].Title}</span>
                }
                  <div className="flex items-center text-white">
                    { bundles[0].Images.length === 0 ?
                      <span className="text-5xl font-bold">Free</span>
                      :
                      isNaN(bundles[0].Total_Cost) ?
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">0.00</span>
                        <span className="text-2xl text-gray-400 dark:text-gray-200">/mo</span>
                      </>
                      :
                      parseFloat(bundles[0].Total_Cost).toFixed(2) == 0.00 ?
                      <span className="text-5xl font-bold">Free</span>
                      :
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">{parseFloat(bundles[0].Total_Cost).toFixed(2)}</span>
                        <span className="text-2xl text-slate-800 dark:text-gray-200">/mo</span>
                      </>
                    }
                  </div>
                </div>
                <div className="px-8 py-4">
                  {
                    bundles[0].Images.length === 0 ?
                    <Slider {...settings1}>
                      <div key={0}>
                      <img 
                        src={default1} 
                        className='h-32 w-32 rounded-md' 
                      />
                    </div>
                    <div key={1}>
                      <img 
                        src={default2} 
                        className='h-32 w-32 rounded-md' 
                      />
                    </div>
                    <div key={2}>
                      <img 
                        src={default3} 
                        className='h-32 w-32 rounded-md' 
                      />
                    </div>
                  </Slider>
                  // <p></p>
                    :
                    <Slider {...settings1}>
                    {bundles[0].Images.map((image, index) => (
                      <div key={index}>
                      <img 
                        src={'https://image.tmdb.org/t/p/w185/' + image} 
                        className='h-32 w-32 hover:cursor-pointer rounded-md' 
                        onClick={()=> window.open(bundles[0].Links[index], '_blank')}
                      />
                    </div>
                    ))}
                  </Slider>
                  }
                  <p className="text-white dark:text-slate-800 pt-2 font-bold text-center">
                    Accessible Content From Your List:
                  </p>
                  <div className="flex flex-wrap justify-center " style={{height: '150px', overflowY: 'scroll'}}>
                { media.sort((a, b) => {
                  const aIsInBundle = bundles[0].Movies_and_TV_Shows.includes(a.title);
                  const bIsInBundle = bundles[0].Movies_and_TV_Shows.includes(b.title);
                  return aIsInBundle === bIsInBundle ? 0 : aIsInBundle ? -1 : 1;
                  }).map((show, index) => {
                    const isInBundle = bundles[0].Movies_and_TV_Shows.includes(show.title);
                    const streamingProviders = show.streaming_providers;
                    const flatrateProviders = streamingProviders && streamingProviders.flatrate ? streamingProviders.flatrate : [];
                    const sharedProviders = flatrateProviders.filter((provider) =>
                      bundles[0].Streaming_Services.includes(provider)
                    );

                    const firstCommonProvider = sharedProviders.length > 0 ? sharedProviders[0] : '';
                    return (
                      <div 
                        key={index} 
                        className="relative m-1"
                        style={{ filter: isInBundle ? "none" : "grayscale(100%)", opacity: isInBundle ? "1" : "0.3" }}
                      >
                        <img 
                          src={'https://image.tmdb.org/t/p/w185/' + show.image} 
                          className='rounded-md' 
                          width="92.5" height="139"
                          alt={show.title}
                        />
                        {isInBundle && firstCommonProvider && (
                          <img 
                            src={'https://image.tmdb.org/t/p/w185/' + bundles[0].Images[bundles[0].Streaming_Services.indexOf(firstCommonProvider)]}
                            className='absolute top-0 right-0 h-8 w-8 rounded-full' 
                            alt={firstCommonProvider}
                            />
                        )}
                      </div>
                    );
                  })}
                </div>
                </div>
                {
                  session !== undefined && bundles[0].Images.length !== 0 &&
                  <div className="flex px-8 pb-4 justfy-center">
                    <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-sky-600 dark:bg-slate-800 text-white hover:bg-slate-700 rounded-lg" onClick={() => dashPin(bundles[0])}>Pin to Dashboard</button>
                  </div>
                }
              </div>
              <div className="z-10 flex flex-1 flex-basis-0 flex-grow flex-col mt-8 overflow-hidden transform bg-slate-50 dark:bg-white rounded-lg shadow-xl md:scale-110">
                <div className="flex flex-col items-center px-8 py-4 bg-slate-800 dark:bg-sky-600">
                  <span className="text-xl font-bold text-white">{bundles[1].Title}</span>
                  <span className="font-thin text-white">{bundles[1].Subheader}</span>
                  <div className="flex items-center text-white">
                    {
                      isNaN(bundles[1].Total_Cost) ?
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">0.00</span>
                        <span className="text-2xl text-gray-200">/mo</span>
                      </>
                      :
                      parseFloat(bundles[1].Total_Cost).toFixed(2) == 0.00 ?
                      <span className="text-5xl font-bold">Free</span>
                      :
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">{parseFloat(bundles[1].Total_Cost).toFixed(2)}</span>
                        <span className="text-2xl text-gray-200">/mo</span>
                      </>
                    }
                  </div>
                </div>
                <div className="px-8 py-4">
                  {/* <div className='flex overflow-x-auto h-32 space-x-4 items-center'> */}
                  <Slider {...settings2}>
                    {bundles[1].Images.map((image, index) => (
                      <div key={index}>
                      <img 
                        src={'https://image.tmdb.org/t/p/w185/' + image} 
                        className='h-32 w-32 hover:cursor-pointer rounded-md' 
                        onClick={()=> window.open(bundles[1].Links[index], '_blank')}
                      />
                    </div>
                    ))}
                  </Slider>
                  {/* </div> */}
                  <p className="text-slate-800 pt-2 font-bold text-center">
                    Accessible Content From Your List:
                  </p>
                  <div className="flex flex-wrap justify-center " style={{height: '150px', overflowY: 'scroll'}}>
                { media.sort((a, b) => {
                  const aIsInBundle = bundles[1].Movies_and_TV_Shows.includes(a.title);
                  const bIsInBundle = bundles[1].Movies_and_TV_Shows.includes(b.title);
                  return aIsInBundle === bIsInBundle ? 0 : aIsInBundle ? -1 : 1;
                  }).map((show, index) => {
                    const isInBundle = bundles[1].Movies_and_TV_Shows.includes(show.title);
                    const streamingProviders = show.streaming_providers;
                    const flatrateProviders = streamingProviders && streamingProviders.flatrate ? streamingProviders.flatrate : [];
                    const sharedProviders = flatrateProviders.filter((provider) =>
                      bundles[1].Streaming_Services.includes(provider)
                    );
                    const firstCommonProvider = sharedProviders.length > 0 ? sharedProviders[0] : '';
                    return (
                      <div 
                        key={index} 
                        className="relative m-1"
                        style={{ filter: isInBundle ? "none" : "grayscale(100%)", opacity: isInBundle ? "1" : "0.3" }}
                      >
                        <img 
                          src={'https://image.tmdb.org/t/p/w185/' + show.image} 
                          className='rounded-md' 
                          width="92.5" height="139"
                          alt={show.title}
                        />
                        {isInBundle && firstCommonProvider && (
                          <img 
                            src={'https://image.tmdb.org/t/p/w185/' + bundles[1].Images[bundles[1].Streaming_Services.indexOf(firstCommonProvider)]}
                            className='absolute top-0 right-0 h-8 w-8 rounded-full' 
                            alt={firstCommonProvider}
                            />
                        )}
                      </div>
                    );
                  })}
                </div>
                </div>
                {
                  session !== undefined &&
                  <div className="flex px-8 pb-4 justfy-center">
                    <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-slate-800 dark:bg-sky-600 text-white rounded-lg shadow-lg" onClick={() => dashPin(bundles[1])}>Pin to Dashboard</button>
                  </div>
                }
              </div>
              <div className="flex flex-basis-0 flex-1 flex-grow flex-col mt-8 overflow-hidden bg-slate-800 dark:bg-white rounded-lg shadow-xl">
                <div className="flex flex-col items-center p-4 bg-sky-600 dark:bg-slate-800">
                {
                  bundles[2].Images.length === 0 ?
                  <span className="font-semibold text-white">Bundle Unavailable</span>
                  :
                  <span className="font-semibold text-white">{bundles[2].Title}</span>
                }
                  <div className="flex items-center text-white">
                    { bundles[2].Images.length === 0 ?
                      <span className="text-5xl font-bold">Popular</span>
                      :
                      isNaN(bundles[2].Total_Cost) ?
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">0.00</span>
                        <span className="text-2xl text-gray-400 dark:text-gray-200">/mo</span>
                      </>
                      :
                      parseFloat(bundles[2].Total_Cost).toFixed(2) == 0.00 ?
                      <span className="text-5xl font-bold">Free</span>
                      :
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">{parseFloat(bundles[2].Total_Cost).toFixed(2)}</span>
                        <span className="text-2xl text-slate-800 dark:text-gray-200">/mo</span>
                      </>
                    }
                  </div>
                </div>
                <div className="px-8 py-4">
                
                  {
                    bundles[2].Images.length === 0 ?
                    <Slider {...settings3}>
                      <div key={0}>
                      <img 
                        src={default4} 
                        className='h-32 w-32 rounded-md' 
                      />
                    </div>
                    <div key={1}>
                      <img 
                        src={default5} 
                        className='h-32 w-32 rounded-md' 
                      />
                    </div>
                    <div key={2}>
                      <img 
                        src={default6} 
                        className='h-32 w-32 rounded-md' 
                      />
                    </div>
                  </Slider>
                    :
                    <Slider {...settings3}>
                      {bundles[2].Images.map((image, index) => (
                        <div key={index}>
                        <img 
                          src={'https://image.tmdb.org/t/p/w185/' + image} 
                          className='h-32 w-32 hover:cursor-pointer rounded-md' 
                          onClick={()=> window.open(bundles[2].Links[index], '_blank')}
                        />
                      </div>
                      ))}
                    </Slider>
                  }
                  
                  <p className="text-white dark:text-slate-800 pt-2 font-bold text-center">
                    Accessible Content From Your List:
                  </p>
                  <div className="flex flex-wrap justify-center " style={{height: '150px', overflowY: 'scroll'}}>
                { media.sort((a, b) => {
                  const aIsInBundle = bundles[2].Movies_and_TV_Shows.includes(a.title);
                  const bIsInBundle = bundles[2].Movies_and_TV_Shows.includes(b.title);
                  return aIsInBundle === bIsInBundle ? 0 : aIsInBundle ? -1 : 1;
                  }).map((show, index) => {
                    const isInBundle = bundles[2].Movies_and_TV_Shows.includes(show.title);
                    const streamingProviders = show.streaming_providers;
                    const flatrateProviders = streamingProviders && streamingProviders.flatrate ? streamingProviders.flatrate : [];
                    const sharedProviders = flatrateProviders.filter((provider) =>
                      bundles[2].Streaming_Services.includes(provider)
                    );

                    const firstCommonProvider = sharedProviders.length > 0 ? sharedProviders[0] : '';
                    return (
                      <div 
                        key={index} 
                        className="relative m-1"
                        style={{ filter: isInBundle ? "none" : "grayscale(100%)", opacity: isInBundle ? "1" : "0.3" }}
                      >
                        <img 
                          src={'https://image.tmdb.org/t/p/w185/' + show.image} 
                          className='rounded-md' 
                          width="92.5" height="139"
                          alt={show.title}
                        />
                        {isInBundle && firstCommonProvider && (
                          <img 
                            src={'https://image.tmdb.org/t/p/w185/' + bundles[2].Images[bundles[2].Streaming_Services.indexOf(firstCommonProvider)]}
                            className='absolute top-0 right-0 h-8 w-8 rounded-full' 
                            alt={firstCommonProvider}
                            />
                        )}
                      </div>
                    );
                  })}
                </div>
                </div>
                {
                  session !== undefined && bundles[2].Images.length !== 0 &&
                  <div className="flex px-8 pb-4 justfy-center">
                    <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-sky-600 dark:bg-slate-800 text-white hover:bg-slate-700 rounded-lg" onClick={() => dashPin(bundles[2])}>Pin to Dashboard</button>
                  </div>
                }
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className='flex w-full items-center justify-center'>
        <p className="text-slate-600 dark:text-gray-400 text-sm font-thin">
          Don't Like Your Bundles? <button className="font-medium text-sky-600 dark:text-sky-500 hover:text-gray-200 transition duration-150 ease-in-out" onClick={() => nav("/search")}>Modify Content and Budget</button>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Bundles;