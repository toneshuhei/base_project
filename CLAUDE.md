# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **base project template** for fullstack web applications designed to accelerate development of new projects. The project follows a multi-service architecture with separate frontend, multiple backend services, and containerized deployment.

## Architecture

The project uses a **microservices-like approach** with clear service separation:

- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **API Backend**: FastAPI for all external REST APIs and OpenAPI documentation
- **Admin Backend**: Django for admin interface and internal business logic
- **Database**: PostgreSQL 15+
- **Development**: Docker Compose for unified development environment

### Service Responsibilities

**FastAPI** handles:
- All external REST API endpoints
- OpenAPI documentation at `/docs` and `/redoc`
- API schema management with Pydantic
- External system integrations

**Django** handles:
- Admin panel at `/admin`
- Internal business logic and workflows
- ORM data modeling
- Background tasks and internal processing

## Development Commands

```bash
# Start all services
docker-compose up

# Start with rebuild
docker-compose up --build

# Stop all services
docker-compose down

# View logs for specific service
docker-compose logs frontend
docker-compose logs fastapi
docker-compose logs django
docker-compose logs postgres

# Run database migrations (Django)
docker-compose exec django python manage.py migrate

# Create Django superuser
docker-compose exec django python manage.py createsuperuser

# Access FastAPI interactive docs
# Navigate to http://localhost:8000/docs

# Access Django admin
# Navigate to http://localhost:8001/admin
```

## Project Structure

```
base_project/
├── frontend/                 # Next.js application
│   ├── src/app/             # App Router pages
│   ├── src/components/      # Reusable React components
│   └── src/lib/             # Utilities and API clients
├── backend/
│   ├── fastapi/             # FastAPI service
│   │   ├── app/api/         # API route handlers
│   │   ├── app/models/      # Pydantic models
│   │   └── app/main.py      # FastAPI application entry
│   └── django/              # Django service
│       ├── core/            # Django project settings
│       ├── apps/            # Django applications
│       └── manage.py        # Django management commands
├── db/init/                 # Database initialization scripts
├── docker/                  # Docker configuration files
└── docs/                    # Project documentation
```

## Key Development Principles

### Service Communication
- Frontend communicates with FastAPI for all data operations
- Django admin is used for content management and internal operations
- Services are loosely coupled through well-defined APIs

### API-First Development
- All external APIs are implemented in FastAPI
- OpenAPI schema is automatically generated and maintained
- Use Pydantic models for request/response validation

### Database Strategy
- Single PostgreSQL database shared between Django and FastAPI
- Django manages ORM models and migrations
- FastAPI uses SQLAlchemy or direct SQL for API operations

### Development Workflow
1. Start with `docker-compose up` for unified environment
2. Frontend development on http://localhost:3000
3. API testing via http://localhost:8000/docs
4. Admin operations via http://localhost:8001/admin
5. All services support hot reloading during development

## Technology Stack Specifics

**Frontend (Next.js)**:
- App Router for file-based routing
- TypeScript for type safety
- Tailwind CSS for styling
- API client utilities in `src/lib/`

**API Backend (FastAPI)**:
- Pydantic v2 for data models
- Uvicorn ASGI server
- OpenAPI 3.0 documentation
- Python 3.11+ async/await patterns

**Admin Backend (Django)**:
- Django 4.2+ with modern features
- Django Admin for content management
- Django ORM for database operations
- Django REST Framework for internal APIs if needed

**Database (PostgreSQL)**:
- JSON field support for flexible data
- Full-text search capabilities
- Connection pooling for performance

## Performance and Startup
- Target startup time: Under 5 minutes
- Memory usage target: Under 4GB
- Optimized for development workflow efficiency
- Hot reloading enabled for all services

## Extension Points

This base project is designed for easy extension:
- Add new FastAPI routes in `backend/fastapi/app/api/`
- Create new Django apps in `backend/django/apps/`
- Add React components in `frontend/src/components/`
- Extend database schema through Django migrations
- Add new services to `docker-compose.yml`

## Common Patterns

**Adding a new API endpoint**:
1. Create Pydantic models in `backend/fastapi/app/models/`
2. Implement route handler in `backend/fastapi/app/api/`
3. Test via automatically generated `/docs` interface

**Adding admin functionality**:
1. Define Django models in appropriate app
2. Register models in Django admin
3. Create and run migrations
4. Access functionality via `/admin` interface

**Frontend-API integration**:
1. Create API client functions in `frontend/src/lib/`
2. Use in React components with proper error handling
3. Implement loading states and user feedback