# Vercel Project Configuration - Quick Reference

## ✅ All Settings Must Be Exactly As Shown Below

### Project Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework** | Vite | Must be Vite, not Next.js or CRA |
| **Root Directory** | `.` or empty | Deploy from repository root, not `/client` |
| **Build Command** | `cd client && npm run build` | Must navigate to client folder first |
| **Output Directory** | `client/dist` | Where Vite outputs the build |
| **Install Command** | Automatic (empty) | Leave default |

### Environment Variables

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_API_URL` | `https://udhp.onrender.com/api` | Production, Preview, Development |

**How to Set:**
1. Go to Vercel Dashboard
2. Click your project name
3. Settings → Environment Variables
4. Click "Add"
5. Fill in exactly as above
6. Click "Save"
7. Go to Deployments tab → Click "Redeploy" on latest deployment

### Important Files

| File | Status | Action |
|------|--------|--------|
| `vercel.json` (root) | ✅ CORRECT | Keep as-is |
| `client/vercel.json` | ❌ DELETE | Remove this file |
| `client/vite.config.js` | ✅ CORRECT | No changes needed |
| `client/.env.example` | ✅ CREATED | For documentation |

### Verification Checklist

After deploying, verify these URLs work:

```
✅ https://your-app.vercel.app/
✅ https://your-app.vercel.app/login
✅ https://your-app.vercel.app/doctor/dashboard (with page refresh)
✅ https://your-app.vercel.app/admin/dashboard (with page refresh)
✅ https://your-app.vercel.app/patient/dashboard (with page refresh)
✅ https://your-app.vercel.app/nurse/dashboard (with page refresh)
```

All should load without 404 errors.

### If Still Getting 404 Errors

1. **Verify Vercel settings** - recheck all settings above
2. **Check environment variable** - go to Settings and confirm `VITE_API_URL` is set
3. **Trigger redeploy** - delete all deployments, commit code changes, push to trigger new build
4. **Clear browser cache** - `Ctrl+Shift+R` or `Cmd+Shift+R`
5. **Check build logs** - Deployments tab → View logs for errors
6. **Test locally first**:
   ```bash
   cd client
   npm run build
   npm run preview
   # Visit http://localhost:4173/doctor/dashboard and refresh
   ```

### Render Backend Configuration

| Setting | Value |
|---------|-------|
| **Root Directory** | `server` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Environment: MONGO_URI** | MongoDB Atlas connection string |
| **Environment: JWT_SECRET** | Random secure string (32+ chars) |
| **Environment: FRONTEND_URL** | `https://your-app.vercel.app` |

---

**Last Updated:** 2026-07-17  
**Status:** ✅ Ready for deployment
