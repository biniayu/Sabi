import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { RevenueData } from '../../../types';
import { dashboardService } from '../../../services/dashboardService';

const EarningsDashboard = () => {
  const { currentUser } = useAuth();
  const [earningsData, setEarningsData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('month');
  const [stats, setStats] = useState({
    totalEarnings: 0,
    thisMonth: 0,
    lastMonth: 0,
    averageDaily: 0,
    totalBookings: 0,
    averageBookingValue: 0
  });

  useEffect(() => {
    loadEarningsData();
  }, [currentUser, selectedPeriod]);

  const loadEarningsData = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      // For now, use mock data until backend is ready
      // const response = await dashboardService.getOwnerEarnings(currentUser.id, selectedPeriod);

      // Mock earnings data
      const mockEarningsData: RevenueData[] = selectedPeriod === 'month' ? [
        { month: 'Week 1', revenue: 450, bookings: 3 },
        { month: 'Week 2', revenue: 600, bookings: 4 },
        { month: 'Week 3', revenue: 300, bookings: 2 },
        { month: 'Week 4', revenue: 750, bookings: 5 },
      ] : [
        { month: 'Jan', revenue: 1200, bookings: 8 },
        { month: 'Feb', revenue: 1450, bookings: 10 },
        { month: 'Mar', revenue: 1100, bookings: 7 },
        { month: 'Apr', revenue: 1650, bookings: 11 },
        { month: 'May', revenue: 1800, bookings: 12 },
        { month: 'Jun', revenue: 2100, bookings: 14 }
      ];

      const totalEarnings = selectedPeriod === 'month' ? 2100 : 15000;
      const thisMonth = 2100;
      const lastMonth = 1800;
      const totalBookings = mockEarningsData.reduce((sum, data) => sum + data.bookings, 0);
      const averageDaily = thisMonth / 30;
      const averageBookingValue = totalEarnings / totalBookings;

      setEarningsData(mockEarningsData);
      setStats({
        totalEarnings,
        thisMonth,
        lastMonth,
        averageDaily,
        totalBookings,
        averageBookingValue
      });

    } catch (error) {
      console.error('Error loading earnings data:', error);
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

  const getGrowthPercentage = () => {
    if (stats.lastMonth === 0) return 0;
    return ((stats.thisMonth - stats.lastMonth) / stats.lastMonth * 100);
  };

  const handleExportEarnings = () => {
    const csvContent = `Period,Revenue,Bookings
${earningsData.map(item => `${item.month},${item.revenue},${item.bookings}`).join('\n')}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `earnings_${selectedPeriod}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
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
          <h2 className="text-xl font-semibold text-gray-900">Earnings Dashboard</h2>
          <p className="text-sm text-gray-600">
            Track your revenue and booking performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'month' | 'year')}>
            <TabsList>
              <TabsTrigger value="month">Monthly</TabsTrigger>
              <TabsTrigger value="year">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={handleExportEarnings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalEarnings)}
            </div>
            <p className="text-xs text-gray-600">
              {selectedPeriod === 'month' ? 'This month' : 'This year'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGrowthPercentage() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getGrowthPercentage() >= 0 ? '+' : ''}{getGrowthPercentage().toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Daily</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(stats.averageDaily)}
            </div>
            <p className="text-xs text-gray-600">Average per day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.totalBookings}</div>
            <p className="text-xs text-gray-600">
              {selectedPeriod === 'month' ? 'This month' : 'This year'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
            <PieChart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">
              {formatCurrency(stats.averageBookingValue)}
            </div>
            <p className="text-xs text-gray-600">Per booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Month</CardTitle>
            <Eye className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {formatCurrency(stats.lastMonth)}
            </div>
            <p className="text-xs text-gray-600">Previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <p className="text-sm text-gray-600">
              {selectedPeriod === 'month' ? 'Weekly' : 'Monthly'} revenue breakdown
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)` 
                      }}
                    ></div>
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

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <p className="text-sm text-gray-600">Key metrics and recommendations</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Strong Growth</h4>
                    <p className="text-sm text-green-700">
                      Your earnings have increased by {getGrowthPercentage().toFixed(1)}% compared to last month.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Booking Performance</h4>
                    <p className="text-sm text-blue-700">
                      Average booking value: {formatCurrency(stats.averageBookingValue)}. 
                      Consider premium pricing for peak times.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <PieChart className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Daily Average</h4>
                    <p className="text-sm text-purple-700">
                      You're earning {formatCurrency(stats.averageDaily)} per day on average. 
                      Great consistency!
                    </p>
                  </div>
                </div>
              </div>

              {stats.totalBookings < 10 && (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Growth Opportunity</h4>
                      <p className="text-sm text-yellow-700">
                        Consider adding more cars to your fleet to increase booking volume.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <p className="text-sm text-gray-600">
            {selectedPeriod === 'month' ? 'Weekly' : 'Monthly'} earnings and booking details
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-gray-900">Period</th>
                  <th className="text-right py-3 font-medium text-gray-900">Revenue</th>
                  <th className="text-right py-3 font-medium text-gray-900">Bookings</th>
                  <th className="text-right py-3 font-medium text-gray-900">Avg. Value</th>
                  <th className="text-right py-3 font-medium text-gray-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.map((item, index) => {
                  const prevRevenue = index > 0 ? earningsData[index - 1].revenue : item.revenue;
                  const growth = prevRevenue > 0 ? ((item.revenue - prevRevenue) / prevRevenue * 100) : 0;
                  const avgValue = item.bookings > 0 ? item.revenue / item.bookings : 0;

                  return (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-gray-900">{item.month}</td>
                      <td className="py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(item.revenue)}
                      </td>
                      <td className="py-3 text-right text-gray-600">{item.bookings}</td>
                      <td className="py-3 text-right text-gray-600">
                        {formatCurrency(avgValue)}
                      </td>
                      <td className={`py-3 text-right font-medium ${
                        growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {index === 0 ? '-' : `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsDashboard;
