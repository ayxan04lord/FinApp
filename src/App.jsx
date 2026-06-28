import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './Components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardHome from './pages/DashboardHome';
import CardsPage from './pages/CardsPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardHome />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/cards"
        element={
          <PrivateRoute>
            <Layout>
              <CardsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/clients"
        element={
          <PrivateRoute>
            <Layout>
              <ClientsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/contact"
        element={
          <PrivateRoute>
            <Layout>
              <ContactPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
