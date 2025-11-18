import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './common/Button';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => {
    return `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive(path)
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
                TechFlow
              </Link>
              
              <nav className="hidden md:flex gap-2">
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                  📊 Dashboard
                </Link>
                <Link to="/projects" className={navLinkClass('/projects')}>
                  📁 Proyectos
                </Link>
                <Link to="/tasks" className={navLinkClass('/tasks')}>
                  ✓ Tareas
                </Link>
                <Link to="/team" className={navLinkClass('/team')}>
                  👥 Equipo
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2025 TechFlow - Hackathon #2 - CS2031
          </p>
        </div>
      </footer>
    </div>
  );
};