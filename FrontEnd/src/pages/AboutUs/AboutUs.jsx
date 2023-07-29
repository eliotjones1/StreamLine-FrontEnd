// Import Libraries
import React from "react";

// Import Components
import Header from '../../partials/Header';
import Footer from "../../partials/Footer";
import Mission from "./Components/Mission";
import Story from "./Components/Story";
import Founders from "./Components/Founders";
import CTA from "./Components/CTA";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow mx-auto max-w-7xl">
        <div className="mt-28 mb-20 max-w-3xl mx-auto text-center">
          <h1 className="h1" data-aos="fade-up">
            About <span className="text-sky-600">StreamLine</span> 
          </h1>
        </div>
        <Mission/>
        <Story/>
        <Founders />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}