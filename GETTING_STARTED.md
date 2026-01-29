# Getting Started with Fitness Tracker

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** (comes with Node.js)

## Step 1: Database Setup

### Create a PostgreSQL Database

1. Open your PostgreSQL client (pgAdmin or command line)
2. Create a new database:
   ```sql
   CREATE DATABASE fitness;
   ```

3. Get your connection string:
   ```
   postgresql://username:password@localhost:5432/fitness
   ```

## Step 2: Backend Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env  # If available, or create new
   ```

3. Edit `.env` with your database credentials:
   ```
   DATABASE_URL="postgresql://your_user:your_password@localhost:5432/fitness"
   JWT_SECRET="your_secret_key_here_make_it_long_and_random"
   PORT=5001
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Run database migrations:
   ```bash
   npm run prisma migrate dev --name init
   ```

## Step 3: Start the Backend

From the `server` directory:

```bash
npm run dev
```

You should see:
```
Server running on port 5001
```

## Step 4: Frontend Configuration

1. Navigate to the web directory:
   ```bash
   cd ../web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Step 5: Start the Frontend

From the `web` directory:

```bash
npm run dev
```

You should see something like:
```
- Local: http://localhost:3000
- Environments: .next/env.d.ts
```

## Step 6: Open the App

Open your browser and go to:
```
http://localhost:3000
```

## First Time Use

1. **Register**: Create a new account with email and password
2. **Login**: Log in with your credentials
3. **Create Workout**: Click "New Workout" to start
4. **Add Exercises**: Enter exercise names and add them to your workout
5. **Track Sets**: Log your reps and weight for each exercise

## Available Commands

### Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Start with node
npm start

# Prisma CLI
npm run prisma db push          # Sync database with schema
npm run prisma migrate dev      # Create new migration
npm run prisma studio          # Open Prisma GUI
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production build
npm run start

# Lint code
npm run lint
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5001 is already in use:

**Backend:**
```bash
cd server
PORT=5002 npm run dev
```

**Frontend:**
```bash
cd web
npm run dev -- -p 3001
```

Then update the API URL in your frontend code.

### Database Connection Error

Check your `.env` file:
- Verify PostgreSQL is running
- Verify database exists: `psql -U postgres -c "CREATE DATABASE fitness;"`
- Test connection: `psql postgresql://user:password@localhost:5432/fitness`

### CORS Error

Make sure your backend `.env` has:
```
CORS_ORIGIN=http://localhost:3000
```

### Module Not Found Errors

Clear cache and reinstall:
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../web
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Quick Guide

```
fitness/
├── server/              # Node.js/Express API
│   ├── controllers/     # Business logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation
│   ├── prisma/         # Database schema
│   └── .env            # Environment config
│
├── web/                # Next.js frontend
│   └── src/app/        # Pages & components
│       ├── api/        # API routes (proxy)
│       ├── login/      # Login page
│       ├── register/   # Register page
│       └── dashboard/  # Main app
│
└── README.md           # Full documentation
```

## Next Steps

1. Customize the UI in `web/src/app/dashboard/dashboard.module.css`
2. Add more features (weight tracking, workout templates, etc.)
3. Deploy to Vercel (frontend) and Heroku/Railway (backend)
4. Set up environment variables in production

## Getting Help

- Check the main [README.md](README.md) for full API documentation
- Review the database schema: `server/prisma/schema.prisma`
- Enable Prisma Studio: `cd server && npm run prisma studio`

Happy training! 💪
