// Basic Imports
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';

// Import CSS
import 'aos/dist/aos.css';
import './css/style.css';

// Import Pages
import Home from './components/pages/home';
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import ResetPassword from './components/pages/resetPassword';
import Bundles from './components/pages/Bundles';
import UserDash from './components/pages/userDash';
import SecureReset from './components/pages/secureReset';
import NotFound from './components/pages/404';
import AccountInfo from './components/pages/accountInfo';
import Pricing from './components/pages/pricing';
import News from './components/pages/news';
import AboutUs from './components/pages/aboutUs';
import NewSub from './components/pages/NewSub';
import ContentSearch from './components/pages/contentSearch';
import ContentData from './components/pages/contentData';
import ContactSupport from './components/pages/contactSupport';
import VirtualCableBox from './components/pages/virtualCableBox';
import ServicesSearch from './components/pages/servicesSearch';

// Import Context
import { LoginContext } from './contexts/LoginContext';

export default function App() {
  const location = useLocation();
  const nav = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);

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

  const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/reset-password', component: ResetPassword },
    { path: '/bundles', component: Bundles },
    { path: '/support', component: ContactSupport },
    { path: '/pricing', component: Pricing },
    { path: '/news', component: News },
    { path: '/about-us', component: AboutUs },
    { path: '/new-sub', component: NewSub },
    { path: '/content-search', component: ContentSearch },
    { path: '/content-data/:type/:id/', component: ContentData },    
    { path: '/services-search', component: ServicesSearch}
  ];

  const protectedRoutes = [
    { path: '/user-dash', component: UserDash },
    { path: '/account-settings', component: AccountInfo },
    { path: '/secure-reset', component: SecureReset },
    { path: '/virtual-cable-box', component: VirtualCableBox },
  ]

  return (
    <Routes>
      {
        routes.map(route => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<route.component />} 
          />
        ))
      }
      {
        protectedRoutes.map(route => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={isLoggedIn ? <route.component /> : <Navigate to='/signin'/>} 
          />
        ))
      }
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}