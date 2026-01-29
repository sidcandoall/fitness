# Environment Configuration Guide

## Backend Environment (.env)

Create a file `server/.env` with the following content:

```bash
# Database Configuration
# PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/fitness"

# JWT Configuration
# Use a long, random string for production
JWT_SECRET="your_super_secret_jwt_key_change_this_in_production_12345"

# Server Configuration
PORT=5001

# Optional: CORS Configuration
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### PostgreSQL Connection String Format

```
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
```

#### Examples:

**Local PostgreSQL with default user:**
```
postgresql://postgres@localhost:5432/fitness
```

**Local PostgreSQL with password:**
```
postgresql://postgres:mypassword@localhost:5432/fitness
```

**Local PostgreSQL with custom user:**
```
postgresql://myuser:mypassword@localhost:5432/fitness
```

**Remote PostgreSQL (like Railway or Heroku):**
```
postgresql://user:password@db.example.com:5432/fitness
```

## Creating PostgreSQL Database

### Using psql Command Line

```bash
# Connect to PostgreSQL (default user is 'postgres')
psql -U postgres

# Create the database
CREATE DATABASE fitness;

# Verify creation
\l

# Exit
\q
```

### Using PostgreSQL GUI (pgAdmin)

1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" → "Database"
4. Enter "fitness" as the database name
5. Click "Save"

### Using Docker (Optional)

```bash
# Run PostgreSQL in Docker
docker run --name postgres-fitness \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=fitness \
  -p 5432:5432 \
  -d postgres:latest

# Connection string:
# postgresql://postgres:mypassword@localhost:5432/fitness
```

## Frontend Environment (Optional)

Create a file `web/.env.local` (optional):

```bash
# API URL (only if backend runs on different port)
NEXT_PUBLIC_API_URL=http://localhost:5001

# Optional: Analytics, etc.
NEXT_PUBLIC_ENV=development
```

## Verifying Your Setup

### Test Backend Connection

After setting up `.env`, from `server` directory:

```bash
# Install Prisma CLI globally (optional)
npm install -g @prisma/cli

# Test database connection and run migrations
npm run prisma migrate dev --name init

# You should see migrations applied successfully
```

### Check Backend is Running

```bash
npm run dev

# Should output:
# Server running on port 5001
```

### Check Frontend Starts

From `web` directory:

```bash
npm run dev

# Should output:
# - Local: http://localhost:3000
```

## Production Deployment Notes

### Environment Variables for Production

When deploying to production (Vercel, Railway, Heroku), set:

**Backend (.env)**
```
DATABASE_URL=your_production_postgresql_url
JWT_SECRET=use_a_very_long_random_string_here
PORT=5001
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**Frontend (.env.production)**
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ENV=production
```

### Important Security Notes

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use strong JWT_SECRET** - At least 32 characters
3. **Use HttpOnly cookies** for JWT in production (not localStorage)
4. **Enable HTTPS** - Never send tokens over HTTP
5. **Update CORS_ORIGIN** - Only allow your frontend domain
6. **Use environment-specific secrets** - Different values per environment

## Troubleshooting Environment Issues

### "Cannot find module" error
- Make sure you've run `npm install` in both directories
- Check that `.env` file exists in `server/` directory

### "ECONNREFUSED" database error
- PostgreSQL is not running
- Check your DATABASE_URL in `.env`
- Verify database exists: `psql -U postgres -l`

### "Port 5001 already in use"
- Change PORT in `.env` to 5002 or another free port
- Or kill the process using that port

### CORS error in browser
- Verify `CORS_ORIGIN` matches your frontend URL
- Check backend is actually running on the correct port

### "Invalid JWT" error
- Make sure JWT_SECRET is the same on all instances
- Token might have expired (7-day expiry set)

## Quick Setup Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database "fitness" created
- [ ] `server/.env` file exists with DATABASE_URL
- [ ] `npm install` run in both `server/` and `web/` directories
- [ ] `npm run prisma migrate dev` executed successfully in `server/`
- [ ] Backend starts with `npm run dev` (shows "Server running on port 5001")
- [ ] Frontend starts with `npm run dev` (shows "Local: http://localhost:3000")
- [ ] Can navigate to http://localhost:3000 in browser
- [ ] Can register and login successfully

---

All set! You're ready to develop! 🚀
