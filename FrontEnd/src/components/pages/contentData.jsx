import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PlusIcon, LinkIcon, MinusIcon } from '@heroicons/react/20/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import MediaInfo from '../organisms/mediaInfo';
import CastSlider from '../molecules/castSlider';
import TrailerIFrame from '../atoms/trailer';
import { LoginContext } from '../../contexts/LoginContext';
import { ModalContext } from '../../contexts/ModalContext';
import { APIContext } from '../../contexts/api';
import { useQuery } from '@tanstack/react-query';

export default function Detail() {
  const { fetchContentData } = useContext(APIContext);
  const { isLoggedIn } = useContext(LoginContext);
  const { setOpen500Modal } = useContext(ModalContext);
  const { type, id } = useParams();
  const [inList, setInList] = useState(false);

  const onList = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/returnData/', {
        withCredentials: true,
      });
      if (data.media.find((item) => item.id === id && item.media_type === type)) {
        setInList(true);
      } else {
        setInList(false);
      }
    } catch (error) {
      setOpen500Modal(true);
    }
  };

  const addToUserList = () => {
    try {
      axios.post(
        'http://127.0.0.1:8000/saveMedia/',
        { id: id, media_type: type },
        { withCredentials: true }
      );
      setInList(true);
    } catch (error) {
      setOpen500Modal(true);
    }
  };

  const removeFromUserList = () => {
    axios
      .post(
        'http://127.0.0.1:8000/removeMedia/',
        { id: id, media_type: type },
        { withCredentials: true }
      )
      .then(() => {
        setInList(false);
      })
      .catch(() => {
        setOpen500Modal(true);
      });
  };

  const addTooltip = (
    <Tooltip className="bg-slate-900 dark:bg-slate-600 rounded-md py-1 px-2 text-white">
      Add to Watchlist
    </Tooltip>
  );

  const removeTooltip = (
    <Tooltip className="bg-slate-900 dark:bg-slate-600 rounded-md py-1 px-2 text-white">
      Remove from Watchlist
    </Tooltip>
  );

  const {
    status,
    error,
    data: content,
  } = useQuery({
    queryKey: ["media_content", type, id],
    queryFn: () => fetchContentData(type, id),
  });

  useEffect(() => {
    onList();
  }, [])

  if (status === "loading") return <></>;
  if (status === "error") return <p>{JSON.stringify(error)}</p>;

  return (
    <div>
      <Header />
      <main className="grow">
        <div className="h-20" />
        <div className="relative">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="relative">
              <div className="absolute inset-0 bg-slate-900 opacity-80"></div>
              <img
                className="object-cover object-top w-full h-[40rem]"
                src={`https://image.tmdb.org/t/p/original/${content.data.backdrop_path}`}
              />
            </div>
          </div>

          {/* Foreground */}
          <div className="relative z-10 flex max-w-5xl mx-auto space-x-6 text-white h-[40rem] justify-center items-center">
            <img
              className="h-[32rem] rounded-3xl"
              src={`https://image.tmdb.org/t/p/original/${content.data.poster_path}`}
            />
            <div className="w-full relative flex-auto">
              <div className="flex items-center space-x-1">
                <p className="font-bold truncate text-4xl">
                  {content.data.title || content.data.name}
                </p>
                <a href={content.data.homepage} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="h-8 hover:text-sky-600 cursor-pointer text-slate-400" />
                </a>
              </div>

              <p className="font-thin italic truncate pb-4">{content.data.tagline}</p>

              <div className="flex mb-4">
                {content.data.genres.map((genre, index) => (
                  <div className="flex items-center" key={index}>
                    {index !== 0 && (
                      <svg
                        width="2"
                        height="2"
                        fill="currentColor"
                        className="mx-2 text-slate-300"
                        aria-hidden="true"
                      >
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                    )}
                    <div className="font-normal bg-slate-700 py-1 px-2 rounded-md ring-1 ring-slate-600">
                      {genre.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {content.data.release_date && (
                  <p className="font-thin text-sm">
                    (
                    {new Date(content.data.release_date).toLocaleString('en-US', {
                      year: 'numeric',
                    })}
                    )
                  </p>
                )}
                {content.data.first_air_date && (
                  <p className="font-thin text-sm">
                    (
                    {new Date(content.data.first_air_date).toLocaleString('en-US', {
                      year: 'numeric',
                    })}
                    )
                  </p>
                )}
                <svg
                  width="2"
                  height="2"
                  fill="currentColor"
                  className="mx-2 text-slate-300"
                  aria-hidden="true"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                {content.data.episode_run_time && <p>Episode Avg</p>}
                <ClockIcon className="h-4" />
                {content.data.episode_run_time && content.data.episode_run_time.length > 0 ? (
                  <p>{content.data.episode_run_time[0]}mins</p>
                ) : (
                  <p>{content.data.runtime}mins</p>
                )}
              </div>

              {isLoggedIn && (
                <OverlayTrigger placement="right" overlay={inList ? removeTooltip : addTooltip}>
                  <button
                    className="rounded-full p-2 bg-slate-900 hover:bg-sky-600"
                    onClick={inList ? removeFromUserList : addToUserList}
                  >
                    {inList ? (
                      <MinusIcon className="h-6 text-white" />
                    ) : (
                      <PlusIcon className="h-6 text-white" />
                    )}
                  </button>
                </OverlayTrigger>
              )}

              <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                <div className="w-full font-normal">
                  <p className="font-semibold text-xl mb-2">Overview</p>
                  {content.data.overview}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto my-6 grid max-w-7xl gap-x-8 gap-y-8 grid-cols-4 grid-rows-[auto, auto] items-start">
          <div className="col-start-4 row-span-2 p-4 space-y-4 overflow-scroll max-h-screen">
            <h2 className="text-3xl font-bold truncate">Information</h2>
            <MediaInfo info={content.data} />
          </div>
          <div className="col-start-1 col-span-3 row-start-1">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <CastSlider castCrew={content.cast} />
          </div>
          <div className="col-start-1 col-span-3 row-start-2">
            <h2 className="text-2xl font-bold mb-4">Trailers</h2>
            <div className="flex overflow-x-auto">
              {content.video.map((trailer, index) => {
                if (trailer.type === 'Trailer') {
                  return (
                    <TrailerIFrame
                      key={index}
                      link={`https://www.youtube.com/embed/${trailer.key}`}
                    />
                  );
                }
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
