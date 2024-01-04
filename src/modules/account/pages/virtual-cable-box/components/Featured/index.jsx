import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Carousel } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { StreamLineAxios } from 'api/axios.config';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function Featured() {
	const [featuredMedia, setFeaturedMedia] = useState(null);
	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		const fetchFeaturedMedia = async () => {
			try {
				const response = await StreamLineAxios.get('/api/featured-content/');
				setFeaturedMedia(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchData = async () => {
			await Promise.all([fetchFeaturedMedia()]);
			setInitialLoad(false);
		};
		fetchData();
		}, []);

	if (initialLoad) {
			return <QueryLoading />
	}

	return (
		<Carousel>
			{
			  featuredMedia.map((media, index) => {
				  const backgroundImage = `https://image.tmdb.org/t/p/original/` + media.backdrop_path
				  return (
	<div
		key={index}
		className="h-[66.6666667vh] bg-cover"
		style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(${backgroundImage})`}}
	>
					<div className="h-full w-1/3 flex flex-col justify-end py-20 pl-20 text-white space-y-4">
							  <p className="font-bold text-2xl">{media.title || media.name}</p>
							  <p className="font-semibold text-[calc(1rem - (0.001 * ${media.overview.length})]">{media.overview}</p>
							  <div className="flex space-x-4">
								  <a
									  className="basic-btn !bg-slate-900 !text-white flex items-center justify-center space-x-2"
									  href={media.homepage}
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
			  })
			}
		</Carousel>
	);
}
