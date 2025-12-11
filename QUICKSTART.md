# Quick Start Guide

Get LinkBoost VIP up and running in 10 minutes!

## What You'll Need

- Node.js 18 or higher
- A Supabase account (free)
- 10 minutes of your time

## Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

## Step 2: Set Up Supabase (3 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project (choose a name and password)
4. Wait 2-3 minutes for database to provision

## Step 3: Get Your API Keys (1 minute)

1. In Supabase dashboard, go to Settings > API
2. Copy these two values:
   - Project URL
   - anon/public key

## Step 4: Configure Environment (1 minute)

Create a file named `.env` in the project root:

```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
VITE_APP_URL=http://localhost:5173
```

## Step 5: Run the App (1 minute)

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Step 6: Create Your Account (2 minutes)

1. Click "Get Started Free" or "Sign Up"
2. Enter your details
3. Create your account
4. You're in!

## Making Yourself Admin (Optional)

To access the admin panel:

1. After signing up, go to Supabase Dashboard
2. Click on "Table Editor" in the sidebar
3. Open the `user_profiles` table
4. Find your user (by email)
5. Change the `role` column from `user` to `admin`
6. Refresh the app

Now you'll see "Admin Panel" in your dashboard sidebar!

## Your First Short Link

1. Click "Create Link" in the dashboard
2. Paste a long URL
3. Click "Create Short Link"
4. Copy and share your short link!

## What's Next?

- Explore the Analytics dashboard
- Create QR codes for your links
- Set up password protection
- Try link expiration
- Build a bio page
- Check out the admin panel

## Need Help?

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment instructions
- Review Supabase docs at [supabase.com/docs](https://supabase.com/docs)

## Pro Tips

1. **Custom Short Codes**: Click "Generate" to get a random code, or type your own
2. **Analytics**: Every click is tracked automatically
3. **QR Codes**: Click the QR icon on any link to download
4. **Bulk Creation**: Create multiple links quickly from the dashboard
5. **Admin Mode**: As admin, you can see all users and links in the system

## Common Issues

### "Missing Supabase environment variables"
- Make sure your `.env` file exists
- Verify the variable names start with `VITE_`
- Restart the dev server after creating `.env`

### Database Tables Don't Exist
- The migrations should create tables automatically
- Check Supabase Dashboard > Table Editor to verify

### Can't Log In
- Check your email/password
- Make sure email confirmation is disabled in Supabase (it is by default)

## Feature Checklist

Once you're set up, try these features:

- [ ] Create a short link
- [ ] View analytics
- [ ] Generate a QR code
- [ ] Set a password on a link
- [ ] Set an expiration date
- [ ] Create your first bio page
- [ ] Access admin panel (if admin)
- [ ] Invite a team member

## Next Steps for Production

When you're ready to deploy:

1. Read `DEPLOYMENT.md`
2. Choose a hosting platform (Vercel recommended)
3. Set up your production environment variables
4. Deploy!

## That's It!

You now have a fully functional URL shortener with analytics, QR codes, and more. Start shortening links and tracking your success!

Happy link shortening! 🚀
