import { Featured, MediaMain } from './components';
import { Header, Footer } from 'src/modules/common/components';

export default function VirtualCableBox() {
	return (
		<div className="flex flex-col min-h-screen bg-black">
			<Header flipColors={true} />
			<main className="grow">
				<Featured />
				<MediaMain />
			</main>
			<Footer />
		</div>
	);
}
