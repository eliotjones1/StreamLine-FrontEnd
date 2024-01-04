import PropTypes from 'prop-types';

export default function NavBar({ lastSearch = '' }) {

	return (
		<div className="flex justify-between pb-10">
	<p className="mr-auto text-slate-900">
		Showing search results for &quot;{lastSearch}&quot;
	</p>
		</div>
	);
}

NavBar.propTypes = {
	lastSearch: PropTypes.string,
};
