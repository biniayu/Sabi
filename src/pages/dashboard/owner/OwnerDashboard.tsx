import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Car,
  Plus,
  DollarSign,
  TrendingUp,
  Calendar,
  Eye,
  Star,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Car as CarType, BookingWithDetails, RevenueData } from '../../../types';
import { dashboardService } from '../../../services/dashboardService';
import { carService } from '../../../services/carService';
import { bookingService } from '../../../services/bookingService';
import EarningsDashboard from './EarningsDashboard';

const OwnerDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState<CarType[]>([]);
  const [myBookings, setMyBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    activeBookings: 0
  });

  useEffect(() => {
    loadOwnerData();
  }, [currentUser]);

  const loadOwnerData = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      // For now, use mock data until backend is ready
      // const [carsResponse, bookingsResponse, statsResponse] = await Promise.all([
      //   carService.getCarsByOwner(currentUser.id),
      //   bookingService.getBookingsByOwner(currentUser.id),
      //   dashboardService.getOwnerStats(currentUser.id)
      // ]);

      // Mock cars for owner
      const mockCars: CarType[] = [
        {
          id: '1',
          name: 'Toyota Camry 2024',
          brand: 'Toyota',
          model: 'Camry',
          year: '2024',
          image: '/placeholder.svg',
          price: 150,
          rating: 4.8,
          category: 'Sedan',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          status: 'Available',
          location: 'Addis Ababa',
          ownerId: currentUser.id,
          description: 'Comfortable and reliable sedan perfect for city driving',
          features: ['AC', 'GPS', 'Bluetooth', 'USB Charging'],
          createdAt: '2024-01-01',
          updatedAt: '2025-01-01'
        },
        {
          id: '2',
          name: 'BMW X5 2023',
          brand: 'BMW',
          model: 'X5',
          year: '2023',
          image: '/placeholder.svg',
          price: 300,
          rating: 4.9,
          category: 'SUV',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 7,
          status: 'Rented',
          location: 'Addis Ababa',
          ownerId: currentUser.id,
          description: 'Luxury SUV with premium features and spacious interior',
          features: ['Leather Seats', 'Sunroof', 'Premium Sound', 'GPS', 'AC'],
          createdAt: '2024-01-15',
          updatedAt: '2025-01-01'
        }
      ];

      // Mock bookings for owner
      const mockBookings: BookingWithDetails[] = [
        {
          id: '1',
          carId: '1',
          userId: '3',
          ownerId: currentUser.id,
          pickupDate: '2025-01-15',
          returnDate: '2025-01-18',
          duration: 3,
          totalAmount: 450,
          status: 'confirmed',
          paymentStatus: 'paid',
          pickupLocation: 'Addis Ababa Airport',
          pickupInstructions: 'Terminal 2, Ground Level',
          createdAt: '2025-01-10',
          updatedAt: '2025-01-10',
          car: mockCars[0],
          user: {
            id: '3',
            name: 'John Doe',
            email: 'john.doe@email.com',
            role: 'user',
            createdAt: '2024-01-01',
            updatedAt: '2025-01-01'
          },
          owner: currentUser
        },
        {
          id: '2',
          carId: '2',
          userId: '3',
          ownerId: currentUser.id,
          pickupDate: '2025-01-20',
          returnDate: '2025-01-23',
          duration: 3,
          totalAmount: 900,
          status: 'pending',
          paymentStatus: 'awaiting',
          pickupLocation: 'Bole, Addis Ababa',
          pickupInstructions: 'Hotel lobby pickup',
          createdAt: '2025-01-12',
          updatedAt: '2025-01-12',
          car: mockCars[1],
          user: {
            id: '3',
            name: 'John Doe',
            email: 'john.doe@email.com',
            role: 'user',
            createdAt: '2024-01-01',
            updatedAt: '2025-01-01'
          },
          owner: currentUser
        }
      ];

      setMyCars(mockCars);
      setMyBookings(mockBookings);

      // Calculate stats
      const totalCars = mockCars.length;
      const totalBookings = mockBookings.length;
      const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      const monthlyRevenue = mockBookings
        .filter(booking => new Date(booking.createdAt).getMonth() === new Date().getMonth())
        .reduce((sum, booking) => sum + booking.totalAmount, 0);
      const averageRating = mockCars.reduce((sum, car) => sum + car.rating, 0) / mockCars.length;
      const activeBookings = mockBookings.filter(booking => 
        booking.status === 'confirmed' || booking.status === 'pending'
      ).length;

      setStats({
        totalCars,
        totalBookings,
        totalRevenue,
        monthlyRevenue,
        averageRating,
        activeBookings
      });

    } catch (error) {
      console.error('Error loading owner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCarStatus = async (carId: string, newStatus: CarType['status']) => {
    try {
      // await carService.updateCarStatus(carId, newStatus);
      setMyCars(myCars.map(car => 
        car.id === carId ? { ...car, status: newStatus } : car
      ));
    } catch (error) {
      console.error('Error updating car status:', error);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      // await bookingService.updateBookingStatus(bookingId, newStatus as BookingStatus);
      setMyBookings(myBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus as any } : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
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
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Rented':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unavailable':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            Owner Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your fleet and track your earnings
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalCars}</div>
            <p className="text-xs text-gray-600">In your fleet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-gray-600">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.monthlyRevenue)}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-gray-600">Customer satisfaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.activeBookings}</div>
            <p className="text-xs text-gray-600">Current rentals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Activity className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{stats.totalBookings}</div>
            <p className="text-xs text-gray-600">All time bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="cars" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cars">My Cars</TabsTrigger>
          <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="cars" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCars.map((car) => (
              <Card key={car.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
                      {car.status}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                    <p className="text-sm text-gray-600">{car.category} • {car.seats} seats</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{car.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(car.price)}</div>
                      <div className="text-xs text-gray-500">per day</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <select 
                      value={car.status} 
                      onChange={(e) => handleUpdateCarStatus(car.id, e.target.value as CarType['status'])}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={booking.car.image} 
                        alt={booking.car.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.car.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Renter: {booking.user.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {formatCurrency(booking.totalAmount)}
                      </div>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Pickup: {booking.pickupLocation}
                    </div>
                    <div className="flex items-center space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings">
          <EarningsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerDashboard;
