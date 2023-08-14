import CompaniesContextWrapper from '/src/modules/supportedServices/contexts';
import { Header, Footer } from '/src/modules/common/components';
import { Services, FilterBar } from '/src/modules/supportedServices/components';

function wrapMe() {
  return (
    <section>
      <Header flipColors={true} />
      <main className="grow">
        <div className="mx-auto w-full pb-10">
          <div className="relative overflow-hidden isolate bg-slate-900 dark:bg-slate-50 px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-24">
            <div className="mx-auto w-full lg:mx-0 lg:flex-auto lg:py- lg:text-left text-white dark:text-slate-900">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="h1 mb-4" data-aos="fade-up">
                  <span className="text-sky-600">StreamLine</span> Supported Services
                </h1>
              </div>
              <div className="mt-10">
                <FilterBar />
              </div>
            </div>
          </div>
        </div>
        <Services />
      </main>
      <Footer />
    </section>
  );
}

export default function SupportedServices(){
  return (
    <CompaniesContextWrapper>
      {wrapMe()}
    </CompaniesContextWrapper>
  );
}