import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/modules/auth/hooks';
import { Header } from '/src/modules/common/components';
import { useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';

export default function ResetPassword() {
	const nav = useNavigate();
	const [error, setError] = useState(false);
	const { resetPassword } = useAuth();

	const reset_pwd = async (event) => {
		event.preventDefault();
		try {
			resetPassword(event.target.email.value);
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<main className="grow">
				<section className="relative">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-32 pb-12 md:pt-40 md:pb-20">
							<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
								<Typography className="mb-4 text-slate-800" variant="h2">
									Forgot your password?
								</Typography>
								<p className="text-xl text-slate-600 dark:text-gray-400">
									We&apos;ll email you instructions on how to reset it.
								</p>
							</div>

							<div className="max-w-sm mx-auto">
								<form onSubmit={reset_pwd}>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<Input
												className="form-input"
												type="email"
												name="email"
												color="blue"
												size="lg"
												label="Email"
												error={error}
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap mt-6">
										<Button className="w-full bg-sky-600" color="blue">
											Reset Password
										</Button>
									</div>
								</form>
								<div className="text-gray-400 text-center mt-6">
									<button className="text-link" onClick={() => nav('/signin')}>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
