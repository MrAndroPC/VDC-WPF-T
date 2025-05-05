import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import PetPage from './pages/PetPage';
import AddPetPage from './pages/AddPetPage';
import { UserSession } from './models/UserSession';

interface ProtectedRouteProps {
  user: UserSession | null;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>; // Render children if authenticated
};


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await window.sessionAPI.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to check session:", error);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await window.sessionAPI.clearCurrentUser();
      setCurrentUser(null);
      navigate('/auth');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // loading indicator while checking auth status
  if (isLoadingAuth) {
    return <div>Loading application...</div>;
  }

  return (
      <Routes>
         {/* Pass setCurrentUser down to AuthPage */}
        <Route path="/auth" element={<AuthPage onLoginSuccess={setCurrentUser} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={currentUser}>
              {/* Pass currentUser and handleLogout to MainPage */}
              <MainPage currentUser={currentUser} handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pet/:petId"
          element={
            <ProtectedRoute user={currentUser}>
              <PetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-pet"
          element={
            <ProtectedRoute user={currentUser}>
              <AddPetPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect root path if not authenticated */}
        {!currentUser && <Route path="*" element={<Navigate to="/auth" replace />} />}

        {/* Optional: Add a 404 page for authenticated users */}
        {currentUser && <Route path="*" element={<div>Page Not Found</div>} />}

      </Routes>
  );
}

export default App;
