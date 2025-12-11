# LinkBoost VIP - Professional URL Shortener

A complete, production-ready URL shortener and link management platform with advanced analytics, bio pages, multi-link pages, and landing page hosting.

## Features

- **URL Shortening**: Create short, memorable links with custom codes
- **Advanced Analytics**: Track clicks, countries, devices, and browsers in real-time
- **Password Protection**: Secure links with password protection
- **Link Expiration**: Set expiration dates for temporary links
- **QR Codes**: Generate QR codes for any shortened link
- **Bio Pages**: Create beautiful bio pages for social media (coming soon)
- **Multi-Link Pages**: Organize multiple links in one page (coming soon)
- **Landing Page Hosting**: Host custom HTML landing pages (coming soon)
- **Admin Dashboard**: Comprehensive admin panel for system management
- **User Management**: Full user authentication and profile management

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Icons**: Lucide React
- **Deployment**: Vercel, Netlify, or any static hosting

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account (free tier works great)
- Git installed

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd linkboost-vip
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your database to be provisioned
3. Go to Project Settings > API
4. Copy your Project URL and anon/public API key

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
```

Replace the values with your Supabase credentials.

### 5. Set Up the Database

The database schema has already been created through migrations. Your Supabase database includes:

- `user_profiles` - User information and roles
- `links` - Shortened links
- `link_redirects` - Country and device-based redirects
- `clicks` - Click tracking and analytics
- `bio_pages` - Bio page configurations
- `landing_pages` - Landing page content
- `multi_link_pages` - Multi-link page configurations
- `admin_settings` - System settings

All tables have Row Level Security (RLS) enabled for data protection.

### 6. Run the Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

### 7. Create Your First Admin User

1. Sign up through the app at `/signup`
2. Go to your Supabase Dashboard > Table Editor > user_profiles
3. Find your user and change the `role` field from `user` to `admin`
4. Refresh the app and you'll see the Admin Panel in your dashboard

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add your environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_URL` (your production URL)
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and create a new site from Git
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Deploy to Static Hosting (Hostinger, etc.)

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains your production files

3. Upload the contents of the `dist` folder to your hosting server

4. Configure your web server to:
   - Serve `index.html` for all routes (for client-side routing)
   - Enable HTTPS

5. Update your `.env` file with the production URL before building

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_APP_URL` | Your app's URL (for QR codes and links) | Yes |

## Project Structure

```
linkboost-vip/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Input, Card, etc.)
│   │   ├── Router.tsx     # Client-side routing
│   │   ├── DashboardLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/               # Utilities and services
│   │   ├── supabase.ts   # Supabase client
│   │   ├── auth.ts       # Auth service
│   │   ├── linkService.ts # Link management
│   │   └── utils.ts      # Helper functions
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page
│   │   ├── Pricing.tsx   # Pricing page
│   │   ├── Login.tsx     # Login page
│   │   ├── Signup.tsx    # Signup page
│   │   ├── dashboard/    # Dashboard pages
│   │   └── admin/        # Admin pages
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── .env                  # Environment variables (create this)
└── package.json          # Dependencies
```

## Usage

### Creating Short Links

1. Log in to your dashboard
2. Click "Create Link"
3. Enter your destination URL
4. Optionally customize:
   - Custom short code
   - Title
   - Password protection
   - Expiration date
5. Click "Create Short Link"

### Viewing Analytics

1. Go to Dashboard > Analytics
2. View global statistics:
   - Total clicks
   - Total links
   - Countries
   - Devices
3. Click on any link to view detailed analytics

### Admin Features

Admins can:
- View system-wide statistics
- Manage all users
- Manage all links
- Configure system settings

## Security

- All data is protected with Row Level Security (RLS)
- Passwords are hashed using Supabase Auth
- API keys are never exposed to the client
- HTTPS is required for production

## Database Schema

### Tables

- **user_profiles**: User data and roles
- **links**: URL shortening data
- **clicks**: Analytics and tracking
- **bio_pages**: Bio page configurations
- **landing_pages**: Landing page content
- **multi_link_pages**: Multi-link configurations

All tables have proper indexes and RLS policies.

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Issues

If tables don't exist:
1. Check Supabase dashboard > Table Editor
2. Verify migrations were applied successfully
3. Check for error logs in Supabase dashboard

### Authentication Issues

1. Verify your Supabase URL and API key are correct
2. Check that email confirmation is disabled in Supabase Auth settings
3. Clear browser cache and cookies

## Support

For issues and questions:
- Check the documentation
- Review Supabase docs at [supabase.com/docs](https://supabase.com/docs)
- Contact support

## License

This project is proprietary software. All rights reserved.

## Credits

Built with:
- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Lucide Icons
