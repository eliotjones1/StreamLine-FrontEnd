import { Input } from '@material-tailwind/react';
import { useBusiness } from 'src/modules/business/hooks';

export default function Newsletter() {
	const { addToNewsletter } = useBusiness();

	const handleSubmit = async (event) => {
		event.preventDefault();
		addToNewsletter();
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<div className="relative isolate py-16 sm:py-24 lg:py-32">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Subscribe to our newsletter.
					</h2>
					<p className="mt-4 text-lg leading-8 text-slate-600 dark:text-gray-400">
						Unlock the full potential of your streaming subscriptions with our
						newsletter, featuring exclusive content on new releases, platform
						optimizations, and insider recommendations.
					</p>
					<div className="mt-6 flex max-w-md gap-x-4">
						<Input
							type="email"
							name="email"
							autoComplete="email"
							label="Enter Your Email"
							className="form-input"
							color="blue"
							required
						/>
						<button type="submit" className="colored-sky-btn">
							Subscribe
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}
