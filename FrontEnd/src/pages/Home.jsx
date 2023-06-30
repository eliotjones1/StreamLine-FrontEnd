import React from 'react';

import Footer from '../partials/Footer';
import Newsletter from '../partials/Newsletter';
import Founders from '../partials/Founders';
import FeaturesZigzag from '../partials/FeaturesZigzag';
import HeroHome from '../partials/HeroHome';
import LogoClouds from '../partials/LogoClouds';
import Header from '../partials/Header';
import CTA from '../partials/CTA';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow">
        <HeroHome/>
        <LogoClouds/>
        <FeaturesZigzag />
        <Founders />
        <Newsletter />
        <CTA/>
      </main>
      <Footer />
    </div>
  );
}

export default Home;