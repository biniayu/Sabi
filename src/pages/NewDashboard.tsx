import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserDashboard from './dashboard/user/UserDashboard';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import OwnerDashboard from './dashboard/owner/OwnerDashboard';
import { 
  LayoutDashboard, 
  User,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '../components/ui/button';

const NewDashboard = () => {
  const { currentUser, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getDashboardTitle = () => {
    switch (currentUser.role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'owner':
        return 'Owner Dashboard';
      case 'user':
        return 'User Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'owner':
        return <OwnerDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">Sabi Rental</h1>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {currentUser.name}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {currentUser.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium">
              <LayoutDashboard className="w-5 h-5" />
              <span>{getDashboardTitle()}</span>
            </div>
          </div>
        </nav>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {getDashboardTitle()}
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {currentUser.name}!
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
