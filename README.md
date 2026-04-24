# Blog Website

A responsive blog website built with Next.js App Router and Supabase authentication.

## Features

- **Authentication**: Login/Signup with Supabase and localStorage persistence
- **Protected Routes**: Blogs and FAQ pages require authentication
- **Blog Management**: View all blogs and individual blog posts
- **FAQ Section**: Accordion-style FAQ with support form
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Password Security**: bcryptjs for password hashing

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to the SQL Editor
4. Run the following SQL to create the required tables:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES users(id),
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create support_messages table
CREATE TABLE support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pages

- `/` - Home page
- `/auth` - Login/Signup page
- `/blogs` - Blog listing (protected)
- `/blogs/[slug]` - Individual blog post (protected)
- `/faq` - FAQ page with support form (protected)

## API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/[slug]` - Get individual blog by slug
- `GET /api/faq` - Get all FAQs
- `POST /api/support` - Submit support message

## Authentication Flow

1. Users can sign up or log in on the `/auth` page
2. Successful authentication saves user data to localStorage
3. Protected routes check for authentication and redirect to `/auth` if needed
4. Logout clears localStorage and redirects to home

## Technologies Used

- **Next.js 16** - React framework with App Router
- **Supabase** - Backend as a Service for database and auth
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **bcryptjs** - Password hashing
