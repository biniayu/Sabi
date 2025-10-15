import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Plus, 
  Calendar,
  User,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ManageBookings = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Mock booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      car: {
        image: '/placeholder.svg',
        name: 'Volvo xc40 ev'
      },
      dateRange: '2025-06-27 to 2025-06-29',
      total: '$300',
      payment: 'offline',
      status: 'Pending'
    },
    {
      id: 2,
      car: {
        image: '/placeholder.svg',
        name: 'Toyota Corolla'
      },
      dateRange: '2025-06-28 to 2025-06-29',
      total: '$130',
      payment: 'offline',
      status: 'confirmed'
    },
    {
      id: 3,
      car: {
        image: '/placeholder.svg',
        name: 'Toyota Corolla'
      },
      dateRange: '2025-06-25 to 2025-06-27',
      total: '$260',
      payment: 'offline',
      status: 'confirmed'
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getPaymentBadge = (payment: string) => {
    return (
      <Badge className="bg-gray-100 text-gray-800">
        {payment}
      </Badge>
    );
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
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
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
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium"
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
              <h1 className="text-2xl font-semibold text-gray-900">Manage Bookings</h1>
              <p className="text-gray-600 mt-1">
                Track all customer bookings, approve or cancel requests, and manage booking statuses.
              </p>
            </div>
          </div>
        </header>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-8">
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Car</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Car className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.car.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-900">{booking.dateRange}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-gray-900">{booking.total}</span>
                      </TableCell>
                      <TableCell>
                        {getPaymentBadge(booking.payment)}
                      </TableCell>
                      <TableCell>
                        {booking.status === 'Pending' ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="text-green-600"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                className="text-red-600"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          getStatusBadge(booking.status)
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings; 