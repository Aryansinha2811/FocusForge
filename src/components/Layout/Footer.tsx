import { Button } from "../ui/button"
import LinkedIn from "../../assets/Icons/Linkedin.png"
import Github from "../../assets/Icons/Github.png"

export default function Footer() {
    return (
        <footer>
            <div className="border-t-2 border-border mx-auto flex max-w-7xl items-center justify-between p-4 py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Left Side: Paragraph */}
                <p className="text-[17px] text-foreground/70 font-paragraph">
                    &copy; {new Date().getFullYear()} FocusForge / <span className="font-hero text-[18px] text-black">Aryan Sinha.</span>
                </p>

                {/* Right Side: Buttons */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => window.open('https://www.linkedin.com/in/aryan-sinha-2811/', '_blank')}
                        variant={"neutral"}
                        className="font-button text-lg"
                    >
                        <img className="h-6 w-6" src={LinkedIn} alt="LinkedIn" />
                        LinkedIn
                    </Button>
                    <Button
                        onClick={() => window.open('https://github.com/aryansinha2811', '_blank')}
                        variant='neutral'
                        className="font-button text-lg"
                    >
                        <img className="h-6 w-6" src={Github} alt="GitHub" />
                        GitHub
                    </Button>
                </div>

            </div>
        </footer>
    )
}