import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/modules/auth/hooks';

export default function BtnAndArwBtn({ arrowBtnText, newNavURL }) {
	const nav = useNavigate();
	const { isLoggedIn } = useAuth();

	return (
		<div className="flex items-center justify-center gap-x-6">
			<button
				aria-label="Get Started"
				onClick={() => nav(isLoggedIn ? '/user-dash' : '/signup')}
				className="colored-sky-btn"
			>
				Get started
			</button>
			<button
				aria-label={arrowBtnText}
				onClick={() => nav(newNavURL)}
				className="arrow-btn"
			>
				{arrowBtnText} <span aria-hidden="true">→</span>
			</button>
		</div>
	);
}

BtnAndArwBtn.propTypes = {
	arrowBtnText: PropTypes.string.isRequired,
	newNavURL: PropTypes.string.isRequired,
};
