import { PlayIcon } from '@heroicons/react/24/solid';
import { Button } from '@material-tailwind/react';

export default function Featured() {
	const featuredMedia = {
		title: 'Ahsoka',
		overview:
			'Former Jedi Knight Ahsoka Tano investigates an emerging threat to a vulnerable galaxy.',
	};

	return (
		<div className="h-[66.6666667vh] bg-cover bg-[url(https://image.tmdb.org/t/p/original/mvoW41kdSxiobGZ9ONL1Tqrpt3h.jpg)]">
			<div className="p-20 flex-col text-white">
				<p className="font-bold text-6xl">{featuredMedia.title}</p>
				<p className="font-semibold">{featuredMedia.overview}</p>
				<div className="space-x-4">
					<Button>
						<PlayIcon className="h-6" />
						<p>Play</p>
					</Button>
					<button className="basic-btn">More Info</button>
				</div>
			</div>
		</div>
	);
}
