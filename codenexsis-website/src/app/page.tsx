import Hero from '@/components/Hero/Hero';
import TrustBar from '@/components/TrustBar/TrustBar';
import Services from '@/components/Services/Services';
import AIServices from '@/components/AIServices/AIServices';
import MarketingServices from '@/components/MarketingServices/MarketingServices';
import SoftwareShowcase from '@/components/SoftwareShowcase/SoftwareShowcase';
import MobileShowcase from '@/components/MobileShowcase/MobileShowcase';
import ScrollScene3D from '@/components/ScrollScene3D/ScrollScene3D';
import Manifesto from '@/components/Manifesto/Manifesto';
import Stats from '@/components/Stats/Stats';
import Industries from '@/components/Industries/Industries';
import About from '@/components/About/About';
import WhyUs from '@/components/WhyUs/WhyUs';
import Process from '@/components/Process/Process';
import TechStack from '@/components/TechStack/TechStack';
import Testimonials from '@/components/Testimonials/Testimonials';
import CTA from '@/components/CTA/CTA';
import { siteConfig } from '@/config/site';
import { loadServices, coreOf, marketingOf } from '@/lib/services-data';

export const metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const services = await loadServices();
  return (
    <>
      <Hero />
      <TrustBar />
      <Services services={coreOf(services)} />
      <AIServices />
      <MarketingServices services={marketingOf(services)} />
      <SoftwareShowcase />
      <MobileShowcase />
      <ScrollScene3D />
      <Manifesto />
      <Stats />
      <Industries />
      <About />
      <WhyUs />
      <Process />
      <TechStack />
      <Testimonials />
      <CTA />
    </>
  );
}
