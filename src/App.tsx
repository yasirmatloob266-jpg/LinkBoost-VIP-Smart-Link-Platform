import { AuthProvider } from './contexts/AuthContext';
import { Router, useRouter } from './components/Router';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';

import { Dashboard } from './pages/dashboard/Dashboard';
import { Links } from './pages/dashboard/Links';
import { CreateLink } from './pages/dashboard/CreateLink';
import { Analytics } from './pages/dashboard/Analytics';
import { BioPages } from './pages/dashboard/BioPages';
import { MultiLinks } from './pages/dashboard/MultiLinks';
import { LandingPages } from './pages/dashboard/LandingPages';

import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppRoutes() {
  const { currentPath } = useRouter();

  if (currentPath === '/') return <Home />;
  if (currentPath === '/pricing') return <Pricing />;
  if (currentPath === '/login') return <Login />;
  if (currentPath === '/signup') return <Signup />;
  if (currentPath === '/forgot-password') return <ForgotPassword />;

  if (currentPath === '/dashboard') {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/dashboard/links') {
    return (
      <ProtectedRoute>
        <Links />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/dashboard/links/create') {
    return (
      <ProtectedRoute>
        <CreateLink />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/dashboard/analytics') {
    return (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/dashboard/bio-pages') {
    return (
      <ProtectedRoute>
        <BioPages />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/dashboard/multi-links') {
    return (
      <ProtectedRoute>
        <MultiLinks />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/dashboard/landing-pages') {
    return (
      <ProtectedRoute>
        <LandingPages />
      </ProtectedRoute>
    );
  }

  if (currentPath === '/admin') {
    return (
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    );
  }

  return <Home />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
