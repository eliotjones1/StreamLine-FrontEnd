import PropTypes from 'prop-types';

export default function TextSection({
	sectionHeader = undefined,
	sectionSubHeader = undefined,
	paragraphTextList = [],
}) {
	const formatText = (text) => {
		return text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
			if (index % 2 === 1) {
				// Text surrounded by ** is bolded
				return <strong key={index}>{part}</strong>;
			} else {
				return part;
			}
		});
	};

	return (
		<div className="space-y-4">
			{(sectionHeader !== undefined || sectionSubHeader !== undefined) && (
				<div className="mb-6">
					{sectionHeader !== undefined && (
						<h2 className="text-4xl font-bold tracking-tight">
							{formatText(sectionHeader)}
						</h2>
					)}
					{sectionSubHeader !== undefined && (
						<h2 className="text-2xl font-bold tracking-tight">
							{formatText(sectionSubHeader)}
						</h2>
					)}
				</div>
			)}
			{paragraphTextList.map((text, index) => (
				<p className="text-lg leading-8" key={index}>
					{formatText(text)}
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
