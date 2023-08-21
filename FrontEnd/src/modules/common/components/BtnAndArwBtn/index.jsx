import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function BtnAndArwBtn({ arrowBtnText, newNavURL }) {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center gap-x-6">
      <button onClick={() => nav('/signup')} className="colored-sky-btn">
        Get started
      </button>
      <button onClick={() => nav(newNavURL)} className="arrow-btn">
        {arrowBtnText} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

BtnAndArwBtn.propTypes = {
  arrowBtnText: PropTypes.string.isRequired,
  newNavURL: PropTypes.string.isRequired,
};
