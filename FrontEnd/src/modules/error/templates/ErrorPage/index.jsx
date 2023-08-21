import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ErrorPageTemplate({ errNum, errName, errMessage }) {
  const nav = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-sky-600">{errNum}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{errName}</h1>
          <p className="mt-6 mb-10 text-base leading-7 text-gray-600 dark:text-gray-400">
            {errMessage}
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <button onClick={() => nav('/')} className="colored-sky-btn">
              Return Home
            </button>
            <button onClick={() => nav('/support')} className="arrow-btn">
              Contact Support <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

ErrorPageTemplate.propTypes = {
  errNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  errName: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
};
