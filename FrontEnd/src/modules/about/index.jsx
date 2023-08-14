import { Founders, Story, TextSection } from '/src/modules/about/components';
import { TwoColumnGrid } from '../common/templates';
import { Header, Footer, CTA } from '../common/components';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow mx-auto max-w-7xl">
        <div className="mt-28 mb-20 max-w-3xl mx-auto text-center">
          <h1 className="h1" data-aos="fade-up">
            About <span className="text-sky-600">StreamLine</span>
          </h1>
        </div>
        <TwoColumnGrid>
          <TextSection
            sectionHeader={'Our Mission'}
            pargraphTextList={[
              'At StreamLine, our mission is simple: to revolutionize the subscription industry and make content access effortless for all. We understand the frustration faced by casual entertainment users who are overwhelmed by managing multiple subscriptions and figuring out what content is available on each platform. Unfortunately, many companies take advantage of this complexity, making it challenging for users optimally access the content that truly interests them.',
              'Our commitment is to simplify this process entirely. We firmly believe that accessing your favorite content should be simple, cost-efficient, and tailored specifically for you. With our user-friendly interface and proprietary recommendation algorithms, we aim to streamline your subscription journey, allowing you to focus on enjoying the content you love the most.',
              "Say goodbye to the time and effort spent searching for what's available on each service. With StreamLine, you can optimize your entertainment experience and indulge in the content that brings you joy. Welcome to a world of effortless content access - welcome to StreamLine.",
            ]}
          />
          <div className="flex justify-center">
            <img src="/src/assets/images/no-image.jpg" />
          </div>
        </TwoColumnGrid>
        <Story />
        <TextSection
          sectionHeader={'Meet the Founders'}
          pargraphTextList={[
            "Meet our founders, two computer science students from Stanford University who share a passion for entertainment and technology. Both actively compete in the Pac-12 conference as members of the Stanford Men's Soccer Team, showcasing their teamwork and dedication on and off the field. With a vision to reshape the entertainment industry, they aim to utilize their diverse skillsets to bring innovative solutions and make a lasting impact on the future of media and beyond.",
          ]}
        />
        <Founders />
        <TextSection
          sectionHeader={'Join the Revolution'}
          pargraphTextList={[
            'The StreamLine team invites you to be part of our revolutionary movement that transforms the way users experience entertainment. Say goodbye to the complexities of managing multiple subscriptions and the frustration of content fragmentation. Embrace a return to the simplicity and convenience of a virtual cable box, tailored just for you. Our mission is clear: to provide effortless content access, empowering you to focus on what you love most - enjoying your favorite shows, movies, and sports.',
            "Join us on this transformative journey as we lead the charge against the subscription chaos. StreamLine's user-centric platform brings together diverse content seamlessly, eliminating the hassle of switching between services. Discover a personalized entertainment experience like no other, with our intuitive interface and proprietary recommendation algorithms guiding you to your perfect content match. Whether you're a film fanatic, a sports enthusiast, or both, StreamLine has you covered. Embrace the revolution, and welcome to StreamLine, where simplicity and entertainment converge in harmony.",
          ]}
        />
        <CTA arrowBtnText="Contact Us" newNavURL="/support" />
      </main>
      <Footer />
    </div>
  );
}