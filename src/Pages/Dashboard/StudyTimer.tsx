import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Coffee, Brain, Timer } from 'lucide-react';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const MODE_TIMES = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

const MODE_LABELS = {
    pomodoro: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
};

const MODE_COLORS = {
    pomodoro: 'bg-red-300',
    shortBreak: 'bg-green-300',
    longBreak: 'bg-blue-300',
};

export default function StudyTimer() {
    const [mode, setMode] = useState<TimerMode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(MODE_TIMES.pomodoro);
    const [isActive, setIsActive] = useState(false);
    
    // Stats
    const [sessionsCompleted, setSessionsCompleted] = useState(() => {
        const saved = localStorage.getItem('focusforge_sessions');
        return saved ? parseInt(saved, 10) : 0;
    });
    
    const [totalFocusTime, setTotalFocusTime] = useState(() => {
        const saved = localStorage.getItem('focusforge_focustime');
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('focusforge_sessions', sessionsCompleted.toString());
        localStorage.setItem('focusforge_focustime', totalFocusTime.toString());
    }, [sessionsCompleted, totalFocusTime]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            
            // Handle completion
            if (mode === 'pomodoro') {
                setSessionsCompleted(s => s + 1);
                setTotalFocusTime(t => t + MODE_TIMES.pomodoro);
                // Switch to short break by default after pomodoro
                setMode('shortBreak');
                setTimeLeft(MODE_TIMES.shortBreak);
            } else {
                setMode('pomodoro');
                setTimeLeft(MODE_TIMES.pomodoro);
            }
            
            // Native Browser Notification
            if (Notification.permission === "granted") {
                new Notification("Focus Forge Timer", {
                    body: mode === 'pomodoro' ? "Focus session complete! Time for a break!" : "Break is over! Ready to focus?",
                });
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, mode]);

    // Request notification permission on mount
    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }, []);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODE_TIMES[mode]);
    };

    const handleModeChange = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(MODE_TIMES[newMode]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatTotalTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${mins}m`;
    };

    const progressPercentage = ((MODE_TIMES[mode] - timeLeft) / MODE_TIMES[mode]) * 100;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-5xl font-hero font-bold mb-2">Study Timer</h1>
                    <p className="text-gray-600 font-paragraph text-lg">
                        Stay focused and track your study sessions
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timer Section (Main) */}
                <div className="lg:col-span-2">
                    <div className={`border-4 border-black rounded-base shadow-base p-8 transition-colors duration-500 flex flex-col items-center justify-center min-h-[550px] ${MODE_COLORS[mode]}`}>
                        
                        {/* Mode Selectors */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16 bg-white/70 p-3 rounded-base border-4 border-black">
                            {(['pomodoro', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => handleModeChange(m)}
                                    className={`px-6 py-3 rounded-base font-button font-bold border-4 border-black transition-all text-lg ${
                                        mode === m 
                                            ? 'bg-black text-white scale-105 shadow-base' 
                                            : 'bg-white hover:-translate-y-1 hover:shadow-base'
                                    }`}
                                >
                                    {m === 'pomodoro' && <Brain className="inline mr-2 mb-1" size={20} />}
                                    {m === 'shortBreak' && <Coffee className="inline mr-2 mb-1" size={20} />}
                                    {m === 'longBreak' && <Settings className="inline mr-2 mb-1" size={20} />}
                                    {MODE_LABELS[m]}
                                </button>
                            ))}
                        </div>

                        {/* Clock Display */}
                        <div className="relative mb-16">
                            <div className={`text-8xl sm:text-9xl md:text-[11rem] font-hero font-black tracking-wider text-black drop-shadow-[6px_6px_0_rgba(255,255,255,1)] tabular-nums transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-8">
                            <button
                                onClick={toggleTimer}
                                className={`flex items-center justify-center w-28 h-28 rounded-full border-4 border-black shadow-base transition-transform hover:-translate-y-2 active:translate-y-0 active:shadow-none ${
                                    isActive ? 'bg-yellow-300' : 'bg-white'
                                }`}
                                aria-label={isActive ? "Pause Timer" : "Start Timer"}
                            >
                                {isActive ? (
                                    <Pause size={48} className="text-black" fill="currentColor" />
                                ) : (
                                    <Play size={48} className="text-black ml-2" fill="currentColor" />
                                )}
                            </button>

                            <button
                                onClick={resetTimer}
                                className="flex items-center justify-center w-28 h-28 rounded-full border-4 border-black bg-white shadow-base transition-transform hover:-translate-y-2 active:translate-y-0 active:shadow-none"
                                aria-label="Reset Timer"
                            >
                                <RotateCcw size={48} className="text-black" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Section (Sidebar) */}
                <div className="space-y-8">
                    {/* Progress Bar Component */}
                    <div className="bg-white border-4 border-black rounded-base shadow-base p-6">
                        <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                            <Timer className="mr-2" size={28} /> Session Progress
                        </h2>
                        <div className="h-8 w-full bg-gray-100 border-4 border-black rounded-base overflow-hidden">
                            <div 
                                className={`h-full border-r-4 border-black transition-all duration-1000 ${MODE_COLORS[mode]}`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="text-center mt-4 font-bold font-base text-xl">
                            {Math.round(progressPercentage)}% Completed
                        </p>
                    </div>

                    <div className="bg-purple-300 border-4 border-black rounded-base shadow-base p-6 hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-heading font-bold text-black">Focus Sessions</h3>
                            <div className="bg-white p-2 rounded-full border-2 border-black">
                                <Brain size={28} className="text-black" />
                            </div>
                        </div>
                        <p className="text-6xl font-hero font-bold text-black">
                            {sessionsCompleted}
                        </p>
                        <p className="font-base font-bold text-black/70 mt-2 text-lg">Completed today</p>
                    </div>

                    <div className="bg-orange-300 border-4 border-black rounded-base shadow-base p-6 hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-heading font-bold text-black">Total Focus Time</h3>
                            <div className="bg-white p-2 rounded-full border-2 border-black">
                                <Timer size={28} className="text-black" />
                            </div>
                        </div>
                        <p className="text-5xl lg:text-6xl font-hero font-bold text-black tracking-tight">
                            {formatTotalTime(totalFocusTime)}
                        </p>
                        <p className="font-base font-bold text-black/70 mt-2 text-lg">Logged today</p>
                    </div>
                    
                    <div className="bg-pink-300 border-4 border-black rounded-base shadow-base p-6">
                         <h3 className="text-2xl font-heading font-bold text-black mb-4">Pro Tips</h3>
                         <ul className="list-disc list-inside font-paragraph text-black text-lg space-y-3 font-medium">
                             <li>Take a 5-minute break after every 25 minutes of focus.</li>
                             <li>After 4 sessions, take a longer 15-minute break.</li>
                             <li>Stay hydrated and stretch!</li>
                         </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}