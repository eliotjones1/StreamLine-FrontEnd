import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Card, CardContent, CardHeader } from '@mui/material';
import DefaultMovieImg from '../images/StreamLine.jpeg';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Grid from '@mui/material/Grid';
import axios from 'axios';

import PageIllustration from '../partials/PageIllustration';

function UserDash() {
  const [budget, setBudget] = useState(null);
  const [media, setMedia] = useState([]);
  const [settings, setSettings] = useState({});
  const [bundle, setBundle] = useState({Movies_and_TV_Shows: [], Images: []});
  const session = JSON.parse(document.cookie.substring(8));
  const nav = useNavigate();

  const darkGrad = 'linear-gradient(90deg, rgba(0,183,255,1) 0%, rgba(104,94,255,1) 100%)';
  const lightGrad = 'linear-gradient(90deg, rgba(30,41,59,1) 0%, rgba(0,183,255,1) 100%)';
  const colorMode = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return darkGrad
    }
    return lightGrad
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/returnData/?email=" + session.email).then(response => {
      setBudget(parseFloat(JSON.parse(response.data.budget)).toFixed(2));
      setBundle(response.data.bundle);
      setMedia(response.data.media);
      setSettings({
        infinite: true,
        speed: 3000,
        slidesToScroll: 1,
        slidesToShow: response.data.bundle.Images.length <= 4 ? response.data.bundle.Images.length : 4,
        autoplay: true,
        autoplaySpeed: 0,
        arrows: false,
      });
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section>
          <div className="max-w-3xl mx-auto text-center relative pb-6 md:pt-28 md:pb-8">
            <h1 className="h1 mb-4" data-aos="fade-up">
              <span className="text-sky-500">StreamLine</span> Dashboard
            </h1>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <button className="btn text-white bg-sky-600 hover:bg-sky-700 w-full mb-4 sm:w-auto sm:mb-0" onClick={() => nav('/search')}>
                Edit Current Content
              </button>
              <button className="btn text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-800 w-full sm:w-auto sm:ml-4" onClick={() => nav('/results')}>
                View Current Bundles
              </button>
            </div>
          </div>
        </section>

        <div className="flex">
          <section className="w-1/2 px-8">
            <div className="flex flex-col justify-start max-w-4xl mx-auto py-2 pb-4 h-full">
              <h2 className="text-2xl font-bold mb-2">Current Monthly Budget</h2>
              <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-700 font-semibold text-center rounded-lg shadow-lg px-6 py-4 mb-4">
                ${budget}
              </div>
              <div className="container max-w-4xl w-full mx-auto">
                <h2 className="text-2xl font-bold mb-2">Current Content</h2>
                <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-700 rounded-lg shadow-lg px-6 py-4 pb-4 max-h-96 overflow-y-auto">
                {media.length === 0 ? 
                  'No content selected yet.'
                : 
                  <Stack spacing={2}>
                    {media.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: colorMode,
                          borderRadius: '8px',
                          p: 1,
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <div className="flex flex-row">
                          {
                            item.image !== null ?
                            <img src={'https://image.tmdb.org/t/p/w185' + item.image} width="46.25" height="69.5" style={{ borderRadius: '10%' }}/>
                            :
                            <img src={DefaultMovieImg} width="46.25" height="69.5" style={{ borderRadius: '10%' }}/>
                          }
                          <div className="pl-2">
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '1px 1px 2px rgba(1, 0, 0, 0.8)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <div>
                              {
                                item.release_date !== null?
                                <Typography variant="caption" sx={{ color: 'white' }}>
                                  Release Date: {item.release_date}
                                </Typography>
                                :
                                <></>
                              }
                            </div>
                            {
                              item.type !== null ?
                              <Typography variant="caption" sx={{ color: 'white' }}>
                                Type: {item.type}
                              </Typography>
                              :
                              <></>
                            }
                          </div>
                        </div>
                      </Box>
                    ))}
                  </Stack>
                }
                </div>
              </div>
            </div>
          </section>
          {/* <section className="w-1/2 px-8 py-2">
            <div className="flex flex-col justify-center max-w-4xl mx-auto py-2 pb-4 h-full">
              <Grid alignItems="flex-end">
                  <Grid
                    item
                    key={0}
                    xs={12}
                    md={4}
                  >
                    <Card>
                    <CardHeader
                      title={bundle.Title}
                      subheader={bundle.Subheader}
                      style={{ fontWeight: 'bold'}}
                      className="text-white bg-sky-600 text-center text-2xl"
                    />
                      <CardContent className="bg-slate-700" >
                        <Box className="flex justify-center mb-4 items-baseline">
                          {isNaN(bundle.Total_Cost) ?
                            <Typography component="h2" variant="h3" className='text-white'>
                             $0.00
                            </Typography>
                           :
                            <Typography component="h2" variant="h3" className='text-white'>
                              ${parseFloat(bundle.Total_Cost).toFixed(2)}
                            </Typography>
                          }
                          <Typography variant="h6" className="text-gray-200">
                            /mo
                          </Typography>
                        </Box>
                        <div className='flex overflow-auto h-32 space-x-4 items-center'>
                          {bundle.Images.map((image, index) => (
                            <img src={'https://image.tmdb.org/t/p/w185/' + image} key={index} className='h-32 w-32 hover:cursor-pointer rounded-md' onClick={()=> window.open(bundle.Links[index], '_blank')}/>
                          ))}
                        </div>
                        <h2 className="text-white text-2xl pt-2 font-bold text-center">
                          Accessible Content Includes:
                        </h2>
                        <ul className='flex-col overflow-y-scroll scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 max-h-48'>
                          {bundle.Movies_and_TV_Shows.map((line, index) => (
                            <div className="text-center font-semibold text-white pt-1" key={index}>
                              {line}
                            </div>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
              </Grid>
            </div>
          </section> */}
