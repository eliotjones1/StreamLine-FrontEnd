import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import PropTypes from 'prop-types';
import { useMedia } from '/src/modules/media/hooks';
import {
	ContentCard,
	ContentNameAndDate,
} from '/src/modules/common/components';

export default function BasicContentData({ type, id }) {
	const { fetchMedia } = useMedia();

	const { status, data } = useQuery({
		queryKey: ['media', type, id, 'data'],
		staleTime: Infinity,
		queryFn: () => fetchMedia(type, id),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<div className="bg-slate-50 dark:bg-slate-700 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 space-x-2 flex shadow-md">
			<div className="flex relative w-1/4">
				<ContentCard content={data} />
			</div>
			<div className="w-3/4 space-y-1 relative">
				<ContentNameAndDate content={data} />
			</div>
		</div>
	);
}

BasicContentData.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};
