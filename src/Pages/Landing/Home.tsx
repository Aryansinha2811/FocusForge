import { useState } from "react"
import CTASection from "@/components/Layout/CTASection"
import FeaturesGrid from "@/components/Layout/FeaturesGrid"
import Hero from "@/components/Layout/Hero"
import HowItWorks from "@/components/Layout/HowItWorks"
import Navbar from "@/components/Layout/Navbar"
import Footer from "@/components/Layout/Footer"
import { AuthModal } from "@/components/../Pages/Auth/AuthModal"

export default function Home(){
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [authTab, setAuthTab] = useState<'login' | 'signup'>('login')

    const handleOpenAuth = (tab: 'login' | 'signup') => {
        setAuthTab(tab)
        setIsAuthModalOpen(true)
    }

    return(
        <div>
            <Navbar onOpenAuth={handleOpenAuth} />
            <Hero />
            <FeaturesGrid />
            <HowItWorks />
            <CTASection />
            <Footer />
            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultTab={authTab}
            />
        </div>
    )
}