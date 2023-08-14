export default function MediaInfo({ info }) {
  return (
    <>
      <div>
        <h3 className="font-bold text-xl">Media Type</h3>
        <p>{info.media_type}</p>
      </div>

      <div>
        <h3 className="font-bold text-xl">Status</h3>
        <p>{info.status}</p>
      </div>

      <div>
        <div className="flex space-x-1 items-center">
          <h3 className="font-bold text-xl">Rating</h3>
          <div className="text-sky-500">
            <svg width="16" height="20" fill="currentColor">
              <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
            </svg>
          </div>
        </div>
        <p>{info.vote_average.toFixed(2)} / 10</p>
      </div>

      {info.seasons && info.seasons.length > 0 && (
        <div>
          <h3 className="font-bold text-xl">Seasons</h3>

          {info.seasons.map((season, index) => (
            <li key={index} className="ml-2 font-semibold">
              {`Season ${season.season_number}: ${season.name}`}
              <li className="ml-4 font-normal">{`Aired: ${new Date(season.air_date).toLocaleString(
                'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}`}</li>
              <li className="ml-4 font-normal">{`Episodes: ${season.episode_count}`}</li>
            </li>
          ))}
        </div>
      )}

      <div>
        <h3 className="font-bold text-xl">Budget</h3>
        <p>
          {info.budget === undefined || info.budget === 0
            ? 'Currently Unknown'
            : info.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl">Reported Revenue</h3>
        <p>
          {info.revenue === undefined || info.revenue === 0
            ? 'Currently Unknown'
            : info.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>
      <div>
        <h3 className="font-bold text-xl">Producers:</h3>
        <ul className="space-y-2">
          {info.production_companies.map((producer, index) => (
            <li key={index}>{producer.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-xl">Spoken Languages:</h3>
        {info.spoken_languages.map((language) => (
          <li key={language.iso_639_1} className="ml-2">
            {`${language.english_name} (${language.name})`}
          </li>
        ))}
      </div>
    </>
  );
}