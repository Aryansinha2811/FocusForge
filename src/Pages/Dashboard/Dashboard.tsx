import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../config/firebase';
import { CheckCircle2, Clock, FileText, Flame, Plus, Timer, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    color?: string;
}

const StatCard = ({ title, value, subtitle, icon, color = 'bg-white' }: StatCardProps) => {
    return (
        <div className={`${color} border-2 border-black rounded-xl shadow-base p-6 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-hero text-lg">{title}</h3>
                <div className="text-xl">{icon}</div>
            </div>
            <div className="mt-2">
                <p className="text-3xl font-paragraph font-bold mb-1">{value}</p>
                <p className="text-sm text-gray-600 font-paragraph">{subtitle}</p>
            </div>
        </div>
    );
};

interface QuickActionProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    color: string;
}

const QuickAction = ({ title, icon, onClick, color }: QuickActionProps) => {
    return (
        <button
            onClick={onClick}
            className={`${color} border-2 border-black rounded-xl shadow-base p-6 w-full hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all font-button font-bold text-lg flex items-center justify-center gap-3`}
        >
            {icon}
            {title}
        </button>
    );
};

export default function Dashboard() {
    // const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Mock data for now - replace with actual Firebase data later
    const [stats] = useState({
        tasksCompleted: 5,
        totalTasks: 12,
        studyHours: 8.5,
        totalNotes: 15,
        dayStreak: 7
    });
    const [loading] = useState(false);

    // TODO: Uncomment when Firebase is configured
    /*
    useEffect(() => {
      const fetchDashboardData = async () => {
        if (!currentUser) return;
  
        try {
          // Fetch tasks
          const tasksRef = collection(db, 'tasks');
          const tasksQuery = query(tasksRef, where('userId', '==', currentUser.uid));
          const tasksSnapshot = await getDocs(tasksQuery);
          const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const completedTasks = tasks.filter((task: any) => task.completed).length;
  
          // Fetch study sessions
          const sessionsRef = collection(db, 'studySessions');
          const sessionsQuery = query(sessionsRef, where('userId', '==', currentUser.uid));
          const sessionsSnapshot = await getDocs(sessionsQuery);
          const totalMinutes = sessionsSnapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            return acc + (data.duration || 0);
          }, 0);
  
          // Fetch notes
          const notesRef = collection(db, 'notes');
          const notesQuery = query(notesRef, where('userId', '==', currentUser.uid));
          const notesSnapshot = await getDocs(notesQuery);
  
          setStats({
            tasksCompleted: completedTasks,
            totalTasks: tasks.length,
            studyHours: totalMinutes / 60,
            totalNotes: notesSnapshot.size,
            dayStreak: 7 // You can implement actual streak calculation
          });
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDashboardData();
    }, [currentUser]);
    */

    const handleAddTask = () => {
        navigate('/dashboard/tasks');
    };

    const handleQuickTimer = () => {
        navigate('/dashboard/study-timer');
    };

    const handleAddNote = () => {
        navigate('/dashboard/notes');
    };

    const completionRate = stats.totalTasks > 0
        ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100)
        : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-hero font-bold mb-1">Dashboard</h1>
                <p className="text-gray-600 font-paragraph text-lg">
                    Welcome back! Here's your productivity overview.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <StatCard
                    title="Tasks Completed"
                    value={`${stats.tasksCompleted}/${stats.totalTasks}`}
                    subtitle={`${completionRate}% completion rate`}
                    icon={<CheckCircle2 className="text-green-600" size={28} />}
                    color="bg-green-200"
                />

                <StatCard
                    title="Study Hours"
                    value={`${stats.studyHours.toFixed(1)}h`}
                    subtitle="Total time logged"
                    icon={<Clock className="text-blue-600" size={28} />}
                    color="bg-blue-200"
                />

                <StatCard
                    title="Notes"
                    value={stats.totalNotes}
                    subtitle="Total notes created"
                    icon={<FileText className="text-purple-600" size={28} />}
                    color="bg-purple-200"
                />

                <StatCard
                    title="Day Streak"
                    value={`${stats.dayStreak} days`}
                    subtitle="Keep it up!"
                    icon={<Flame className="text-orange-600" size={28} />}
                    color="bg-orange-200"
                />
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white border-2 border-black rounded-base shadow-base p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-400 border-2 border-black rounded-full p-2">
                        <Plus size={20} className="font-bold" />
                    </div>
                    <h2 className="text-2xl font-hero font-bold">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <QuickAction
                        title="Add Task"
                        icon={<ClipboardList size={24} />}
                        onClick={handleAddTask}
                        color="bg-yellow-300"
                    />

                    <QuickAction
                        title="Quick Timer"
                        icon={<Timer size={24} />}
                        onClick={handleQuickTimer}
                        color="bg-pink-300"
                    />

                    <QuickAction
                        title="Add Note"
                        icon={<FileText size={24} />}
                        onClick={handleAddNote}
                        color="bg-cyan-300"
                    />
                </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-8 bg-gradient-to-r from-purple-200 to-pink-200 border-4 border-black rounded-base shadow-base p-6">
                <h3 className="font-hero font-bold text-2xl mb-2">
                    🎯 Ready to crush your goals?
                </h3>
                <p className="font-paragraph text-gray-800">
                    Start by adding a task, setting a timer, or jotting down some notes. Your productivity journey begins now!
                </p>
            </div>
        </div>
    );
}