import { useEffect } from 'react';
import { ProtectedRoutes } from './modules/common/components';
import { Routes, Route, useLocation } from 'react-router-dom';
import './css/style.css';
import { About, AccountSettings, Landing, ContentData, ContentSearch, Error404, News, NewSub, Pricing, ResetPassword, SecureReset, Login, SignUp, Support, SupportedServices, UserDash, VirtualCableBox} from './modules';


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
      <Route path="/" element={<Landing />}/>
      <Route path="/content-data/:type/:id" element={<ContentData />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/pricing" element={<Pricing />}/>
      <Route path="/signin" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/support" element={<Support />}/>
      <Route path="/services-search" element={<SupportedServices />}/>
      <Route path="/content-search" element={<ContentSearch />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/news" element={<News />}/>
      <Route path="/new-sub" element={<NewSub />}/>
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/secure-reset" element={<SecureReset />}/>
        <Route path="/account-settings" element={<AccountSettings />}/>
        <Route path="/user-dash" element={<UserDash />}/>
        <Route path="/virtual-cable-box" element={<VirtualCableBox />}/>
      </Route>

      {/* 404: Catch Routes Not Found */}
      <Route path="*" element={<Error404 />} />
      
    </Routes>
  );
}
