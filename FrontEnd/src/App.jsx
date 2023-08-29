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
} from './modules';

export default function App() {
	const location = useLocation();

	useEffect(() => {
		document.querySelector('html').style.scrollBehavior = 'auto';
		window.scroll({ top: 0 });
		document.querySelector('html').style.scrollBehavior = '';
	}, [location.pathname]);

	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Landing />} />
			<Route path="/media/:type/:id" element={<MediaData />} />
			<Route path="/about" element={<About />} />
			<Route path="/pricing" element={<Pricing />} />
			<Route path="/signin" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/support" element={<Support />} />
			<Route path="/services-search" element={<SupportedServices />} />
			<Route path="/media" element={<SearchMedia />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/news" element={<News />} />
			<Route path="/news/:id" element={<NewsPost />} />

			{/* Protected Routes */}
			<Route path="/secure-reset" element={<SecureReset />} />
			<Route path="/account-settings" element={<AccountSettings />} />
			<Route path="/user-dash" element={<UserDash />} />
			<Route path="/virtual-cable-box" element={<VirtualCableBox />} />

			{/* 404: Catch Routes Not Found */}
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
}
