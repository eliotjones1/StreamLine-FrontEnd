import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/modules/auth/hooks';
import { Header } from '/src/modules/common/components';
import {
	Button,
	Card,
	Checkbox,
	Typography,
	Input,
} from '@material-tailwind/react';

export default function Login() {
	const { login } = useAuth();
	const [error, setError] = useState(false);
	const nav = useNavigate();

	const signIn = (event) => {
		event.preventDefault();
		try {
			login({
				email: event.target.email.value,
				password: event.target.password.value,
				keepSignedIn: event.target.keepSignedIn.checked,
			});
		} catch {
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
							<Card
								className="max-w-sm mx-auto "
								color="transparent"
								shadow={false}
							>
								<Typography
									className="text-center mb-4"
									variant="h1"
									color="blue"
								>
									Sign In
								</Typography>
								<form onSubmit={signIn} to="/">
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
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
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
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<div className="flex justify-between">
												<Checkbox
													color="blue"
													name="keepSignedIn"
													label={
														<Typography className="font-medium">
															Keep me signed in
														</Typography>
													}
												/>
												<button
													type="button"
													onClick={() => nav('/reset-password')}
													className="text-link"
												>
													Forgot Password?
												</button>
											</div>
										</div>
									</div>
									<Button type="submit" color="blue" fullWidth>
										Sign In
									</Button>
								</form>
							</Card>
							<div className="text-gray-600 dark:text-gray-400 text-center mt-6">
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
				</section>
			</main>
		</div>
	);
}
