import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
	About,
	AccountSettings,
	Landing,
	MediaData,
	Error404,
	News,
	NewsPost,
	Pricing,
	ResetPassword,
	SecureReset,
	Login,
	SearchMedia,
	SignUp,
	Support,
	SupportedServices,
	UserDash,
	VirtualCableBox,
	CreateAccount,
} from './modules';
import { useAuth } from '/src/modules/auth/hooks';
export default function App() {
	const location = useLocation();
	const { isLoggedIn } = useAuth();
	
	useEffect(() => {
		document.querySelector('html').style.scrollBehavior = 'auto';
		window.scroll({ top: 0 });
		document.querySelector('html').style.scrollBehavior = '';
	}, [location.pathname]);

	return (
		<Routes>
			{/* Public Routes */}
			<Route exact path="/" element={<Landing />} />
			<Route path="/about" element={<About />} />
			<Route path="/media" element={<SearchMedia />} />
			<Route path="/media/:type/:id" element={<MediaData />} />
			<Route path="/news" element={<News />} />
			<Route path="/news/:id" element={<NewsPost />} />
			<Route path="/pricing" element={<Pricing />} />
			<Route path="/support" element={<Support />} />
			<Route path="/supported-services" element={<SupportedServices />} />

			{/* Protected Routes: Signed In */}
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/signin" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />

			{/* Protected Routes: Signed Out */}
		<Route path="/account-settings" element={<AccountSettings />} />
			<Route path="/secure-reset" element={<SecureReset />} />
			<Route path="/user-dash" element={<UserDash />} />
			<Route path="/virtual-cable-box" element={<VirtualCableBox />} />

			{/* Protected Routes: Account Creation */}
			<Route path="/create-account" element={<CreateAccount />} />

			{/* 404: Catch Routes Not Found */}
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
}
