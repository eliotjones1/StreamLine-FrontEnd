import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ post }) {
	const nav = useNavigate();

	return (
		<Card
			className="max-w-[24rem] overflow-hidden cursor-pointer"
			onClick={() => nav(`/news/${post.id}`)}
		>
			<CardHeader
				floated={false}
				shadow={false}
				color="transparent"
				className="m-0 rounded-none"
			>
				<img src={post.image_url} alt={post.title} />
			</CardHeader>
			<CardBody>
				<Typography variant="h4" color="blue-gray">
					{post.title}
				</Typography>
				<Typography variant="lead" color="gray" className="mt-3 font-normal">
					{post.content}
				</Typography>
			</CardBody>
			<CardFooter className="flex items-center justify-between">
				<Typography className="font-normal">{post.author}</Typography>
				<Typography className="font-normal">
					{new Intl.DateTimeFormat('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					}).format(new Date(post.created_at))}
				</Typography>
			</CardFooter>
		</Card>
	);
}

BlogCard.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image_url: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
	}).isRequired,
};
