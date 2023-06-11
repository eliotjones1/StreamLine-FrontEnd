import React from 'react';

import {
  Header,
  PageIllustration,
  HeroHome,
  FeaturesBlocks,
  FeaturesZigZag,
  Founders,
  Newsletter,
  Footer
} from '../partials';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <HeroHome />
        <FeaturesBlocks />
        <FeaturesZigZag />
        <Founders />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default Home;