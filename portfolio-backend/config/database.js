const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'portfolio_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
  process.exit(-1);
});

// Create tables if they don't exist
const createTables = async () => {
  try {
    // Projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(500),
        category VARCHAR(100) NOT NULL,
        technologies TEXT[] NOT NULL,
        github_url VARCHAR(500),
        live_url VARCHAR(500),
        features TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Skills table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Experience table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        current BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Education table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        degree VARCHAR(255) NOT NULL,
        school VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        current BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
};

// Initialize database
createTables();

module.exports = pool;
