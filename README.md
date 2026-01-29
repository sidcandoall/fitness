# 💪 Fitness Tracker

A modern fitness tracking web application built with Next.js, Express, and PostgreSQL. Track your workouts, exercises, and sets with an intuitive interface.

## Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 📅 **Workout Tracking** - Create and organize workouts by date
- 💪 **Exercise Management** - Add exercises to your workouts
- 📊 **Set Tracking** - Track sets, reps, and weight for each exercise
- 🎯 **User Dashboard** - Beautiful, responsive dashboard to view all your progress
- 📱 **Mobile Friendly** - Responsive design works on all devices

## Tech Stack

**Frontend:**
- Next.js 16.1.6
- React 19.2.3
- CSS Modules

**Backend:**
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
fitness/
├── web/                    # Next.js frontend
│   ├── src/app/
│   │   ├── api/            # API routes
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   ├── dashboard/      # Main dashboard
│   │   └── globals.css
│   └── package.json
└── server/                 # Express backend
    ├── controllers/        # Route handlers
    ├── routes/            # API routes
    ├── middleware/        # Auth middleware
    ├── prisma/            # Database schema
    └── package.json
```

## Prerequisites

- Node.js (v16+)
- PostgreSQL (running locally or connection string ready)
- npm or yarn

## Installation & Setup

### 1. Database Setup

Create a PostgreSQL database and set up your `.env` file:

```bash
cd server
```

Create `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fitness"
JWT_SECRET="your_secret_key_here"
PORT=5001
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Run Prisma migrations
npm run prisma migrate dev --name init

# Start the server (development)
npm run dev

# OR start with node
npm start
```

The server will run on `http://localhost:5001`

### 3. Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The web app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Workouts
- `GET /api/workouts` - Get all user's workouts
- `POST /api/workouts` - Create new workout
- `GET /api/workouts/:id` - Get specific workout
- `DELETE /api/workouts/:id` - Delete workout

### Exercises
- `POST /exercises` - Add exercise to workout
- `GET /exercises?workoutId=:id` - Get exercises for a workout

### Sets
- `POST /sets` - Add a set to an exercise
- `DELETE /sets/:id` - Delete a set

## Usage

1. **Register/Login**: Navigate to the login page and create an account
2. **Create Workout**: Click "New Workout" to start tracking
3. **Add Exercises**: Enter exercise names and add them to your workout
4. **Log Sets**: For each exercise, add your reps and weight
5. **View Progress**: All your workouts appear on the dashboard

## Development

### Running tests
```bash
cd server
npm test
```

### Building for production

**Frontend:**
```bash
cd web
npm run build
npm run start
```

**Backend:**
```bash
cd server
npm start
```

## Environment Variables

### Server (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
PORT=5001
```

### Frontend (.env.local) - Optional
```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## Features Roadmap

- [ ] User profiles and settings
- [ ] Weight/body composition tracking
- [ ] Workout history and statistics
- [ ] Custom exercise library
- [ ] Workout templates
- [ ] Social features (friend workouts, challenges)
- [ ] Mobile app (React Native)
- [ ] Export workout data

## Contributing

Feel free to fork this project and submit pull requests.

## License

This project is open source and available under the MIT License.

## API Test Status

All auth, workout, exercise, and set routes tested via Postman.

---

**Happy Training! 💪**
