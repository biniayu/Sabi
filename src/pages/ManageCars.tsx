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
  Edit,
  Trash2,
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

const ManageCars = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Mock car data
  const [cars, setCars] = useState([
    {
      id: 1,
      image: '/placeholder.svg',
      name: 'Toyota Corolla',
      details: '4-door, Automatic',
      category: 'Sedan',
      price: '$130/day',
      status: 'Available'
    },
    {
      id: 2,
      image: '/placeholder.svg',
      name: 'Volvo XC40 EV',
      details: '5-door, Automatic',
      category: 'SUV',
      price: '$150/day',
      status: 'Available'
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleEdit = (carId: number) => {
    // Navigate to edit page or open edit modal
    console.log('Edit car:', carId);
  };

  const handleDelete = (carId: number) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== carId));
    }
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
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium"
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
              <h1 className="text-2xl font-semibold text-gray-900">Manage Cars</h1>
              <p className="text-gray-600 mt-1">
                View all listed cars, update their details, or remove them from the booking platform.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/add-car')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Car
            </Button>
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
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Car className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{car.name}</p>
                            <p className="text-sm text-gray-500">{car.details}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-900">{car.category}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-gray-900">{car.price}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {car.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(car.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(car.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(car.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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

export default ManageCars; 