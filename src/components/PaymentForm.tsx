import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin
} from 'lucide-react';

interface PaymentFormProps {
  booking: {
    id: string;
    car: {
      name: string;
      brand: string;
      model: string;
      year: string;
      image: string;
    };
    pickupDate: string;
    returnDate: string;
    duration: number;
    totalAmount: number;
    pickupLocation: string;
  };
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  booking,
  onPaymentSuccess,
  onPaymentError,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const validateForm = () => {
    if (!cardholderName.trim()) {
      onPaymentError('Please enter the cardholder name');
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length < 16) {
      onPaymentError('Please enter a valid card number');
      return false;
    }
    if (expiryDate.length < 5) {
      onPaymentError('Please enter a valid expiry date');
      return false;
    }
    if (cvv.length < 3) {
      onPaymentError('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call to create payment intent
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would be:
      // const response = await fetch('/api/payments/create-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ booking_id: booking.id, amount: booking.totalAmount })
      // });
      
      const paymentId = `pi_${Math.random().toString(36).substr(2, 9)}`;
      onPaymentSuccess(paymentId);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
            <div className="flex items-start space-x-4">
              <img 
                src={booking.car.image} 
                alt={booking.car.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {booking.car.brand} {booking.car.model} {booking.car.year}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {booking.duration} days
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.pickupLocation}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${booking.totalAmount}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-sm font-medium">Payment Method</Label>
            <div className="flex space-x-4 mt-2">
              <Button
                type="button"
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('card')}
                className="flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit Card</span>
              </Button>
              <Button
                type="button"
                variant={paymentMethod === 'mobile' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('mobile')}
                className="flex items-center space-x-2"
              >
                <span>Mobile Money</span>
              </Button>
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === 'card' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                <Input
                  id="cardholder-name"
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength={4}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </form>
          )}

          {/* Mobile Money Form */}
          {paymentMethod === 'mobile' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="+251 911 123 456"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mobile-provider">Provider</Label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Select Provider</option>
                  <option value="telebirr">Telebirr</option>
                  <option value="cbe-birr">CBE Birr</option>
                  <option value="amole">Amole</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Pay ${booking.totalAmount}</span>
                </div>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>

          {/* Payment Security */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Secure Payment</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your payment is protected by bank-level security. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm; 