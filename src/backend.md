# Sabi Car Rental - Backend Documentation

## Technology Stack
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe
- **File Storage**: Cloudinary (for images)
- **Deployment**: Vercel
- **API**: RESTful APIs

---

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role ENUM('owner', 'renter', 'admin') DEFAULT 'renter',
  is_verified BOOLEAN DEFAULT false,
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Cars Table
```sql
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  daily_price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  transmission VARCHAR(20) NOT NULL,
  fuel_type VARCHAR(20) NOT NULL,
  seats INTEGER NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  features TEXT[],
  images TEXT[],
  is_available BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
  renter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  duration INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  payment_status ENUM('awaiting', 'paid', 'refunded') DEFAULT 'awaiting',
  pickup_location VARCHAR(255),
  pickup_instructions TEXT,
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Payments Table
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  status ENUM('pending', 'succeeded', 'failed', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Reviews Table
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
  reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Authentication Endpoints

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "renter"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "renter"
    },
    "token": "jwt_token_here"
  }
}
```

#### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "renter"
    },
    "token": "jwt_token_here"
  }
}
```

#### 3. Get Current User
```
GET /api/auth/me
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "renter"
    }
  }
}
```

### Cars Endpoints

#### 4. Get All Cars (Public) - Enhanced with Search & Filters
```
GET /api/cars?page=1&limit=10&category=suv&minPrice=50&maxPrice=200&location=addis&search=BMW&transmission=automatic&fuelType=hybrid&sortBy=price-low

