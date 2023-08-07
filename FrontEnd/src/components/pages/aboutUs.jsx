// Import Libraries
import React from "react";

// Import Components
import Header from "../organisms/header";
import Footer from "../organisms/footer";
import Mission from "../organisms/mission";
import Story from "../organisms/story";
import Founders from "../organisms/founders";
import CTA from '../organisms/cta';

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
        <div className='space-y-4'>
          <h2 className="text-4xl mb-6 font-bold tracking-tight">
            Join the Revolution
          </h2>
          <p className="text-lg leading-8">
            The StreamLine team invites you to be part of our revolutionary movement that transforms the way users experience entertainment. Say goodbye to the complexities of managing multiple subscriptions and the frustration of content fragmentation. Embrace a return to the simplicity and convenience of a virtual cable box, tailored just for you. Our mission is clear: to provide effortless content access, empowering you to focus on what you love most - enjoying your favorite shows, movies, and sports.
          </p>
          <p className='text-lg leading-8'>
            Join us on this transformative journey as we lead the charge against the subscription chaos. StreamLine's user-centric platform brings together diverse content seamlessly, eliminating the hassle of switching between services. Discover a personalized entertainment experience like no other, with our intuitive interface and proprietary recommendation algorithms guiding you to your perfect content match. Whether you're a film fanatic, a sports enthusiast, or both, StreamLine has you covered. Embrace the revolution, and welcome to StreamLine, where simplicity and entertainment converge in harmony.
          </p>
        </div>
        <CTA arrowBtnText="Contact Us" newNavURL="/support" />
      </main>
      <Footer />
    </div>
  );
}