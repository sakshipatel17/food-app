# Noir Table - Vercel Deployment Guide

This guide explains how to deploy the Noir Table MEAN stack application to Vercel.

## Prerequisites

- MongoDB Atlas account (free tier works)
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js installed locally

## Project Structure

```
food-app-main/
├── backend/          # Node.js/Express API
├── frontend/         # Angular frontend
├── vercel.json       # Vercel configuration
└── DEPLOYMENT.md     # This file
```

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Whitelist IP addresses (use 0.0.0.0/0 for Vercel)
6. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/food-app`

## Step 2: Configure Environment Variables

### Backend Environment Variables

Set these in Vercel Project Settings → Environment Variables:

- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT token verification
- `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
- `PORT`: `3000` (Vercel will override this, but keep for local dev)

### Frontend Environment Variables

The frontend uses Angular environment files:
- Development: `frontend/src/environments/environment.ts` → `http://localhost:3000`
- Production: `frontend/src/environments/environment.prod.ts` → `/api`

## Step 3: Push to Git Repository

1. Initialize git if not already done:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub/GitLab/Bitbucket:
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel
```

4. Follow the prompts:
   - Set project name
   - Link to existing Git repository
   - Add environment variables
   - Confirm build settings

5. Deploy to production:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (handled by vercel.json)
   - **Output Directory**: (handled by vercel.json)

5. Add environment variables in Settings → Environment Variables

6. Click "Deploy"

## Step 5: Verify Deployment

1. Check the deployment logs in Vercel Dashboard
2. Test the frontend URL
3. Test API endpoints: `https://your-app.vercel.app/api/all-products`
4. Test user registration and login
5. Test checkout with both COD and Card payment methods

## Environment Variables Reference

### Required for Backend

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/food-app` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secure-random-string-here` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |
| `PORT` | Server port | `3000` |

### Frontend Configuration

The frontend automatically switches API URLs based on environment:
- **Development**: Uses `http://localhost:3000` (local backend)
- **Production**: Uses `/api` (proxied to backend by Vercel)

## Troubleshooting

### MongoDB Connection Issues

- Ensure IP whitelist includes `0.0.0.0/0`
- Verify username/password are correct
- Check cluster is in the same region as Vercel deployment

### CORS Errors

- Verify `FRONTEND_URL` environment variable matches your Vercel domain
- Check backend CORS configuration in `backend/index.js`

### Build Failures

- Check Vercel deployment logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (backend uses Node.js 18+)

### API 404 Errors

- Verify vercel.json routes are configured correctly
- Check that backend build is successful
- Ensure API routes match frontend calls

## Local Development

To run locally after deployment configuration:

1. Backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your local MongoDB URI
node index.js
```

2. Frontend:
```bash
cd frontend
npm install
ng serve
```

## Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Environment variables are set in Vercel
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] User registration/login works
- [ ] Cart functionality works
- [ ] Checkout (COD) works
- [ ] Checkout (Card) works
- [ ] Newsletter subscription works
- [ ] Animations load correctly

## Support

For issues with:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **MongoDB Atlas**: Check [MongoDB Documentation](https://docs.mongodb.com/atlas)
- **Angular**: Check [Angular Documentation](https://angular.io/docs)
