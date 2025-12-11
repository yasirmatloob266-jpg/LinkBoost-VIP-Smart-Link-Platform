import { ReactNode, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from './Router';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (adminOnly && !isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [user, loading, isAdmin, adminOnly, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (adminOnly && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
}
