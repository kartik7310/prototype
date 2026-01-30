import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ChatPageContainer from './pages/ChatPageContainer';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chat/:categoryId" 
          element={
            <ProtectedRoute>
              <ChatPageContainer />
            </ProtectedRoute>
          } 
        />

        {/* Redirect root to dashboard (protected) or login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
