# Deployment Guide

This guide provides detailed instructions for deploying LinkBoost VIP to production.

## Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] At least one admin user created
- [ ] App tested locally
- [ ] Production URL determined

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers the best experience for React + Vite applications with zero configuration.

#### Steps:

1. **Prepare Your Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite

3. **Configure Environment Variables**

   In Vercel dashboard, add these environment variables:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

5. **Set Up Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 2: Netlify

Great alternative to Vercel with similar features.

#### Steps:

1. **Prepare Repository** (same as Vercel)

2. **Create New Site**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add the same variables as Vercel

5. **Configure Redirects**

   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

6. **Deploy**
   - Click "Deploy site"
   - Wait for build
   - Your app is live!

### Option 3: Static Hosting (Hostinger, cPanel, etc.)

For traditional web hosting services.

#### Steps:

1. **Build the Project Locally**
   ```bash
   npm run build
   ```

2. **Configure Production Environment**

   Update `.env` before building:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_APP_URL=https://yourdomain.com
   ```

3. **Upload Files**
   - Connect via FTP/SFTP
   - Upload all files from `dist/` folder to `public_html/` (or your web root)

4. **Configure Web Server**

   Create `.htaccess` in your web root:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

5. **Enable HTTPS**
   - Most hosts provide free SSL through Let's Encrypt
   - Enable it in your hosting control panel

## Post-Deployment Steps

### 1. Create Admin User

After deploying, you need to create an admin user:

1. Go to your app and sign up with a new account
2. Open Supabase dashboard
3. Go to Table Editor > user_profiles
4. Find your user record
5. Change `role` from `user` to `admin`
6. Log out and log back in to see admin features

### 2. Configure Supabase Auth Settings

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your production URL to "Site URL"
3. Add your production URL to "Redirect URLs"

### 3. Test All Features

- [ ] User registration works
- [ ] Login works
- [ ] Create short links
- [ ] Links redirect properly
- [ ] Analytics tracking works
- [ ] QR codes generate correctly
- [ ] Admin panel accessible

### 4. Set Up Custom Domain (Optional)

#### For Vercel/Netlify:
- Use their dashboard to add custom domain
- Update DNS records as instructed

#### For Traditional Hosting:
- Point your domain's A record to server IP
- Configure SSL certificate

### 5. Enable Email (Optional)

By default, Supabase Auth doesn't require email confirmation. To enable:

1. Go to Supabase Dashboard > Authentication > Settings
2. Enable "Enable email confirmations"
3. Configure SMTP settings (or use Supabase's default)

## Environment Configuration

### Development
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_APP_URL=http://localhost:5173
```

### Production
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_APP_URL=https://yourdomain.com
```

## Continuous Deployment

### Vercel/Netlify Auto-Deploy

Both platforms automatically deploy when you push to your repository:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

The app will automatically rebuild and redeploy.

### Manual Deployment (Static Hosting)

For manual deployments:

1. Make your changes
2. Build the project:
   ```bash
   npm run build
   ```
3. Upload the `dist/` folder contents via FTP
4. Clear browser cache

## Performance Optimization

### 1. Enable Caching

Add to your `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 2. Enable Compression

Add to your `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

## Monitoring

### Supabase Dashboard

Monitor your app through Supabase:
- Database size and usage
- API requests
- Authentication events
- Error logs

### Vercel/Netlify Analytics

Enable built-in analytics:
- Page views
- Performance metrics
- Error tracking

## Backup

### Database Backup

Supabase automatically backs up your database, but you can also:

1. Go to Supabase Dashboard > Database > Backups
2. Create manual backup
3. Download backup file

### Code Backup

Your code should always be in Git:
```bash
git push origin main
```

## Troubleshooting

### Build Fails

1. Check Node.js version (need 18+)
2. Clear cache: `rm -rf node_modules package-lock.json`
3. Reinstall: `npm install`
4. Try building: `npm run build`

### Links Don't Work After Deploy

1. Verify `.htaccess` or redirect rules are set up
2. Check that all files from `dist/` were uploaded
3. Clear browser cache

### Environment Variables Not Working

1. Ensure they start with `VITE_`
2. Rebuild after changing environment variables
3. Check they're set in hosting platform dashboard

### 404 Errors on Refresh

This means routing isn't configured properly:
- For Vercel/Netlify: Should work automatically
- For static hosting: Check `.htaccess` file

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables not exposed
- [ ] RLS policies enabled in Supabase
- [ ] API keys are anon keys (not service role)
- [ ] Email confirmation enabled (optional)
- [ ] Strong passwords enforced
- [ ] Admin accounts secured

## Scaling

As your app grows:

1. **Database**: Upgrade Supabase plan for more storage/requests
2. **Hosting**: Vercel/Netlify auto-scale
3. **CDN**: Both platforms include CDN
4. **Caching**: Implement Redis if needed

## Support

If you encounter issues:

1. Check error logs in hosting platform
2. Check Supabase logs
3. Review this guide
4. Check GitHub issues

## Next Steps

After deployment:

1. Set up monitoring and alerts
2. Configure custom domain
3. Set up email service
4. Add custom branding
5. Enable advanced features
6. Invite team members

Congratulations! Your LinkBoost VIP app is now live!
