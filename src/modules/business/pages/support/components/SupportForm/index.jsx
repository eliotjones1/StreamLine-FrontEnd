import { useBusiness } from 'src/modules/business/hooks';
import { Switch } from '@material-tailwind/react';

export default function SupportForm() {
	const { contactSupport } = useBusiness();

	const sendInfo = (event) => {
		event.preventDefault();
		contactSupport({
			'first-name': event.target.firstName.value,
			'last-name': event.target.lastName.value,
			email: event.target.email.value,
			'phone-number': event.target.phoneNumber.value,
			message: event.target.message.value,
		});
	};

	return (
		<div className="isolate px-6 py-24 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Contact Us
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-600 dark:text-slate-50">
					Reach out to our dedicated team for all your support and sales
					inquiries - we&apos;re here to assist you every step of the way!
				</p>
			</div>
			<form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={sendInfo}>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm font-semibold leading-6"
						>
							First name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="firstName"
								required
								autoComplete="given-name"
								className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="last-name"
							className="block text-sm font-semibold leading-6 "
						>
							Last name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="lastName"
								required
								autoComplete="family-name"
								className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 "
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								required
								autoComplete="email"
								className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="phone-number"
							className="block text-sm font-semibold leading-6 "
						>
							Phone number
						</label>
						<div className="relative mt-2.5">
							<div className="absolute inset-y-0 left-0 flex items-center">
								<label htmlFor="country" className="sr-only">
									Country
								</label>
								<select
									name="country"
									className="h-full rounded-l-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-600 dark:text-gray-200 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
								>
									<option>US</option>
								</select>
							</div>
							<input
								type="tel"
								name="phoneNumber"
								required
								autoComplete="tel"
								className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 pl-24 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm font-semibold leading-6 "
						>
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								required
								name="message"
								rows={4}
								className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
								defaultValue={''}
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<Switch
							color="blue"
							label={
								<div className="flex w-full space-x-1">
									<p>By selecting this, you agree to our</p>
									<button className="text-link font-bold">
										privacy&nbsp;policy
									</button>
									.
								</div>
							}
							required
						/>
					</div>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-sky-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
					>
						Send Message
					</button>
				</div>
			</form>
		</div>
	);
}
