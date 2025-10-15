import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Fuel, 
  Settings, 
  MapPin, 
  Camera, 
  Bluetooth, 
  Navigation, 
  Car,
  Calendar,
  Star,
  MessageSquare,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Mock car data - in real app this would come from API
  const car = {
    id: id || '68554885ed8f9d79cdfa023',
    name: 'BMW X5',
    year: '2006',
    category: 'SUV',
    image: '/placeholder.svg',
    price: 300,
    rating: 4.8,
    totalReviews: 15,
    description: 'The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.',
    specifications: [
      { icon: Users, text: '4 Seats' },
      { icon: Fuel, text: 'Hybrid' },
      { icon: Settings, text: 'Semi-Automatic' },
      { icon: MapPin, text: 'New York' }
    ],
    features: [
      { icon: Camera, text: '360 Camera' },
      { icon: Bluetooth, text: 'Bluetooth' },
      { icon: Navigation, text: 'GPS' },
      { icon: Car, text: 'Heated Seats' },
      { icon: Camera, text: 'Rear View Mirror' }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Excellent car! Very clean and well maintained. The owner was very professional and the pickup/drop-off was smooth.',
        reviewer: 'John Doe',
        date: '2024-01-15'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Great experience overall. The car was as described and the service was prompt.',
        reviewer: 'Sarah Smith',
        date: '2024-01-10'
      },
      {
        id: 3,
        rating: 5,
        comment: 'Perfect for our family trip. Comfortable and reliable. Highly recommend!',
        reviewer: 'Mike Johnson',
        date: '2024-01-05'
      }
    ]
  };

  // Calculate duration and total amount when dates change
  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
      setTotalAmount(diffDays * car.price);
    }
  }, [pickupDate, returnDate, car.price]);

  const handleBooking = () => {
    if (!pickupDate || !returnDate) {
      alert('Please select both pickup and return dates');
      return;
    }
    if (duration < 1) {
      alert('Return date must be after pickup date');
      return;
    }
    // Here you would integrate with the booking API
    alert(`Booking submitted successfully! Total: $${totalAmount} for ${duration} days`);
  };

  const handleReviewSubmit = () => {
    if (!reviewComment.trim()) {
      alert('Please enter a review comment');
      return;
    }
    // Here you would integrate with the review API
    alert('Review submitted successfully!');
    setShowReviewForm(false);
    setReviewComment('');
    setReviewRating(5);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Car Information */}
          <div className="space-y-8">
            
            {/* Car Image */}
            <div className="relative">
              <img 
                src={car.image} 
                alt={`${car.name} ${car.year}`}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            {/* Car Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.name}
              </h1>
              <p className="text-gray-600 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < Math.floor(car.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{car.rating}</span>
              <span className="text-gray-500">({car.totalReviews} reviews)</span>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {car.specifications.map((spec, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center"
                  >
                    <spec.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{spec.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-600">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
                <Button 
                  onClick={() => setShowReviewForm(true)}
                  variant="outline"
                  size="sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write Review
                </Button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Rating</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={24}
                            className={`cursor-pointer ${
                              star <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                            onClick={() => setReviewRating(star)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-comment" className="text-sm font-medium">
                        Comment
                      </Label>
                      <Textarea
                        id="review-comment"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this car..."
                        className="mt-2"
                        rows={4}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleReviewSubmit} className="flex-1">
                        Submit Review
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {car.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">{review.reviewer}</span>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Enhanced Booking Widget */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                
                {/* Price Display */}
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${car.price}</span>
                  <span className="text-gray-600">per day</span>
                </div>

                {/* Date Pickers */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pickup-date" className="text-sm font-medium text-gray-700">
                      Pickup Date
                    </Label>
                    <Input
                      id="pickup-date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="return-date" className="text-sm font-medium text-gray-700">
                      Return Date
                    </Label>
                    <Input
                      id="return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                {duration > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{duration} day{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily Rate:</span>
                      <span className="font-medium">${car.price}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-semibold">Total:</span>
                        <span className="text-xl font-bold text-gray-900">${totalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Now Button */}
                <Button 
                  onClick={handleBooking}
                  disabled={!pickupDate || !returnDate || duration < 1}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>

                {/* Booking Info */}
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free cancellation up to 24h before pickup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>No hidden fees</span>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails; 