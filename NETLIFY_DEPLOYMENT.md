# Netlify Frontend Deployment Guide

## Prerequisites
- GitHub account
- Netlify account (free): https://app.netlify.com/signup

## Step 1: Push Code to GitHub

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name: `shophub-ecommerce`
   - Make it Public or Private
   - Click "Create repository"

2. **Push Your Code**
   ```bash
   cd c:\Users\SCHOOL\Desktop\Self_Learning_React\tutorial003-react
   git init
   git add .
   git commit -m "Initial commit: E-commerce platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shophub-ecommerce.git
   git push -u origin main
   ```

## Step 2: Deploy to Netlify

1. **Login to Netlify**
   - Go to https://app.netlify.com
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access GitHub
   - Select your `shophub-ecommerce` repository

3. **Configure Build Settings**
   - **Base directory:** Leave empty
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Show advanced" → "New variable"

4. **Add Environment Variables**
   Click "Add environment variable" for each:
   
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_STRIPE_PUBLISHABLE_KEY = pk_test_your_stripe_key
   ```
   
   **Note:** We'll update VITE_API_URL after deploying backend

5. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes for build
   - Your site will be live at: `https://random-name-123.netlify.app`

## Step 3: Custom Domain (Optional)

1. Click "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `shophub.com`)
4. Follow DNS configuration instructions
5. SSL certificate auto-generates (free)

## Step 4: Update Backend URL

After deploying backend (next guide):

1. Go to Netlify dashboard
2. Click "Site settings" → "Environment variables"
3. Edit `VITE_API_URL`
4. Change to your AWS backend URL
5. Click "Save"
6. Go to "Deploys" → "Trigger deploy" → "Clear cache and deploy"

## Continuous Deployment

Every time you push to GitHub:
- Netlify automatically rebuilds
- Changes go live in 2-3 minutes
- No manual deployment needed!

## Troubleshooting

### Build fails
- Check build logs in Netlify dashboard
- Ensure all dependencies in package.json
- Test `npm run build` locally first

### Blank page after deploy
- Check browser console for errors
- Verify environment variables are set
- Check VITE_API_URL is correct

### 404 on page refresh
- Ensure `netlify.toml` file exists
- Check redirects configuration

## Cost
- **Free tier:** 100GB bandwidth/month
- Perfect for portfolio projects!
- Upgrade only if you get lots of traffic

## Your Netlify Site Info

After deployment, save these:
- **Site URL:** `https://your-site.netlify.app`
- **Deploy status:** Check in dashboard
- **Build logs:** Available in "Deploys" tab

## Next Steps

1. Deploy backend to AWS (see AWS_DEPLOYMENT.md)
2. Update VITE_API_URL with backend URL
3. Test the live site
4. Share your portfolio project!
