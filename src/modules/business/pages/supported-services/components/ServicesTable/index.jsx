import { useBusiness } from '/src/modules/business/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function Content() {
	const { fetchServices } = useBusiness();

	const { status, data } = useQuery({
		queryKey: ['business', 'supported services'],
		queryFn: () => fetchServices(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<section className="max-w-7xl mx-auto grid grid-cols-5 gap-4">
			{data.map((service, index) => (
				<div
					className="bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 px-4 cursor-pointer shadow-md"
					key={index}
				>
					<a
						className="font-semibold space-y-2"
						href={service.link}
						target="_blank"
						rel="noreferrer"
					>
						<img
							className="w-full object-cover cursor-pointer"
							src={`https://image.tmdb.org/t/p/original${service.image}`}
							alt={'/src/assets/images/no-image.jpg'}
						/>
						<p>{service.title}</p>
					</a>
					{service.price && <p>Base Price: ${service.price}</p>}
				</div>
			))}
		</section>
	);
}
