import PropTypes from 'prop-types';
import { useMedia } from '/src/modules/media/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { NavBar, InitSearchResults } from './components';

export default function InitContent({ searchQuery }) {
	const { fetchSearch } = useMedia();

	const { status, data } = useQuery({
		queryKey: ['media', 'search', searchQuery],
		staleTime: Infinity,
		queryFn: () => fetchSearch(searchQuery),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<section className="max-w-6xl mx-auto">
			<NavBar lastSearch={searchQuery} />
			<InitSearchResults results={data} />
		</section>
	);
}

InitContent.propTypes = {
	searchQuery: PropTypes.string.isRequired,
};
