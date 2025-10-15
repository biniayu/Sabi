import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Users, 
  Car, 
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Activity,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { DashboardStats, RevenueData } from '../../../types';
import { dashboardService } from '../../../services/dashboardService';
import ManageUsers from './ManageUsers';
import Reports from './Reports';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // For now, use mock data until backend is ready
      // const [statsResponse, revenueResponse, activityResponse] = await Promise.all([
      //   dashboardService.getDashboardStats(),
      //   dashboardService.getRevenueData('month'),
      //   dashboardService.getRecentBookings(10)
      // ]);

      // Mock admin stats
      const mockStats: DashboardStats = {
        totalCars: 245,
        totalBookings: 1284,
        totalUsers: 892,
        totalRevenue: 125000,
        monthlyRevenue: 18500,
        pendingBookings: 23,
        confirmedBookings: 156,
        completedBookings: 1105
      };

      const mockRevenueData: RevenueData[] = [
        { month: 'Jan', revenue: 15200, bookings: 95 },
        { month: 'Feb', revenue: 18400, bookings: 112 },
        { month: 'Mar', revenue: 16800, bookings: 98 },
        { month: 'Apr', revenue: 22100, bookings: 134 },
        { month: 'May', revenue: 19900, bookings: 121 },
        { month: 'Jun', revenue: 18500, bookings: 108 }
      ];

      const mockActivity = [
        { id: 1, type: 'booking', message: 'New booking created by John Doe', time: '2 minutes ago', status: 'info' },
        { id: 2, type: 'user', message: 'New user registered: Jane Smith', time: '15 minutes ago', status: 'success' },
        { id: 3, type: 'car', message: 'Car added by owner: BMW X5', time: '1 hour ago', status: 'info' },
        { id: 4, type: 'payment', message: 'Payment failed for booking #1234', time: '2 hours ago', status: 'warning' },
        { id: 5, type: 'booking', message: 'Booking cancelled: Toyota Camry', time: '3 hours ago', status: 'error' }
      ];

      setStats(mockStats);
      setRevenueData(mockRevenueData);
      setRecentActivity(mockActivity);

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor platform performance and manage users
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalCars.toLocaleString()}</div>
            <p className="text-xs text-gray-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-gray-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-gray-600">+22% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</div>
            <p className="text-xs text-gray-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.monthlyRevenue)}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {((stats.completedBookings / stats.totalBookings) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">Booking completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <p className="text-sm text-gray-600">Monthly revenue over time</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium">{item.month}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatCurrency(item.revenue)}</div>
                        <div className="text-xs text-gray-500">{item.bookings} bookings</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-gray-600">Latest platform activities</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Manage Users</div>
                    <div className="text-sm text-gray-500">Add, edit, or remove users</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Review Cars</div>
                    <div className="text-sm text-gray-500">Approve pending cars</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Handle Disputes</div>
                    <div className="text-sm text-gray-500">Resolve booking issues</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Generate Report</div>
                    <div className="text-sm text-gray-500">Create analytics report</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <ManageUsers />
        </TabsContent>

        <TabsContent value="reports">
          <Reports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
