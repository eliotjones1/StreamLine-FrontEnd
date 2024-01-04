import {
	Header,
	Footer,
	PageTitle,
	PageTopIllustration,
} from '/src/modules/common/components';
import { PricingCard } from './components';

export default function Pricing() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow pb-24 sm:pb-32 mx-auto max-w-7xl px-6 lg:px-8">
				<PageTitle title="Discover Our Pricing Options" />
				<PricingCard
					title="Premium Membership"
					description={
						'Our Premium Membership automates essential features and benefits designed to enhance your streaming experience. Enjoy access to a range of core services and valuable resources effortlessly.'
					}
					features={[
						'Automated Subscription Enrollment',
						'Automated Subscription Cancellation',
						'All Basic Membership Features',
					]}
					price="$30.00"
					link="https://buy.stripe.com/test_5kA3dSb1C05s23K4gi"
				/>
				<PricingCard
					title="Basic Membership"
					description={
						'Our Basic Membership offers essential features and benefits designed to enhance your streaming experience. Enjoy access to a range of core services and valuable resources.'
					}
					features={[
						'Monthly Subscription Change Alerts',
						'Personalized Optimization Bundles',
						'Warning on Upcoming Payments',
						'Monthly Newsletter',
					]}
					price="$10.00"
					link="https://buy.stripe.com/test_9AQ4hW9Xy2dAbEk6op"
					isAvailable={true}
				/>
			</main>
			<Footer />
		</div>
	);
}
