import Hero from '@/components/sections/Hero';
import Ticker from '@/components/sections/Ticker';
import Pathway from '@/components/sections/Pathway';
import Why from '@/components/sections/Why';
import Courses from '@/components/sections/Courses';
import Equipment from '@/components/sections/Equipment';
import Instructors from '@/components/sections/Instructors';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import FAQ from '@/components/sections/FAQ';
import Events from '@/components/sections/Events';
import EnrolCTA from '@/components/sections/EnrolCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Pathway />
      <Why />
      <Courses />
      <Equipment />
      <Instructors />
      <Stats />
      <Testimonials />
      <About />
      <Gallery />
      <FAQ />
      <Events />
      <EnrolCTA />
    </main>
  );
}
