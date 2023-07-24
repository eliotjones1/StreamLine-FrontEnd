import React from "react";

// Import Components
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import CurrentSubsriptions from "./Components/CurrentSubscriptions";
import WatchList from "./Components/WatchList";
import ReleaseCalendar from "./Components/ReleaseCalendar";

export default function UserDash(){
  return(
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow max-w-7xl mx-auto w-full">
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h1 className="h1" data-aos="fade-up">
              <span className="text-sky-600">StreamLine</span> Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <CurrentSubsriptions/>
          <WatchList/>
        </div>
        <ReleaseCalendar />
      </main>
      <Footer />
    </div>
  );
}