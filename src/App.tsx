import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Showcase from "./components/Showcase";
import Roadmap from "./components/Roadmap";
import AssetTypes from "./components/AssetTypes";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";
import Docs from "./components/Docs";

// Lightweight hash router: "#docs" opens the docs page, anything else is home.
// Hash-based so it survives a refresh on static hosting and stays shareable.
function getPage(): "home" | "docs" {
  return window.location.hash.replace(/^#\/?/, "") === "docs" ? "docs" : "home";
}

export default function App() {
  const [page, setPage] = useState<"home" | "docs">(getPage());

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPage());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (page === "docs") {
    return <Docs />;
  }

  return (
    <div className="min-h-screen bg-[#a5a5ae]">
      <Navbar />
      <Hero />
      <Showcase />
      <Roadmap />
      <HowItWorks />
      <AssetTypes />
      <Waitlist />
      <Footer />
    </div>
  );
}
