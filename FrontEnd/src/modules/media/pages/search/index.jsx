import { Header, Footer } from '/src/modules/common/components';
import { SearchContent, DefaultContent } from './components';
import { SearchBar } from 'src/modules/media/components';
import { useLocation } from 'react-router-dom';

export default function SearchMedia() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchQuery = queryParams.get('search');

	return (
		<div>
			<Header flipColors={true} />
			<main className="grow">
				<SearchBar />
				{searchQuery ? (
					<SearchContent searchQuery={searchQuery} />
				) : (
					<DefaultContent />
				)}
			</main>
			<Footer />
		</div>
	);
}
