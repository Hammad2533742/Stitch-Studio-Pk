import StitchNav from '@/components/StitchNav';
import Ticker from '@/components/Ticker';
import Hero from '@/components/Hero';
import AtelierFloor from '@/components/AtelierFloor';
import Manifesto from '@/components/Manifesto';
import Divisions from '@/components/Divisions';
import Categories from '@/components/Categories';
import HomeTextile from '@/components/HomeTextile';
import Footer from '@/components/Footer';
import NeedleCursor from '@/components/NeedleCursor';
import Chatbot from '@/components/Chatbot';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#B08D57] selection:text-white">
      {/* Custom needle cursor */}
      <NeedleCursor />

      <StitchNav />

      <div className="pt-16">
        <Ticker />
        <main>
          <Hero />
          <ErrorBoundary>
            <AtelierFloor />
          </ErrorBoundary>
          <Manifesto />
          <Divisions />
          <Categories />
          <HomeTextile />
        </main>
        <Footer />
      </div>

      {/* AI chatbot concierge */}
      <ErrorBoundary>
        <Chatbot />
      </ErrorBoundary>
    </div>
  );
}