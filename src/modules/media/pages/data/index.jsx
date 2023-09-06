import { Header, Footer } from 'src/modules/common/components';
import { Trailers, CastSlider, MediaInfo, Main } from './components';

export default function ContentData() {
	return (
		<div>
			<Header />
			<main className="grow pt-20">
				<Main />
				<section className="mx-auto my-6 grid max-w-7xl gap-x-8 gap-y-8 grid-cols-4 grid-rows-[auto, auto] items-start">
					<div className="col-start-4 row-span-2 p-4 space-y-4 overflow-scroll max-h-screen">
						<MediaInfo />
					</div>
					<div className="col-start-1 col-span-3 row-start-1">
						<CastSlider />
					</div>
					<div className="col-start-1 col-span-3 row-start-2">
						<Trailers />
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
