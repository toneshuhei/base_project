#!/bin/bash

# Base Project - Start Script
echo "🚀 Starting Base Project..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running"
    exit 1
fi

echo "✅ Docker is running"

# Start all services
echo "📦 Starting all services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "🔍 Checking service status..."

# Check PostgreSQL
if docker-compose exec -T postgres pg_isready -U postgres &> /dev/null; then
    echo "✅ PostgreSQL is ready"
else
    echo "❌ PostgreSQL is not ready"
fi

# Check FastAPI
if curl -s http://localhost:8000/api/hello &> /dev/null; then
    echo "✅ FastAPI is ready"
else
    echo "❌ FastAPI is not ready"
fi

# Check Django
if curl -s http://localhost:8001/admin/ &> /dev/null; then
    echo "✅ Django is ready"
else
    echo "❌ Django is not ready"
fi

# Check Frontend
if curl -s http://localhost:3000 &> /dev/null; then
    echo "✅ Frontend is ready"
else
    echo "❌ Frontend is not ready"
fi

echo ""
echo "🎉 Base Project is now running!"
echo ""
echo "📱 Services:"
echo "   Frontend:    http://localhost:3000"
echo "   FastAPI:     http://localhost:8000/docs"
echo "   Django:      http://localhost:8001/admin"
echo ""
echo "📊 View logs with: docker-compose logs -f [service]"
echo "🛑 Stop with: docker-compose down"