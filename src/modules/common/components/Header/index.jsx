import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	XMarkIcon,
	FilmIcon,
} from '@heroicons/react/24/outline';
import {
	ChevronDownIcon,
	PhoneIcon,
	PlayCircleIcon,
	TvIcon,
} from '@heroicons/react/20/solid';
import Logo from '../../../../assets/images/StreamLine_Transparent_Logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { AccountActions } from './components';

const products = [
	{
		name: 'Discover Content',
		description: 'Search for movies and television in the U.S.',
		href: '/media',
		userOnly: false,
		icon: FilmIcon,
	},
	{
		name: 'Explore Services',
		description: 'Find services we support and optimize.',
		href: '/supported-services',
		userOnly: false,
		icon: MagnifyingGlassIcon,
	},
	{
		name: 'Virtual Cable Box',
		description: 'See content recommendations across all subscriptions.',
		href: '/virtual-cable-box',
		userOnly: true,
		icon: TvIcon,
	},
];

const callsToAction = [
	{ name: 'Watch demo', href: '/34567', icon: PlayCircleIcon },
	{ name: 'Contact Us', href: '/support', icon: PhoneIcon },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Header({ flipColors = false }) {
	const nav = useNavigate();
	const { isLoggedIn, logout } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const accountOptions = [
		{
			name: 'Sign Out',
			action: (event) => {
				event.preventDefault();
				logout();
			},
		},
		{ name: 'Edit Account', action: () => nav('/account-settings') },
		{ name: 'My Dashboard', action: () => nav('/user-dash') },
	];

	return (
		<header className="absolute w-full z-30">
			<nav
				className="mx-auto flex items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<button
						aria-label="Home"
						onClick={() => nav('/')}
						className="-m-1.5 p-1.5"
					>
						<img className="h-8 w-auto" src={Logo} alt="Home" />
					</button>
				</div>

				<div className="flex lg:hidden">
					<button
						type="button"
						aria-label="Menu"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
						onClick={() => setMobileMenuOpen(true)}
					>
						<Bars3Icon
							className={`h-6 w-6 ${
								flipColors &&
								!mobileMenuOpen &&
								'text-white dark:text-slate-900'
							}`}
							aria-hidden="true"
						/>
					</button>
				</div>

				<Popover.Group className="hidden lg:flex lg:gap-x-12">
					<Popover className="relative">
						<Popover.Button
							className={`flex items-center gap-x-1 text-sm font-semibold leading-6 ${
								flipColors && 'text-white dark:text-slate-900'
							}`}
							aria-label="Features"
						>
							Features
							<ChevronDownIcon
								className="h-5 w-5 flex-none text-gray-400"
								aria-hidden="true"
							/>
						</Popover.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white text-slate-900 shadow-lg ring-1 ring-gray-900/5">
								<div className="p-4">
									{products.map((item) => {
										if (isLoggedIn || !item.userOnly) {
											return (
												<div
													key={item.name}
													className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
												>
													<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
														<item.icon
															className="h-6 w-6 text-slate-700 group-hover:text-sky-600"
															aria-hidden="true"
														/>
													</div>
													<div className="flex-auto">
														<button
															aria-label={item.name}
															onClick={() => nav(item.href)}
															className="block font-semibold"
														>
															{item.name}
															<span className="absolute inset-0" />
														</button>
														<p className="mt-1 text-gray-600">
															{item.description}
														</p>
													</div>
												</div>
											);
										}
									})}
								</div>
								<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
									{callsToAction.map((item) => (
										<button
											key={item.name}
											aria-label={item.name}
											onClick={() => nav(item.href)}
											className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 hover:bg-gray-100"
										>
											<item.icon
												className="h-5 w-5 flex-none text-gray-400"
												aria-hidden="true"
											/>
											{item.name}
										</button>
									))}
								</div>
							</Popover.Panel>
						</Transition>
					</Popover>

					<button
						aria-label="Pricing"
						onClick={() => nav('/pricing')}
						className={`text-sm font-semibold leading-6 ${
							flipColors && 'text-white dark:text-slate-900'
						}`}
					>
						Pricing
					</button>
					<button
						aria-label="News"
						onClick={() => nav('/news')}
						className={`text-sm font-semibold leading-6 ${
							flipColors && 'text-white dark:text-slate-900'
						}`}
					>
						News
					</button>
					<button
						aria-label="About Us"
						onClick={() => nav('/about')}
						className={`text-sm font-semibold leading-6 ${
							flipColors && 'text-white dark:text-slate-900'
						}`}
					>
						About Us
					</button>
				</Popover.Group>

				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{isLoggedIn ? (
						<AccountActions flipColors={flipColors} />
					) : (
						<div
							className={`flex gap-x-6 ${
								flipColors && 'text-white dark:text-slate-900'
							}`}
						>
							<button
								aria-label="Sign In"
								onClick={() => nav('/signin')}
								className="text-sm font-semibold leading-6"
							>
								Sign in
							</button>
							<button
								aria-label="Sign Up"
								onClick={() => nav('/signup')}
								className="text-sm font-semibold leading-6"
							>
								Sign up
							</button>
						</div>
					)}
				</div>
			</nav>

			<Dialog
				as="div"
				className={`lg:hidden`}
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Disclosure as="div" className="-mx-3">
									{({ open }) => (
										<>
											<Disclosure.Button
												className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
												aria-label="Features"
											>
												Features
												<ChevronDownIcon
													className={classNames(
														open ? 'rotate-180' : '',
														'h-5 w-5 flex-none',
													)}
													aria-hidden="true"
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="mt-2 space-y-2">
												{[...products, ...callsToAction].map((item) => (
													<Disclosure.Button
														aria-label={item.name}
														key={item.name}
														as="a"
														onClick={() => nav(item.href)}
														className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
													>
														{item.name}
													</Disclosure.Button>
												))}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<button
									aria-label="Pricing"
									onClick={() => nav('/pricing')}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Pricing
								</button>
								<button
									aria-label="News"
									onClick={() => nav('/news')}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									News
								</button>
								<button
									aria-label="About Us"
									onClick={() => nav('/about-us')}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									About Us
								</button>
							</div>
							{isLoggedIn ? (
								<Disclosure as="div" className="-mx-3">
									{({ open }) => (
										<>
											<Disclosure.Button
												className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
												aria-label="Account"
											>
												Account
												<ChevronDownIcon
													className={classNames(
														open ? 'rotate-180' : '',
														'h-5 w-5 flex-none',
													)}
													aria-hidden="true"
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="mt-2 space-y-2">
												{[...accountOptions].map((item) => (
													<Disclosure.Button
														aria-label={item.name}
														key={item.name}
														as="a"
														onClick={item.action}
														className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
													>
														{item.name}
													</Disclosure.Button>
												))}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							) : (
								<div className="py-6">
									<button
										aria-label="Sign In"
										onClick={() => nav('/signin')}
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Sign in
									</button>
									<button
										aria-label="Sign Up"
										onClick={() => nav('/signup')}
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Sign up
									</button>
								</div>
							)}
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
