import React from "react";

import Header from '../partials/Header';
import Footer from "../partials/Footer";
import Founders from "../partials/Founders";

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow">
        <Founders />
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;