import ryanHeadshot from '/src/assets/images/Ryan_Headshot.jpg';
import PropTypes from 'prop-types';

export default function Quote({ quoteText = '' }) {
	return (
		<section className="relative isolate overflow-hidden bg-white p-6">
			<div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-900 opacity-20 dark:opacity-100" />
			<div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-slate-900 shadow-xl shadow-sky-600/10 ring-1 ring-sky-50 dark:ring-sky-950 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
			<div className="mx-auto max-w-2xl lg:max-w-4xl">
				<figure className="mt-10">
					<blockquote className="text-center text-sky-600 text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
						<p>“{quoteText}”</p>
					</blockquote>
					<figcaption className="mt-10">
						<img
							className="mx-auto h-10 w-10 rounded-full"
							src={ryanHeadshot}
						/>
						<div className="mt-4 flex items-center justify-center space-x-3 text-base">
							<div className="font-semibold">Ryan Dunn</div>
							<svg
								viewBox="0 0 2 2"
								width={3}
								height={3}
								aria-hidden="true"
								className="fill-gray-900 dark:fill-white"
							>
								<circle cx={1} cy={1} r={1} />
							</svg>
							<div className="text-gray-600 dark:text-white">
								Co-Founder & ___ of StreamLine
							</div>
						</div>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}

Quote.propTypes = {
	quoteText: PropTypes.string.isRequired,
};
