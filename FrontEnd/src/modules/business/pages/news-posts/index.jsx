import {
	Header,
	Footer,
	PageTopIllustration,
} from 'src/modules/common/components';
import { TextSection } from 'src/modules/business/components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { useBusiness } from 'src/modules/business/hooks';
import { Typography } from '@material-tailwind/react';

export default function NewsPost() {
	const { id } = useParams();
	const { fetchNewsPost } = useBusiness();

	const { status, data } = useQuery({
		queryKey: ['business', 'news', 'post', id],
		staleTime: Infinity,
		queryFn: () => fetchNewsPost(id),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<PageTopIllustration />
			<main className="grow max-w-3xl mx-auto pt-20 text-slate-800">
				<img className="pb-4" src={data.image_url} alt={''} />
				<Typography variant="h1">{data.title}</Typography>
				<div className="mb-4 pb-4 border-b border-slate-300">
					<div className="flex items-center gap-4">
						<Typography variant="h6">By: {data.author}</Typography>
						<Typography variant="h6">|</Typography>
						<Typography variant="h6">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							}).format(new Date(data.created_at))}
						</Typography>
					</div>
				</div>
				<TextSection paragraphTextList={data.content.split('\r\n\r\n')} />
			</main>
			<Footer />
		</div>
	);
}
