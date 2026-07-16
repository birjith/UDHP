# MERN Stack Deployment Guide - Vercel & Render

## Overview
- **Frontend**: React + Vite → Deployed on **Vercel**
- **Backend**: Express + Node.js → Deployed on **Render**
- **Database**: MongoDB Atlas

---

## Part 1: Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub/GitLab/Bitbucket account with repo access

### Step 1: Connect GitHub Repository to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"New Project"**
3. Select your GitHub repository (udhp-fullstack)
4. Click **"Import"**

### Step 2: Configure Project Settings in Vercel

1. **Framework Preset**: Select **Vite**
2. **Root Directory**: Leave **empty** or set to **`.`** (root directory)
3. **Build Command**: 
   ```
   cd client && npm run build
   ```
4. **Output Directory**: 
   ```
   client/dist
   ```
5. Click **"Deploy"**

### Step 3: Set Environment Variables in Vercel

After the first deploy, go to project settings:

1. Click **Settings** → **Environment Variables**
2. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://udhp.onrender.com/api` (your Render backend URL)
   - **Environments**: Production, Preview, Development
3. Click **"Save"**
4. Trigger a **"Redeploy"** from the Deployments tab

### Vercel URLs

- Frontend: `https://your-app.vercel.app`
- API calls go to: `https://udhp.onrender.com/api`

---

## Part 2: Backend Deployment (Render)

### Prerequisites
- Render account (https://render.com)
- MongoDB Atlas account with connection string

### Step 1: Deploy Backend Service

1. Go to https://dashboard.render.com
2. Click **"Create +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `udhp-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
5. Click **"Deploy"**

### Step 2: Set Environment Variables in Render

1. Go to your service → **Environment** tab
2. Add these environment variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-generate-a-random-string
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

**How to find values:**
- **MONGO_URI/MONGODB_URI**: From MongoDB Atlas connection string
- **JWT_SECRET**: Generate a random string (min 32 characters)
- **FRONTEND_URL**: Use your Vercel deployment URL

3. Click **"Save Changes"**

### Render Backend URL
- Your backend URL: `https://udhp.onrender.com`
- API endpoint: `https://udhp.onrender.com/api`

---

## Part 3: Environment Variables Summary

### Frontend (`.env.local` or Vercel Environment Variables)

```env
VITE_API_URL=https://udhp.onrender.com/api
```

**Why**: The React frontend needs to know where the backend API is located.

### Backend (`.env` or Render Environment Variables)

```env
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-a-random-secure-string>
FRONTEND_URL=https://your-app.vercel.app
```

**Why**:
- **MONGO_URI**: Connects to your MongoDB database
- **JWT_SECRET**: Signs and verifies authentication tokens
- **FRONTEND_URL**: CORS policy allows requests only from your Vercel frontend

---

## Part 4: CORS Configuration (Already Configured ✅)

Your backend (`server.js`) is already configured to accept requests from:
- `https://your-app.vercel.app` (Vercel deployment)
- `https://*.vercel.app` (any Vercel app via regex)
- Localhost for development
- Render backend domain

**No changes needed** — CORS is already properly configured.

---

## Part 5: React Router Configuration (Already Configured ✅)

Your frontend uses:
- **BrowserRouter** (correct for client-side routing)
- **Vite** build tool (optimized for SPAs)
- **Rewrite rules** in `vercel.json` to serve `index.html` for all routes

**How it works:**
1. When you visit `/doctor/dashboard`, Vercel serves `index.html`
2. React Router takes over and renders the correct page
3. No 404 errors occur on page refresh

**No changes needed** — Routing is properly configured.

---

## Part 6: API Communication (Already Configured ✅)

All frontend API calls use the **Axios instance** from `src/services/api.js`:

```javascript
const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
const api = axios.create({ baseURL: apiBaseUrl });
```

**How it works:**
1. Frontend reads `VITE_API_URL` environment variable
2. All API calls go through this instance
3. Automatically includes JWT token in request headers
4. No hardcoded localhost URLs

**No changes needed** — API communication is properly configured.

---

## Part 7: Testing & Troubleshooting

### Test Frontend Routes

After deployment to Vercel:

```
✅ Direct URL: https://your-app.vercel.app/doctor/dashboard
✅ Page Refresh: F5 or Ctrl+R
✅ Navigate Between Routes: Should not show 404
```

### Test Backend Connection

```bash
# Check if backend is running
curl https://udhp.onrender.com/health

# Expected response:
# {"success":true,"message":"Server is running"}
```

### Troubleshooting 404 Errors

1. **Hard refresh browser**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear browser cache**: DevTools → Application → Clear site data
3. **Check Vercel logs**: Vercel Dashboard → Deployments → View logs
4. **Verify environment variable**: Vercel Dashboard → Settings → Environment Variables
5. **Test API manually**: 
   ```bash
   curl https://udhp.onrender.com/api/auth/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 on route refresh | SPA not configured | ✅ Already fixed |
| API calls fail | Wrong VITE_API_URL | Set in Vercel environment variables |
| CORS error | Backend rejects origin | ✅ Already configured |
| Login fails | JWT_SECRET mismatch | Ensure same secret on backend |
| 500 error | Database connection failed | Check MONGO_URI in Render |

---

## Part 8: File Structure

```
udhp-fullstack/
├── client/              # Vite React Frontend
│   ├── src/
│   ├── vite.config.js  # ✅ Configured for SPA
│   ├── package.json
│   └── .env.example    # ✅ Created - use for reference
├── server/             # Express Backend
│   ├── server.js       # ✅ CORS configured
│   ├── package.json
│   └── .env.example    # ✅ Created - use for reference
├── vercel.json         # ✅ Fixed - SPA rewrites only
├── render.yaml         # ✅ Updated - all env vars
└── README.md
```

---

## Part 9: Checklist for Deployment

### Frontend (Vercel)
- [ ] Framework Preset: **Vite**
- [ ] Root Directory: **`.`** (empty/root)
- [ ] Build Command: **`cd client && npm run build`**
- [ ] Output Directory: **`client/dist`**
- [ ] Environment Variable: **`VITE_API_URL`** = `https://udhp.onrender.com/api`
- [ ] No `client/vercel.json` file (only root `vercel.json`)

### Backend (Render)
- [ ] Root Directory: **`server`**
- [ ] Build Command: **`npm install`**
- [ ] Start Command: **`npm start`**
- [ ] Environment Variables:
  - [ ] `MONGO_URI` (MongoDB Atlas string)
  - [ ] `JWT_SECRET` (random secure string)
  - [ ] `FRONTEND_URL` (Vercel app URL)
  - [ ] `NODE_ENV=production`

### Git (Before Final Push)
- [ ] Run `git add -A`
- [ ] Run `git commit -m "Fix deployment configuration"`
- [ ] Run `git push origin main`
- [ ] Vercel & Render will auto-redeploy

---

## Part 10: Next Steps After Deployment

1. **Test thoroughly**:
   - Log in and verify authentication works
   - Test all dashboard routes (doctor, patient, admin, nurse)
   - Refresh pages to ensure no 404 errors
   - Test API calls (appointments, messages, etc.)

2. **Monitor logs**:
   - Vercel Dashboard → Deployments → View logs
   - Render Dashboard → Logs tab

3. **Update DNS** (if using custom domain):
   - Point to Vercel nameservers

4. **Enable HTTPS** (automatic on Vercel/Render)

---

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register
- **React Router**: https://reactrouter.com/
- **Vite**: https://vitejs.dev/

---

**Last Updated**: 2026-07-17  
**Status**: ✅ All configurations fixed and ready for deployment
