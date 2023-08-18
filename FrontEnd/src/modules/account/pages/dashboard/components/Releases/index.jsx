import { useNavigate } from 'react-router-dom';
import { useAccount } from '/src/modules/account/hooks';
import { useQuery } from '@tanstack/react-query';

export default function Calendar() {
  const nav = useNavigate();
  const { fetchUpcoming } = useAccount();

  const { status, data } = useQuery({
    queryKey: ["account", "upcoming"],
    queryFn: () => fetchUpcoming()
  })

  if (status === "loading") return <></>;
  if (status === "error") return <></>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Upcoming Releases</h1>
      <div className="rounded-md border-0 px-3.5 pt-2 shadow-sm ring-1 ring-inset ring-slate-900/5 bg-slate-50 dark:bg-slate-700">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {data.days.map((day) => (
            <div key={day} className="bg-sky-600 text-white text-center py-2 rounded-md shadow-md">
              {day}
            </div>
          ))}
        </div>

        {data.releases.length === 0 ? (
          <p className="flex w-full justify-center py-4">No new content this week.</p>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {data.days.map((day) => (
              <div key={day} className="max-h-[75vh] overflow-y-auto">
                {data.releases.map((movies, index) => {
                  if (movies.length === 0) return null; 
                  if (day !== data[index]) return null;
                  return (
                    <div key={day + index}>
                      {movies.map((movie, movieIndex) => (
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
                          <p className="p-4 text-md font-semibold truncate">{movie.title}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
