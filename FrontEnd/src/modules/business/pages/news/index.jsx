import {
	Header,
	Footer,
	PageTopIllustration,
} from '/src/modules/common/components';
import { ArticlesGrid } from './components';

export default function News() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Content Announcements
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600 dark:text-white">
						Stay updated with the latest announcements from the StreamLine team!
					</p>
				</div>
				<ArticlesGrid />
			</main>
			<Footer />
		</div>
	);
}
