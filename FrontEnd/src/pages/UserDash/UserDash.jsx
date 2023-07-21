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
      <main className="grow mx-auto max-w-7xl mt-20">
        <div className="grid grid-cols-3 gap-6">
          <CurrentSubsriptions className="col-start-1"/>
          <WatchList className="col-start-2 col-span-2"/>
        </div>
        <ReleaseCalendar/>
      </main>
      <Footer />
    </div>
  );
}