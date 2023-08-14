import { Header, Footer } from '/src/modules/common/components';
import { Releases, Subscriptions, WatchList } from '/src/modules/dashboard/components';

export default function UserDash() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow max-w-7xl mx-auto w-full">
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h1 className="h1" data-aos="fade-up">
            <span className="text-sky-600">StreamLine</span> Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Subscriptions />
          <WatchList />
        </div>
        <Releases />
      </main>
      <Footer />
    </div>
  );
}
