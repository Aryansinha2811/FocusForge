import { Button } from '@/components/ui/button'
import github from '../../assets/Icons/Github.png' 
import Focus from '../../assets/Icons/Focus.png'

export default function Navbar(){
    return(
        <header className="sticky top-2 z-50 w-full">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 bg-white border-2 border-border shadow-shadow rounded-base">
                {/* Logo and Name */}
                <div className="flex items-center gap-3">
                    {/* Add your logo here if you have one */}
                    <img src={Focus} alt="FocusForge" className="h-6 w-6" />
                    <span className="text-3xl font-heading font-sans">FocusForge</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button 
                        variant="neutral"
                        onClick={() => window.open('https://github.com/Aryansinha2811', '_blank')}
                    >
                        <img src={github} alt="GitHub" className="h-5 w-5" />
                    </Button>
                    <Button variant="neutral">
                        Login
                    </Button>
                    <Button>
                        Sign Up
                    </Button>
                </div>
            </nav>
        </header>
    )
}