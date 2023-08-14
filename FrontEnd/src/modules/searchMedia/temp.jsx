import { Header, Footer } from '/src/modules/common/components';
import { SearchBar, SearchContent, DefaultContent } from '/src/modules/searchMedia/components';
import { useSearch } from '/src/modules/searchMedia/hooks';

export default function Temp() {
  const { showDefault } = useSearch();

  return (
    <section>
      <Header flipColors={true} />
      <main className="grow">
        <div className="mx-auto w-full pb-10">
          <div className="relative isolate bg-slate-900 dark:bg-slate-50 px-6 pt-28 shadow-2xl pb-8">
            <div className="mx-auto w-full lg:mx-0 lg:flex-auto lg:py- lg:text-left text-white dark:text-slate-900">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="h1 mb-4" data-aos="fade-up">
                  <span className="text-sky-600">StreamLine</span> Content Discovery
                </h1>
              </div>
              <div className="mt-10">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        {showDefault ? <DefaultContent /> : <SearchContent />}
      </main>
      <Footer />
    </section>
  );
}