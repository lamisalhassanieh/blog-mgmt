# Blog Management System

A full-stack blog management system built with WordPress REST API and Next.js (Typescript). 

## Features

- Decoupled Architecture (WordPress + Next.js)
- JWT Authentication
- Role-based Access Control
- Responsive Design
- View a list of blog posts.
- Add a new blog post.
- Edit an existing blog post.
- Delete a blog post.
- Display posts on the homepage.

## Prerequisites

- Node.js (v18 or higher)
- WAMP/XAMPP Server
- PHP 8.0 or higher
- WordPress 6.0 or higher

## Installation

### WordPress Setup

1. Install WAMP/XAMPP and start the server
2. Navigate to WordPress directory:

example:
cd c:\wamp64\www\blog-mgmt\wordpress

3. Install WordPress core files and configure:

# Create wp-config.php
cp wp-config-sample.php wp-config.php
# Edit database settings in wp-config.php
(in my case the database is called: blog_mgmt_db, added in root of wordpress)

4. Install required plugins:
- ACF 
- JWT Authentication for WP-API

5. Configure WordPress:
- Enabled Pretty Permalinks (Settings → Permalinks → Post Name)
- Created Blog Post custom post type
- Set up ACF fields
- Configured JWT Authentication

### Next.js Setup (Typescript)

1. Navigate to Next.js directory:
```bash
cd c:\wamp64\www\blog-mgmt\nextjs
```

2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:

cp .env.example .env.local
# Edit .env.local with your WordPress URL and JWT secret
my env consiste of: 
NEXT_PUBLIC_WORDPRESS_REST_API_URL = http://localhost/blog-mgmt/wordpress/wp-json/
NEXTAUTH_SECRET = K8Xy74L4F2bPZ3Qz0V6m9WJNsYd5R1oMCFvA8T3pWgU=


## Running the Project

1. Start WordPress:
- Ensure WAMP/XAMPP is running
- Access WordPress admin at `http://localhost/blog-mgmt/wordpress/wp-admin`
my credentials:
username: lamis
password: d,SekrM@q6R$B-t

2. Start Next.js development server:
```bash
cd nextjs
npm run dev
```

3. Access the application:
- Frontend: `http://localhost:3000`
- API: `http://localhost/blog-mgmt/wordpress/wp-json`

## Project Structure

```
blog-mgmt/
├── wordpress/                # WordPress installation
│   ├── wp-content/
│   │   ├── themes/
│   │   │   └── blog-mgmt/   # Custom theme with REST API endpoints
│   │   └── plugins/         # Required plugins
│   └── wp-config.php        # WordPress configuration
└── nextjs/                  # Next.js frontend
    ├── src/
    │   ├── app/            # Next.js 13+ App Router
    │   ├── components/     # React components
    │   ├── context/       # React context providers
    │   └── shared/        # Shared utilities
    └── public/            # Static assets
```

## Technical Decisions

1. **Decoupled Architecture**
   - WordPress as headless CMS for content management
   - Next.js for modern frontend experience

2. **Authentication**
   - JWT-based authentication for secure API access
   - Role-based access control for different user types (precisely on delete)

3. **Data Management**
   - Custom post types for structured content
   - ACF for extended field support
   - REST API customization for optimized data transfer

4. **Frontend**
   - Bootstrap for responsive design
   - Client-side state management 
   - next auth for authentication
   - formik for form handling and yup for validation

## Security Considerations

- JWT token validation
- CORS configuration
- Input sanitization
- Role-based permissions
- Secure file upload handling


