import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function CalendarContent({ data }){
  const nav = useNavigate();

  return (
    <div className="grid grid-cols-7 gap-2">
      {data.days.map((day) => (
        <div key={day} className="max-h-[75vh] overflow-y-auto">
          {data.releases.map((movies, index) => {
            if (movies.length === 0 || day !== data[index]) return null; 
            return (
              <div key={day + index}>
                { movies.map((movie, movieIndex) => (
                  <div
                    key={movieIndex}
                    onClick={() => nav(`/content-data/movie/${movie.id}`)}
                    className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md my-4 cursor-pointer"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={'/src/assets/images/no-image.jpg'}
                      className="object-cover"
                    />
                    <p className="p-4 text-md font-semibold truncate">{movie.title || movie.name}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

CalendarContent.propTypes = {
  data: PropTypes.shape({
    days: PropTypes.arrayOf(PropTypes.string).isRequired,
    releases: PropTypes.array.isRequired
  }).isRequired
}