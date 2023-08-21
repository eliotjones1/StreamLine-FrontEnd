import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CircularPagination({ paginationData, setPage }) {
	const getPageList = (currentPage, maxPages) => {
		const pageList = [];
		let startPage = Math.max(1, currentPage - 2);
		let endPage = Math.min(maxPages, currentPage + 2);
		for (let i = startPage; i <= endPage; i++) {
			pageList.push(i);
		}

		while (pageList.length < 5 && (startPage > 1 || endPage < maxPages)) {
			if (endPage < maxPages) {
				pageList.push(++endPage);
			} else if (startPage > 1) {
				pageList.unshift(--startPage);
			}
		}

		return pageList;
	};

	const getItemProps = (index) => ({
		variant: paginationData.curPage === index ? 'filled' : 'text',
		color: paginationData.curPage === index ? 'blue' : 'gray',
		onClick: () => setPage(index),
		className: 'rounded-full',
	});

	const next = () => {
		if (paginationData.curPage !== paginationData.numPages) {
			setPage(paginationData.curPage + 1);
		}
	};

	const prev = () => {
		if (paginationData.curPage !== 1) {
			setPage(paginationData.curPage - 1);
		}
	};

	return (
		<div className="flex items-center gap-4">
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full"
				onClick={prev}
				disabled={paginationData.curPage === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
			</Button>
			<div className="flex items-center gap-2">
				{getPageList(paginationData.curPage, paginationData.numPages).map(
					(pageNum) => (
						<IconButton {...getItemProps(pageNum)} key={pageNum}>
							{pageNum}
						</IconButton>
					),
				)}
			</div>
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full"
				onClick={next}
				disabled={paginationData.curPage === paginationData.numPages}
			>
				Next
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
}

CircularPagination.propTypes = {
	paginationData: PropTypes.shape({
		curPage: PropTypes.number.isRequired,
		numPages: PropTypes.number.isRequired,
	}).isRequired,
	setPage: PropTypes.func.isRequired,
};
