import React from 'react'
import Moviecard from './Moviecard';
import { useNavigate } from 'react-router-dom';

function Content({ mediaContent, searchQuery, returnToMain }) {
    const nav = useNavigate();

    const getGenreById = (id) => {
        const genres = [
            { id: 12, name: 'Adventure' },
            { id: 14, name: 'Fantasy' },
            { id: 16, name: 'Animation' },
            { id: 18, name: 'Drama' },
            { id: 27, name: 'Horror' },
            { id: 28, name: 'Action' },
            { id: 35, name: 'Comedy' },
            { id: 36, name: 'History' },
            { id: 37, name: 'Western' },
            { id: 53, name: 'Thriller' },
            { id: 80, name: 'Crime' },
            { id: 99, name: 'Documentary' },
            { id: 878, name: 'Science Fiction' },
            { id: 9648, name: 'Mystery' },
            { id: 10402, name: 'Music' },
            { id: 10749, name: 'Romance' },
            { id: 10751, name: 'Family' },
            { id: 10752, name: 'War' },
            { id: 10759, name: 'Action & Adventure' },
            { id: 10762, name: 'Kids' },
            { id: 10763, name: 'News' },
            { id: 10764, name: 'Reality' },
            { id: 10765, name: 'Sci-Fi & Fantasy' },
            { id: 10766, name: 'Soap' },
            { id: 10767, name: 'Talk' },
            { id: 10768, name: 'War & Politics' },
            { id: 10770, name: 'TV Movie' }
        ];
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : 'Unknown Genre';
      };

    return (
        <section className='max-w-6xl mx-auto'>
        <div className="flex justify-between pb-10">
            <p className="mr-auto">
                Showing search results for "{searchQuery}"
            </p>
            <button className="ml-auto text-sky-600" onClick={() => returnToMain(true)}>
                Return to main
            </button>
        </div>
        <div className="mb-20 md:mb-0 space-y-8">
            {mediaContent.map((content) => (
                <div className='bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 px-4 flex w-full cursor-pointer space-x-6 shadow-md' onClick={() => nav(`/content-data/${content.id}`)} key={content.id}>
                    <div>
                        <Moviecard key={content.id} movie={content} />
                    </div>
                    <div className="w-full relative flex-auto">
                        <h2 className="font-bold truncate pr-20 text-2xl">
                            {content.title || content.name}
                        </h2>
                        <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                            <div className="absolute top-0 right-0 flex items-center space-x-1">
                            <div className="text-sky-500">
                                <span className="sr-only">Star rating</span>
                                <svg width="16" height="20" fill="currentColor">
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                                </svg>
                            </div>
                            <div>{content.vote_average.toFixed(1)} / 10</div>
                            </div>
                            <div className='flex  mb-4'>
                                {
                                    content.genre_ids.map((id, index) => (
                                        <div className="flex items-center">
                                            {
                                                index !== 0 && 
                                                <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                                    <circle cx="1" cy="1" r="1" />
                                                </svg>
                                            }
                                            <div className='font-normal bg-slate-100 dark:bg-slate-700 py-1 px-2 rounded-md ring-1 ring-slate-200 dark:ring-slate-600'>
                                                {getGenreById(id)}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex space-x-1 mb-2'>
                                <p className='font-semibold'>Release Year:</p>
                                { content.release_date && 
                                    <div>
                                        {"  " + new Date(content.release_date).toLocaleString('en-US', {year:'numeric'})}
                                    </div>
                                }
                                { content.first_air_date && 
                                    <div>
                                        {"  " + new Date(content.first_air_date).toLocaleString('en-US', {year:'numeric'})}
                                    </div>
                                }
                            </div>
                            <div className="w-full mt-2 font-normal">
                                <p className='font-semibold'>Overview:</p>
                                {content.overview}
                            </div>
                        </div>
                    </div>
                </div> 
            ))}
        </div>
        </section>
    )
}

export default Content