import { Button } from "@/components/ui/button"

export default function CTASection() {
    return (
        <section className="relative z-10 py-20 px-4 bg-transparent">
            <div className="mx-auto max-w-5xl">
                <div className="bg-white border-4 border-border shadow-[12px_12px_0px_0px_oklch(var(--border))] p-12 md:p-16 rounded-base text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffd20a] opacity-40 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#05E17A] opacity-40 rounded-full blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-hero text-main-foreground mb-4">
                            Ready to Transform Your Productivity?
                        </h2>
                        <p className="text-lg font-paragraph text-main-foreground/90 mb-8 max-w-2xl mx-auto">
                            Join hundreds of students who've already leveled up their focus and achieved their goals.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                            <Button
                                size="lg"
                                variant="default"
                                className="text-lg font-button"
                            >
                                Get Started Free →
                            </Button>
                            <Button
                                size="lg"
                                variant="neutral"
                                className="text-lg font-button"
                            >
                                View Demo
                            </Button>
                        </div>

                        {/* Trust Badge */}
                        <div className="flex items-center justify-center gap-2 text-main-foreground/80">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-medium">
                                Free forever • No credit card required • Start in 30 seconds
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}