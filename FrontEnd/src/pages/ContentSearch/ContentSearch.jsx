// Imports Libraries
import React, { useContext } from "react";

// Import Components
import DefaultContent from "./Components/DefaultContent";
import SearchContent from "./Components/SearchContent";
import Searchbar from "./Components/SearchBar";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";

// Import Contexts
import { SearchContext } from "../../contexts/SearchContext";

export default function ContentSearch() {
  const { showDefault } = useContext(SearchContext);

  return (
      <section>
          <Header flipColors={true}/>
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
                    <Searchbar/>
                  </div>
                </div>
              </div>
            </div>
            {
              showDefault ? 
                <DefaultContent/>
              : 
                <SearchContent/>
            }
            
          </main>
          <Footer/>
      </section>
  );
}