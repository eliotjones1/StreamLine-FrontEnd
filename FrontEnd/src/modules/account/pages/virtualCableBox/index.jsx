import { useQuery } from '@tanstack/react-query';
import { Header, Footer, ContentSlider } from '/src/modules/common/components';
import { useAccount } from '/src/modules/account/hooks';

export default function CableBox() {
  const { fetchList } = useAccount();

  const {status, data} = useQuery({
    queryKey: ["account", "list"],
    keepPreviousData: true,
    queryFn: () => fetchList()
  });

  if (status === "loading") return <></>;
  if (status === "error") return <></>;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow max-w-7xl mx-auto w-full">
        <div className="mt-28 max-w-3xl mx-auto text-center">
          <h1 className="h1 pb-4" data-aos="fade-up">
            <span className="text-sky-600">StreamLine</span> Cable Box
          </h1>
          <p className="text-lg">
            Explore content reccomendations based on all of your subscriptions in one place.
            Enjoying your favorite content has never been easier!
          </p>
        </div>
        <section>
          <div className="pb-4" key="My List">
            <p className="font-bold pb-2 text-3xl">My List</p>
            <ContentSlider mediaContent={data} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
