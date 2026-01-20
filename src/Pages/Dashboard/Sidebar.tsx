// src/Pages/Dashboard/Sidebar.tsx - EXAMPLE LOGOUT IMPLEMENTATION
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

// This is an EXAMPLE of how to use logout in your Sidebar
// Replace this with your actual Sidebar design

export function Sidebar() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            // Navigation to "/" happens automatically in AuthContext
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="w-60 h-screen bg-transparent p-4 border-r-2 border-border">
            {/* Your existing sidebar content */}
            <div className="mb-8">
                <h2 className="text-2xl font-hero font-bold">FocusForge</h2>
            </div>

            {/* User Info */}
            {user && (
                <div className="mb-4 w-150 p-4 bg-white rounded-base border-2 border-border">
                    <p className="text-sm font-hero text-foreground/60">Logged in as:</p>
                    <p className="font-paragraph font-semibold truncate">{user.email}</p>
                </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-2 mb-6">
                <Button
                    className='w-full mb-2'
                >
                    <a href="/dashboard" className="block p-5 rounded-base font-button">
                        Dashboard
                    </a>
                </Button>


                <Button
                    className='w-full mb-2'
                >
                    <a href="/dashboard/tasks" className="block p-5 rounded-base font-button">
                        Tasks
                    </a>
                </Button>

                <Button
                    className='w-full mb-2'
                >
                    <a href="/dashboard/notes" className="block p-5 rounded-base font-button">
                        Notes
                    </a>
                </Button>

                <Button
                    className='w-full mb-2'
                >
                    <a href="/dashboard/analytics" className="block p-5 rounded-base font-button">
                        Analytics
                    </a>
                </Button>

                <Button
                    className='w-full mb-2'
                >
                    <a href="/dashboard/profile" className="block p-5 rounded-base font-button">
                        Profile
                    </a>
                </Button>
            </nav>

            {/* Logout Button - This is what you need! */}
            <div className="absolute w-100 space-y-2">
                <Button
                    onClick={handleLogout}
                    variant="neutral"
                    className="w-full font-button text-lg bg-red-500"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}