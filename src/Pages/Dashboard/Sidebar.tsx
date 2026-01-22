import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../../assets/Icons/Focus.png'
import Dashboard from '../../assets/Icons/Dashboard.png'
import StudyTimer from '../../assets/Icons/StudyTimer.png'
import Tasks from '../../assets/Icons/Task.png'
import Notes from '../../assets/Icons/Notes.png'
import Analytics from '../../assets/Icons/Analytics.png'
import Profile from '../../assets/Icons/Profile.png'

export function Sidebar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            // Navigation to "/" happens automatically in AuthContext
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Helper to check if link is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="w-60 h-screen bg-transparent border-r-2 border-border flex flex-col">
            {/* Logo */}
            <div className="p-5 border-b-2 border-border flex justify-evenly">
                <img 
                className='h-6 w-6'
                src={Logo} 
                alt="FocusForge Logo" />
                <h2 className="text-3xl font-logo">FocusForge</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 mt-7 ">
                <Link to="/dashboard">
                    <Button
                        className={`w-full justify-start font-button text-[16px] mb-3 ${
                            isActive('/dashboard') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard') ? 'default' : 'neutral'}
                    >
                        <img src={Dashboard} alt="Dashboard Icon" className="h-6 w-6 mr-2" />
                        Dashboard
                    </Button>
                </Link>

                <Link to="/dashboard/tasks">
                    <Button
                        className={`w-full justify-start font-button mb-3 text-[16px] ${
                            isActive('/dashboard/tasks') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/tasks') ? 'default' : 'neutral'}
                    >
                        <img 
                        className='h-6 w-6 mr-2'
                        src={Tasks} alt="" />
                        Tasks
                    </Button>
                </Link>

                <Link to="/dashboard/study-timer">
                    <Button
                        className={`w-full justify-start font-button mb-3 text-[16px] ${
                            isActive('/dashboard/study-timer') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/study-timer') ? 'default' : 'neutral'}
                    >
                        <img 
                        className='h-6 w-6 mr-2'
                        src={StudyTimer} alt="" />
                        Study Timer
                    </Button>
                </Link>

                <Link to="/dashboard/notes">
                    <Button
                        className={`w-full justify-start font-button mb-3 text-[16px] ${
                            isActive('/dashboard/notes') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/notes') ? 'default' : 'neutral'}
                    >
                        <img 
                        className='h-6 w-6 mr-2'
                        src={Notes} alt="" />
                        Notes
                    </Button>
                </Link>

                <Link to="/dashboard/analytics">
                    <Button
                        className={`w-full justify-start font-button mb-3 text-[16px] ${
                            isActive('/dashboard/analytics') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/analytics') ? 'default' : 'neutral'}
                    >
                        <img 
                        className='h-6 w-6 mr-2'
                        src={Analytics} alt="" />
                        Analytics
                    </Button>
                </Link>

                <Link to="/dashboard/profile">
                    <Button
                        className={`w-full justify-start font-button mb-1 text-[16px] ${
                            isActive('/dashboard/profile') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/profile') ? 'default' : 'neutral'}
                    >
                        <img 
                        className='h-6 w-6 mr-2'
                        src={Profile} alt="" />
                        Profile
                    </Button>
                </Link>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t-2 border-border">
                <Button
                    onClick={handleLogout}
                    variant="neutral"
                    className="w-full font-button font-bold text-lg bg-red-500 hover:bg-red-600 text-white"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}