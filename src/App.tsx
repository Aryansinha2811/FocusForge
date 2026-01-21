// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Landing/Home';
import { DashboardLayout } from './Pages/Dashboard/DashboardLayout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Tasks from './Pages/Dashboard/Tasks';
import Notes from './Pages/Dashboard/Notes';
import Analytics from './Pages/Dashboard/Analytics';
import Profile from './Pages/Dashboard/Profile';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen p-8">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Protected Dashboard Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes - these render inside DashboardLayout's <Outlet /> */}
          <Route index element={<Dashboard />} /> {/* /dashboard */}
          <Route path="tasks" element={<Tasks />} /> {/* /dashboard/tasks */}
          <Route path="notes" element={<Notes />} /> {/* /dashboard/notes */}
          <Route path="analytics" element={<Analytics />} /> {/* /dashboard/analytics */}
          <Route path="profile" element={<Profile />} /> {/* /dashboard/profile */}
        </Route>

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;