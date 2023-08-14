import { Header, Footer, PageTopIllustration } from '/src/modules/common/components';
import { PricingCard } from '/src/modules/pricing/components';

const BasicFeatures = [
  'Monthly Subscription Change Alerts',
  'Personalized Optimization Bundles',
  'Warning on Upcoming Payments',
  'Monthly Newsletter',
];

const PremiumFeatures = [
  'Automated Subscription Enrollment',
  'Automated Subscription Cancellation',
  'All Basic Membership Features',
];

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <PageTopIllustration />
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Discover Our Pricing Options
              </h2>
            </div>

            <PricingCard
              title="Premium Membership"
              description={
                'Our Premium Membership automates essential features and benefits designed to enhance your streaming experience. Enjoy access to a range of core services and valuable resources effortlessly.'
              }
              features={PremiumFeatures}
              price="$30.00"
              link="https://buy.stripe.com/test_5kA3dSb1C05s23K4gi"
            />

            <PricingCard
              title="Basic Membership"
              description={
                'Our Basic Membership offers essential features and benefits designed to enhance your streaming experience. Enjoy access to a range of core services and valuable resources.'
              }
              features={BasicFeatures}
              price="$10.00"
              link="https://buy.stripe.com/test_9AQ4hW9Xy2dAbEk6op"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
