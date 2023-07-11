import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import {Home, SignIn, SignUp, ResetPassword, Bundles, UserDash, SecureReset, SearchMedia, NotFound} from './pages';
import AccountInfo from './pages/AccountInfo'
import Pricing from './pages/Pricing';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import NewSub from './pages/NewSub';
import ContentSearch from './pages/ContentSearch/ContentSearch';

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/search" element={<SearchMedia />} />
        <Route path="/bundles" element={<Bundles/>}/>
        <Route path="/user-dash" element={<UserDash/>}/>
        <Route path="/secure-reset" element={<SecureReset/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/account-settings" element={<AccountInfo/>}/>
        <Route path="/new-sub" element={<NewSub />} />
        <Route path="/content-search" element={<ContentSearch/>}/>
        <Route path="/content-data/:id/" element={<ContentSearch/>}/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
