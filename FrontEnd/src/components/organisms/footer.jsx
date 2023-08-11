import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import SocialLink from '../atoms/socialLink';
import SocialLinksList from '../molecules/socialLinksList';

// Currently missing Twitter, Github, Facebook, Instagram, LinkedIn
const socialLinks = ["twitter.com", "github.com", "facebook.com", "instagram.com", "linkedin.com"]

function Footer() {
  const nav = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 divide-y divide-slate-200 dark:divide-slate-700">

          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">

            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <button className="inline-block" aria-label="Cruip" onClick={() => nav('/')}>
                  <img className="w-8 h-8 fill-current text-blue-200" src='/src/images/StreamLine_Transparent_Logo.png'/>
                </button>
              </div>
              <h3 className='font-bold mb-2'>Contact Us</h3>
              <div className="text-slate-600 dark:text-gray-400 mb-2">Stanford University 450 Serra Mall, Stanford, CA 94305</div>
              <div className="text-slate-600 dark:text-gray-400 mb-2">Ryan Dunn: rcdunn01@stanford.edu</div>
              <div className="text-slate-600 dark:text-gray-400 mb-2">Eliot Jones: eliotj1@cs.stanford.edu</div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">

              {/* 2nd block */}
              <div className="text-sm">
                <h2 className="pb-2 font-semibold">Features</h2>
                <ul className='grid gap-y-2'>
                  <li className="mb-1">
                    <button onClick={() => nav('/content-search')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">Discover Content</button>
                  </li>
                  <li className="mb-1">
                    <button onClick={() => nav('/services-search')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">Explore Services</button>
                  </li>
                  {
                    isLoggedIn && 
                    <li className="mb-1">
                      <button onClick={() => nav('/virtual-cable-box')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">Virtual Cable Box</button>
                    </li>
                  }
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-sm">
                <h2 className="pb-2 font-semibold">Resources</h2>
                <ul className='grid gap-y-2'>
                  <li className="mb-1">
                    <button onClick={() => nav('/support')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">Contact Us</button>
                  </li>
                </ul>
              </div>

              {/* 4th block */}
              <div className="text-sm">
                <h2 className="pb-2 font-semibold">Company</h2>
                <ul className='grid gap-y-2'>
                  <li className="mb-1">
                    <button onClick={() => nav('/aboutus')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">About Us</button>
                  </li>
                  <li className="mb-1">
                    <button onClick={() => nav('/pricing')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">Pricing</button>
                  </li>
                  <li className="mb-1">
                    <button onClick={() => nav('/news')} className="hover:text-slate-900 dark:hover:text-slate-300 transition duration-150 ease-in-out">News</button>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom area */}
          <div className="mt-4 pt-8 md:flex md:items-center md:justify-between">

            {/* Social links */}
            <SocialLinksList list={socialLinks} classNameMods={"md:order-1 md:ml-4 md:mb-0"}/>

            <div className="text-slate-600 dark:text-gray-400 text-sm">
              &copy; StreamLine.com. All rights reserved.
            </div>
            <div className="text-slate-600 dark:text-gray-400 text-sm">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;