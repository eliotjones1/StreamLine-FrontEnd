import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
	Avatar,
	Typography,
} from '@material-tailwind/react';
import { useAccount } from 'src/modules/common/hooks';

const TABLE_HEAD = ['Version', 'Cost', 'End Date', ''];

export default function Accordian({ recommendations, close }) {
	const { addSubscription } = useAccount();
	const [openAccordions, setOpenAccordions] = useState(
		recommendations.map(() => true),
	);
	const [endDate, setEndDate] = useState(getDefaultDate);
	useEffect(() => {
		console.log("Updated enddate: ", endDate);
		}, [endDate]);
	function getDefaultDate() {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 30);
		return currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
	}

	const handleDateChange = (event) => {
		setEndDate(event.target.value);
	};
	const handleClick = (event, subscription) => {
		event.preventDefault();
		addSubscription(subscription);
		close();
	};

	const handleAccordionToggle = (index) => {
		setOpenAccordions((prevOpenAccordions) => {
			const updatedOpenAccordions = [...prevOpenAccordions];
			updatedOpenAccordions[index] = !updatedOpenAccordions[index];
			return updatedOpenAccordions;
		});
	};

	return (
		<>
			{recommendations.map((subscription, index) => (
				<Accordion open={openAccordions[index]} key={index}>
					<AccordionHeader onClick={() => handleAccordionToggle(index)}>
						<div className="flex items-center gap-3">
							<Avatar
								src={`https://image.tmdb.org/t/p/original${subscription.Image}`}
								alt={subscription.Name}
								size="md"
								className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
							/>
							<Typography variant="h4" color="blue-gray" className="font-bold">
								{subscription.Name}
							</Typography>
						</div>
					</AccordionHeader>
					<AccordionBody>
						<table className="w-full min-w-max table-auto text-left">
							<thead>
								<tr>
									{TABLE_HEAD.map((head) => (
										<th
											key={head}
											className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
										>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal leading-none opacity-70"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{subscription.Packages.map((version, index) => {
									const isLast = index === subscription.Packages.length - 1;
									const classes = isLast
										? 'p-4'
										: 'p-4 border-b border-blue-gray-50';
									console.log(version);
									return (
											<tr key={index}>
										  <td className={classes}>
										    <Typography
										      variant="small"
										      color="blue-gray"
										      className="font-normal"
										    >
										      {version.Version}
										    </Typography>
										  </td>
										  <td className={classes}>
										    <Typography
										      variant="small"
										      color="blue-gray"
										      className="font-normal"
										    >
										      ${version.Price}
										    </Typography>
										  </td>
										  <td className={classes}>
										    <input
										      type="date"
										      defaultValue={endDate}
										      onChange={handleDateChange
										      }
										      className="form-input w-full"
										    />
										  </td>
										  <td className={classes}>
										    <Typography
										      as="a"
										      variant="small"
										      className="text-link font-medium"
										      onClick={(event) =>
										        handleClick(event, {
										          'Name': subscription.Name,
										          'Price': version.Price,
										          'Version': version.Version,
										          'End_Date': endDate,
										        })
											  }
										    >
										      Subscribe
											</Typography>
										  </td>
											</tr>

									);
								})}
							</tbody>
						</table>
					</AccordionBody>
				</Accordion>
			))}
		</>
	);
}

Accordian.propTypes = {
	recommendations: PropTypes.arrayOf(
		PropTypes.shape({
			Image: PropTypes.string.isRequired,
			Name: PropTypes.string.isRequired,
			Packages: PropTypes.arrayOf(
				PropTypes.shape({
					Version: PropTypes.string.isRequired,
					Price: PropTypes.number.isRequired,
				}),
			).isRequired,
		}),
	).isRequired,
	close: PropTypes.func.isRequired,
};
