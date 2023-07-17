// Import Libraries
import React from 'react';

// Import Components
import Footer from '../../partials/Footer';
import Newsletter from './Components/Newsletter';
import Founders from '../../partials/Founders';
import FeaturesZigzag from './Components/FeaturesZigzag';
import HeroHome from './Components/HeroHome';
import LogoClouds from './Components/LogoClouds';
import Header from '../../partials/Header';
import CTA from './Components/CTA';

export default function Home() {
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