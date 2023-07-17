// Import Libraries
import React from "react";

// Import Components
import Header from '../../partials/Header';
import Footer from "../../partials/Footer";
import Founders from "../../partials/Founders";
import About from "./Components/LearnMore";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow">
        <Founders />
        <About />
      </main>
      <Footer />
    </div>
  );
}