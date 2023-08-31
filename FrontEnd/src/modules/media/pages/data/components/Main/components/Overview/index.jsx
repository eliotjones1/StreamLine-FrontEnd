import PropTypes from 'prop-types';

export default function Overview({ text = '' }) {
	return (
		<div className="mt-2 flex-rows flex-wrap text-sm leading-6 font-medium">
			<div className="w-full font-normal">
				<p className="font-semibold text-xl mb-2">Overview</p>
				{text}
			</div>
		</div>
	);
}

Overview.propTypes = {
	text: PropTypes.string,
};
