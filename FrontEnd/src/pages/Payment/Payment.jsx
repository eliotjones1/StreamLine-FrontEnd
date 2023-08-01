// Basic Imports
import React from 'react';

// Component Imports
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageTopIllustration from '../../partials/PageTopIllustration';

export default function Payment(){

  return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header/>
        <PageTopIllustration/>
        <main className="grow mx-auto max-w-7xl mt-20">

        </main>
        <Footer />
      </div>
  );
}