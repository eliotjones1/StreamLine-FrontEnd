import { Input, IconButton } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMedia } from 'src/modules/media/hooks';

export default function Searchbar() {
	const { fetchSearch } = useMedia();

	const handleSubmit = async (event) => {
		event.preventDefault();
		fetchSearch(event.target.SearchText.value);
	};

	return (
		<form className="max-w-4xl mx-auto relative h-16" onSubmit={handleSubmit}>
			<div className="container max-w-4xl mx-auto w-full relative flex">
				<IconButton
					type="submit"
					className="text-slate-800 bg-white hover:bg-slate-200 rounded-r-none"
					variant="text"
				>
					<MagnifyingGlassIcon className="h-4" />
				</IconButton>
				<Input
					name="SearchText"
					type="text"
					placeholder="Search content...."
					className="rounded-l-none !border-none bg-white text-gray-900 ring-4 ring-transparent placeholder:text-slate-500"
					labelProps={{
						className: 'hidden',
					}}
				/>
			</div>
		</form>
	);
}
