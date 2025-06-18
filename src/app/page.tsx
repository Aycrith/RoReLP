import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutUs from "@/components/AboutUs"; // New import
import Pricing from "@/components/Pricing"; // New import
import Testimonials from "@/components/Testimonials"; // New import
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <Pricing />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      {/* The default Next.js starter content has been removed. */}
    </>
  );
}
