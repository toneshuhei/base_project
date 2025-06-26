#!/bin/bash

# Base Project - Stop Script
echo "🛑 Stopping Base Project..."

# Stop all services
docker-compose down

echo "✅ All services stopped"
echo "💾 Data preserved in volumes"
echo ""
echo "🚀 Restart with: ./scripts/start.sh"