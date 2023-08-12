import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ButtonAndArrowBtn({ arrowBtnText, newNavURL }) {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center gap-x-6">
      <button
        onClick={() => nav('/signup')}
        className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Get started
      </button>
      <button onClick={() => nav(newNavURL)} className="text-sm font-semibold leading-6">
        {arrowBtnText} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

ButtonAndArrowBtn.propTypes = {
  arrowBtnText: PropTypes.string.isRequired,
  newNavURL: PropTypes.string.isRequired,
};

export default ButtonAndArrowBtn;
