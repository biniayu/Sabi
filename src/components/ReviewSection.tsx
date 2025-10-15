import React, { useState } from 'react';
import { Star, User, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewer: {
    id: number;
    name: string;
    avatar?: string;
  };
  created_at: string;
}

interface ReviewSectionProps {
  carId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (review: { rating: number; comment: string }) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  carId,
  reviews,
  averageRating,
  totalReviews,
  onAddReview
}) => {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = () => {
    if (newReview.comment.trim().length < 10) {
      alert('Please write a review with at least 10 characters');
      return;
    }
    
    onAddReview?.(newReview);
    setNewReview({ rating: 5, comment: '' });
    setIsAddingReview(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`${sizeClasses[size]} ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {renderStars(averageRating, 'lg')}
            <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-600">({totalReviews} reviews)</span>
        </div>
        
        <Dialog open={isAddingReview} onOpenChange={setIsAddingReview}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= newReview.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience with this car..."
                  className="mt-2"
                  rows={4}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSubmitReview}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Submit Review
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingReview(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No reviews yet. Be the first to review this car!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Reviewer Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {review.reviewer.name}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {renderStars(review.rating, 'sm')}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection; 