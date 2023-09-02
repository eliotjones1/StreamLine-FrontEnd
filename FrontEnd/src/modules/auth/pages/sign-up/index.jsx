import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/modules/auth/hooks';
import { Header } from 'src/modules/common/components';
import { Card, Typography, Input } from '@material-tailwind/react';

export default function SignUp() {
	const { signUp } = useAuth();
	const [error, setError] = useState(false);
	const nav = useNavigate();

	const confirmPasswordMatch = (event) => {
		event.preventDefault();
		if (event.target.password.value !== event.target.confirmPassword.value) {
			alert('Passwords do not match!');
		} else {
			try {
				signUp({
					email: event.target.email.value,
					password: event.target.password.value,
					first_name: event.target.firstName.value,
					last_name: event.target.lastName.value,
				});
			} catch (error) {
				setError(true);
			}
		}
	};

	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<main className="grow">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="pt-32 pb-12 md:pt-40 md:pb-20">
						<Card
							className="max-w-sm mx-auto "
							color="transparent"
							shadow={false}
						>
							<Typography
								className="text-center text-sky-600 mb-4"
								variant="h1"
								color="blue"
							>
								Sign Up
							</Typography>
							<Typography
								className="text-center text-slate-800 mb-4"
								variant="h5"
								color="blue"
							>
								Welcome! We exist to make streaming easier.
							</Typography>
							<form className="space-y-2" onSubmit={confirmPasswordMatch}>
								<div className="flex">
									<Input
										className="form-input"
										type="text"
										name="firstName"
										color="blue"
										size="lg"
										label="First Name"
										error={error}
										required
									/>
									<Input
										className="form-input"
										type="text"
										name="lastName"
										color="blue"
										size="lg"
										label="Last Name"
										error={error}
										required
									/>
								</div>
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
								<Input
									className="form-input"
									color="blue"
									type="password"
									name="password"
									size="lg"
									label="Password"
									error={error}
									required
								/>
								<Input
									className="form-input"
									color="blue"
									type="password"
									name="confirmPassword"
									size="lg"
									label="Confirm Password"
									error={error}
									required
								/>
								<div className="text-sm text-slate-700 dark:text-gray-500 text-center">
									I agree to be contacted by StreamLine about this offer as per
									the StreamLine{' '}
									<a
										to="#"
										className="underline cursor-pointer text-slate-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-slate-200 hover:no-underline transition duration-150 ease-in-out"
									>
										Privacy Policy
									</a>
									.
								</div>
								<div className="flex flex-wrap -mx-3 mt-6">
									<div className="w-full px-3">
										<button type="submit" className="colored-sky-btn w-full">
											Sign up
										</button>
									</div>
								</div>
							</form>
						</Card>
						<div className="text-gray-600 text-center mt-6">
							Don&apos;t have an account?{' '}
							<button
								type="button"
								onClick={() => nav('/signup')}
								className="text-link"
							>
								{' '}
								Sign up
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
