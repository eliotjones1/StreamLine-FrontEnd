import { Founders, Mission, Story, Revolution } from './components';
import {
	Header,
	Footer,
	PageTitle,
	PageTopIllustration,
} from '/src/modules/common/components';

export default function About() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow mx-auto max-w-7xl">
				<PageTitle title="About StreamLine" />
				<Mission />
				<Story />
				<Founders />
				<Revolution />
			</main>
			<Footer />
		</div>
	);
}
