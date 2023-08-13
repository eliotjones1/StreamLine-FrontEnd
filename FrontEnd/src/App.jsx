import { useEffect } from 'react';
import ProtectedRoutes from './components/protected-route';
import { Routes, Route, useLocation } from 'react-router-dom';
import './css/style.css';
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
      <Route path="/" element={<Home />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/bundles" element={<Bundles />}/>
      <Route path="/support" element={<ContactSupport />}/>
      <Route path="/pricing" element={<Pricing />}/>
      <Route path="/news" element={<News />}/>
      <Route path="/about-us" element={<AboutUs />}/>
      <Route path="/new-sub" element={<NewSub />}/>
      <Route path="/content-search" element={<ContentSearch />}/>
      <Route path="/content-data/:type/:id" element={<ContentData />}/>
      <Route path="/services-search" element={<ServicesSearch />}/>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/user-dash" element={<UserDash />}/>
        <Route path="/account-settings" element={<AccountInfo />}/>
        <Route path="/secure-reset" element={<SecureReset />}/>
        <Route path="/virtual-cable-box" element={<VirtualCableBox />}/>
      </Route>

      {/* 404: Catch Routes Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
