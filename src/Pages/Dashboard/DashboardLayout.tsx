// src/Pages/Dashboard/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Fixed on left */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar - Fixed on top */}
                <Topbar />

                {/* Content area - This is where nested routes render */}
                <main className="flex-1 overflow-auto p-8">
                    <Outlet /> {/* This renders Dashboard.tsx, Tasks.tsx, Notes.tsx, etc. */}
                </main>
            </div>
        </div>
    );
}