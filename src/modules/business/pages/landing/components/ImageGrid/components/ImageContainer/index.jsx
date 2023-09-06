import PropTypes from 'prop-types';
import { useMedia } from 'src/modules/common/hooks';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QueryLoading } from 'src/modules/error/components';

export default function ImageContainer({ type, id, classNameMods }) {
	const { fetchMedia } = useMedia();
	const nav = useNavigate();

	const { status, data } = useQuery({
		queryKey: ['media', type, id, 'data'],
		staleTime: Infinity,
		queryFn: () => fetchMedia(type, id),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <></>;

	return (
		<div className={`flex h-full w-full justify-center ${classNameMods}`}>
			<div className="h-64 w-44 overflow-hidden rounded-lg">
				<img
					src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
					alt={'src/assets/images/no-image.jpg'}
					className="h-full w-full object-cover object-center"
					onClick={() => nav(`/media/${type}/${id}`)}
				/>
			</div>
		</div>
	);
}

ImageContainer.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	classNameMods: PropTypes.string,
};
