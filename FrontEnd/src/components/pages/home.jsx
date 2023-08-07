// Import Libraries
import React from 'react';

// Import Templates
import TwoColumnGrid from '../templates/twoColumnSection';

// Import Organisms
import FeaturesZigzag from '../organisms/featuresZigzag';
import Header from "../organisms/header";
import Footer from "../organisms/footer";
import CTA from '../organisms/cta';
import Newsletter from '../organisms/newsletter';
import LogoClouds from '../organisms/logoClouds';
import HeroTitle from '../organisms/heroTitle';
import Image7Grid from '../organisms/image7Grid';
import PageTopIllustration from '../organisms/pageTopIllustration';
import PageRight2Illustration from '../organisms/pageRight2Illustration';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <PageTopIllustration/>
      <main className="grow">
        <section>
          <TwoColumnGrid
            classNameMods={"pt-14"}
            leftComponent={<HeroTitle/>}
            rightComponent={<Image7Grid/>}
          />
          <PageRight2Illustration/>
        </section>
        <LogoClouds/>
        <FeaturesZigzag />
        <TwoColumnGrid
          leftComponent={<Newsletter />}
          rightComponent={<CTA arrowBtnText={"Learn More"} newNavURL={"/about-us"}/>}
        />
      </main>
      <Footer />
    </div>
  );
}