import { Header, Footer, PageTitle } from '/src/modules/common/components';
import { SearchBar, SearchContent, DefaultContent } from './components';
import { useMedia } from '/src/modules/media/hooks';

export default function MediaSearch() {
	const { showDefault } = useMedia();

	return (
		<section>
			<Header flipColors={true} />
			<main className="grow">
				<div className="mx-auto w-full pb-10">
					<div className="relative isolate bg-slate-900 dark:bg-slate-50 px-6 shadow-2xl pb-8">
						<PageTitle
							title="StreamLine Content Discovery"
							invertColors={true}
						/>
						<SearchBar />
					</div>
				</div>
				{showDefault ? <DefaultContent /> : <SearchContent />}
			</main>
			<Footer />
		</section>
	);
}
