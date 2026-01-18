export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Plan",
            description: "Create tasks, set priorities, and organize your study schedule. Break big goals into manageable chunks.",
            icon: "📝",
            color: "bg-[#5294FF]"
        },
        {
            number: "02",
            title: "Focus",
            description: "Start your Pomodoro timer and dive deep into focused work. No distractions, just pure productivity.",
            icon: "🎯",
            color: "bg-[#FF4D50]"
        },
        {
            number: "03",
            title: "Track",
            description: "Review your analytics, celebrate wins, and identify patterns. Continuously improve your workflow.",
            icon: "📈",
            color: "bg-[#05E17A]"
        }
    ]

    return (
        <section className="relative z-10 py-20 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-hero mb-4">
                        How It Works
                    </h2>
                    <p className="text-md text-foreground/70 max-w-2xl mx-auto font-paragraph">
                        Three simple steps to transform your productivity
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">

                            {/* Step Card */}
                            <div className="bg-white border-4 border-border shadow-[8px_8px_0px_0px_oklch(var(--border))] p-8 rounded-base hover:translate-y-[-4px] transition-transform relative">
                                {/* Step Number Badge */}
                                <div className="absolute -top-4 -left-4 bg-main text-main-foreground w-12 h-12 border-4 border-border rounded-base flex items-center justify-center font-hero text-xl rotate-[-12deg]">
                                    {step.number}
                                </div>
                                {/* Icon */}
                                <div
                                    className={`inline-flex items-center justify-center w-16 h-16 ${step.color} border-4 border-border rounded-base text-4xl mb-4 mt-4`}
                                >
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-heading mb-3">{step.title}</h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}