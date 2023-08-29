import {
	Header,
	Footer,
	PageTopIllustration,
} from '/src/modules/common/components';
import { ArticlesGrid } from './components';
import { PageTitle } from 'src/modules/common/components';

export default function News() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
				<PageTitle
					title="Content Announcements"
					subTitle="Stay updated with the latest announcements from the StreamLine team!"
				/>
				<ArticlesGrid />
			</main>
			<Footer />
		</div>
	);
}
