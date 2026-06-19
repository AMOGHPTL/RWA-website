import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Showcase from "./components/Showcase";
import Roadmap from "./components/Roadmap";
import AssetTypes from "./components/AssetTypes";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#a5a5ae]">
      <Navbar />
      <Hero />
      {/* <Marquee /> */}
      {/* <Stats /> */}
      {/* <Features /> */}
      <Showcase />
      <Roadmap />
      <HowItWorks />
      <AssetTypes />
      <Waitlist />
      <Footer />
    </div>
  );
}
