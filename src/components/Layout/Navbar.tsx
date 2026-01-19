import { Button } from '@/components/ui/button'
import github from '../../assets/Icons/Github.png' 
import Focus from '../../assets/Icons/Focus.png'
import { useState, useEffect } from 'react'

interface NavbarProps {
    onOpenAuth: (tab: 'login' | 'signup') => void
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past 100px
                setIsVisible(false)
            } else {
                // Scrolling up or at top
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', controlNavbar)

        // Cleanup
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY])

    return(
        <header 
            className={`sticky top-2 z-50 w-full transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+0.5rem)]'
            }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 bg-white border-2 border-border shadow-shadow rounded-xl">
                {/* Logo and Name */}
                <div className="flex items-center gap-3">
                    <img src={Focus} alt="FocusForge" className="h-8 w-8 mb-1" />
                    <span className="text-3xl font-logo mt-2">FOCUS~FORGE</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button 
                        className='font-button text-lg'
                        variant="neutral"
                        onClick={() => window.open('https://github.com/Aryansinha2811/FocusForge', '_blank')}
                    >
                        <img src={github} alt="GitHub" className="h-5 w-5" />
                        Github
                    </Button>
                    <Button 
                        variant="neutral"
                        className='font-button font-bold text-lg'
                        onClick={() => onOpenAuth('login')}
                    >
                        Login
                    </Button>
                    <Button 
                        className='font-button font-bold text-lg'
                        onClick={() => onOpenAuth('signup')}
                    >
                        Sign Up
                    </Button>
                </div>
            </nav>
        </header>
    )
}