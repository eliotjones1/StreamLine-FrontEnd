import PropTypes from 'prop-types';
import ContentCard from '../ContentCard';

export default function ContentSlider({ mediaContent }) {
	return (
		<div className="flex overflow-x-auto space-x-4 scrollbar-hidden relative">
			{mediaContent.map((content, index) => (
				<div className="w-44" key={index}>
					<ContentCard content={content} />
				</div>
			))}
		</div>
	);
}

ContentSlider.propTypes = {
	mediaContent: PropTypes.array.isRequired,
};
