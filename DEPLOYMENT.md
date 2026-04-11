# 🚀 Deployment Guide

Panduan lengkap untuk deploy Growzy Backend ke berbagai platform.

## 📋 Daftar Isi

- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Monitoring & Logs](#monitoring--logs)
- [Troubleshooting](#troubleshooting)

---

## ☁️ Vercel Deployment

### Prerequisites

- GitHub account
- Vercel account ([Sign up free](https://vercel.com/))
- Push repository ke GitHub
- Supabase project sudah setup

### Step-by-Step Deployment

#### 1. Push Code to GitHub

```bash
# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit"

# Buat repository di GitHub, kemudian:
git remote add origin https://github.com/username/growzy-backend.git
git branch -M main
git push -u origin main
```

#### 2. Create Vercel Project

**Option A: Menggunakan Vercel Dashboard**

1. Pergi ke https://vercel.com/dashboard
2. Klik "New Project"
3. Import GitHub repository Anda
4. Select `growzy-backend` repository
5. Klik "Import"

**Option B: Menggunakan Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### 3. Configure Environment Variables

Di Vercel Dashboard:

1. Pergi ke **Project Settings** → **Environment Variables**
2. Tambahkan variables:

```
SUPABASE_URL: https://your-project.supabase.co
SUPABASE_ANON_KEY: your-anon-key-here
PORT: 4000 (optional)
NODE_ENV: production
```

3. Klik "Save"

#### 4. Deploy

```bash
# Automatic: Push ke main branch akan trigger deploy
git push origin main

# Manual: Menggunakan CLI
vercel --prod
```

⏳ Tunggu sampai deployment selesai (biasanya 1-2 menit)

✅ Deployment berhasil! URL akan ditampilkan.

### Vercel Configuration

File `vercel.json` sudah dikonfigurasi:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

Konfigurasi ini sudah optimal dan tidak perlu diubah.

---

## 🔧 Environment Variables

### Development (.env)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=4000
NODE_ENV=development
```

### Production (Vercel)

Sama dengan development, set di Vercel Dashboard:

1. **SUPABASE_URL**: Production Supabase URL
2. **SUPABASE_ANON_KEY**: Production Anon Key
3. **NODE_ENV**: production

### Getting Supabase Credentials

1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Select project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → SUPABASE_URL
   - **anon public** → SUPABASE_ANON_KEY

### Security Best Practices

✅ **DO:**

- Store credentials di environment variables
- Use different credentials untuk staging/production
- Rotate keys quarterly
- Restrict API key permissions di Supabase

❌ **DON'T:**

- Hardcode credentials di code
- Commit `.env` file
- Share credentials via email/chat
- Use same key untuk development and production

---

## 🗄️ Database Setup

### Creating Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up atau login
4. Create organization
5. Create new project
6. Select region (nearest ke server Anda)

### Database Tables

Create tables di Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Characters table
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_type VARCHAR(100),
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Surveys table
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  questions JSONB,
  responses JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Daily logs table
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes untuk performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_characters_user_id ON characters(user_id);
CREATE INDEX idx_surveys_user_id ON surveys(user_id);
CREATE INDEX idx_daily_logs_user_id ON daily_logs(user_id);
CREATE INDEX idx_daily_logs_date ON daily_logs(date);
```

### Enable Row Level Security (RLS)

Di Supabase Dashboard → **Authentication** → **Policies**

Define policies untuk setiap table:

```sql
-- Users: User hanya bisa akses data mereka sendiri
CREATE POLICY "Users can view own record" ON users
  FOR SELECT USING (auth.uid() = auth_id);

-- Profiles: User hanya bisa view/edit profil mereka
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- etc...
```

---

## ✅ Post-Deployment Checklist

### Verify Deployment

- [ ] Vercel deployment status: Success ✅
- [ ] API endpoint accessible: `curl https://your-url.vercel.app/api/survey`
- [ ] No critical errors di logs
- [ ] Database connected properly
- [ ] Environment variables set correctly

### Test Endpoints

```bash
# Test survey endpoint
curl https://your-url.vercel.app/api/survey

# Test login endpoint
curl -X POST https://your-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected endpoint
curl -H "Authorization: Bearer TOKEN" \
  https://your-url.vercel.app/api/profile
```

### Security Check

- [ ] `.env` file tidak di-commit
- [ ] Sensitive credentials di environment variables
- [ ] HTTPS enabled (Vercel default)
- [ ] CORS properly configured
- [ ] JWT token validation berfungsi

### Documentation

- [ ] Update README dengan live URL
- [ ] Document deployment process
- [ ] Provide credentials securely ke team
- [ ] Update API documentation

---

## 📊 Monitoring & Logs

### Vercel Logs

**View Real-time Logs:**

```bash
# Using Vercel CLI
vercel logs
```

**Di Vercel Dashboard:**

1. Go to project
2. Click **Deployments**
3. Select deployment terbaru
4. Click **View Function Logs**

### Check API Health

```bash
# Simple health check
curl https://your-url.vercel.app/api/survey

# With verbose output
curl -v https://your-url.vercel.app/api/survey

# Check response time
curl -w "Time: %{time_total}s\n" https://your-url.vercel.app/api/survey
```

### Performance Monitoring

**Vercel Analytics** (available dengan paid plan):

- Response times
- Error rates
- Bandwidth usage
- Request distribution

### Error Tracking

**Common Errors & Solutions:**

```
Error: 503 Service Unavailable
→ Check Supabase connection / wait for cold start

Error: 400 Bad Request
→ Invalid JSON body / missing required fields

Error: 401 Unauthorized
→ Invalid/expired token

Error: 500 Internal Server Error
→ Check logs: vercel logs
```

---

## 🔄 Continuous Deployment

### Auto-Deploy on Push

Vercel automatically deploys ketika push ke main branch.

**Setup:**

1. Di Vercel Dashboard → **Settings** → **Git**
2. Configure production branch: `main`
3. Enable "Redeploy on push"

### Manual Redeploy

```bash
# Via CLI
vercel --prod

# Via Dashboard:
# Deployments → Select deployment → Redeploy
```

### Rollback Deployment

```bash
# View previous deployments
vercel ls

# Rollback
vercel rollback
```

---

## 🐛 Troubleshooting

### Issue: 404 Not Found on Root Path

**Cause**: Root path `/` tidak didefinisikan

**Solution**: Add ke `index.js`:

```javascript
app.get("/", (req, res) => {
  res.json({ message: "Growzy API is running" });
});
```

### Issue: CORS Error

**Cause**: Client URL tidak di-allow

**Solution**: Configure CORS di `index.js`:

```javascript
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    credentials: true,
  }),
);
```

### Issue: Database Connection Failed

**Cause**:

- Wrong credentials
- Supabase project down
- Network issue

**Solution**:

```bash
# Verify credentials
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Test connection
curl https://<your-project>.supabase.co/rest/v1/
```

### Issue: Slow Response Time

**Cause**: Cold start / database query slow

**Solution**:

- Optimize database queries
- Add indexes
- Use caching
- Upgrade Supabase plan jika perlu

### Issue: 502 Bad Gateway

**Cause**: Server crash / timeout

**Solution**:

1. Check logs: `vercel logs`
2. Check error handling di code
3. Verify environment variables
4. Redeploy: `vercel --prod`

---

## 📈 Scaling Tips

### As You Grow

1. **Monitor Usage**
   - Check Vercel analytics
   - Monitor Supabase usage

2. **Upgrade if Needed**
   - Vercel paid plan untuk production
   - Supabase paid plan untuk advanced features

3. **Optimize Code**
   - Add caching
   - Batch queries
   - Optimize responses

4. **Database**
   - Add indexes
   - Archive old data
   - Use materialized views

---

## 📞 Getting Help

- 🆘 [Vercel Docs](https://vercel.com/docs)
- 📚 [Supabase Docs](https://supabase.com/docs)
- 🐛 [GitHub Issues](https://github.com/CC26-PS122/growzy-backend/issues)

---

**Happy Deploying! 🎉**

Last Updated: April 2024
