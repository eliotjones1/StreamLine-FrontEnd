// Basic Imports
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';

// Import CSS
import 'aos/dist/aos.css';
import './css/style.css';

// Import Pages
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Bundles from './pages/Bundles';
import UserDash from './pages/UserDash/UserDash';
import SecureReset from './pages/SecureReset/SecureReset';
import SearchMedia from './pages/SearchMedia';
import NotFound from './pages/404/NotFound';
import AccountInfo from './pages/AccountInfo';
import Pricing from './pages/Pricing/Pricing';
import News from './pages/News/News';
import AboutUs from './pages/AboutUs/AboutUs';
import NewSub from './pages/NewSub';
import ContentSearch from './pages/ContentSearch/ContentSearch';
import ContentData from './pages/ContentData/ContentData';
import Payment from './pages/Payment/Payment';
import ContactSupport from './pages/ContactSupport/ContactSupport';

// Import Utils
import Modal from './utils/Modal';

// Import Context
import { ModalContext } from './contexts/ModalContext';

export default function App() {
  const location = useLocation();
  const nav = useNavigate();
  const { open401Modal, setOpen401Modal } = useContext(ModalContext);

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
    { path: '/support', component: ContactSupport },
    { path: '/secure-reset', component: SecureReset },
    { path: '/pricing', component: Pricing },
    { path: '/news', component: News },
    { path: '/aboutus', component: AboutUs },
    { path: '/account-settings', component: AccountInfo },
    { path: '/new-sub', component: NewSub },
    { path: '/content-search', component: ContentSearch },
    { path: '/content-data/:type/:id/', component: ContentData },
    { path: '/payment', component: Payment},
  ];

  return (
    <>
      <Routes>
        {routesConfig.map(route => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Modal 
          header={"401: Internal Server Error"} 
          body={"An internal server error occured. Please retry. If the error continues to occur please contact support."} 
          mainButtonText={"Support"}
          mainButtonFunction={() => {nav('/support'); setOpen401Modal(false);}}
          colorPalete={"sky"}
          isOpen={open401Modal} 
          setOpen={setOpen401Modal}
        />
    </>
  );
}