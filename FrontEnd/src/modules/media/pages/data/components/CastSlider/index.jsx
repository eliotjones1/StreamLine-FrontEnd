import PropTypes from 'prop-types';

export default function CastSlider({ castCrew }) {
  return (
    <div className="p-1 pb-2 flex overflow-x-auto space-x-6 scrollbar-hidden relative">
      {castCrew.map((person, index) => {
        if (person.profile_path !== null) {
          return (
            <div
              className="w-40 shadow-md rounded-xl ring-1 ring-slate-200 dark:ring-slate-600"
              key={index}
            >
              <div className="card w-40 relative mx-4 md:mx-0 rounded-t-xl overflow-hidden">
                <img
                  className="img object-cover"
                  src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                  alt={person.name}
                />
              </div>
              <div className="p-3">
                <p className="font-semibold truncate">{person.name}</p>
                <p className="font-thin truncate">{person.character || person.job}</p>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

CastSlider.propTypes = {
  castCrew: PropTypes.arrayOf(
    PropTypes.shape({
      profile_path: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string,
      job: PropTypes.string,
    })
  ).isRequired,
};
