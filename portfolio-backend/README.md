# Portfolio Backend API

A Node.js backend API for the portfolio website built with Express and PostgreSQL.

## Features

- RESTful API endpoints for projects, skills, and contact messages
- PostgreSQL database with automatic table creation
- Input validation and error handling
- CORS enabled for frontend integration
- Security middleware (Helmet, Morgan)

## Setup Instructions

### 1. Install Dependencies

```bash
cd portfolio-backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Database Setup

1. Install PostgreSQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE portfolio_db;
   ```
3. The application will automatically create the required tables on startup

### 4. Run the Application

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/categories/list` - Get project categories

### Skills

- `GET /api/skills` - Get all skills grouped by category
- `POST /api/skills` - Add new skill

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)

### Health Check

- `GET /api/health` - API health status

## Database Schema

The application automatically creates the following tables:

- **projects**: Portfolio projects with title, description, technologies, etc.
- **skills**: Technical skills grouped by category
- **contact_messages**: Contact form submissions
- **experience**: Work experience entries
- **education**: Educational background

## Development

- Uses nodemon for auto-reload during development
- Comprehensive error handling and logging
- Input validation using express-validator
- CORS enabled for frontend integration

## Production Considerations

- Set NODE_ENV=production
- Use environment variables for sensitive data
- Consider adding authentication middleware
- Implement rate limiting
- Add SSL/TLS for HTTPS
- Set up proper logging and monitoring
