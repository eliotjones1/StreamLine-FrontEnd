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
      <main className="grow mx-auto w-full mt-20">
        <div className="grid grid-cols-3 max-w-7xl mx-auto gap-6">
          <CurrentSubsriptions/>
          <WatchList/>
        </div>
        <ReleaseCalendar/>
      </main>
      <Footer />
    </div>
  );
}