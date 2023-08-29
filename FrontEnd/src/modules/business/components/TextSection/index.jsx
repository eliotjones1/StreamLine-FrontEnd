import PropTypes from 'prop-types';

export default function TextSection({
	sectionHeader = undefined,
	sectionSubHeader = undefined,
	paragraphTextList = [],
}) {
	return (
		<div className="space-y-4">
			{(sectionHeader !== undefined || sectionSubHeader !== undefined) && (
				<div className="mb-6">
					{sectionHeader !== undefined && (
						<h2 className="text-4xl font-bold tracking-tight">
							{sectionHeader}
						</h2>
					)}
					{sectionSubHeader !== undefined && (
						<h2 className="text-2xl font-bold tracking-tight">
							{sectionSubHeader}
						</h2>
					)}
				</div>
			)}
			{paragraphTextList.map((text, index) => (
				<p className="text-lg leading-8" key={index}>
					{text}
				</p>
			))}
		</div>
	);
}

TextSection.propTypes = {
	sectionHeader: PropTypes.string,
	sectionSubHeader: PropTypes.string,
	paragraphTextList: PropTypes.arrayOf(PropTypes.string),
};
