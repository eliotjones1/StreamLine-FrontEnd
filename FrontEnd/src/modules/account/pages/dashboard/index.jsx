import { Header, Footer } from '/src/modules/common/components';
import { Releases, Subscriptions PaymentTable } from './components';

export default function UserDash() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<main className="grow max-w-7xl mx-auto w-full mt-20">
				<div className="grid grid-cols-3 gap-6">
					<Subscriptions />
					<div className="col-span-2">
						<PaymentTable />
					</div>
				</div>
				<Releases />
			</main>
			<Footer />
		</div>
	);
}
