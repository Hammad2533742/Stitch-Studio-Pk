import StitchNav from '@/components/StitchNav';
import Ticker from '@/components/Ticker';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Divisions from '@/components/Divisions';
import AtelierFloor from '@/components/AtelierFloor';
import HomeTextile from '@/components/HomeTextile';
import OperationsVideo from '@/components/OperationsVideo';
import FaqAccordion from '@/components/FaqAccordion';
import SignUpSection from '@/components/SignUpSection';
import ContactCard from '@/components/ContactCard';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import NeedleCursor from '@/components/NeedleCursor';
import Chatbot from '@/components/Chatbot';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-ink selection:bg-gold selection:text-canvas">
      <NeedleCursor />
      <StitchNav />

      <div className="pt-16">
        <Ticker />
        <main>
          <Hero />
          <Manifesto />

          <ErrorBoundary>
            <Divisions />
          </ErrorBoundary>

          <ErrorBoundary>
            <AtelierFloor />
          </ErrorBoundary>

          <ErrorBoundary>
            <HomeTextile />
          </ErrorBoundary>

          <ErrorBoundary>
            <OperationsVideo />
          </ErrorBoundary>

          <ErrorBoundary>
            <FaqAccordion />
          </ErrorBoundary>

          <SignUpSection />

          <section id="contact" className="px-6 sm:px-10 py-24 sm:py-32 max-w-[120rem] mx-auto" aria-label="Contact">
            <div className="mb-12 sm:mb-16 max-w-2xl">
              <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-gold">
                Get in touch
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-ink">
                Let's talk production
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <ContactCard />
              <ContactForm />
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <ErrorBoundary>
        <Chatbot />
      </ErrorBoundary>
    </div>
  );
}