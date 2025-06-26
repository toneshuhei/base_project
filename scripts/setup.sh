#!/bin/bash

# Base Project - Setup Script
echo "🔧 Setting up Base Project..."

# Make scripts executable
chmod +x scripts/*.sh

echo "✅ Scripts are now executable"

# Create Django superuser script
echo "📝 Creating Django superuser setup..."

cat > scripts/create-superuser.sh << 'EOF'
#!/bin/bash
echo "👤 Creating Django superuser..."
docker-compose exec django python manage.py createsuperuser
EOF

chmod +x scripts/create-superuser.sh

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Run: ./scripts/start.sh"
echo "   2. Create superuser: ./scripts/create-superuser.sh"
echo "   3. Access: http://localhost:3000"