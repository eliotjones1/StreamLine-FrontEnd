import {
	Header,
	Footer,
	PageTitle,
	PageTopIllustration,
} from '/src/modules/common/components';
import { Releases, ManageSubscriptions, PaymentTable } from './components';

export default function UserDash() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow max-w-7xl mx-auto w-full">
				<PageTitle title="StreamLine Dashboard" />
				<div className="grid grid-cols-2 gap-6 pb-6">
					<Releases />
					<ManageSubscriptions />
				</div>
				<PaymentTable />
			</main>
			<Footer />
		</div>
	);
}
