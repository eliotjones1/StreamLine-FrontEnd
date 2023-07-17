// Import Libraries
import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';

// Import Components
import ContentCard from './ContentCard';

// Import Contexts
import { SearchContext } from '../../../contexts/SearchContext';

function Content() {
    const { content, lastSearch, returnToMain, getGenreById } = useContext(SearchContext)
    const nav = useNavigate();

    if (content.length === 0) {
        return <></>
    }

    return (
        <section className='max-w-6xl mx-auto'>
        <div className="flex justify-between pb-10">
            <p className="mr-auto">
                Showing search results for "{lastSearch}"
            </p>
            <button className="ml-auto text-sky-600" onClick={() => returnToMain(true)}>
                Return to main
            </button>
        </div>
        <div className="mb-20 md:mb-0 space-y-8">
            {content.map((content) => (
                <div className='bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 px-4 flex w-full cursor-pointer space-x-6 shadow-md' onClick={() => nav(`/content-data/${content.type}/${content.id}`)} key={content.id}>
                    <div>
                        <ContentCard key={content.id} content={content} />
                    </div>
                    <div className="w-full relative flex-auto">
                        <h2 className="font-bold truncate pr-20 text-2xl">
                            {content.title}
                        </h2>
                        <div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
                            <div className="absolute top-0 right-0 flex items-center space-x-1">
                            <div className="text-sky-500">
                                <span className="sr-only">Star rating</span>
                                <svg width="16" height="20" fill="currentColor">
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                                </svg>
                            </div>
                            <div>{content.rating.toFixed(1)} / 10</div>
                            </div>
                            <div className='flex  mb-4'>
                                {
                                    content.genres.map((id, index) => (
                                        <div className="flex items-center" key={index}>
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
                            { content.release_date && 
                                <div className='flex space-x-1 mb-2'>
                                    <p className='font-semibold'>
                                        Release Year:
                                    </p>
                                    <p>
                                    {new Date(content.release_date).toLocaleString('en-US', {year:'numeric'})} 
                                    </p>                                
                                </div>
                            }
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