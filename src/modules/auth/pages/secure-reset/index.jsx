import { useAuth } from 'src/modules/auth/hooks';

export default function ResetPassword() {
	const { confirmedReset } = useAuth();

	const reset_pwd = async (event) => {
		event.preventDefault();
		if (event.target.password.value !== event.target.confirmPassword.value) {
			alert('Passwords do not match!');
		} else {
			confirmedReset({
				token: window.location.search.substring(1),
				password: event.target.password.value,
			});
		}
	};

	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<main className="grow">
				<section className="relative">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-32 pb-12 md:pt-40 md:pb-20">
							<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
								<h1 className="h1 mb-4">
									<span className="text-sky-500">StreamLine</span> Password
									Reset
								</h1>
							</div>
							<div className="max-w-sm mx-auto">
								<form onSubmit={reset_pwd}>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
												htmlFor="email"
											>
												New Password
											</label>
											<input
												name="newPassword"
												type="password"
												className="form-input w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-gray-300"
												placeholder="Password"
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Confirm New Password
											</label>
											<input
												name="confirmPassword"
												type="password"
												className="form-input w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-gray-300"
												placeholder="Confirm Password"
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											<button
												type="submit"
												className="btn text-white bg-sky-600 hover:bg-sky-700 w-full"
											>
												Reset Password
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
