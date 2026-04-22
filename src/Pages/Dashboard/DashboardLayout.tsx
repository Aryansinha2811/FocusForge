// src/Pages/Dashboard/DashboardLayout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Fixed on left for mobile, normal for desktop */}
            <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Topbar - Fixed on top */}
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Content area - This is where nested routes render */}
                <main className="flex-1 overflow-auto bg-transparent">
                    <Outlet /> {/* This renders Dashboard.tsx, Tasks.tsx, Notes.tsx, etc. */}
                </main>
            </div>
        </div>
    );
}