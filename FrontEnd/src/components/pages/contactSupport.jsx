import React from 'react';
import Form from '../organisms/supportForm';
import Header from '../organisms/header';
import Footer from '../organisms/footer';

export default function ContactSupport() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow mx-auto max-w-7xl">
        <Form />
      </main>
      <Footer />
    </div>
  );
}
