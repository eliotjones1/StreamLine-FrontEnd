import { useNavigate } from 'react-router-dom';
import { BtnAndArwBtn } from '/src/modules/common/components';

export default function HeroTitle() {
	const nav = useNavigate();

	return (
		<div className="mx-auto pt-16 pb:24 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48 col-span-1 col-start-1">
			<div className="hidden sm:mb-8 sm:flex sm:justify-center">
				<div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 bg-slate-900/5 dark:bg-white/5 p-2 ring-1 ring-white/10 hover:ring-gray-900/20">
					Announcing our deployment.{' '}
					<button
						aria-label="Read More"
						onClick={() => nav('/news/2')}
						className="font-semibold text-sky-600"
					>
						<span className="absolute inset-0" aria-hidden="true" />
						Read more <span aria-hidden="true">&rarr;</span>
					</button>
				</div>
			</div>
			<div className="text-center">
				<h1 className="text-2xl font-bold tracking-tight sm:text-6xl">
					<span className="text-sky-600 dark:text-sky-500">StreamLine</span>{' '}
					Your Subscriptions
				</h1>
				<p className="mt-6 mb-10 text-lg leading-8">
					Optimize subscription services based on your unique interests and
					preferences. StreamLine uses cutting-edge technology to analyze your
					tastes and tailor a personalized selection of subscriptions just for
					you at a price you can afford.
				</p>
				<BtnAndArwBtn arrowBtnText={'Learn More'} newNavURL={'/about'} />
			</div>
		</div>
	);
}
