// Basic Imports
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';

// Import CSS
import 'aos/dist/aos.css';
import './css/style.css';

// Import Pages
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ResetPassword from './pages/ResetPassword';
import Bundles from './pages/Bundles';
import UserDash from './pages/UserDash';
import SecureReset from './pages/SecureReset';
import SearchMedia from './pages/SearchMedia';
import NotFound from './pages/NotFound';
import AccountInfo from './pages/AccountInfo';
import Pricing from './pages/Pricing';
import News from './pages/News';
import AboutUs from './pages/AboutUs/AboutUs';
import NewSub from './pages/NewSub';
import ContentSearch from './pages/ContentSearch/ContentSearch';
import ContentData from './pages/ContentData/ContentData';

// Import Context
import ContextWrapper from './contexts/Index';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  }, []);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  const routesConfig = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/reset-password', component: ResetPassword },
    { path: '/search', component: SearchMedia },
    { path: '/bundles', component: Bundles },
    { path: '/user-dash', component: UserDash },
    { path: '/secure-reset', component: SecureReset },
    { path: '/pricing', component: Pricing },
    { path: '/news', component: News },
    { path: '/aboutus', component: AboutUs },
    { path: '/account-settings', component: AccountInfo },
    { path: '/new-sub', component: NewSub },
    { path: '/content-search', component: ContentSearch },
    { path: '/content-data/:type/:id/', component: ContentData },
  ];

  return (
    <ContextWrapper>
      <Routes>
        {routesConfig.map(route => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextWrapper>
  );
}