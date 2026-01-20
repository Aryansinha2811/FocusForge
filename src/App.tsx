// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Landing/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from '../src/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen p-8">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;