import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
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
  helpful_votes: number;
}

interface ReviewsSectionProps {
  carId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (review: { rating: number; comment: string }) => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  carId,
  reviews,
  averageRating,
  totalReviews,
  onAddReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!newReview.comment.trim()) {
      alert('Please write a review comment');
      return;
    }
    
    onAddReview?.(newReview);
    setNewReview({ rating: 0, comment: '' });
    setShowReviewForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const starSize = size === 'sm' ? 16 : 20;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={starSize} 
            className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {renderStars(averageRating)}
            <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
          </div>
          <span className="text-gray-600">({totalReviews} reviews)</span>
        </div>
        <Button 
          onClick={() => setShowReviewForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Write a Review
        </Button>
      </div>

      {/* Add Review Form */}
      {showReviewForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Rating Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Rating</Label>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star 
                      size={24}
                      className={`${
                        rating <= (hoveredRating || newReview.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Comment */}
            <div>
              <Label htmlFor="review-comment" className="text-sm font-medium text-gray-700">
                Your Review
              </Label>
              <Textarea
                id="review-comment"
                placeholder="Share your experience with this car..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="mt-2"
                rows={4}
              />
            </div>

            {/* Form Actions */}
            <div className="flex space-x-3">
              <Button 
                onClick={handleSubmitReview}
                className="bg-blue-600 hover:bg-blue-700"
              >
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
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews yet. Be the first to review this car!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {review.reviewer.avatar ? (
                        <img 
                          src={review.reviewer.avatar} 
                          alt={review.reviewer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{review.reviewer.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating, 'sm')}
                        <span className="text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{review.helpful_votes}</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-3 leading-relaxed">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection; 