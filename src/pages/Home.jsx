import StitchNav from '@/components/StitchNav';
import Ticker from '@/components/Ticker';
import Hero from '@/components/Hero';
import Divisions from '@/components/Divisions';
import AtelierFloor from '@/components/AtelierFloor';
import Manifesto from '@/components/Manifesto';
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
          {/* Hero Section with 3D Sewing Machine & Animated Stats */}
          <Hero />

          {/* Section 01: Manifesto */}
          <Manifesto />

          {/* Section 02: 3 Main Gender Divisions (Men's, Women's, Kid's) */}
          <ErrorBoundary>
            <Divisions />
          </ErrorBoundary>

          {/* Section 03: 3 Gender-Independent Fabrications (Sports, Woven, Knit) */}
          <ErrorBoundary>
            <AtelierFloor />
          </ErrorBoundary>
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