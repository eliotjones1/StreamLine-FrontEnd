import React from "react";
import Form from "./Components/Form";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";


export default function ContactSupport(){
  return(
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow mx-auto max-w-7xl">
        <Form/>
      </main>
      <Footer />
    </div>
  );
}