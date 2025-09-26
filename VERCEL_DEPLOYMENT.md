# 🚀 Vercel Deployment Guide for QBrix Solutions

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be on GitHub
3. **Database**: Set up a production PostgreSQL database (Supabase, Neon, etc.)

## 🔧 Environment Variables Setup

### 1. **Production Database**
Set up a production PostgreSQL database:
- **Supabase** (Recommended): [supabase.com](https://supabase.com)
- **Neon**: [neon.tech](https://neon.tech)
- **Railway**: [railway.app](https://railway.app)

### 2. **Vercel Environment Variables**
In your Vercel dashboard, add these environment variables:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
NODE_ENV="production"
```

## 🚀 Deployment Steps

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository: `faizanarshad/QB_site`
4. Select the repository

### Step 2: Configure Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Set Environment Variables
Add these in Vercel dashboard:
```
DATABASE_URL=your_production_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

## 🔍 Troubleshooting Common Issues

### Issue 1: Build Fails
**Error**: `prisma generate` fails
**Solution**: 
- Ensure `DATABASE_URL` is set in Vercel
- Check that Prisma is in dependencies (not devDependencies)

### Issue 2: Database Connection Fails
**Error**: `P1001: Can't reach database server`
**Solution**:
- Verify `DATABASE_URL` is correct
- Check database is accessible from Vercel's servers
- Use connection pooling for production

### Issue 3: Environment Variables Missing
**Error**: `DATABASE_URL is not set`
**Solution**:
- Add all required environment variables in Vercel dashboard
- Redeploy after adding variables

### Issue 4: File Upload Issues
**Error**: File uploads don't work
**Solution**:
- Vercel doesn't support local file storage
- Use cloud storage (AWS S3, Cloudinary, etc.)
- Update file upload logic for production

## 📁 File Structure for Production

```
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   └── ...           # Pages
│   ├── components/       # React components
│   ├── lib/
│   │   ├── prisma.ts     # Database client
│   │   └── db.ts         # Database utilities
│   └── scripts/          # Build scripts
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
│   └── uploads/          # File uploads (local only)
├── next.config.js        # Next.js config
├── vercel.json           # Vercel config
└── package.json          # Dependencies
```

## 🔧 Production Optimizations

### 1. **Database Connection Pooling**
For production, use connection pooling:
```env
DATABASE_URL="postgresql://user:pass@host:port/db?connection_limit=5&pool_timeout=0"
```

### 2. **File Storage**
Replace local file storage with cloud storage:
- **AWS S3**: For file uploads
- **Cloudinary**: For image uploads
- **Supabase Storage**: Integrated with Supabase

### 3. **Environment Variables**
Never commit `.env` files to Git. Use Vercel's environment variables.

## 📊 Monitoring

### 1. **Vercel Analytics**
- Enable Vercel Analytics in dashboard
- Monitor performance and errors

### 2. **Database Monitoring**
- Use your database provider's monitoring
- Set up alerts for connection issues

### 3. **Error Tracking**
- Consider adding Sentry for error tracking
- Monitor API route errors

## 🔄 Continuous Deployment

### Automatic Deployments
- Vercel automatically deploys on Git push
- Preview deployments for pull requests
- Branch deployments for testing

### Manual Deployments
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🛡️ Security Checklist

- [ ] Environment variables set in Vercel
- [ ] Database connection secured
- [ ] File uploads validated
- [ ] API routes protected
- [ ] CORS configured properly
- [ ] Rate limiting implemented

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection
4. Check file permissions
5. Review error messages in console

## 🎉 Success!

Once deployed, your site will be available at:
`https://your-project-name.vercel.app`

---

**Remember**: Always test your deployment in a staging environment first! 