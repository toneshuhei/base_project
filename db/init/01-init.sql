-- Base Project Database Initialization Script

-- Create basic user table for demonstration
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE,
    date_joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create sample data
INSERT INTO users (username, email, first_name, last_name, is_staff) VALUES
    ('admin', 'admin@example.com', 'Admin', 'User', TRUE),
    ('demo', 'demo@example.com', 'Demo', 'User', FALSE)
ON CONFLICT (username) DO NOTHING;

-- Create a simple posts table for API demonstration
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample posts
INSERT INTO posts (title, content, author_id) VALUES
    ('Welcome to Base Project', 'This is a sample post to demonstrate the API functionality.', 1),
    ('Getting Started', 'Follow the README instructions to set up your development environment.', 1)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at);