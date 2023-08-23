import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CircularPagination({ totalPages, curPage, setPage }) {
	const getPageList = (currentPage) => {
		const pageList = [];
		let startPage = Math.max(1, currentPage - 2);
		let endPage = Math.min(totalPages, currentPage + 2);
		for (let i = startPage; i <= endPage; i++) {
			pageList.push(i);
		}

		while (pageList.length < 5 && (startPage > 1 || endPage < totalPages)) {
			if (endPage < totalPages) {
				pageList.push(++endPage);
			} else if (startPage > 1) {
				pageList.unshift(--startPage);
			}
		}

		return pageList;
	};

	const getItemProps = (index) => ({
		variant: curPage === index ? 'filled' : 'text',
		color: 'gray',
		onClick: () => setPage(index),
		className: `rounded-full ${curPage === index && 'bg-sky-600'}`,
	});

	const next = () => {
		if (curPage !== totalPages) {
			setPage(curPage + 1);
		}
	};

	const prev = () => {
		if (curPage !== 1) {
			setPage(curPage - 1);
		}
	};

	return (
		<div className="flex items-center gap-4">
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full"
				onClick={prev}
				disabled={curPage === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
			</Button>
			<div className="flex items-center gap-2">
				{getPageList(curPage).map((pageNum) => (
					<IconButton {...getItemProps(pageNum)} key={pageNum}>
						{pageNum}
					</IconButton>
				))}
			</div>
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full"
				onClick={next}
				disabled={curPage === totalPages}
			>
				Next
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
}

CircularPagination.propTypes = {
	curPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
