import React, { useState, useEffect } from "react";
import axios from "axios";

import noimage from '../../../images/no-image.jpg';
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const [releases, setReleases] = useState([]);

  const fetchNewlyReleased = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/recent/');
    setReleases(data);
  };

  useEffect(() => {
    fetchNewlyReleased();
  }, []);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIndex = new Date().getDay();
  const nextSevenDays = daysOfWeek.slice(todayIndex).concat(daysOfWeek.slice(0, todayIndex));

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  // Filter movies for the next 7 days starting from the current day of the week
  const filteredMovies = releases.filter((movie) => {
    const movieDayOfWeek = getDayOfWeek(movie.release_date);
    const daysUntilRelease = (daysOfWeek.indexOf(movieDayOfWeek) + 7 - todayIndex) % 7;
    const isWithinNextSevenDays = daysUntilRelease < 7;
    const isReleaseTodayOrLater = daysUntilRelease >= 0;
    return isWithinNextSevenDays && isReleaseTodayOrLater;
  });

  // Organize movies by their release day, starting from the current day of the week
  const moviesByDay = nextSevenDays.map((day) =>
    filteredMovies.filter((movie) => getDayOfWeek(movie.release_date) === day)
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Your Upcoming Releases</h1>
      <div className="rounded-md border-0 px-3.5 pt-2 shadow-lg ring-1 ring-inset ring-slate-900/5 ">
        <div className="grid grid-cols-7 gap-2 mb-2">{nextSevenDays.map((day) => (
          <div key={day} className="bg-sky-600 text-white text-center py-2 rounded-md shadow-md">
            {day}
          </div>
        ))}
        </div>
  
        <div className="grid grid-cols-7 gap-2">
          {nextSevenDays.map((day) => (
            <div key={day} className="max-h-[75vh] overflow-y-auto">
              {/* Wrap each column in a separate container with overflow-y-auto */}
              {moviesByDay.map((movies, index) => {
                if (movies.length === 0) return null; // If no movies for this day, return null to skip the column
                if (day !== nextSevenDays[index]) return null; // Ensure we only render the column corresponding to the day
                return (
                  <div key={day + index}>
                    {movies.map((movie, movieIndex) => (
                      <div key={movieIndex} className="bg-white rounded-lg overflow-hidden shadow-md my-4">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={noimage}
                          className="w-44 h-64 object-cover"
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
      </div>
    </div>
  );
};