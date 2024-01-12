import { ImageContainer } from './components';

export default function ImageGrid() {


	const Images = ["https://image.tmdb.org/t/p/original/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg", "https://image.tmdb.org/t/p/original/jFuH0md41x5mB4qj5344mSmtHrO.jpg",
					"https://image.tmdb.org/t/p/original/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg", "https://image.tmdb.org/t/p/original/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
					"https://image.tmdb.org/t/p/original/69YuvoiWTtK6oyYH2Jl4Q6SgZ59.jpg", "https://image.tmdb.org/t/p/original/1AZERr7KEJBpcchQ6vFcbUUC0Zw.jpg",
					"https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"]

	/* https://image.tmdb.org/t/p/original/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg Aquaman
	https://image.tmdb.org/t/p/original/jFuH0md41x5mB4qj5344mSmtHrO.jpg Reacher
	https://image.tmdb.org/t/p/original/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg Leave the world behind
	https://image.tmdb.org/t/p/original/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg rebel moon
	https://image.tmdb.org/t/p/original/69YuvoiWTtK6oyYH2Jl4Q6SgZ59.jpg berlin
	https://image.tmdb.org/t/p/original/1AZERr7KEJBpcchQ6vFcbUUC0Zw.jpg foundation
	https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg oppenheimer




	*/

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none col-span-1 col-start-2 overflow-hidden"
		>
			<div className="transform">
				<div className="grid grid-cols-3 gap-x-6 lg:gap-x-8">
					<div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
						{Images.slice(0, 2).map((poster, index) => (
							<ImageContainer
								posterPath={poster}
								classNameMods={index === 0 ? 'items-end' : 'items-start'}
							/>
						))}
					</div>

					<div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
						{Images.slice(2, 5).map((poster) => (
							<ImageContainer posterPath={poster} />
						))}
					</div>

					<div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
						{Images.slice(5, 7).map((poster, index) => (
							<ImageContainer
								posterPath={poster}
								classNameMods={index === 0 ? 'items-end' : 'items-start'}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
