import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingManagement from '../components/BookingManagement';

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Mock booking data with enhanced structure
  const [bookings] = useState([
    {
      id: '1',
      car: {
        id: 'bmw-x5-001',
        name: 'BMW X5',
        brand: 'BMW',
        model: 'X5',
        year: '2023',
        image: '/placeholder.svg',
        price: 300,
        rating: 4.8,
        category: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        seats: 5
      },
      pickupDate: '2025-01-15',
      returnDate: '2025-01-18',
      duration: 3,
      totalAmount: 900,
      status: 'confirmed',
      paymentStatus: 'paid',
      pickupLocation: 'Addis Ababa International Airport',
      pickupInstructions: 'Meet at Terminal 1, Gate 3. Please bring your driver\'s license and credit card.',
      owner: {
        name: 'Abebe Kebede',
        phone: '+251 911 123 456',
        email: 'abebe.kebede@email.com'
      },
      renter: {
        name: 'John Doe',
        phone: '+251 922 456 789',
        email: 'john.doe@email.com'
      },
      createdAt: '2025-01-10'
    },
    {
      id: '2',
      car: {
        id: 'toyota-corolla-002',
        name: 'Toyota Corolla',
        brand: 'Toyota',
        model: 'Corolla',
        year: '2024',
        image: '/placeholder.svg',
        price: 150,
        rating: 4.6,
        category: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5
      },
      pickupDate: '2025-01-20',
      returnDate: '2025-01-22',
      duration: 2,
      totalAmount: 300,
      status: 'pending',
      paymentStatus: 'awaiting',
      pickupLocation: 'Bole, Addis Ababa',
      pickupInstructions: 'Meet at Bole Atlas Hotel lobby. Please arrive 15 minutes early.',
      owner: {
        name: 'Kebede Alemu',
        phone: '+251 922 456 789',
        email: 'kebede.alemu@email.com'
      },
      renter: {
        name: 'John Doe',
        phone: '+251 922 456 789',
        email: 'john.doe@email.com'
      },
      createdAt: '2025-01-12'
    },
    {
      id: '3',
      car: {
        id: 'honda-crv-003',
        name: 'Honda CR-V',
        brand: 'Honda',
        model: 'CR-V',
        year: '2023',
        image: '/placeholder.svg',
        price: 200,
        rating: 4.7,
        category: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5
      },
      pickupDate: '2025-01-25',
      returnDate: '2025-01-28',
      duration: 3,
      totalAmount: 600,
      status: 'cancelled',
      paymentStatus: 'refunded',
      pickupLocation: 'Kazanchis, Addis Ababa',
      pickupInstructions: 'Meet at Kazanchis Business District. Please call 30 minutes before arrival.',
      owner: {
        name: 'Tadesse Bekele',
        phone: '+251 933 789 123',
        email: 'tadesse.bekele@email.com'
      },
      renter: {
        name: 'John Doe',
        phone: '+251 922 456 789',
        email: 'john.doe@email.com'
      },
      createdAt: '2025-01-14'
    }
  ]);

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
    alert(`Booking status updated to ${newStatus}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, this would make an API call
      console.log(`Cancelling booking ${bookingId}`);
      alert('Booking cancelled successfully');
    }
  };

  const handleContactUser = (userId: string, type: 'owner' | 'renter') => {
    // In a real app, this would open a messaging interface
    console.log(`Contacting ${type}: ${userId}`);
    alert(`Opening chat with ${type}`);
  };

  const handlePayNow = (bookingId: string) => {
    // In a real app, this would redirect to payment gateway
    console.log(`Processing payment for booking ${bookingId}`);
    alert('Redirecting to payment gateway...');
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-gray-600">Manage your car rental bookings and payments</p>
            </div>
            <Button 
              onClick={() => navigate('/cars')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book Another Car
            </Button>
          </div>
        </div>

        {/* Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'all' 
                    ? 'You haven\'t made any bookings yet.' 
                    : `You don't have any ${activeTab} bookings.`
                  }
                </p>
                <Button 
                  onClick={() => navigate('/cars')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Browse Available Cars
                </Button>
              </div>
            ) : (
              <BookingManagement
                bookings={filteredBookings}
                userRole="renter"
                onStatusUpdate={handleStatusUpdate}
                onCancelBooking={handleCancelBooking}
                onContactUser={handleContactUser}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyBookings; 