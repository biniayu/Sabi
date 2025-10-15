import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  Car,
  DollarSign,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { BookingReport, CarReport, UserReport } from '../../../types';
import { dashboardService } from '../../../services/dashboardService';

const Reports = () => {
  const [bookingReports, setBookingReports] = useState<BookingReport[]>([]);
  const [carReports, setCarReports] = useState<CarReport[]>([]);
  const [userReports, setUserReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadReports();
  }, [dateRange]);

  const loadReports = async () => {
    setLoading(true);
    try {
      // For now, use mock data until backend is ready
      // const [bookingsResp, carsResp, usersResp] = await Promise.all([
      //   dashboardService.getBookingReports(dateRange.startDate, dateRange.endDate),
      //   dashboardService.getCarReports(),
      //   dashboardService.getAllUsers()
      // ]);

      // Mock booking reports
      const mockBookingReports: BookingReport[] = [
        {
          id: '1',
          carName: 'Toyota Camry 2024',
          userName: 'John Doe',
          ownerName: 'Jane Smith',
          amount: 450,
          status: 'completed',
          paymentStatus: 'paid',
          createdAt: '2025-01-05'
        },
        {
          id: '2',
          carName: 'BMW X5 2023',
          userName: 'Mike Johnson',
          ownerName: 'David Brown',
          amount: 800,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2025-01-04'
        },
        {
          id: '3',
          carName: 'Honda Civic 2024',
          userName: 'Sarah Wilson',
          ownerName: 'Jane Smith',
          amount: 300,
          status: 'cancelled',
          paymentStatus: 'refunded',
          createdAt: '2025-01-03'
        }
      ];

      // Mock car reports
      const mockCarReports: CarReport[] = [
        {
          id: '1',
          name: 'Toyota Camry 2024',
          owner: 'Jane Smith',
          totalBookings: 24,
          totalRevenue: 7200,
          rating: 4.8,
          utilizationRate: 0.75
        },
        {
          id: '2',
          name: 'BMW X5 2023',
          owner: 'David Brown',
          totalBookings: 18,
          totalRevenue: 12600,
          rating: 4.9,
          utilizationRate: 0.68
        },
        {
          id: '3',
          name: 'Honda Civic 2024',
          owner: 'Jane Smith',
          totalBookings: 15,
          totalRevenue: 4500,
          rating: 4.6,
          utilizationRate: 0.58
        }
      ];

      // Mock user reports (reuse from ManageUsers)
      const mockUserReports: UserReport[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@email.com',
          role: 'user',
          totalBookings: 12,
          totalSpent: 2400,
          joinDate: '2024-01-15',
          lastActivity: '2025-01-05'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          role: 'owner',
          totalBookings: 0,
          totalSpent: 0,
          joinDate: '2024-02-20',
          lastActivity: '2025-01-06'
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike.johnson@email.com',
          role: 'user',
          totalBookings: 8,
          totalSpent: 1600,
          joinDate: '2024-03-10',
          lastActivity: '2025-01-04'
        }
      ];

      setBookingReports(mockBookingReports);
      setCarReports(mockCarReports);
      setUserReports(mockUserReports);

    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: 'bookings' | 'users' | 'cars', format: 'csv' | 'excel') => {
    try {
      let blob: Blob;
      
      if (type === 'bookings') {
        // blob = await dashboardService.exportBookingData(format, dateRange.startDate, dateRange.endDate);
        // Mock export
        const csvContent = `ID,Car,User,Owner,Amount,Status,Payment Status,Date
1,Toyota Camry 2024,John Doe,Jane Smith,$450,completed,paid,2025-01-05
2,BMW X5 2023,Mike Johnson,David Brown,$800,confirmed,paid,2025-01-04
3,Honda Civic 2024,Sarah Wilson,Jane Smith,$300,cancelled,refunded,2025-01-03`;
        blob = new Blob([csvContent], { type: 'text/csv' });
      } else if (type === 'users') {
        // blob = await dashboardService.exportUserData(format);
        const csvContent = `ID,Name,Email,Role,Bookings,Spent,Join Date,Last Active
1,John Doe,john.doe@email.com,user,12,$2400,2024-01-15,2025-01-05
2,Jane Smith,jane.smith@email.com,owner,0,$0,2024-02-20,2025-01-06
3,Mike Johnson,mike.johnson@email.com,user,8,$1600,2024-03-10,2025-01-04`;
        blob = new Blob([csvContent], { type: 'text/csv' });
      } else {
        const csvContent = `ID,Car,Owner,Bookings,Revenue,Rating,Utilization
1,Toyota Camry 2024,Jane Smith,24,$7200,4.8,75%
2,BMW X5 2023,David Brown,18,$12600,4.9,68%
3,Honda Civic 2024,Jane Smith,15,$4500,4.6,58%`;
        blob = new Blob([csvContent], { type: 'text/csv' });
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}_report.${format}`;
      link.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      case 'awaiting':
        return 'bg-orange-100 text-orange-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-600">
            Comprehensive platform analytics and data export
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {bookingReports.length + carReports.length + userReports.length}
            </div>
            <p className="text-xs text-gray-600">Available for export</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Analytics</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(carReports.reduce((sum, car) => sum + car.totalRevenue, 0))}
            </div>
            <p className="text-xs text-gray-600">Total platform revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...carReports.map(car => car.totalBookings))}
            </div>
            <p className="text-xs text-gray-600">Most bookings (single car)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Utilization</CardTitle>
            <PieChart className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(carReports.reduce((sum, car) => sum + car.utilizationRate, 0) / carReports.length * 100)}%
            </div>
            <p className="text-xs text-gray-600">Fleet utilization rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Booking Reports</TabsTrigger>
          <TabsTrigger value="cars">Car Performance</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Reports ({bookingReports.length})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('bookings', 'csv')}
                  >
                    Export CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('bookings', 'excel')}
                  >
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Car</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingReports.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">#{booking.id}</TableCell>
                        <TableCell>{booking.carName}</TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.ownerName}</TableCell>
                        <TableCell>{formatCurrency(booking.amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(booking.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cars" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Car Performance Reports ({carReports.length})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('cars', 'csv')}
                  >
                    Export CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('cars', 'excel')}
                  >
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Car</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Revenue</TableHead>
                      <TableHead>Avg. Rating</TableHead>
                      <TableHead>Utilization Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carReports.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell className="font-medium">{car.name}</TableCell>
                        <TableCell>{car.owner}</TableCell>
                        <TableCell>{car.totalBookings}</TableCell>
                        <TableCell>{formatCurrency(car.totalRevenue)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            ⭐ {car.rating.toFixed(1)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${car.utilizationRate * 100}%` }}
                              ></div>
                            </div>
                            {Math.round(car.utilizationRate * 100)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Analytics ({userReports.length})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('users', 'csv')}
                  >
                    Export CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('users', 'excel')}
                  >
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userReports.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.totalBookings}</TableCell>
                        <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
                        <TableCell>{formatDate(user.joinDate)}</TableCell>
                        <TableCell>{formatDate(user.lastActivity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
