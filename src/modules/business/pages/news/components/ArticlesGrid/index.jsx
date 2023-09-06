import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { useBusiness } from 'src/modules/business/hooks';
import { BlogCard } from 'src/modules/business/pages/news/components';
import { Pagination } from 'src/modules/account/pages/dashboard/components/PaymentTable/components';

export default function ArticlesGrid() {
	const { fetchNews } = useBusiness();
	const [page, setPage] = useState(1);

	const { status, data } = useQuery({
		queryKey: ['business', 'news', 'page', page],
		staleTime: 24 * 60 * 60 * 1000, // One Day in Miliseconds
		queryFn: () => fetchNews(page),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;
	if (data.posts.length === 0) return <p>No news at this time.</p>;

	return (
		<>
			<div className="pt-6 max-w-7xl mx-auto grid grid-cols-3">
				{data.posts.map((post, index) => (
					<div className="px-2 py-4" key={index}>
						<BlogCard post={post} />
					</div>
				))}
			</div>
			<div className="pt-10 w-full flex justify-center items-center">
				<Pagination
					totalPages={data.totalPages}
					curPage={page}
					setPage={setPage}
				/>
			</div>
		</>
	);
}
