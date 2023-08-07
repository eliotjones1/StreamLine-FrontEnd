// Basic Imports
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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

// Import Utils
import Modal from './utils/Modal';

// Import Context
import { ModalContext } from './contexts/ModalContext';
import { LoginContext } from './contexts/LoginContext';

export default function App() {
  const location = useLocation();
  const nav = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);
  const { open500Modal, setOpen500Modal, openSuccessModal, setOpenSuccessModal } = useContext(ModalContext);

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
    { path: '/bundles', component: Bundles },
    { path: '/user-dash', component: UserDash },
    { path: '/support', component: ContactSupport },
    { path: '/secure-reset', component: SecureReset },
    { path: '/pricing', component: Pricing },
    { path: '/news', component: News },
    { path: '/about-us', component: AboutUs },
    { path: '/account-settings', component: AccountInfo },
    { path: '/new-sub', component: NewSub },
    { path: '/content-search', component: ContentSearch },
    { path: '/content-data/:type/:id/', component: ContentData },
    { path: '/virtual-cable-box', component: VirtualCableBox },
    { path: '/services-search', component: ServicesSearch}
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
        centerContent={false}
        header={"500: Internal Server Error"} 
        body={"An internal server error occured during this action. We are aware of the issue and working to fix it momentarily. The current page will not include certain functionality. Please reload the page or try again at a later time. If the error continues to occur please contact support."}
        mainButtonText={"Refresh"}
        mainButtonFunction={() => window.location.reload()}
        secondaryButtonText={"Support"}
        secondaryButtonFunction={() => { nav('/support'); setOpen500Modal(false); }}
        colorPalete={"sky"}
        isOpen={open500Modal} 
        setOpen={setOpen500Modal}
      />
      <Modal 
        centerContent={false}
        header={"Success"}
        body={"Your message has been recieved! Upon review the StreamLine team will be in contact. For urgent issues please contact our support line at: (###) ###-####."}
        colorPalete={"green"}
        isOpen={openSuccessModal} 
        setOpen={setOpenSuccessModal}
      />
    </>
  );
}