import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RyanHeadshot from '../../images/Ryan_Full.jpg';
import EliotHeadshot from '../../images/Eliot_Full.jpeg';

const founders = [
  {
    name: 'Ryan Dunn',
    role: 'Co-Founder / Role Undetermined',
    location: 'Charlotte, North Carolina',
    imageUrl: RyanHeadshot,
    favMovie: "Star Wars",
    favMovieLink: "/content-data/movie/11",
    moviePoster: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    movieRating: "PG",
    movieDirector: "George Lucas",
    favShow: "The Lord of the Rings: The Rings of Power",
    favShowLink: "/content-data/tv/84773",
    showRating: "TV-14",
    showPoster: "https://image.tmdb.org/t/p/original//mYLOqiStMxDK3fYZFirgrMt8z5d.jpg",
    showDirector: "John D. Payne",
    Twitter: "https://twitter.com/RyanDun46936119",
    Instagram: "https://www.instagram.com/_ryan.dunn/",
    Facebook: undefined,
    GitHub: "https://github.com/rycdunn",
    LinkedIn: "https://www.linkedin.com/in/ryan-dunn-/",
  },
  {
    name: 'Eliot Jones',
    role: 'Co-Founder / Role Undetermined',
    location: 'New Britain, Connecticut',
    imageUrl: EliotHeadshot,
    favMovie: "The Martian",
    favMovieLink: '/content-data/movie/286217',
    moviePoster: "https://image.tmdb.org/t/p/original//5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    movieRating: "PG-13",
    movieDirector: "Ridley Scott",
    favShow: "The Witcher",
    favShowLink: "/content-data/tv/71912",
    showRating: "TV-MA",
    showPoster: "https://image.tmdb.org/t/p/original//cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    showDirector: "Lauren Schmidt Hissrich",
    Twitter: undefined,
    Instagram: undefined,
    Facebook: undefined,
    GitHub: "https://github.com/eliotjones1",
    LinkedIn: "https://www.linkedin.com/in/eliot-krzysztof-jones/",
  },
]

export default function Founders() {
  const nav = useNavigate();

  return (
    <section className='my-24'>
      <div className="mx-auto grid gap-x-8 gap-y-12">

        <div className='row-start-1'>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Meet the Founders</h2>
          <p className="mt-6 text-lg leading-8">
            Meet our founders, two computer science students from Stanford University who share a passion for entertainment and technology. Both actively compete in the Pac-12 conference as members of the Stanford Men's Soccer Team, showcasing their teamwork and dedication on and off the field. With a vision to reshape the entertainment industry, they aim to utilize their diverse skillsets to bring innovative solutions and make a lasting impact on the future of media and beyond.
          </p>
        </div>

        <ul className='grid w-full grid-cols-2 space-x-8'>
          {founders.map((person) => (
            <li key={person.name}>
              <div className="grid grid-cols-2 space-x-4 w-full">
                <img className="h-full w-full rounded-lg" src={person.imageUrl} alt="" />
                <div className='flex flex-col min-h-min space-y-2 space-x-2'>
                  <div>
                    <h3 className="text-2xl font-semibold leading-7 tracking-tight pt-2">
                      {person.name}
                    </h3>
                    <p className="text-base font-semibold leading-6 text-sky-600">
                      {person.role}
                    </p>
                    <p className='text-sm font-thin leading-6 text-gray-600 dark:text-gray-400'>
                      {person.location}
                    </p>
                  </div>

                  <div>
                    <ul className="flex space-x-4 mb-4">
                      {
                        person.Twitter && 
                        <li>
                          <Link to={person.Twitter} target="_blank" className="flex justify-center items-center text-slate-800 bg-slate-100 dark:text-sky-600 dark:bg-slate-800 hover:text-gray-100 hover:bg-sky-600 rounded-full transition duration-150 ease-in-out" aria-label="Twitter">
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                            </svg>
                          </Link>
                        </li>
                      }
                      {
                        person.GitHub && 
                        <li>
                          <Link to={person.GitHub} target="_blank" className="flex justify-center items-center text-slate-800 bg-slate-100 dark:text-sky-600 dark:bg-slate-800 hover:text-gray-100 hover:bg-sky-600 rounded-full transition duration-150 ease-in-out" aria-label="Github">
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                            </svg>
                          </Link>
                        </li>
                      }
                      {
                        person.Facebook && 
                        <li>
                          <Link to={person.Facebook} target="_blank" className="flex justify-center items-center text-slate-800 bg-slate-100 dark:text-sky-600 dark:bg-slate-800 hover:text-gray-100 hover:bg-sky-600 rounded-full transition duration-150 ease-in-out" aria-label="Facebook">
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                            </svg>
                          </Link>
                        </li>
                      }
                      {
                        person.Instagram && 
                        <li>
                          <Link to={person.Instagram} target="_blank" className="flex justify-center items-center text-slate-800 bg-slate-100 dark:text-sky-600 dark:bg-slate-800 hover:text-gray-100 hover:bg-sky-600 rounded-full transition duration-150 ease-in-out" aria-label="Instagram">
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="20.145" cy="11.892" r="1" />
                              <path d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
                              <path d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z" />
                            </svg>
                          </Link>
                        </li>
                      }
                      {
                        person.LinkedIn &&
                        <li>
                          <Link to={person.LinkedIn} target="_blank" className="flex justify-center items-center text-slate-800 bg-slate-100 dark:text-sky-600 dark:bg-slate-800 hover:text-gray-100 hover:bg-sky-600 rounded-full transition duration-150 ease-in-out" aria-label="Linkedin">
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                            </svg>
                          </Link>
                        </li>
                      }
                    </ul>
                  </div>

                  <div className='space-y-2'>
                    <p className='text-lg font-semibold'>Favorite Content</p>

                    <div className="bg-slate-50 dark:bg-slate-700 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 space-x-2 flex shadow-md">
                      <div className="flex relative w-1/4">
                        <img className='img object-cover w-full rounded-xl overflow-hidden cursor-pointer' src={person.moviePoster} alt={person.favMovie} onClick={() => nav(favMovieLink)}/>
                      </div>
                      <div className="w-3/4 space-y-1 relative">
                        <h2 className="font-bold truncate pr-20 text-lg cursor-pointer" onClick={() => nav(favMovieLink)}>
                          {person.favMovie}
                        </h2>
                        <p className='inline-block text-sm px-1 py-1/2 rounded-md text-gray-600 dark:text-gray-300 ring-2 ring-slate-200 dark:ring-slate-600'>
                          {person.movieRating}
                        </p>
                        <p className='text-sm'>
                          By {person.movieDirector}
                        </p>
                      </div>
                    </div> 

                    <div className="bg-slate-50 dark:bg-slate-700 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 space-x-2 flex shadow-md">
                      <div className="flex relative h-full w-1/4">
                        <img className='img object-cover w-full rounded-xl overflow-hidden cursor-pointer' src={person.showPoster} alt={person.favShow} onClick={() => nav(favShowLink)}/>
                      </div>
                      <div className="w-3/4 space-y-1 relative">
                        <h2 className="font-bold truncate pr-20 text-lg cursor-pointer" onClick={() => nav(favShowLink)}>
                          {person.favShow}
                        </h2>
                        <p className='inline-block text-sm px-1 py-1/2 rounded-md text-gray-600 dark:text-gray-300 ring-2 ring-slate-200 dark:ring-slate-600'>
                          {person.showRating}
                        </p>
                        <p className='text-sm'>
                          By {person.showDirector}
                        </p>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}