// Import Libraries
import React from 'react';

// Import Components
import Footer from '../../partials/Footer';
import Newsletter from './Components/Newsletter';
import FeaturesZigzag from './Components/FeaturesZigzag';
import HeroHome from './Components/HeroHome';
import LogoClouds from './Components/LogoClouds';
import Header from '../../partials/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow">
        <HeroHome/>
        <LogoClouds/>
        <FeaturesZigzag />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}