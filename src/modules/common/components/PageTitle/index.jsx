import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';

export default function PageTitle({
	title,
	subTitle = undefined,
	invertColors = false,
}) {
	const words = title.split(' ');

	return (
		<div
			className={`pt-28 pb-6 max-w-3xl mx-auto text-center ${
				invertColors ? 'text-white' : 'text-slate-800'
			}`}
		>
			<Typography variant="h1">
				{words.map((word, index) => {
					const isStreamline = /streamline/i.test(word);
					return (
						<span key={index} className={isStreamline ? 'text-sky-600' : null}>
							{word}{' '}
						</span>
					);
				})}
			</Typography>
			{subTitle && (
				<p className="mt-2 text-lg leading-8 text-gray-600 dark:text-white">
					{subTitle}
				</p>
			)}
		</div>
	);
}

PageTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	invertColors: PropTypes.bool,
};
