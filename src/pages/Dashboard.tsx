import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Car, 
  Plus, 
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">CarRental</h1>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Welcome, {currentUser?.name || 'User'}
              </p>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation('/add-car')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Car</span>
            </button>
            <button
              onClick={() => handleNavigation('/manage-cars')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Car className="w-5 h-5" />
              <span>Manage Cars</span>
            </button>
            <button
              onClick={() => handleNavigation('/manage-bookings')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Calendar className="w-5 h-5" />
              <span>Manage Bookings</span>
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
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
              <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitor overall platform performance including total cars, bookings, revenue, and recent activities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">2</div>
                <p className="text-xs text-gray-600">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <p className="text-xs text-gray-600">No pending bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2</div>
                <p className="text-xs text-gray-600">All bookings confirmed</p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <p className="text-sm text-gray-600">Latest customer bookings</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Toyota Corolla</p>
                        <p className="text-sm text-gray-600">2025-08-24</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">$130</p>
                      <Badge className="bg-green-100 text-green-800">confirmed</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Toyota Corolla</p>
                        <p className="text-sm text-gray-600">2025-08-24</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">$260</p>
                      <Badge className="bg-green-100 text-green-800">confirmed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <p className="text-sm text-gray-600">Revenue for current month</p>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$390</div>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 