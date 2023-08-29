import { Input, IconButton } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PageTitle } from 'src/modules/common/components';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
	const nav = useNavigate();

	const handleSearch = (event) => {
		event.preventDefault();
		const searchQuery = event.target.search.value;
		nav(`/media?search=${searchQuery}`);
	};

	return (
		<div className="mx-auto w-full pb-10">
			<div className="relative isolate bg-slate-900 dark:bg-slate-50 px-6 shadow-2xl pb-8">
				<PageTitle title="StreamLine Content Discovery" invertColors={true} />
				<form
					className="max-w-4xl mx-auto relative h-16"
					onSubmit={handleSearch}
				>
					<div className="container max-w-4xl mx-auto w-full relative flex">
						<IconButton
							type="submit"
							className="text-slate-800 bg-white hover:bg-slate-200 rounded-r-none"
							variant="text"
						>
							<MagnifyingGlassIcon className="h-4" />
						</IconButton>
						<Input
							name="search"
							type="text"
							placeholder="Search content...."
							className="rounded-l-none !border-none bg-white text-gray-900 ring-4 ring-transparent placeholder:text-slate-500"
							labelProps={{
								className: 'hidden',
							}}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
