import { Header, Footer } from '/src/modules/common/components';
import { Releases, ManageSubscriptions, PaymentTable } from './components';
import { Typography } from '@material-tailwind/react';

export default function UserDash() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<main className="grow max-w-7xl mx-auto w-full mt-20">
				<Typography
					variant="h1"
					className="w-full text-center text-slate-800 pb-8"
				>
					<span className="text-sky-600">StreamLine</span> Dashboard
				</Typography>
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
