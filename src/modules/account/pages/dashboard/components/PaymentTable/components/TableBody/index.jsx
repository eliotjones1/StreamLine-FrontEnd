import { Avatar, Chip, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import logo from 'src/assets/images/StreamLine_Transparent_Logo.png';

export default function TableBody({ tableRows }) {
	return (
		<tbody>
			{tableRows.map(
				(
					{ img, name, amount, date, status, account, accountNumber, expiry },
					index,
				) => {
					const isLast = index === tableRows.length - 1;
					const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
					const image = name === "StreamLine" ? logo : img;

					return (
						<tr key={name}>
							<td className={classes}>
								<div className="flex items-center gap-3">
									<Avatar
										src={image}
										alt={name}
										size="md"
										className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
									/>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-bold"
									>
										{name}
									</Typography>
								</div>
							</td>
							<td className={classes}>
								<Typography
									variant="small"
									color="blue-gray"
									className="font-normal"
								>
									${amount.toFixed(2)}
								</Typography>
							</td>
							<td className={classes}>
								<Typography
									variant="small"
									color="blue-gray"
									className="font-normal"
								>
									{date}
								</Typography>
							</td>
							<td className={classes}>
								<div className="w-max">
									<Chip
										size="sm"
										variant="ghost"
										value={status}
										color={
											status === 'paid'
												? 'green'
												: status === 'pending'
												? 'amber'
												: 'red'
										}
									/>
								</div>
							</td>
							<td className={classes}>
								<div className="flex items-center gap-3">
									<div className="h-9 w-12 bg-white rounded-md border border-blue-gray-50 p-1">
										<Avatar
											src={
												account === 'visa'
													? 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png'
													: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png'
											}
											size="sm"
											alt={account}
											variant="square"
											className="h-full w-full object-contain p-1"
										/>
									</div>
									<div className="flex flex-col">
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal capitalize"
										>
											{account.split('-').join(' ')} {accountNumber}
										</Typography>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal opacity-70"
										>
											{expiry}
										</Typography>
									</div>
								</div>
							</td>
						</tr>
					);
				},
			)}
		</tbody>
	);
}

TableBody.propTypes = {
	tableRows: PropTypes.arrayOf(
		PropTypes.shape({
			img: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			amount: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
			account: PropTypes.string.isRequired,
			accountNumber: PropTypes.string.isRequired,
			expiry: PropTypes.string.isRequired,
		}),
	).isRequired,
};
