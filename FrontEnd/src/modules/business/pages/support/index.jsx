import { Header, Footer } from '/src/modules/common/components';
import { SupportForm } from './components';

export default function Support() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow mx-auto max-w-7xl">
        <SupportForm />
      </main>
      <Footer />
    </div>
  );
}