Response:
{
  "success": true,
  "data": {
    "cars": [
      {
        "id": 1,
        "brand": "BMW",
        "model": "X5",
        "year": 2023,
        "daily_price": 300,
        "category": "SUV",
        "transmission": "Automatic",
        "fuel_type": "Hybrid",
        "seats": 5,
        "location": "Addis Ababa",
        "description": "Luxury SUV...",
        "features": ["GPS", "Bluetooth", "Backup Camera"],
        "images": ["image1.jpg", "image2.jpg"],
        "rating": 4.8,
        "total_reviews": 15,
        "owner": {
          "id": 2,
          "name": "Car Owner"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

#### 5. Get Single Car (Public) - Enhanced with Reviews
```
GET /api/cars/:id

Response:
{
  "success": true,
  "data": {
    "car": {
      "id": 1,
      "brand": "BMW",
      "model": "X5",
      "year": 2023,
      "daily_price": 300,
      "category": "SUV",
      "transmission": "Automatic",
      "fuel_type": "Hybrid",
      "seats": 5,
      "location": "Addis Ababa",
      "description": "Luxury SUV...",
      "features": ["GPS", "Bluetooth", "Backup Camera"],
      "images": ["image1.jpg", "image2.jpg"],
      "rating": 4.8,
      "total_reviews": 15,
      "owner": {
        "id": 2,
        "name": "Car Owner"
      },
      "reviews": [
        {
          "id": 1,
          "rating": 5,
          "comment": "Great car!",
          "reviewer": {
            "id": 3,
            "name": "John Doe"
          },
          "created_at": "2024-01-15T10:30:00Z"
        }
      ]
    }
  }
}
```

#### 6. Add Car (Owner Only)
```
POST /api/cars
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

{
  "brand": "BMW",
  "model": "X5",
  "year": 2023,
  "daily_price": 300,
  "category": "SUV",
  "transmission": "Automatic",
  "fuel_type": "Hybrid",
  "seats": 5,
  "location": "Addis Ababa",
  "description": "Luxury SUV...",
  "features": ["GPS", "Bluetooth", "Backup Camera"],
  "images": [file1, file2, file3]
}

Response:
{
  "success": true,
  "message": "Car added successfully",
  "data": {
    "car": {
      "id": 1,
      "brand": "BMW",
      "model": "X5",
      // ... other car details
    }
  }
}
```

#### 7. Update Car (Owner Only)
```
PUT /api/cars/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "daily_price": 350,
  "description": "Updated description..."
}

Response:
{
  "success": true,
  "message": "Car updated successfully",
  "data": {
    "car": {
      // updated car details
    }
  }
}
```

#### 8. Delete Car (Owner Only)
```
DELETE /api/cars/:id
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "message": "Car deleted successfully"
}
```

#### 9. Get Owner's Cars
```
GET /api/cars/owner/my-cars
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "cars": [
      // owner's cars
    ]
  }
}
```

### Bookings Endpoints

#### 10. Create Booking - Enhanced with Payment Integration
```
POST /api/bookings
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "car_id": 1,
  "pickup_date": "2024-02-15",
  "return_date": "2024-02-18",
  "pickup_location": "Addis Ababa Airport",
  "pickup_instructions": "Meet at Terminal 1"
}

Response:
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking": {
      "id": 1,
      "car_id": 1,
      "renter_id": 3,
      "owner_id": 2,
      "pickup_date": "2024-02-15",
      "return_date": "2024-02-18",
      "duration": 3,
      "total_amount": 900,
      "status": "pending",
      "payment_status": "awaiting",
      "pickup_location": "Addis Ababa Airport",
      "pickup_instructions": "Meet at Terminal 1",
      "stripe_payment_intent_id": "pi_1234567890"
    }
  }
}
```

#### 11. Get All Bookings (Public)
```
GET /api/bookings?status=confirmed&page=1&limit=10

Response:
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": 1,
        "car": {
          "id": 1,
          "brand": "BMW",
          "model": "X5",
          "year": 2023,
          "images": ["image1.jpg"],
          "rating": 4.8
        },
        "renter": {
          "id": 3,
          "name": "John Doe"
        },
        "owner": {
          "id": 2,
          "name": "Car Owner"
        },
        "pickup_date": "2024-02-15",
        "return_date": "2024-02-18",
        "duration": 3,
        "total_amount": 900,
        "status": "confirmed",
        "payment_status": "paid",
        "pickup_location": "Addis Ababa Airport",
        "pickup_instructions": "Meet at Terminal 1",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### 12. Get User's Bookings - Enhanced with Status Management
```
GET /api/bookings/my-bookings
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": 1,
        "car": {
          "id": 1,
          "brand": "BMW",
          "model": "X5",
          "year": 2023,
          "image": "/placeholder.svg",
          "rating": 4.8,
          "category": "SUV",
          "transmission": "Automatic",
          "fuelType": "Hybrid",
          "seats": 5
        },
        "pickup_date": "2024-02-15",
        "return_date": "2024-02-18",
        "duration": 3,
        "total_amount": 900,
        "status": "confirmed",
        "payment_status": "paid",
        "pickup_location": "Addis Ababa Airport",
        "pickup_instructions": "Meet at Terminal 1",
        "owner": {
          "name": "Car Owner",
          "phone": "+251 911 123 456"
        },
        "renter": {
          "name": "John Doe",
          "phone": "+251 922 456 789"
        },
        "created_at": "2024-01-10"
      }
    ]
  }
}
```

#### 13. Get Owner's Bookings
```
GET /api/bookings/owner/my-bookings
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "bookings": [
      // owner's bookings
    ]
  }
}
```

#### 14. Update Booking Status (Owner Only) - Enhanced
```
PUT /api/bookings/:id/status
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "confirmed"
}

Response:
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "booking": {
      // updated booking details
    }
  }
}
```

#### 15. Cancel Booking - Enhanced
```
PUT /api/bookings/:id/cancel
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

### Payments Endpoints

#### 16. Create Payment Intent - Enhanced
```
POST /api/payments/create-intent
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "booking_id": 1,
  "amount": 900
}

Response:
{
  "success": true,
  "data": {
    "client_secret": "pi_1234567890_secret_abc123",
    "payment_intent_id": "pi_1234567890"
  }
}
```

#### 17. Confirm Payment - Enhanced
```
POST /api/payments/confirm
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "payment_intent_id": "pi_1234567890"
}

Response:
{
  "success": true,
  "message": "Payment confirmed successfully"
}
```

### Reviews Endpoints

#### 18. Add Review - Enhanced
```
POST /api/reviews
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "car_id": 1,
  "booking_id": 1,
  "rating": 5,
  "comment": "Great car and service!"
}

Response:
{
  "success": true,
  "message": "Review added successfully"
}
```

