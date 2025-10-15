import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Car,
  User,
  Phone,
  MessageSquare,
  CreditCard,
  Trash2
} from 'lucide-react';

interface Booking {
  id: string;
  car: {
    id: string;
    name: string;
    image: string;
    brand: string;
    model: string;
  };
  pickupDate: string;
  returnDate: string;
  duration: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'awaiting' | 'paid' | 'refunded';
  pickupLocation: string;
  pickupInstructions: string;
  owner: {
    name: string;
    phone: string;
  };
  renter: {
    name: string;
    phone: string;
  };
  createdAt: string;
}

interface BookingManagementProps {
  bookings: Booking[];
  userRole: 'owner' | 'renter';
  onStatusUpdate?: (bookingId: string, status: string) => void;
  onCancelBooking?: (bookingId: string) => void;
  onContactUser?: (userId: string, type: 'owner' | 'renter') => void;
}

const BookingManagement: React.FC<BookingManagementProps> = ({
  bookings,
  userRole,
  onStatusUpdate,
  onCancelBooking,
  onContactUser
}) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const canCancel = (booking: Booking) => {
    const pickupDate = new Date(booking.pickupDate);
    const now = new Date();
    const hoursUntilPickup = (pickupDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilPickup > 24 && booking.status !== 'cancelled' && booking.status !== 'completed';
  };

  const canUpdateStatus = (booking: Booking) => {
    return userRole === 'owner' && booking.status !== 'cancelled' && booking.status !== 'completed';
  };

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(bookingId, newStatus);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (onCancelBooking) {
      onCancelBooking(bookingId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {userRole === 'owner' ? 'Manage Bookings' : 'My Bookings'}
        </h2>
        <div className="text-sm text-gray-600">
          {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={booking.car.image} 
                    alt={booking.car.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.car.brand} {booking.car.model}
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
                  <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.duration} days</p>
                    <p className="text-xs text-gray-600">Duration</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
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
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatDate(booking.createdAt)}</p>
                    <p className="text-xs text-gray-600">Booked On</p>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {userRole === 'owner' ? 'Renter' : 'Owner'} Information
                    </h4>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {userRole === 'owner' ? booking.renter.name : booking.owner.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {userRole === 'owner' ? booking.renter.phone : booking.owner.phone}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Pickup Instructions</h4>
                    <p className="text-sm text-gray-600">{booking.pickupInstructions}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onContactUser?.(userRole === 'owner' ? booking.renter.name : booking.owner.name, userRole === 'owner' ? 'renter' : 'owner')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    {booking.paymentStatus === 'awaiting' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {/* Handle payment */}}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {canUpdateStatus(booking) && (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          disabled={booking.status === 'confirmed'}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, 'completed')}
                          disabled={booking.status === 'completed'}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                      </div>
                    )}
                    {canCancel(booking) && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {bookings.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Calendar className="w-12 h-12 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
                  <p className="text-gray-600">
                    {userRole === 'owner' 
                      ? 'You don\'t have any bookings yet.' 
                      : 'You haven\'t made any bookings yet.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingManagement; 