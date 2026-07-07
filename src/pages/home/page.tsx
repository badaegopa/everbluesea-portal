import LorenzAttractor from "@/pages/home/components/LorenzAttractor";
import Navbar from "@/pages/home/components/Navbar";
import Hero from "@/pages/home/components/Hero";
import HeroBannerStrip from "@/pages/home/components/HeroBannerStrip";
import Statistics from "@/pages/home/components/Statistics";
import FeaturedReports from "@/pages/home/components/FeaturedReports";
import Categories from "@/pages/home/components/Categories";
import Papers from "@/pages/home/components/Papers";
import About from "@/pages/home/components/About";
import NoticeBanner from "@/pages/home/components/NoticeBanner";
import Footer from "@/pages/home/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground-950 font-body">
      <LorenzAttractor />
      <Navbar />
      <main>
        <Hero />
        <HeroBannerStrip />
        <Statistics />
        <FeaturedReports />
        <Categories />
        <Papers />
        <About />
      </main>
      <NoticeBanner />
      <Footer />
    </div>
  );
}
