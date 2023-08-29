import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ lastSearch = '' }) {
	const nav = useNavigate();

	return (
		<div className="flex justify-between pb-10">
			<p className="mr-auto">
				Showing search results for &quot;{lastSearch}&quot;
			</p>
			<button className="ml-auto text-sky-600" onClick={() => nav('/media')}>
				Return to main
			</button>
		</div>
	);
}

NavBar.propTypes = {
	lastSearch: PropTypes.string,
};
