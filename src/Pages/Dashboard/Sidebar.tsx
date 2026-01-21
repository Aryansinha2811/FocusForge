// src/Pages/Dashboard/Sidebar.tsx
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
            <div className="p-6 border-b-2 border-border">
                <h2 className="text-2xl font-hero font-bold">FocusForge</h2>
                <p className="text-xs text-foreground/60 font-paragraph mt-1">
                    Your Productivity Partner
                </p>
            </div>

            {/* User Info */}
            {user && (
                <div className="m-4 p-4 bg-white rounded-base border-2 border-border">
                    <p className="text-sm font-hero text-foreground/60">Logged in as:</p>
                    <p className="font-paragraph font-semibold truncate text-sm mt-1">
                        {user.email}
                    </p>
                </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                <Link to="/dashboard">
                    <Button
                        className={`w-full justify-start font-button mb-2 ${
                            isActive('/dashboard') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard') ? 'default' : 'neutral'}
                    >
                        📊 Dashboard
                    </Button>
                </Link>

                <Link to="/dashboard/tasks">
                    <Button
                        className={`w-full justify-start font-button mb-2 ${
                            isActive('/dashboard/tasks') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/tasks') ? 'default' : 'neutral'}
                    >
                        ✓ Tasks
                    </Button>
                </Link>

                <Link to="/dashboard/notes">
                    <Button
                        className={`w-full justify-start font-button mb-2 ${
                            isActive('/dashboard/notes') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/notes') ? 'default' : 'neutral'}
                    >
                        📝 Notes
                    </Button>
                </Link>

                <Link to="/dashboard/analytics">
                    <Button
                        className={`w-full justify-start font-button mb-2 ${
                            isActive('/dashboard/analytics') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/analytics') ? 'default' : 'neutral'}
                    >
                        📈 Analytics
                    </Button>
                </Link>

                <Link to="/dashboard/profile">
                    <Button
                        className={`w-full justify-start font-button mb-2 ${
                            isActive('/dashboard/profile') ? 'bg-main text-white' : ''
                        }`}
                        variant={isActive('/dashboard/profile') ? 'default' : 'neutral'}
                    >
                        👤 Profile
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