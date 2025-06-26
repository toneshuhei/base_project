#!/bin/bash

# Base Project - Reset Script
echo "🔄 Resetting Base Project..."

read -p "⚠️  This will remove all data. Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Reset cancelled"
    exit 1
fi

# Stop and remove all containers and volumes
echo "🗑️  Removing containers and volumes..."
docker-compose down -v

# Remove images
echo "🗑️  Removing images..."
docker-compose down --rmi all

# Clean up
echo "🧹 Cleaning up..."
docker system prune -f

echo "✅ Reset complete!"
echo ""
echo "🚀 Start fresh with: ./scripts/start.sh"