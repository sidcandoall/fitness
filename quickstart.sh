#!/bin/bash

# Fitness Tracker - Quick Start Script
# This script sets up and runs the entire Fitness Tracker application

set -e

echo "🏋️ Fitness Tracker - Quick Start"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo -e "${GREEN}✓ Node.js detected${NC}"

# Backend setup
echo ""
echo -e "${YELLOW}Setting up Backend...${NC}"
cd server

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
DATABASE_URL="postgresql://user:password@localhost:5432/fitness"
JWT_SECRET="your_super_secret_jwt_key_change_this_in_production"
PORT=5001
EOF
    echo "⚠️  Please update the DATABASE_URL in server/.env with your PostgreSQL credentials"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

echo -e "${GREEN}✓ Backend ready${NC}"

# Frontend setup
echo ""
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd ../web

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo -e "${GREEN}✓ Frontend ready${NC}"

echo ""
echo -e "${GREEN}=================================="
echo "✓ Setup Complete!"
echo "==================================${NC}"
echo ""
echo "To start the application:"
echo ""
echo "1. Terminal 1 - Start the Backend:"
echo "   cd server && npm run dev"
echo ""
echo "2. Terminal 2 - Start the Frontend:"
echo "   cd web && npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Test credentials (after registration):"
echo "Email: test@example.com"
echo "Password: test123"
