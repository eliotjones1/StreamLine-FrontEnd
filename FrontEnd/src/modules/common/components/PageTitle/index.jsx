import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';

export default function PageTitle({ title, invertColors = false }) {
	const words = title.split(' ');

	return (
		<div
			className={`pt-28 pb-6 max-w-3xl mx-auto text-center ${
				invertColors ? 'text-white' : 'text-slate-800'
			}`}
		>
			<Typography variant="h1" className="pb-8">
				{words.map((word, index) => {
					const isStreamline = /streamline/i.test(word);
					return (
						<span key={index} className={isStreamline ? 'text-sky-600' : null}>
							{word}{' '}
						</span>
					);
				})}
			</Typography>
		</div>
	);
}

PageTitle.propTypes = {
	title: PropTypes.string.isRequired,
	invertColors: PropTypes.bool,
};
