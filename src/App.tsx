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
import StudyTimer from './Pages/Dashboard/StudyTimer';

function App() {
  return (
    <div className="min-h-screen p-4">
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
          <Route index element={<Dashboard />} /> 
          <Route path="tasks" element={<Tasks />} /> 
          <Route path="notes" element={<Notes />} /> 
          <Route path="analytics" element={<Analytics />} /> 
          <Route path="profile" element={<Profile />} /> 
          <Route path="study-timer" element={<StudyTimer />} />
        </Route>

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;