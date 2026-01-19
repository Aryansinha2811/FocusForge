import { Button } from "@/components/ui/button";
import ImageCard from '@/components/ui/image-card'
import Quote from '../../assets/Icons/Quote.jpg'


export default function Hero() {
    return (
        <section className="relative z-10 py-20 px-4 mt-10">
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-hero leading-tight">
                            Master Your{' '}
                            <span className="bg-main text-main-foreground px-3 py-1 border-4 border-border rounded-xl">
                                Focus
                            </span>
                            <br />
                            Forge Your Success
                        </h1>

                        <p className="text-lg text-foreground/80 font-paragraph">
                            FocusForge is your all-in-one productivity command center.
                            Track tasks, run focused study sessions, take smart notes,
                            and watch your progress grow — all in one clean, distraction-free dashboard.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="text-lg font-button">
                                Get Started →
                            </Button>
                            <Button size="lg" variant="neutral" className="text-lg font-button">
                                View Demo
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Image Card */}
                    <div className="space-y-8 ml-60 mt-10">
                        <div className="scale-120 md:scale-125">
                            <ImageCard
                                className="font-hero text-xl"
                                caption="Quote of the Day !"
                                imageUrl={Quote}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}