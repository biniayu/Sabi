import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Car,
  Clock,
  CheckCircle,
  Plus,
  CreditCard,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { BookingWithDetails } from '../../../types';
import { bookingService } from '../../../services/bookingService';
import { carService } from '../../../services/carService';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      // For now, use mock data until backend is ready
      // const bookingsResponse = await bookingService.getBookingsByUser(currentUser.id);
      // const carsResponse = await carService.getPopularCars(4);
      
      // Mock data for user bookings
      const mockBookings: BookingWithDetails[] = [
        {
          id: '1',
          carId: 'car-1',
          userId: currentUser.id,
          ownerId: '2',
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
          car: {
            id: 'car-1',
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
            ownerId: '2',
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01'
          },
          user: currentUser,
          owner: {
            id: '2',
            name: 'Car Owner',
            email: 'owner@sabi.com',
            role: 'owner',
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01'
          }
        }
      ];

      setBookings(mockBookings);
      
      // Calculate stats
      const totalBookings = mockBookings.length;
      const activeBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
      const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
      const totalSpent = mockBookings.reduce((sum, b) => sum + b.totalAmount, 0);

      setStats({
        totalBookings,
        activeBookings,
        completedBookings,
        totalSpent
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600">Manage your bookings and explore new cars</p>
        </div>
        <Button 
          onClick={() => navigate('/cars')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book a Car
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.activeBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalSpent)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="cars">Available Cars</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-4">Start exploring our available cars and make your first booking!</p>
                <Button onClick={() => navigate('/cars')}>
                  Browse Cars
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
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
                            {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.duration} days</p>
                          <p className="text-xs text-gray-600">Duration</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(booking.totalAmount)}</p>
                          <p className="text-xs text-gray-600">Total Amount</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.pickupLocation}</p>
                          <p className="text-xs text-gray-600">Pickup Location</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <p className="text-sm text-gray-600">
                        Booked on {formatDate(booking.createdAt)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {booking.status === 'confirmed' && (
                          <Button variant="outline" size="sm">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Cars Near You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Discover amazing cars for your next trip</p>
                <Button onClick={() => navigate('/cars')}>
                  Browse All Cars
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
