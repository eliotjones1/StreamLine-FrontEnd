import { ImageContainer } from './components';
import { useBusiness } from 'src/modules/business/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function ImageGrid() {
	const { fetchTop7Streaming } = useBusiness();

	const { status, data } = useQuery({
		queryKey: ['business', 'top 7 streaming'],
		staleTime: Infinity,
		queryFn: () => fetchTop7Streaming(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none col-span-1 col-start-2 overflow-hidden"
		>
			<div className="transform">
				<div className="grid grid-cols-3 gap-x-6 lg:gap-x-8">
					<div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
						{data.slice(0, 2).map((image, index) => (
							<ImageContainer
								key={index}
								src={image.src}
								alt={image.alt}
								classNameMods={index === 0 ? 'items-end' : 'items-start'}
							/>
						))}
					</div>

					<div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
						{data.slice(2, 5).map((image, index) => (
							<ImageContainer key={index} src={image.src} alt={image.alt} />
						))}
					</div>

					<div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
						{data.slice(5, 7).map((image, index) => (
							<ImageContainer
								key={index}
								src={image.src}
								alt={image.alt}
								classNameMods={index === 0 ? 'items-end' : 'items-start'}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
