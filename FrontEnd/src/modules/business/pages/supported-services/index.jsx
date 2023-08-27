import {
	Header,
	Footer,
	PageTitle,
	PageTopIllustration,
} from '/src/modules/common/components';
import { Services } from './components';

export default function SupportedServices() {
	return (
		<section>
			<Header />
			<PageTopIllustration />
			<main className="grow">
				<PageTitle title="StreamLine Supported Services" />
				<Services />
			</main>
			<Footer />
		</section>
	);
}
