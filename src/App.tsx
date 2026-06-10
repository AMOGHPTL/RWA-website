import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AssetTypes from './components/AssetTypes'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#060612] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Features />
      <HowItWorks />
      <AssetTypes />
      <Waitlist />
      <Footer />
    </div>
  )
}
