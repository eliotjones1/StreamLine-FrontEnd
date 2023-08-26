import { PlayIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Featured() {
	const featuredMedia = {
		title: 'Ahsoka',
		overview:
			'Former Jedi Knight Ahsoka Tano investigates an emerging threat to a vulnerable galaxy.',
		main_link: 'https://www.disneyplus.com/series/ahsoka/pdpjs2TO4zJ4',
		episode_link:
			'https://www.disneyplus.com/video/8ae78b52-316a-48c7-a5cd-f4175d153a93',
	};

	return (
		<div className="h-[66.6666667vh] bg-cover bg-[url(https://image.tmdb.org/t/p/original/mvoW41kdSxiobGZ9ONL1Tqrpt3h.jpg)]">
			<div className="h-full w-1/3 flex flex-col justify-end py-20 pl-20 text-white space-y-4">
				<p className="font-bold text-6xl">{featuredMedia.title}</p>
				<p className="font-semibold">{featuredMedia.overview}</p>
				<div className="flex space-x-4">
					<a
						className="basic-btn flex items-center justify-center space-x-2"
						href={featuredMedia.episode_link}
						target="_blank"
						rel="noreferrer"
					>
						<PlayIcon className="h-6" />
						<p className="font-normal text-lg">Play</p>
					</a>
					<a
						className="basic-btn !bg-slate-900 !text-white flex items-center justify-center space-x-2"
						href={featuredMedia.main_link}
						target="_blank"
						rel="noreferrer"
					>
						<InformationCircleIcon className="h-6" />
						<p className="font-normal text-lg">More Info</p>
					</a>
				</div>
			</div>
		</div>
	);
}
