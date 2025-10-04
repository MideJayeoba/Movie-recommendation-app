# Movie Recommendation App

A full-stack movie recommendation platform built with Express.js backend and React frontend. Users can search for movies, view details, and save their favorite movies.

## Features

### Backend
- **User Authentication**: JWT-based authentication with secure login/register
- **MongoDB Database**: User model with email, password, and favorites array
- **Protected Routes**: Middleware to protect private endpoints
- **RESTful API**: Clean API design for auth and favorites management

### Frontend
- **React with Material-UI**: Modern, responsive UI design
- **User Authentication**: Login and Register forms
- **Movie Search**: Integration with TMDB API for movie data
- **Movie Display**: Beautiful movie cards with posters and details
- **Favorites Management**: Add and remove movies from favorites
- **Protected Routes**: Client-side route protection
- **Axios Integration**: HTTP client for API calls

## Tech Stack

### Backend
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- express-validator for input validation
- CORS enabled

### Frontend
- React 18
- Material-UI (MUI)
- React Router v6
- Axios
- Context API for state management

## Project Structure

```
Movie-recommendation-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   └── User.js               # User model with favorites
│   ├── routes/
│   │   ├── auth.js               # Register/Login routes
│   │   └── favorites.js          # Favorites CRUD routes
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Express server setup
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.js     # Movie display component
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   └── PrivateRoute.js  # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Register page
│   │   │   ├── Movies.js        # Movie search/browse page
│   │   │   └── Favorites.js     # User favorites page
│   │   ├── services/
│   │   │   ├── api.js           # Backend API calls
│   │   │   └── tmdb.js          # TMDB API integration
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- TMDB API Key (get it from [TMDB](https://www.themoviedb.org/settings/api))

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-recommendation
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

5. Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your TMDB API key:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`

### Favorites (Protected)
- `GET /api/favorites` - Get user's favorites
  - Headers: `Authorization: Bearer <token>`
- `POST /api/favorites` - Add movie to favorites
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ movieId, title, posterPath, overview, releaseDate, voteAverage }`
- `DELETE /api/favorites/:movieId` - Remove movie from favorites
  - Headers: `Authorization: Bearer <token>`

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Movies**: View popular movies or search for specific titles
3. **Add Favorites**: Click the heart icon to add movies to your favorites
4. **View Favorites**: Navigate to the Favorites page to see your saved movies
5. **Remove Favorites**: Click the filled heart icon to remove from favorites

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build
```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)
- `REACT_APP_TMDB_API_KEY`: TMDB API key for movie data
- `REACT_APP_API_URL`: Backend API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Author

MideJayeoba
