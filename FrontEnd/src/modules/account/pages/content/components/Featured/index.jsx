// import { PlayIcon } from '@heroicons/react';
export default function Featured() {
	const featuredMedia = {
		title: 'Ahsoka',
		overview:
			'Former Jedi Knight Ahsoka Tano investigates an emerging threat to a vulnerable galaxy.',
	};

	return (
		<div className="h-[66.666667vh] bg-cover bg-[url(https://image.tmdb.org/t/p/original/mvoW41kdSxiobGZ9ONL1Tqrpt3h.jpg)]">
			<div className="p-20 flex-col text-white">
				<p className="font-bold text-6xl">{featuredMedia.title}</p>
				<p>{featuredMedia.overview}</p>
				<div className="space-x-4">
					<button className="basic-btn font-">Play</button>
					<button className="basic-btn">More Info</button>
				</div>
			</div>
		</div>
	);
}
