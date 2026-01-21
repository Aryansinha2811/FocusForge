// src/Pages/Dashboard/Topbar.tsx
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';

export function Topbar() {
    const { user } = useAuth();

    return (
        <div className="h-20 bg-transparent border-b-2 border-border px-5 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl max-h-30">
                <Input
                    type="text"
                    placeholder="Search tasks, notes, or sessions..."
                    className="w-full font-paragraph"
                />
            </div>

            {/* Right side - Notifications & User */}
            <div className="flex items-center gap-4">
            

                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-main text-white rounded-full flex items-center justify-center font-bold font-button">
                        {user?.email?.charAt(0).toUpperCase() || 'J'}
                    </div>
                    <div className="hidden md:block">
                        <p className="font-button font-semibold text-sm">
                            {user?.displayName || 'John Doe'}
                        </p>
                        <p className="text-xs text-foreground/60 font-paragraph">
                            {user?.email || 'you@gmail.com'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}