# Jobs API

A RESTful API for managing job postings and user authentication, built with Node.js, Express, and MongoDB.

## Features
- User registration and login with JWT authentication
- CRUD operations for job postings (create, read, update, delete)
- Secure password hashing with bcryptjs
- Input validation and error handling
- API documentation with Swagger UI
- Security best practices: helmet, cors, xss-clean, express-rate-limit

## Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   secret=your_jwt_secret
   expire=1d
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Documentation

- Visit [https://jobscheduler-f996.onrender.com/](https://jobscheduler-f996.onrender.com/api-docs) for Swagger UI and detailed API docs.
- Local: [http://localhost:5000/](http://localhost:5000/api-docs)

## Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### Jobs (Protected)
- `GET /api/jobs` — List all jobs for the authenticated user
- `POST /api/jobs` — Create a new job
- `GET /api/jobs/:id` — Get a single job by ID
- `PATCH /api/jobs/:id` — Update a job
- `DELETE /api/jobs/:id` — Delete a job

## Models

### User
- `name`: String, required, 3-30 chars
- `email`: String, required, unique, valid email
- `password`: String, required, min 6 chars (hashed)

### Job
- `company`: String, required
- `position`: String, required
- `status`: String, default 'pending'
- `user`: ObjectId (User), required

## Security
- Helmet for HTTP headers
- CORS enabled
- XSS protection
- Rate limiting

## Error Handling
- Handles validation, duplicate, and cast errors

---

**Made with Node.js, Express, and MongoDB.**

**Live Demo:** [https://jobscheduler-f996.onrender.com/](https://jobscheduler-f996.onrender.com/)
