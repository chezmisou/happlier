import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Examples } from '@/components/landing/examples';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar dark />
      <main>
        <HeroSection />
        <HowItWorks />
        <Examples />
      </main>
      <Footer />
    </div>
  );
}
