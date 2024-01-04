import {
	Header,
	Footer,
	PageTitle,
	PageTopIllustration,
} from '/src/modules/common/components';
import { Releases, ManageSubscriptions, PaymentTable, Bundles, WatchList } from './components';
import { StreamLineAxios } from '../../../../api/axios.config.js';
import { useState, useEffect } from 'react';
import { useAuth } from '/src/modules/auth/hooks';
import { useNavigate } from 'react-router-dom';

export default function UserDash() {
	const[subscriptionType, setSubscriptionType] = useState(null)

	{ /* THIS MOTHERFUCKER MAKES WAYYYYY TOO MANY CALLS TO '/api/get-user-data/' AND IDK WHY */}
	useEffect(() => {
		const getSubscriptionStatus = async () => {
			try {
				const response = await StreamLineAxios.get('/settings/subscription/status/');
				if (response.data.Basic === true) {
					setSubscriptionType("basic");
				} else if (response.data.Premium === true) {
					setSubscriptionType("premium")
				} else {
					setSubscriptionType("none")
				}
			} catch (error) {
				console.error('Error fetching status', error);
			}
		};
		getSubscriptionStatus();

		}, []);


	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow max-w-7xl mx-auto w-full">
				<PageTitle title="StreamLine Dashboard" />
				<div className="grid grid-cols-2 gap-6 pb-6">
					<Releases />
					{subscriptionType === "none" ? <Bundles/> : <ManageSubscriptions />}
				</div>
				{subscriptionType === "none" ? <WatchList /> : <PaymentTable />}
			</main>
			<Footer />
		</div>
	);
}
