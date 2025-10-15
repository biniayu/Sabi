import { db } from '../utils/database';

const createTables = async () => {
  try {
    console.log('🚀 Setting up database tables...');

    // Create enums first
    await db.query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('user', 'admin', 'owner');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.query(`
      DO $$ BEGIN
        CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.query(`
      DO $$ BEGIN
        CREATE TYPE car_status AS ENUM ('Available', 'Rented', 'Maintenance');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.query(`
      DO $$ BEGIN
        CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'active', 'completed', 'cancelled');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role user_role DEFAULT 'user',
        status user_status DEFAULT 'active',
        avatar VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create cars table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        features JSONB DEFAULT '[]',
        images JSONB DEFAULT '[]',
        location VARCHAR(255) NOT NULL,
        status car_status DEFAULT 'Available',
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_bookings INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT positive_price CHECK (price > 0),
        CONSTRAINT valid_year CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1),
        CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
      );
    `);

    // Create bookings table
    await db.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status booking_status DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT valid_dates CHECK (end_date > start_date),
        CONSTRAINT positive_amount CHECK (total_amount > 0)
      );
    `);

    // Create indexes for better performance
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
      
      CREATE INDEX IF NOT EXISTS idx_cars_owner ON cars(owner_id);
      CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
      CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
      CREATE INDEX IF NOT EXISTS idx_cars_location ON cars(location);
      CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
      
      CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_car ON bookings(car_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
    `);

    // Create trigger function to update updated_at timestamp
    await db.query(`
      CREATE OR REPLACE FUNCTION update_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers for updated_at
    await db.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
    `);

    await db.query(`
      DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;
      CREATE TRIGGER update_cars_updated_at
        BEFORE UPDATE ON cars
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
    `);

    await db.query(`
      DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
      CREATE TRIGGER update_bookings_updated_at
        BEFORE UPDATE ON bookings
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
    `);

    // Function to update car rating and booking count
    await db.query(`
      CREATE OR REPLACE FUNCTION update_car_stats()
      RETURNS TRIGGER AS $$
      BEGIN
        -- Update total bookings count
        UPDATE cars 
        SET total_bookings = (
          SELECT COUNT(*) 
          FROM bookings 
          WHERE car_id = NEW.car_id 
          AND status IN ('completed', 'active', 'confirmed')
        )
        WHERE id = NEW.car_id;
        
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await db.query(`
      DROP TRIGGER IF EXISTS update_car_stats_trigger ON bookings;
      CREATE TRIGGER update_car_stats_trigger
        AFTER INSERT OR UPDATE ON bookings
        FOR EACH ROW
        EXECUTE FUNCTION update_car_stats();
    `);

    console.log('✅ Database tables created successfully!');
    console.log('📊 Tables created:');
    console.log('  - users (with roles: user, admin, owner)');
    console.log('  - cars (with status tracking)');
    console.log('  - bookings (with status workflow)');
    console.log('  - indexes for performance optimization');
    console.log('  - triggers for automatic timestamp updates');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
};

const main = async () => {
  try {
    await createTables();
    console.log('🎉 Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Database setup failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

export { createTables };
