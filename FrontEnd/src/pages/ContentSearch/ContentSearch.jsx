import React, { useState } from "react";
import DefaultContent from "./Components/DefaultContent";
import SearchContent from "./Components/SearchContent";
import Searchbar from "./Components/SearchBar";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";

function ContentSearch() {
  const [showDefault, setShowDefault] = useState(true)
  const [content, setContent] = useState([]);
  const [lastSearch, setLastSearch] = useState("");
  const APIKEY = "95cd5279f17c6593123c72d04e0bedfa";

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${query}&include_adult=false`
    );
    const searchContent = await data.json();
    setContent(searchContent.results);
    setLastSearch(query);
    setShowDefault(false);
  }

  return (
      <section>
          <Header flipColors={true}/>
          <main className="grow">
            <div className="mx-auto w-full pb-10">
              <div className="relative isolate overflow-hidden bg-slate-900 dark:bg-slate-50 px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg
                  viewBox="0 0 1024 1024"
                  className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                  aria-hidden="true"
                >
                  <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                  <defs>
                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                      <stop stopColor="#0369a1" />
                      <stop offset={1} stopColor="#0ea5e9" />
                    </radialGradient>
                  </defs>
                </svg>
                <div className="mx-auto w-full lg:mx-0 lg:flex-auto lg:py-32 lg:text-left text-white dark:text-slate-900">
                <div className="max-w-3xl mx-auto text-center">
                          <h1 className="h1 mb-4" data-aos="fade-up">
                              <span className="text-sky-600">StreamLine</span> Content Discovery
                          </h1>
                      </div>
                  <div className="mt-10">
                    <Searchbar fetchSearch={fetchSearch}/>
                  </div>
                </div>
              </div>
            </div>
            {
              showDefault ? <DefaultContent/>
              : <SearchContent mediaContent={content} searchQuery={lastSearch} returnToMain={setShowDefault}/>
            }
            
          </main>
          <Footer/>
      </section>
  );
}

export default ContentSearch;