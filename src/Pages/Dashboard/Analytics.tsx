import { TrendingUp, Clock, Target, CheckCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line} from 'recharts';

export default function Analytics() {
    // Sample data for Task Priority Distribution
    const priorityData = [
        { priority: 'High', tasks: 12, fill: 'var(--color-high)' },
        { priority: 'Medium', tasks: 25, fill: 'var(--color-medium)' },
        { priority: 'Low', tasks: 18, fill: 'var(--color-low)' },
    ];

    const priorityConfig = {
        tasks: {
            label: "Tasks",
        },
        high: {
            label: "High",
            color: "#ef4444",
        },
        medium: {
            label: "Medium",
            color: "#f59e0b",
        },
        low: {
            label: "Low",
            color: "#1cc716",
        },
    } satisfies ChartConfig;

    // Sample data for Study Time by Subject
    const studyTimeData = [
        { subject: 'Math', hours: 5.5, fill: 'var(--color-math)' },
        { subject: 'Science', hours: 4.2, fill: 'var(--color-science)' },
        { subject: 'English', hours: 3.8, fill: 'var(--color-english)' },
        { subject: 'History', hours: 2.5, fill: 'var(--color-history)' },
        { subject: 'Art', hours: 1.8, fill: 'var(--color-art)' },
    ];

    const studyTimeConfig = {
        hours: {
            label: "Hours",
        },
        math: {
            label: "Math",
            color: "#3b82f6",
        },
        science: {
            label: "Science",
            color: "#8b5cf6",
        },
        english: {
            label: "English",
            color: "#f55e27",
        },
        history: {
            label: "History",
            color: "#fca80a",
        },
        art: {
            label: "Art",
            color: "#10b981",
        },
    } satisfies ChartConfig;

    // Monthly study trend data
    const monthlyTrendData = [
        { date: 'Jan 01', hours: 2 },
        { date: 'Jan 02', hours: 1.5 },
        { date: 'Jan 03', hours: 2.2 },
        { date: 'Jan 04', hours: 3 },
        { date: 'Jan 05', hours: 2.5 },
        { date: 'Jan 06', hours: 1.8 },
        { date: 'Jan 07', hours: 0 },
        { date: 'Jan 08', hours: 0 },
        { date: 'Jan 09', hours: 0 },
        { date: 'Jan 10', hours: 0 },
        { date: 'Jan 11', hours: 0 },
        { date: 'Jan 12', hours: 0 },
        { date: 'Jan 13', hours: 0 },
        { date: 'Jan 14', hours: 0 },
        { date: 'Jan 15', hours: 0 },
        { date: 'Jan 16', hours: 0 },
        { date: 'Jan 17', hours: 0 },
        { date: 'Jan 18', hours: 0 },
        { date: 'Jan 19', hours: 0 },
        { date: 'Jan 20', hours: 0 },
        { date: 'Jan 21', hours: 0 },
        { date: 'Jan 22', hours: 0 },
    ];

    const monthlyTrendConfig = {
        hours: {
            label: "Hours",
            color: "#3b82f6",
        },
    } satisfies ChartConfig;


    const StatCard = ({ icon: Icon, title, value, subtitle, iconColor }: any) => (
        <Card className="w-full bg-white/90">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-hero uppercase ml-1">{title}</CardTitle>
                    <div className={`p-2 ${iconColor} border-2 border-border`}>
                        <Icon size={13} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-hero mb-2">{value}</div>
                <div className="text-[14px] font-paragraph">{subtitle}</div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-transparent p-4">
            <div className="max-w-7xl ">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-4xl font-hero mb-2 uppercase tracking-tight">Analytics</h1>
                    <p className="text-[16px] font-hero">Track your productivity and progress</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
                    <StatCard
                        icon={TrendingUp}
                        title="Completion Rate"
                        value="0%"
                        subtitle="0 of 0 tasks"
                        iconColor="bg-green-300"
                    />
                    <StatCard
                        icon={Clock}
                        title="Total Study Time"
                        value="0.0h"
                        subtitle="0 sessions"
                        iconColor="bg-blue-300"
                    />
                    <StatCard
                        icon={Target}
                        title="Avg Session"
                        value="0min"
                        subtitle="Per study session"
                        iconColor="bg-purple-300"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Active Tasks"
                        value="0"
                        subtitle="Pending completion"
                        iconColor="bg-orange-300"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Pie Chart */}
                    <Card className='bg-blue-300'>
                        <CardHeader>
                            <CardTitle className="text-xl font-hero uppercase tracking-wide">Task Priority Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={priorityConfig} className="h-[400px] w-full font-hero">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Pie
                                        data={priorityData}
                                        dataKey="tasks"
                                        nameKey="priority"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-hero text-[16px] leading-none">
                                Total: 55 tasks <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none font-paragraph">
                                Showing task distribution by priority
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Bar Chart */}
                    <Card className='bg-amber-300'>
                        <CardHeader>
                            <CardTitle className="text-xl font-hero uppercase tracking-wide">Study Time by Subject</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={studyTimeConfig} className="h-[400px] w-full font-hero">
                                <BarChart data={studyTimeData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="subject"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="hours" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-hero text-[16px] leading-none">
                                Total: 17.8 hours this week <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none font-paragraph">
                                Showing study hours per subject
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                {/* Line Chart */}
                <div className='mt-4'>
                    <Card className='bg-white/80'>
                        <CardHeader>
                            <CardTitle className="text-2xl font-hero uppercase tracking-wide">
                                Monthly Study Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={monthlyTrendConfig} className="h-[250px] w-full">
                                <LineChart data={monthlyTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={true} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        domain={[0, 4]}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line
                                        type="monotone"
                                        dataKey="hours"
                                        stroke="var(--color-hours)"
                                        strokeWidth={3}
                                        dot={{ fill: "var(--color-hours)", r: 4 }}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}