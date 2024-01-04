import { useBusiness } from '/src/modules/business/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { StreamLineAxios } from '../../../../../../api/axios.config.js';


export default function Content() {
	const { fetchAllServices } = useBusiness();
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentSubscription, setCurrentSubscription] = useState(null);
	const [addedSubscriptions, setAddedSubscriptions] = useState(new Set());
	
	const nav = useNavigate();
    
	
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
	
    useEffect(() => {
        const initializeSubscriptions = async () => {
            try {
                const subscriptions = await fetchUserSubscriptions();
                addSubscriptionsToSet(subscriptions, setAddedSubscriptions);
                console.log(setAddedSubscriptions);
            } catch (error) {
                // Handle or log error
            }
        };

        initializeSubscriptions();
        }, []);
	
    {/* Handle Previous Subscriptions Check */}
    const fetchUserSubscriptions = async () => {
        try {
            const response = await StreamLineAxios.get('/settings/user-subscriptions/view/');
            return response.data;
        } catch (error) {
            console.error('Error fetching user subscriptions:', error);
            // Handle the error appropriately
            throw error;
        }
    };
    
    const addSubscriptionsToSet = (subscriptions, setAddedSubscriptions) => {
        const subscriptionNames = subscriptions.map(sub => sub.subscription_name); // Adjust 'name' based on your data structure
        setAddedSubscriptions(new Set(subscriptionNames));
    };
    

	{/* Handle Services */}

	const { status, data } = useQuery({
		queryKey: ['business', 'supported services'],
		queryFn: async () => {
			return await fetchAllServices();
		},
	});

	const columns = data ? Object.keys(data) : [];

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	const generateDataArray = (data, columns) => {
		if (data && columns.length > 0) {
			const rowCount = Object.keys(data[columns[0]]).length;
			return Array.from({ length: rowCount }, (_, rowIndex) => {
				return columns.reduce((acc, column) => {
					acc[column] = data[column][rowIndex];
					return acc;
				}, {});
			});
		}
		return [];
	};

	const dataArray = generateDataArray(data, columns);

	const filterData = (dataArray, columns, searchTerm) => {
		return dataArray.filter((row) =>
			columns.some((column) =>
				String(row[column]).toLowerCase().includes(searchTerm.toLowerCase()),
			),
		);
	};

	const filteredData = filterData(dataArray, columns, searchTerm);

	{/* Subscription Handling */}
	
	const handleAddSubscription = (row) => {
		// Initialize with "Package 1" if available, else set to "other"
		const initialPackage =
			row['Package 1'] &&
			row['Package 1'] !== 'Not Available' &&
			row['Package 1'] !== '-'
				? 'Package 1'
				: 'other';

		setCurrentSubscription({
			...row,
			selectedPackage: initialPackage,
			packageName: row[initialPackage],
			packagePrice:
				initialPackage !== 'other' ? row[`${initialPackage} Price`] : '',
		});

		setIsModalOpen(true);
	};

	const handleSubmitSubscription = async () => {
		let packageName, packagePrice;

		if (currentSubscription?.selectedPackage === 'other') {
			packageName = currentSubscription?.otherPackage;
			packagePrice = currentSubscription?.otherPrice;
		} else {
			const selectedPackageName = `${currentSubscription?.selectedPackage}`; // e.g., "Package 1"
			packageName = currentSubscription[selectedPackageName];
			const selectedPriceName = `${selectedPackageName} Price`; // e.g., "Package 1 Price"
			packagePrice = currentSubscription[selectedPriceName];
		}

		const subscriptionData = {
			Name: currentSubscription?.Name,
			Version: packageName,
			Price: packagePrice,
			End_Date: endDate,
		};
		console.log(subscriptionData);
		try {
			const response = await StreamLineAxios.post(
				'/settings/user-subscriptions/create/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: subscriptionData,
				},
			);

			// Handle the response data here
			const responseData = await response;
			console.log('Subscription added:', responseData);

			// Add the subscription to the list of added subscriptions
			setAddedSubscriptions(
				(prev) => new Set(prev.add(currentSubscription?.Name)),
			);

			// Close the modal
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error submitting subscription:', error);
			// Handle error scenarios here
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '20px',
			}}
		>
			<p
				style={{
					textAlign: 'center',
					paddingTop: '20px',
					paddingBottom: '40px',
					fontSize: '1.5em',
				}}
			>
				Add your streaming services from the table below. If you notice any
				errors, please click{' '}
				<span
					onClick={() => nav('/support')}
					style={{ color: 'blue', cursor: 'pointer' }}
				>
					here
				</span>{' '}
				to let us know. All prices in USD.
			</p>
			<div style={{ marginBottom: '10px' }}>
				<span style={{ marginRight: '10px', fontWeight: 'bold' }}>
					Filter for services here:
				</span>
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{
						padding: '8px',
						border: '2px solid #555',
						borderRadius: '8px',
						outline: 'none',
					}}
				/>
			</div>
			<div style={{ maxHeight: '400px', overflow: 'auto', width: '100%' }}>
				<table
					style={{
						borderCollapse: 'collapse',
						width: '100%',
						borderRadius: '10px',
					}}
				>
					<thead>
						<tr>
							{columns
								.filter((column) => column !== 'logo_path')
								.map((column, index) => (
									<th
										key={index}
										style={{
											border: '1px solid #ddd',
											padding: '8px',
											textAlign: 'center',
											backgroundColor: '#f4f4f4',
										}}
									>
										{column}
									</th>
								))}
							<th>Add Subscription</th> {/* New column header */}
						</tr>
					</thead>
					<tbody>
						{filteredData.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{columns
									.filter((column) => column !== 'logo_path')
									.map((column, colIndex) => (
										<td
											key={colIndex}
											style={{
												border: '1px solid #ddd',
												padding: '8px',
												textAlign: 'center',
												backgroundColor:
													rowIndex % 2 === 0 ? '#f9f9f9' : 'none',
											}}
										>
											{column === 'Name' ? (
												<div style={{ display: 'flex', alignItems: 'center' }}>
													<img
														src={`https://image.tmdb.org/t/p/w500/${row['logo_path']}`}
														alt={row[column]}
														style={{
															width: '30px',
															height: '30px',
															borderRadius: '50%',
															objectFit: 'cover',
															marginRight: '10px',
														}}
													/>
													{row[column]}
												</div>
											) : column === 'Link' ? (
												<a
													href={row[column]}
													target="_blank"
													rel="noopener noreferrer"
												>
													{row[column]}
												</a>
											) : (
												row[column]
											)}
										</td>
									))}
								<td>
									<button
										onClick={() => handleAddSubscription(row)}
										disabled={addedSubscriptions.has(row.Name)}
										style={{
											padding: '5px 10px',
											borderRadius: '5px',
											cursor: addedSubscriptions.has(row.Name)
												? 'default'
												: 'pointer',
											backgroundColor: addedSubscriptions.has(row.Name)
												? 'grey'
												: '#4CAF50',
											color: 'white',
											border: 'none',
										}}
									>
										Add Subscription
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isModalOpen && (
				<div
					style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						backgroundColor: 'black',
						color: 'white',
						padding: '20px',
						zIndex: 200,
						borderRadius: '10px',
						width: '300px',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '20px',
						}}
					>
						<img
							src={`https://image.tmdb.org/t/p/w500/${currentSubscription?.['logo_path']}`}
							alt="Logo"
							style={{
								width: '30px',
								height: '30px',
								borderRadius: '50%',
								objectFit: 'cover',
								marginRight: '10px',
							}}
						/>
						<h2 style={{ margin: 0 }}>Add Subscription</h2>
					</div>
					<p>Name: {currentSubscription?.Name}</p>
					    <input
							type="date"
							defaultValue={endDate}
							onChange={handleDateChange
					      }
							className="form-input w-full"
						/>
					<select
						onChange={(e) =>
							setCurrentSubscription({
								...currentSubscription,
								selectedPackage: e.target.value,
							})
						}
						style={{ background: 'none' }}
					>
						{['Package 1', 'Package 2', 'Package 3', 'Package 4'].map((pkg) => {
							const packageValue = currentSubscription?.[pkg];
							const packagePrice = currentSubscription?.[`${pkg} Price`];
							if (
								packageValue &&
								packageValue !== 'Not Available' &&
								packageValue !== '-'
							) {
								return (
									<option
										key={pkg}
										value={pkg}
									>{`${packageValue} - $${packagePrice}`}</option>
								);
							}
							return null;
						})}
						<option value="other">Other</option>
					</select>
					{currentSubscription?.selectedPackage === 'other' && (
						<>
							<input
								type="text"
								placeholder="Other Package"
								onChange={(e) =>
									setCurrentSubscription({
										...currentSubscription,
										otherPackage: e.target.value,
									})
								}
								style={{ color: 'black' }}
							/>
							<input
								type="decimal"
								placeholder="Other Price"
								onChange={(e) =>
									setCurrentSubscription({
										...currentSubscription,
										otherPrice: e.target.value,
									})
								}
								style={{ color: 'black' }}
							/>
						</>
					)}
					<div style={{ marginTop: '10px' }}>
						<button
							onClick={handleSubmitSubscription}
							style={{
								width: '100%',
								padding: '8px',
								borderRadius: '5px',
								backgroundColor: '#4CAF50',
								color: 'white',
								border: 'none',
								marginBottom: '10px',
							}}
						>
							Submit
						</button>
						<button
							onClick={closeModal}
							style={{
								width: '100%',
								padding: '8px',
								borderRadius: '5px',
								backgroundColor: 'red',
								color: 'white',
								border: 'none',
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
}    


