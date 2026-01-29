# Fitness Tracker - Quick Reference

## 🚀 Start Your Fitness Tracker (30 seconds)

### Prerequisites Checklist
- ✅ Node.js installed (`node --version`)
- ✅ PostgreSQL running and accessible
- ✅ Database created: `fitness`

### Three Simple Commands

```bash
# Terminal 1: Start Backend
cd server && npm install && npm run dev

# Terminal 2: Start Frontend  
cd web && npm install && npm run dev

# Then open: http://localhost:3000
```

## 📋 Setup Checklist

### 1️⃣ Database Setup (5 minutes)

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE fitness;"

# Create server/.env file with:
DATABASE_URL="postgresql://postgres@localhost:5432/fitness"
JWT_SECRET="your_secret_key_here"
PORT=5001
```

### 2️⃣ Backend Setup (3 minutes)

```bash
cd server
npm install
npm run prisma migrate dev --name init
npm run dev
```

**Expected output:** `Server running on port 5001`

### 3️⃣ Frontend Setup (3 minutes)

```bash
cd web
npm install
npm run dev
```

**Expected output:** `Local: http://localhost:3000`

## 💻 Key Commands

### Backend (from `server/` folder)

```bash
npm run dev              # Development mode (auto-reload)
npm start                # Production mode
npm run prisma studio    # Open database GUI
npm run prisma migrate dev --name <name>  # Create migration
```

### Frontend (from `web/` folder)

```bash
npm run dev              # Development server
npm run build            # Build for production
npm run start            # Start production build
npm run lint             # Check code quality
```

## 🎯 How to Use the App

1. **Register** → Create account with email/password
2. **Login** → Enter credentials
3. **Dashboard** → See all your workouts
4. **New Workout** → Click button to create today's workout
5. **Add Exercise** → Name an exercise (e.g., "Bench Press")
6. **Log Set** → Enter reps and weight, click "Add Set"
7. **Repeat** → Add more exercises/sets to same workout
8. **View Later** → All workouts saved and displayed on dashboard

## 🔧 Common Tasks

### Change Backend Port

Edit `server/.env`:
```bash
PORT=5002
```

Then restart backend.

### Change Frontend Port

```bash
cd web
npm run dev -- -p 3001
```

### Reset Database

```bash
cd server
npm run prisma migrate reset
npm run prisma migrate dev --name init
```

### View Database

```bash
cd server
npm run prisma studio
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check PostgreSQL is running, verify DATABASE_URL in `.env` |
| Frontend won't start | Verify port 3000 is free, check Node.js version |
| Can't login | Make sure backend is running on port 5001 |
| Database errors | Run `npm run prisma migrate reset` then restart |
| Port already in use | Change PORT in `.env` or kill the process |

## 📁 File Locations

```
fitness/
├── server/
│   ├── .env                    ← Update with your DB credentials
│   ├── app.js                  ← Entry point
│   ├── controllers/            ← Business logic
│   ├── routes/                 ← API endpoints
│   └── prisma/
│       └── schema.prisma       ← Database schema
│
└── web/
    ├── src/app/
    │   ├── login/              ← Login page
    │   ├── register/           ← Register page
    │   ├── dashboard/          ← Main app
    │   └── api/                ← Backend proxy routes
    └── package.json
```

## 🌐 API Endpoints

All endpoints require JWT token in header: `Authorization: Bearer <token>`

### Authentication
```
POST /auth/register
POST /auth/login
```

### Workouts
```
GET    /api/workouts          → Get all workouts
POST   /api/workouts          → Create new workout
GET    /api/workouts/:id      → Get specific workout
DELETE /api/workouts/:id      → Delete workout
```

### Exercises
```
POST /exercises               → Add exercise
GET  /exercises?workoutId=id  → Get workout exercises
```

### Sets
```
POST   /sets                  → Add set (reps + weight)
DELETE /sets/:id              → Delete set
```

## 🔐 Security Notes

- 🔒 Passwords are hashed with bcrypt
- 🔑 JWT tokens expire after 7 days
- 🌐 CORS configured to allow only localhost:3000
- ⚠️  Never commit `.env` files to version control

## 📚 Documentation Files

- **[README.md](README.md)** - Full project documentation
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Detailed setup guide
- **[ENV_SETUP.md](ENV_SETUP.md)** - Environment configuration
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What's been built

## 🎓 Learning Resources

Each part of the codebase demonstrates important patterns:

- **Authentication**: `server/middleware/auth.middleware.js`
- **Database**: `server/prisma/schema.prisma`
- **API Design**: `server/routes/` and `server/controllers/`
- **React Hooks**: `web/src/app/dashboard/page.js`
- **CSS Modules**: `web/src/app/dashboard/dashboard.module.css`

## ✅ Development Checklist

- [ ] PostgreSQL running
- [ ] Database created
- [ ] `.env` file configured
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Migrations applied
- [ ] Backend running on 5001
- [ ] Frontend running on 3000
- [ ] Can register and login
- [ ] Can create workouts

## 🎉 You're All Set!

Your fitness tracking website is ready to use and develop!

**Next steps:**
1. Register a user account
2. Create a workout
3. Add some exercises
4. Log some sets
5. Explore the code and customize!

Questions? Check the documentation files or review the code comments.

Happy tracking! 💪