#### 19. Get Car Reviews - Enhanced
```
GET /api/cars/:id/reviews?page=1&limit=10

Response:
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Great car!",
        "reviewer": {
          "id": 3,
          "name": "John Doe"
        },
        "created_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Messages Endpoints

#### 20. Send Message
```
POST /api/messages
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "receiver_id": 2,
  "booking_id": 1,
  "message": "Hi, I have a question about the pickup location."
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

#### 21. Get Messages
```
GET /api/messages?booking_id=1
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": 1,
        "message": "Hi, I have a question...",
        "sender": {
          "id": 3,
          "name": "John Doe"
        },
        "receiver": {
          "id": 2,
          "name": "Car Owner"
        },
        "is_read": false,
        "created_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## Frontend Functionality Mapping

### 1. Authentication Pages
- **Login Page** (`/login`)
  - Uses: `POST /api/auth/login`
  - Redirects to homepage after successful login

- **Registration** (handled in login page)
  - Uses: `POST /api/auth/register`
  - Auto-login after successful registration

### 2. Homepage (`/`)
- **Public page** - no authentication required
- **Search functionality** - uses `GET /api/cars` with filters
- **"List Your Car" button** - redirects to login if not authenticated

### 3. Cars Page (`/cars`) - Enhanced with Search & Filters
- **Public page** - shows all available cars
- **Uses**: `GET /api/cars` with pagination and filters
- **Advanced search** - by brand, model, location
- **Filter components** - category, transmission, fuel type, price range
- **Sort functionality** - by price, rating, newest
- **"View" buttons** - navigate to car details

### 4. Car Details Page (`/car-details/:id`) - Enhanced with Reviews
- **Public page** - detailed car information
- **Uses**: `GET /api/cars/:id`
- **Booking widget** - uses `POST /api/bookings` to create booking
- **Reviews section** - uses `GET /api/cars/:id/reviews`
- **Review submission** - uses `POST /api/reviews`
- **Enhanced booking form** - with date picker and price calculation

### 5. My Bookings Page (`/my-bookings`) - Enhanced with Management
- **Public page** - shows all bookings
- **Uses**: `GET /api/bookings` (public endpoint)
- **Booking management** - status updates, cancellation
- **Payment integration** - uses `POST /api/payments/create-intent`
- **Contact functionality** - messaging between users
- **Enhanced booking cards** - with detailed information

### 6. Dashboard (`/dashboard`)
- **Protected page** - owner only
- **Uses**: `GET /api/auth/me` to verify user
- **Stats cards** - uses booking and car data
- **Recent bookings** - uses `GET /api/bookings/owner/my-bookings`

### 7. Add Car Page (`/add-car`)
- **Protected page** - owner only
- **Uses**: `POST /api/cars` with file upload
- **Image upload** - uses Cloudinary integration

### 8. Manage Cars Page (`/manage-cars`)
- **Protected page** - owner only
- **Uses**: `GET /api/cars/owner/my-cars`
- **Edit/Delete** - uses `PUT /api/cars/:id` and `DELETE /api/cars/:id`

### 9. Manage Bookings Page (`/manage-bookings`)
- **Protected page** - owner only
- **Uses**: `GET /api/bookings/owner/my-bookings`
- **Status updates** - uses `PUT /api/bookings/:id/status`

---

## Environment Variables
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/sabi_db

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
NODE_ENV=development
```

---

## File Structure
```
backend/
├── config/
│   ├── database.js
│   └── stripe.js
├── controllers/
│   ├── authController.js
│   ├── carController.js
│   ├── bookingController.js
│   ├── paymentController.js
│   └── reviewController.js
├── middleware/
│   ├── auth.js
│   ├── upload.js
│   └── validation.js
├── models/
│   ├── User.js
│   ├── Car.js
│   ├── Booking.js
│   └── Payment.js
├── routes/
│   ├── auth.js
│   ├── cars.js
│   ├── bookings.js
│   └── payments.js
├── utils/
│   ├── jwt.js
│   └── cloudinary.js
├── package.json
└── server.js
```

This backend system will provide all the functionality needed for the frontend to work with real data instead of mock data!

