# ⚡ Quick Start Guide

Panduan cepat untuk setup dan menjalankan Growzy Backend dalam 5 menit.

## 📢 Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- Akun Supabase gratis ([Sign up](https://supabase.com/))
- Git ([Download](https://git-scm.com/))
- Code Editor (VSCode, Sublime, dll)

## 🚀 Quick Setup

### Step 1: Clone Repository (1 menit)

```bash
git clone https://github.com/CC26-PS122/growzy-backend.git
cd growzy-backend
```

### Step 2: Install Dependencies (2 menit)

```bash
npm install
```

### Step 3: Setup Environment Variables (1 menit)

```bash
# Copy template
cp .env.example .env
```

Edit `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=4000
NODE_ENV=development
```

Cara mendapatkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY`:
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Select project Anda
3. Pergi ke **Settings** → **API**
4. Copy **Project URL** → `SUPABASE_URL`
5. Copy **anon public** → `SUPABASE_ANON_KEY`

### Step 4: Run Server (1 menit)

```bash
npm run dev
```

✅ Server running di `http://localhost:4000`

## ✅ Test Server

### Test dengan curl:

```bash
curl http://localhost:4000/api/survey
```

### Test dengan Postman:

1. Open [Postman](https://www.postman.com/)
2. New Request
3. Method: `GET`
4. URL: `http://localhost:4000/api/survey`
5. Send

Expected response:
```json
{
  "success": true,
  "data": [...]
}
```

## 📋 Common Commands

```bash
# Development (dengan auto-reload)
npm run dev

# Production
npm start

# Stop server
Ctrl + C

# Check Node version
node -v

# Check npm version
npm -v
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| `SUPABASE_URL is undefined` | Cek `.env` file sudah dibuat dan isi dengan benar |
| `Port 4000 already in use` | `PORT=5000 npm run dev` atau `lsof -ti:4000 \| xargs kill -9` |
| `Cannot find module 'express'` | Run `npm install` |
| `CORS error` | Check browser console, sudah allow origin di code |

## 📚 Next Steps

- Baca [README.md](README.md) untuk dokumentasi lengkap
- Lihat [API Endpoints](README.md#-api-endpoints) untuk semua endpoint
- Check [Troubleshooting](README.md#-troubleshooting) untuk masalah umum
- Read [CONTRIBUTING.md](CONTRIBUTING.md) jika ingin kontribusi

## 🔗 Useful Links

- 📖 [Express.js Docs](https://expressjs.com/)
- 🔐 [Supabase Docs](https://supabase.com/docs)
- 📮 [Postman API Platform](https://www.postman.com/)
- 🐛 [GitHub Issues](https://github.com/CC26-PS122/growzy-backend/issues)

## 💡 Pro Tips

```bash
# Use better terminal interface
npm install -g nodemon  # Already installed, but useful to know

# Debug mode
DEBUG=* npm run dev

# View running processes
lsof -i :4000

# Kill process on port
kill -9 $(lsof -t -i :4000)
```

---

**🎉 That's it! Happy coding!**

Untuk bantuan lebih lanjut, lihat [README.md](README.md) atau [CONTRIBUTING.md](CONTRIBUTING.md)
