import CTASection from "./components/Layout/CTASection"
import FeaturesGrid from "./components/Layout/FeaturesGrid"
import Hero from "./components/Layout/Hero"
import HowItWorks from "./components/Layout/HowItWorks"
import Navbar from "./components/Layout/Navbar"

function App() {
  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <CTASection />
    </div>
  )
}

export default App