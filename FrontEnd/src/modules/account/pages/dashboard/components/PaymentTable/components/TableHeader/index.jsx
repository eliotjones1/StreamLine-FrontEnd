import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';

export default function TableHeader({ headers }) {
	return (
		<thead>
			<tr>
				{headers.map((head, index) => (
					<th
						key={index}
						className="border-y border-slate-300 bg-slate-200 p-4"
					>
						<Typography
							variant="small"
							className="font-semibold text-slate-900 leading-none opacity-70"
						>
							{head}
						</Typography>
					</th>
				))}
			</tr>
		</thead>
	);
}

TableHeader.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
