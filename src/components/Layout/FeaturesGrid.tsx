export default function FeaturesGrid() {
    const features = [
        {
            icon: "📋",
            title: "Smart Task Management",
            description: "Create, prioritize, and organize tasks with categories, due dates, and filters. Stay on top of what matters most.",
            color: "bg-[#8646d4]"
        },
        {
            icon: "⏱️",
            title: "Focus Timer & Sessions",
            description: "Built-in Pomodoro timer keeps you focused. Track every study session and watch your focus time grow.",
            color: "bg-[#FF4D50]"
        },
        {
            icon: "📝",
            title: "Organized Notes",
            description: "Take notes, tag them, search instantly. Link notes to tasks and sessions for complete context.",
            color: "bg-[#FACC00]"
        },
        {
            icon: "📊",
            title: "Progress Analytics",
            description: "Visual charts show your productivity trends. See what's working and optimize your study habits.",
            color: "bg-[#05E17A]"
        }
    ]

    return (
        <section className="relative z-10 py-20 px-4 bg-transparent">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-hero mb-4">
                        Everything You Need to{" "}
                        <span className="bg-main text-main-foreground px-3 py-1 border-4 border-border rounded-xl">
                            Excel
                        </span>
                    </h2>
                    <p className="text-xl text-foreground/70 font-paragraph max-w-2xl mx-auto">
                        Four powerful tools working together to supercharge your productivity
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-blue-500 border-4 border-border shadow-[8px_8px_0px_0px_oklch(var(--border))] p-8 rounded-base hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_oklch(var(--border))] transition-all group"
                        >
                            {/* Icon */}
                            <div
                                className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} border-4 border-border rounded-base text-4xl mb-4 group-hover:rotate-6 transition-transform`}
                            >
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-hero mb-3 text-[#181818]">{feature.title}</h3>
                            <p className="text-foreground/70 font-paragraph">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}