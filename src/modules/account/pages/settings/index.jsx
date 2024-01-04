import {
	Header,
	Footer,
	PageTopIllustration,
} from '/src/modules/common/components';
import { useState } from 'react';
import { useAccount } from 'src/modules/account/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';

export default function EditAccount() {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const { deleteAccount, fetchAccountInfo, updateAccount } = useAccount();
	
	function handleSubmit(event) {
		event.preventDefault();
		updateAccount({
			Email: event.target.email.value,
			First_Name: event.target.firstName.value,
			Last_Name: event.target.lastName.value,
			Street_Address: event.target.streetAddress.value,
			City: event.target.city.value,
			State_Province: event.target.state.value,
			Country: event.target.country.value,
			Postal_Code: event.target.postalCode.value,
			Newsletter: event.target.newsletter.checked,
			Promotions: event.target.promotions.checked,
			Push_Notifications: event.target.pushNotifications.value,
		});
	}

	const { status, data } = useQuery({
		queryKey: ['account', 'information'],
		staleTime: Infinity,
		queryFn: () => fetchAccountInfo(),
	});

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<main className="grow">
				<PageTopIllustration />
				<div className="flex justify-center">
					<form className="py-24" onSubmit={handleSubmit}>
						<div className="space-y-12">
							<div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
								<h2 className="text-base font-semibold leading-7">Profile</h2>
								<p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
									This information will never be displayed publicly.
								</p>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-4">
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-6"
										>
											Email address
										</label>
										<div className="mt-2">
											<input
												name="email"
												type="email"
												defaultValue={data.Email}
												autoComplete="email"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
								<h2 className="text-base font-semibold leading-7">
									Personal Information
								</h2>
								<p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
									Use a permanent address where you can receive mail.
								</p>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-3">
										<label
											htmlFor="first-name"
											className="block text-sm font-medium leading-6"
										>
											First name
										</label>
										<div className="mt-2">
											<input
												name="firstName"
												type="text"
												defaultValue={data.First_Name}
												autoComplete="given-name"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label
											htmlFor="last-name"
											className="block text-sm font-medium leading-6"
										>
											Last name
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="lastName"
												defaultValue={data.Last_Name}
												autoComplete="family-name"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label
											htmlFor="country"
											className="block text-sm font-medium leading-6"
										>
											Country
										</label>
										<div className="mt-2">
											<select
												name="country"
												defaultValue={data.Country}
												autoComplete="country-name"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											>
												<option>United States</option>
											</select>
										</div>
									</div>

									<div className="col-span-full">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium leading-6"
										>
											Street address
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="streetAddress"
												defaultValue={data.Street_Address}
												autoComplete="street-address"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-2 sm:col-start-1">
										<label
											htmlFor="city"
											className="block text-sm font-medium leading-6"
										>
											City
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="city"
												defaultValue={data.City}
												autoComplete="address-level2"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-2">
										<label
											htmlFor="region"
											className="block text-sm font-medium leading-6"
										>
											State / Province
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="state"
												defaultValue={data.State_Province}
												autoComplete="address-level1"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-2">
										<label
											htmlFor="postal-code"
											className="block text-sm font-medium leading-6"
										>
											ZIP / Postal code
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="postalCode"
												defaultValue={data.Postal_Code}
												autoComplete="postal-code"
												className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
								<h2 className="text-base font-semibold leading-7">
									Notifications
								</h2>
								<p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
									We&apos;ll always let you know about important changes, but
									you pick what else you want to hear about.
								</p>

								<div className="mt-10 space-y-10">
									<fieldset>
										<legend className="text-sm font-semibold leading-6">
											By Email
										</legend>
										<div className="mt-6 space-y-6">
											<div className="relative flex gap-x-3">
												<div className="flex h-6 items-center">
													<input
														name="newsletter"
														type="checkbox"
														defaultChecked={data.Newsletter}
														className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
													/>
												</div>
												<div className="text-sm leading-6">
													<label htmlFor="newsletter" className="font-medium">
														Newsletter
													</label>
													<p className="text-gray-500 dark:text-slate-300">
														Get monthly updates on relevant streaming news.
													</p>
												</div>
											</div>
											<div className="relative flex gap-x-3">
												<div className="flex h-6 items-center">
													<input
														name="promotions"
														type="checkbox"
														defaultChecked={data.Promotions}
														className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
													/>
												</div>
												<div className="text-sm leading-6">
													<label htmlFor="promotions" className="font-medium">
														Promotions
													</label>
													<p className="text-gray-500 dark:text-slate-300">
														Get notified about StreamLine promotions.
													</p>
												</div>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<legend className="text-sm font-semibold leading-6">
											Push Notifications
										</legend>
										<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-200">
											These are delivered via SMS to your mobile phone.
										</p>
										<div className="mt-6 space-y-6">
											<div className="flex items-center gap-x-3">
												<input
													name="pushNotifications"
													value="Everything"
													type="radio"
													defaultChecked={
														data.Push_Notifications === 'Everything'
													}
													className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
												/>
												<label
													htmlFor="push-everything"
													className="block text-sm font-medium leading-6"
												>
													Everything
												</label>
											</div>
											<div className="flex items-center gap-x-3">
												<input
													name="pushNotifications"
													value="SameAsEmail"
													type="radio"
													defaultChecked={
														data.Push_Notifications === 'SameAsEmail'
													}
													className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
												/>
												<label
													htmlFor="push-email"
													className="block text-sm font-medium leading-6"
												>
													Same as email
												</label>
											</div>
											<div className="flex items-center gap-x-3">
												<input
													name="pushNotifications"
													value="None"
													type="radio"
													defaultChecked={data.Push_Notifications === 'None'}
													className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
												/>
												<label
													htmlFor="push-nothing"
													className="block text-sm font-medium leading-6"
												>
													No push notifications
												</label>
											</div>
										</div>
									</fieldset>
								</div>
							</div>
							<div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
								<h2 className="text-base font-semibold leading-7">
									Edit Streamline Subscription Information
								</h2>
								<p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
									Click here to be redirected to Stripe to edit your details.
								</p>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="flex justify-center mt-8">
										<a
											href={'https://billing.stripe.com/p/login/test_00g2aR9YNfbzfGoaEE'}
											className={`colored-sky-btn w-full mt-10`}
											>
											Leave site
										</a>
									</div>
								</div>
							</div>
							<div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
								<h2 className="text-base font-semibold leading-7">
									Account Deletion
								</h2>
								<p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
									This will delete your account and all of your information
									permanently.
								</p>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="flex justify-center mt-8">
										<button
											type="button"
											className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
											onClick={() => setShowConfirmation(true)}
										>
											Delete Account
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button type="button" className="text-sm font-semibold leading-6">
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
							>
								Save
							</button>
						</div>
					</form>
				</div>

				{showConfirmation && (
					<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
						<div className="bg-white rounded-lg p-8">
							<p className="text-black">
								Are you sure you want to delete your account?
							</p>
							<div className="flex justify-end mt-4">
								<button
									className="px-4 py-2 bg-red-500 text-white rounded mr-2"
									onClick={() => deleteAccount()}
								>
									Yes
								</button>
								<button
									className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
									onClick={() => setShowConfirmation(false)}
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
