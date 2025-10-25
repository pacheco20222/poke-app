import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import LoginPage from '../features/auth/LoginPage';
import HomePage from '../features/pokedex/pages/HomePage';
import DetailPage from '../features/pokedex/pages/DetailPage';
import type { JSX } from '@emotion/react/jsx-runtime';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return !isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path='/pokemon/:id' element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}