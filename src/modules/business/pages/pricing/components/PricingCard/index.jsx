import { CheckIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

export default function PricingCard({
	title,
	description,
	features,
	price,
	link,
	isAvailable = false
}) {
	return (
		<div className={`mx-auto max-w-2xl rounded-3xl ring-1 ring-slate-200 sm:mt-4 lg:mx-0 lg:flex lg:max-w-none ${!isAvailable ? 'bg-gray-200 opacity-75' : 'bg-white'}`}>
			<div className="p-8 sm:p-10 lg:flex-auto">
				<h3 className={`text-2xl font-bold tracking-tight ${!isAvailable ? 'text-gray-500' : ''}`}>{title} {!isAvailable && "(Coming Soon)"}</h3>
				<p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
					{description}
				</p>
				<div className="mt-10 flex items-center gap-x-4">
					<h4 className={`flex-none text-sm font-semibold leading-6 ${!isAvailable ? 'text-gray-500' : 'text-sky-600'}`}>
						What&apos;s included
					</h4>
					<div className="h-px flex-auto bg-slate-100" />
				</div>
				<ul
					role="list"
					className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-white sm:grid-cols-2 sm:gap-6"
				>
					{features.map((feature) => (
						<li key={feature} className="flex gap-x-3">
							<CheckIcon
								className={`h-6 w-5 flex-none ${!isAvailable ? 'text-gray-500' : 'text-sky-600'}`}
								aria-hidden="true"
							/>
							{feature}
						</li>
					))}
				</ul>
			</div>
			<div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
				<div className={`rounded-2xl h-full py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16
				${!isAvailable ? 'bg-gray-200' : 'bg-slate-50 ring-1 ring-inset ring-gray-900/5'}`}>
					<div className="mx-auto max-w-xs px-8">
						<p className={`text-base font-semibold ${!isAvailable ? 'text-gray-500' : ''}`}>{title.split(' ')[0]}</p>
						<p className={`mt-6 flex items-baseline justify-center gap-x-2 ${!isAvailable ? 'text-gray-500' : ''}`}>
							<span className="text-5xl font-bold tracking-tight">{price}</span>
							<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">
								/ Year
							</span>
						</p>
						<a
					    href={isAvailable ? link : undefined}
					    className={`colored-sky-btn w-full mt-10 ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
					    onClick={e => {!isAvailable && e.preventDefault()}}
							style={!isAvailable ? { pointerEvents: 'none' } : {}}
							>
							Get Access!
						</a>


					</div>
				</div>
			</div>
		</div>
	);
}

PricingCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.string).isRequired,
	price: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	isAvailable: PropTypes.bool.isRequired,
};
