import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import LoginPage from '../features/auth/LoginPage';
import HomePage from '../features/pokedex/pages/HomePage';
import DetailPage from '../features/pokedex/pages/DetailPage';
import NotFoundPage from '../components/ui/NotFoundPage';

interface RouteProps {
    children: React.ReactElement;
}

function ProtectedRoute({ children }: RouteProps) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: RouteProps) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return !isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />

        {/* 404 - Catch All Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}