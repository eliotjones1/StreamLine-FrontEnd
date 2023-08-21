import { TwoColumnGrid } from '/src/modules/common/templates';
import {
  Header,
  Footer,
  CTA,
  PageTopIllustration,
  PageRight2Illustration,
} from '/src/modules/common/components';
import { FeaturesZigzag, Newsletter, LogoClouds, HeroTitle, ImageGrid } from './components';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <PageTopIllustration />
      <main className="grow">
        <section>
          <TwoColumnGrid classNameMods={'pt-14'}>
            <HeroTitle />
            <ImageGrid />
          </TwoColumnGrid>
          <PageRight2Illustration />
        </section>
        <LogoClouds />
        <FeaturesZigzag />
        <TwoColumnGrid>
          <Newsletter />
          <CTA arrowBtnText={'Learn More'} newNavURL={'/about-us'} />
        </TwoColumnGrid>
      </main>
      <Footer />
    </div>
  );
}
