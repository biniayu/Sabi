import { db } from '../utils/database';
import { AuthUtils } from '../utils/auth';
import { v4 as uuidv4 } from 'uuid';

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (in reverse order due to foreign keys)
    console.log('🗑️  Clearing existing data...');
    await db.query('DELETE FROM bookings');
    await db.query('DELETE FROM cars');
    await db.query('DELETE FROM users');

    // Sample users data
    const users = [
      {
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@sabi.com',
        password: 'admin123',
        role: 'admin',
        phone: '+251911234567',
        address: 'Addis Ababa, Ethiopia'
      },
      {
        id: uuidv4(),
        name: 'John Owner',
        email: 'owner@sabi.com',
        password: 'owner123',
        role: 'owner',
        phone: '+251911234568',
        address: 'Bole, Addis Ababa'
      },
      {
        id: uuidv4(),
        name: 'Jane Customer',
        email: 'user@sabi.com',
        password: 'user123',
        role: 'user',
        phone: '+251911234569',
        address: 'Piazza, Addis Ababa'
      },
      {
        id: uuidv4(),
        name: 'David Smith',
        email: 'owner2@sabi.com',
        password: 'owner123',
        role: 'owner',
        phone: '+251911234570',
        address: 'Kazanchis, Addis Ababa'
      },
      {
        id: uuidv4(),
        name: 'Sarah Johnson',
        email: 'user2@sabi.com',
        password: 'user123',
        role: 'user',
        phone: '+251911234571',
        address: '4 Kilo, Addis Ababa'
      }
    ];

    // Insert users
    console.log('👥 Creating users...');
    for (const user of users) {
      const passwordHash = await AuthUtils.hashPassword(user.password);
      await db.query(`
        INSERT INTO users (id, name, email, password_hash, role, phone, address, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [user.id, user.name, user.email, passwordHash, user.role, user.phone, user.address, 'active']);
    }

    // Sample cars data
    const cars = [
      {
        id: uuidv4(),
        owner_id: users[1].id, // John Owner
        name: 'Toyota Corolla 2022',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
        price: 50.00,
        description: 'Reliable and fuel-efficient sedan perfect for city driving',
        features: ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'USB Charging'],
        images: ['/images/toyota-corolla-1.jpg', '/images/toyota-corolla-2.jpg'],
        location: 'Bole, Addis Ababa',
        status: 'Available',
        rating: 4.8
      },
      {
        id: uuidv4(),
        owner_id: users[1].id, // John Owner
        name: 'Honda Civic 2021',
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        price: 55.00,
        description: 'Sporty and comfortable compact car with excellent safety features',
        features: ['Sunroof', 'Heated Seats', 'Apple CarPlay', 'Lane Assist'],
        images: ['/images/honda-civic-1.jpg', '/images/honda-civic-2.jpg'],
        location: 'Bole, Addis Ababa',
        status: 'Available',
        rating: 4.6
      },
      {
        id: uuidv4(),
        owner_id: users[3].id, // David Smith
        name: 'BMW X5 2023',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        price: 120.00,
        description: 'Luxury SUV with premium features and powerful performance',
        features: ['Leather Seats', 'Navigation System', 'Panoramic Roof', '360 Camera'],
        images: ['/images/bmw-x5-1.jpg', '/images/bmw-x5-2.jpg'],
        location: 'Kazanchis, Addis Ababa',
        status: 'Available',
        rating: 4.9
      },
      {
        id: uuidv4(),
        owner_id: users[3].id, // David Smith
        name: 'Nissan Sentra 2020',
        brand: 'Nissan',
        model: 'Sentra',
        year: 2020,
        price: 45.00,
        description: 'Affordable and practical sedan for everyday use',
        features: ['Air Conditioning', 'Power Windows', 'Bluetooth', 'Keyless Entry'],
        images: ['/images/nissan-sentra-1.jpg', '/images/nissan-sentra-2.jpg'],
        location: 'Kazanchis, Addis Ababa',
        status: 'Available',
        rating: 4.3
      },
      {
        id: uuidv4(),
        owner_id: users[1].id, // John Owner
        name: 'Mercedes C-Class 2022',
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2022,
        price: 95.00,
        description: 'Executive luxury sedan with cutting-edge technology',
        features: ['Premium Audio', 'Ambient Lighting', 'Wireless Charging', 'Driver Assistance'],
        images: ['/images/mercedes-c-class-1.jpg', '/images/mercedes-c-class-2.jpg'],
        location: 'Bole, Addis Ababa',
        status: 'Rented',
        rating: 4.7
      },
      {
        id: uuidv4(),
        owner_id: users[3].id, // David Smith
        name: 'Hyundai Elantra 2021',
        brand: 'Hyundai',
        model: 'Elantra',
        year: 2021,
        price: 48.00,
        description: 'Modern and stylish sedan with great fuel economy',
        features: ['Touch Screen', 'Android Auto', 'Rear Camera', 'Cruise Control'],
        images: ['/images/hyundai-elantra-1.jpg', '/images/hyundai-elantra-2.jpg'],
        location: 'Kazanchis, Addis Ababa',
        status: 'Maintenance',
        rating: 4.4
      }
    ];

    // Insert cars
    console.log('🚗 Creating cars...');
    for (const car of cars) {
      await db.query(`
        INSERT INTO cars (id, owner_id, name, brand, model, year, price, description, features, images, location, status, rating, total_bookings)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `, [
        car.id, car.owner_id, car.name, car.brand, car.model, car.year,
        car.price, car.description, JSON.stringify(car.features), JSON.stringify(car.images),
        car.location, car.status, car.rating, 0
      ]);
    }

    // Sample bookings data
    const bookings = [
      {
        id: uuidv4(),
        user_id: users[2].id, // Jane Customer
        car_id: cars[0].id, // Toyota Corolla
        start_date: new Date('2024-01-15'),
        end_date: new Date('2024-01-18'),
        total_amount: 150.00,
        status: 'completed',
        notes: 'Great car, very reliable!'
      },
      {
        id: uuidv4(),
        user_id: users[4].id, // Sarah Johnson
        car_id: cars[2].id, // BMW X5
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-02-05'),
        total_amount: 480.00,
        status: 'completed',
        notes: 'Perfect for the business trip'
      },
      {
        id: uuidv4(),
        user_id: users[2].id, // Jane Customer
        car_id: cars[4].id, // Mercedes C-Class
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        total_amount: 950.00,
        status: 'active',
        notes: 'Excellent luxury vehicle'
      },
      {
        id: uuidv4(),
        user_id: users[4].id, // Sarah Johnson
        car_id: cars[1].id, // Honda Civic
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        total_amount: 165.00,
        status: 'confirmed',
        notes: 'Looking forward to driving this!'
      },
      {
        id: uuidv4(),
        user_id: users[2].id, // Jane Customer
        car_id: cars[3].id, // Nissan Sentra
        start_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        end_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        total_amount: 135.00,
        status: 'pending',
        notes: 'Need it for weekend trip'
      },
      {
        id: uuidv4(),
        user_id: users[4].id, // Sarah Johnson
        car_id: cars[0].id, // Toyota Corolla
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-05'),
        total_amount: 200.00,
        status: 'cancelled',
        notes: 'Plans changed, had to cancel'
      }
    ];

    // Insert bookings
    console.log('📅 Creating bookings...');
    for (const booking of bookings) {
      await db.query(`
        INSERT INTO bookings (id, user_id, car_id, start_date, end_date, total_amount, status, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        booking.id, booking.user_id, booking.car_id,
        booking.start_date, booking.end_date, booking.total_amount,
        booking.status, booking.notes
      ]);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Seeded data summary:');
    console.log(`  👥 Users: ${users.length} (1 admin, 2 owners, 2 customers)`);
    console.log(`  🚗 Cars: ${cars.length} (${cars.filter(c => c.status === 'Available').length} available)`);
    console.log(`  📅 Bookings: ${bookings.length} (various statuses)`);
    
    console.log('\n🔑 Test Accounts:');
    console.log('  Admin:    admin@sabi.com / admin123');
    console.log('  Owner:    owner@sabi.com / owner123');
    console.log('  Customer: user@sabi.com / user123');
    
    console.log('\n🌐 You can now start the backend server with: npm run dev');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

const main = async () => {
  try {
    await seedData();
    console.log('🎉 Database seeding process completed!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Database seeding failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

export { seedData };
