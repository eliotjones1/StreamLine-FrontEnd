import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import Logo from "../images/StreamLine_Transparent_Logo.png";

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const trigger = useRef(null);
  const mobileNav = useRef(null);
  const location = useLocation();
  const nav = useNavigate();
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  function logout(event) {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/auth/logout', {}).then(() => {
      nav('/');
      document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      // Use Cookies Library to Remove Instead
    }).catch(error => {
      // Add Error Modal
    });
  }

  return (
    <header className="absolute w-full z-30">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <button onClick={() => nav('/')} className="block" aria-label="StreamLine">
              <img className="w-8 h-8 fill-current text-blue-200" src={Logo} />
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop Buttons => Either Sign-In and Sign-UP or Logout and UserDash */}
            { session !== undefined ? (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <button className="font-medium text-sky-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out" onClick={logout}>Log Out</button>
                </li>
                {location.pathname !== "/user-dash" && (
                  <li>
                    <button onClick={() => nav("/user-dash")} className="btn-sm text-white bg-sky-600 hover:bg-sky-900 ml-3">
                      My Dashboard
                    </button>
                  </li>
                )}

              </ul>
            )
            : (
              <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <button onClick={() => nav('/signin')} className="font-medium text-sky-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Sign in
                </button>
              </li>
              <li>
                <button onClick={() => nav('/signup')} className="btn-sm text-white bg-sky-600 hover:bg-sky-900 ml-3">
                  Sign up
                </button>
              </li>
              </ul>
            )}

          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">

            {/* Hamburger button */}
            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/* Mobile navigation */}
            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0.8 } }>
              { session !== undefined ? (
                <ul className="bg-gray-800 px-4 py-2">
                  <li>
                    <button onClick={logout} className="flex font-medium w-full text-sky-600 hover:text-gray-200 py-2 justify-center">Logout</button>
                  </li>
                  {location.pathname !== "/user-dash" && (
                    <li>
                      <button onClick={() => nav("/user-dash")} className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-sky-600 hover:bg-sky-700 transition duration-150 ease-in-out">My Dashboard</button>
                    </li>
                  )}
                </ul>
              )
              : (
                <ul className="bg-gray-800 px-4 py-2">
                  <li>
                    <button onClick={() => nav('/signin')} className="flex font-medium w-full text-sky-600 hover:text-gray-200 py-2 justify-center">Sign in</button>
                  </li>
                  <li>
                    <button onClick={() => nav('/signup')} className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-sky-600 hover:bg-sky-700 transition duration-150 ease-in-out">Sign up</button>
                  </li>
                </ul>
              )}
              
            </nav>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
