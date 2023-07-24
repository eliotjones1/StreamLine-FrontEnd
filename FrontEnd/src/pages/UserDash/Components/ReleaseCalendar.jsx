import React, { useState, useEffect } from "react";
import axios from "axios";

import noimage from '../../../images/no-image.jpg';
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const [releases, setReleases] = useState([]);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIndex = new Date().getDay();
  const nextSevenDays = daysOfWeek.slice(todayIndex).concat(daysOfWeek.slice(0, todayIndex));

  const fetchNewlyReleased = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/user/subscriptions/upcoming', { withCredentials: true });
    const releasesByDay = nextSevenDays.map((day) =>
      data.filter((movie) => getDayOfWeek(movie.release_date) === day)
    );
    setReleases(releasesByDay);
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    fetchNewlyReleased();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Upcoming Releases</h1>
      <div className="rounded-md border-0 px-3.5 pt-2 shadow-sm ring-1 ring-inset ring-slate-900/5 bg-slate-50 dark:bg-slate-700">
        <div className="grid grid-cols-7 gap-2 mb-2">{nextSevenDays.map((day) => (
          <div key={day} className="bg-sky-600 text-white text-center py-2 rounded-md shadow-md">
            {day}
          </div>
        ))}
        </div>
        
        {
          releases.length === 0 ?
            <p className="flex w-full justify-center py-4">
              No new content this week.
            </p>
          :
            <div className="grid grid-cols-7 gap-2">
              {nextSevenDays.map((day) => (
                <div key={day} className="max-h-[75vh] overflow-y-auto">
                  {releases.map((movies, index) => {
                    if (movies.length === 0) return null; // If no movies for this day, return null to skip the column
                    if (day !== nextSevenDays[index]) return null; // Ensure we only render the column corresponding to the day
                    return (
                      <div key={day + index}>
                        {movies.map((movie, movieIndex) => (
                          <div key={movieIndex} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md my-4">
                            <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={noimage}
                              className="object-cover"
                            />
                            <div className="p-4">
                              <p className="text-md font-semibold text-gray-800 truncate">{movie.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
        }
        
      </div>
    </div>
  );
};