<section className="w-1/2 px-8 py-5">
<div className="flex flex-col max-w-4xl mx-auto  h-full dark:bg-white overflow-hidden transform bg-slate-50  rounded-lg shadow-xl">
{/* <div className="z-10 flex flex-1 flex-basis-0 flex-grow flex-col mt-8 overflow-hidden transform bg-slate-50 dark:bg-white rounded-lg shadow-xl md:scale-110"> */}
                <div className="flex flex-col items-center px-8 py-4 bg-slate-800 dark:bg-sky-600">
                  <span className="text-xl font-bold text-white">{bundle.Title}</span>
                  <span className="font-thin text-white">{bundle.Subheader}</span>
                  <div className="flex items-center text-white">
                    {
                      isNaN(bundle.Total_Cost) ?
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">0.00</span>
                        <span className="text-2xl text-gray-200">/mo</span>
                      </>
                      :
                      parseFloat(bundle.Total_Cost).toFixed(2) == 0.00 ?
                      <span className="text-5xl font-bold">Free</span>
                      :
                      <>
                        <span className="text-3xl">$</span>
                        <span className="text-5xl font-bold">{parseFloat(bundle.Total_Cost).toFixed(2)}</span>
                        <span className="text-2xl text-gray-200">/mo</span>
                      </>
                    }
                  </div>
                </div>
                <div className="px-8 py-4">
                  {/* <div className='flex overflow-x-auto h-32 space-x-4 items-center'> */}
                  <Slider {...settings}>
                    {bundle.Images.map((image, index) => (
                      <div key={index}>
                      <img 
                        src={'https://image.tmdb.org/t/p/w185/' + image} 
                        className='h-32 w-32 hover:cursor-pointer rounded-md' 
                        onClick={()=> window.open(bundle.Links[index], '_blank')}
                      />
                    </div>
                    ))}
                  </Slider>
                  <p className="text-slate-800 pt-2 font-bold text-center">
                    Accessible Content From Your List:
                  </p>
              <div className="flex flex-wrap justify-center">
                { media.sort((a, b) => {
                  const aIsInBundle = bundle.Movies_and_TV_Shows.includes(a.title);
                  const bIsInBundle = bundle.Movies_and_TV_Shows.includes(b.title);
                  return aIsInBundle === bIsInBundle ? 0 : aIsInBundle ? -1 : 1;
                  }).map((show, index) => {
                    const isInBundle = bundle.Movies_and_TV_Shows.includes(show.title);
                    const streamingProviders = show.streaming_providers;
                    const flatrateProviders = streamingProviders && streamingProviders.flatrate ? streamingProviders.flatrate : [];
                    const sharedProviders = flatrateProviders.filter((provider) =>
                      bundle.Streaming_Services.includes(provider)
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
                            src={'https://image.tmdb.org/t/p/w185/' + bundle.Images[bundle.Streaming_Services.indexOf(firstCommonProvider)]}
                            className='absolute top-0 right-0 h-8 w-8 rounded-full' 
                            alt={firstCommonProvider}
                            />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section> 
        </div>
      </main>
    </div>
  );
}

export default UserDash;
