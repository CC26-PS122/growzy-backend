# Growzy Backend 🌱

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-blue)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-orange)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

**Growzy Backend** adalah API server untuk aplikasi Growzy yang dibangun menggunakan Node.js, Express.js, dan Supabase. Aplikasi ini menyediakan fitur manajemen pengguna, autentikasi, survey kepribadian, dan tracking kegiatan harian.

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Prasyarat](#prasyarat)
- [Instalasi & Setup](#instalasi--setup)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Layer Arsitektur](#layer-arsitektur)
- [Middleware & Autentikasi](#middleware--autentikasi)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Kontribusi](#kontribusi)

## 🎯 Tentang Proyek

Growzy Backend adalah API RESTful yang mendukung platform Growzy untuk manajemen karakter, survey kepribadian, profil pengguna, dan pencatatan aktivitas harian. Aplikasi ini menggunakan Supabase sebagai backend database dan layanan autentikasi.

### Fitur Utama
- ✅ Autentikasi pengguna dengan Supabase Auth
- ✅ Manajemen profil pengguna
- ✅ Sistem survey kepribadian
- ✅ Manajemen karakter digital
- ✅ Pencatatan log aktivitas harian
- ✅ Rekomendasi berbasis survey
- ✅ CORS support untuk cross-origin requests
- ✅ Environment-based configuration

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Node.js** | v18+ | JavaScript Runtime |
| **Express.js** | 5.2.1 | Web Framework |
| **Supabase** | 2.99.1 | Database & Auth Service |
| **CORS** | 2.8.6 | Cross-Origin Resource Sharing |
| **Dotenv** | 17.3.1 | Environment Variables |
| **Nodemon** | 3.1.14 | Development Server (Auto-reload) |

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (versi 18 atau lebih tinggi) - [Download](https://nodejs.org/)
- **npm** atau **yarn** (biasanya sudah termasuk dengan Node.js)
- **Git** - [Download](https://git-scm.com/)
- Akun **Supabase** - [Buat akun gratis](https://supabase.com/)

### Verifikasi Instalasi

```bash
node --version    # Harus v18+
npm --version     # Atau yarn --version
git --version
```

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/CC26-PS122/growzy-backend.git
cd growzy-backend
```

### 2. Install Dependencies

```bash
npm install
```

atau jika menggunakan yarn:

```bash
yarn install
```

### 3. Setup Supabase Project

1. Pergi ke [Supabase Dashboard](https://app.supabase.com/)
2. Buat project baru atau gunakan project yang sudah ada
3. Catat **URL** dan **Anon Key** dari settings project

## ⚙️ Konfigurasi Environment

### 1. Buat File `.env`

Salin file `.env.example` (jika ada) atau buat file `.env` baru di root direktori:

```bash
cp .env.example .env
```

### 2. Setting Environment Variables

Edit file `.env` dan isi dengan konfigurasi Anda:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Server Configuration
PORT=4000
NODE_ENV=development
```

**Cara mendapatkan nilai:**

- **SUPABASE_URL**: Dari Supabase Dashboard → Project Settings → API → Project URL
- **SUPABASE_ANON_KEY**: Dari Supabase Dashboard → Project Settings → API → anon public
- **PORT**: Port lokal untuk menjalankan server (default: 4000)

### ⚠️ PENTING: File `.env` tidak boleh di-commit!

Pastikan `.env` sudah ada di `.gitignore`:

```bash
echo ".env" >> .gitignore
```

## 🏃‍♂️ Menjalankan Aplikasi

### Development Mode (Dengan Auto-reload)

```bash
npm run dev
```

Server akan berjalan di `http://localhost:4000` dan otomatis reload ketika ada perubahan file.

### Production Mode

```bash
npm start
```

Server akan berjalan di `http://localhost:4000` (atau port sesuai `PORT` di `.env`).

### Testing di Postman/Insomnia

1. Buka **Postman** atau **Insomnia**
2. Buat request baru ke `http://localhost:4000/api/survey`
3. Response seharusnya menampilkan data survey

## 📁 Struktur Proyek

```
growzy-backend/
├── index.js                          # Entry point aplikasi
├── package.json                      # Dependencies & scripts
├── .env                              # Environment variables (tidak di-commit)
├── .env.example                      # Template env (optional)
├── vercel.json                       # Konfigurasi Vercel deployment
├── README.md                         # Dokumentasi ini
└── src/
    ├── config/
    │   └── db.js                     # Konfigurasi Supabase client
    ├── middleware/
    │   └── supabaseAuthMiddleware.js # Middleware autentikasi JWT
    ├── router/
    │   ├── router.js                 # Routes untuk endpoint API
    │   └── authRouter.js             # Routes untuk autentikasi
    ├── controllers/
    │   ├── userController.js         # Logic untuk user signup/login
    │   ├── profileController.js      # Logic untuk profile management
    │   ├── characterController.js    # Logic untuk character management
    │   ├── surveyController.js       # Logic untuk survey handling
    │   └── dailyLogController.js     # Logic untuk daily log tracking
    ├── services/
    │   ├── userService.js            # Database queries untuk users
    │   ├── profileService.js         # Database queries untuk profiles
    │   ├── characterService.js       # Database queries untuk characters
    │   ├── surveyService.js          # Database queries & logic untuk surveys
    │   └── dailyLogService.js        # Database queries untuk daily logs
    └── helpers/
        └── timeHelper.js             # Helper functions untuk time manipulation
```

### Penjelasan Struktur

- **index.js**: Main server file yang menginisialisasi Express app
- **config/**: Berisi konfigurasi koneksi ke database (Supabase)
- **middleware/**: Fungsi middleware (autentikasi, validasi, dll)
- **router/**: Definisi semua endpoint API
- **controllers/**: Business logic untuk setiap fitur
- **services/**: Database queries dan operasi data
- **helpers/**: Utility functions yang reusable

## 🔌 API Endpoints

### Authentication Endpoints (`/api/auth`)

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": "uuid", "email": "user@example.com" }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { "id": "uuid", "email": "user@example.com" }
}
```

### Survey Endpoints (`/api`)

#### 3. Get Survey Questions
```http
GET /api/survey
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "Pertanyaan survey",
      "type": "multiple_choice",
      "options": ["Option 1", "Option 2", "Option 3"]
    }
  ]
}
```

#### 4. Submit Survey & Get Recommendation
```http
POST /api/survey/recommendation
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "answers": [1, 2, 3, 1, 2]
}
```

**Response:**
```json
{
  "success": true,
  "recommendation": "Character recommendation based on survey",
  "characterId": "uuid"
}
```

### User Endpoints (`/api`)

#### 5. Register (Alternative)
```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### 6. Login (Alternative)
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  auth_id UUID REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Characters Table
```sql
CREATE TABLE characters (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  character_type VARCHAR(100),
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Surveys Table
```sql
CREATE TABLE surveys (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  questions JSONB,
  responses JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Daily Logs Table
```sql
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  activity TEXT,
  date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🏗️ Layer Arsitektur

Aplikasi ini menggunakan **MVC (Model-View-Controller)** pattern:

```
HTTP Request
    ↓
┌─────────────────────┐
│   Express Router    │  ← Menentukan endpoint
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   Controller        │  ← Menerima request, memanggil service
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   Service/Logic     │  ← Business logic & database queries
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   Supabase Client   │  ← Database operations
└──────────┬──────────┘
           ↓
   HTTP Response / JSON
```

### Contoh Flow:
```
POST /api/auth/login
    ↓
userController.login()
    ↓
userService.getUserByEmail()
    ↓
supabase.auth.signInWithPassword()
    ↓
Return { token, user }
```

## 🔐 Middleware & Autentikasi

### Supabase Auth Middleware

File: `src/middleware/supabaseAuthMiddleware.js`

Middleware ini melindungi route yang memerlukan autentikasi:

**Cara Penggunaan:**

```javascript
import { supabaseAuthMiddleware } from './src/middleware/supabaseAuthMiddleware.js';

// Gunakan middleware pada route yang memerlukan autentikasi
router.post('/protected-route', supabaseAuthMiddleware, controllerFunction);
```

**Request Headers yang Diperlukan:**

```http
Authorization: Bearer {jwt_token}
```

**Yang Dilakukan Middleware:**
1. Extract token dari header `Authorization`
2. Validasi token dengan Supabase
3. Ambil user_id dari token
4. Cek user ada di database
5. Attach user info ke `req` object jika valid
6. Return 401 jika token invalid/expired

## 🌐 Deployment

### Deploy ke Vercel

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login ke Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
vercel
```

#### 4. Setup Environment Variables di Vercel Dashboard
- Pergi ke Project Settings
- Tambahkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY`

#### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

### Deployed URL

Production API: `https://your-project.vercel.app/api`

## 🐛 Troubleshooting

### 1. Error: "SUPABASE_URL is not defined"

**Solusi:**
- Pastikan file `.env` sudah dibuat di root directory
- Verifikasi environment variables sudah jelas (tidak ada space)
- Restart server setelah perubahan `.env`

```bash
# Cek environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
```

### 2. Error: "Cannot find module 'express'"

**Solusi:**
```bash
# Install dependencies
npm install

# Atau if using yarn
yarn install
```

### 3. Port 4000 Already in Use

**Solusi:**
```bash
# Gunakan port lain
PORT=5000 npm run dev

# Atau kill process yang menggunakan port 4000
lsof -ti:4000 | xargs kill -9
```

### 4. CORS Error

**Solusi:**
Sudah dikonfigurasi di `index.js`:
```javascript
app.use(cors({
  origin: '*'  // Terima dari semua origin
}));
```

Jika perlu lebih spesifik:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',  // Client URL
  credentials: true
}));
```

### 5. Database Connection Error

**Solusi:**
- Verifikasi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` benar
- Cek internet connection
- Verifikasi Supabase project masih aktif

```bash
# Test koneksi
curl https://your-project.supabase.co/rest/v1/
```

### 6. 401 Unauthorized Error

**Solusi:**
- Pastikan JWT token sudah disertakan di header `Authorization`
- Token format: `Bearer {token}`
- Token mungkin sudah expired (login ulang)

**Contoh Request yang Benar:**
```bash
curl -H "Authorization: Bearer eyJhbGc..." http://localhost:4000/api/protected
```

## 👥 Tim & Kontribusi

### Cara Berkontribusi

1. **Fork** repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat **Pull Request**

### Kontribusi Guideline

- Pastikan code mengikuti format yang sudah ada
- Tambahkan comments untuk logic yang kompleks
- Test endpoint sebelum submit PR
- Update README jika ada fitur baru

### Pull Request Format

```markdown
## Deskripsi
Jelaskan perubahan yang dibuat

## Tipe Perubahan
- [ ] Bug fix
- [ ] Fitur baru
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Sudah test code
- [ ] Sudah update documentation
- [ ] Tidak ada breaking changes
```

## 📝 Catatan Pengembangan

### Git Workflow

```bash
# Clone repository
git clone https://github.com/CC26-PS122/growzy-backend.git
cd growzy-backend

# Buat branch feature
git checkout -b feature/nama-fitur

# Lakukan perubahan & commit
git add .
git commit -m "feat: Deskripsi perubahan"

# Push ke remote
git push origin feature/nama-fitur

# Buat Pull Request di GitHub
```

### Commit Message Convention

Gunakan format Angular:

```
feat: Tambah fitur baru
fix: Perbaiki bug
docs: Update dokumentasi
refactor: Refactor code
test: Tambah test
chore: Perubahan dependencies
```

## 📞 Support & Kontak

- **GitHub Issues**: [Report Issue](https://github.com/CC26-PS122/growzy-backend/issues)
- **Email**: [CC26-PS122@student.devacademy.id](mailto:CC26-PS122@student.devacademy.id)
- **Project**: [Capstone Project - Coding Camp 2026 powered by DBS Foundation](https://www.dbs.com/spark/index/id_id/site/codingcamp/index.html)

## 📄 Lisensi

Project ini menggunakan **ISC License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

**Last Updated**: April 2026
**Versi**: 1.0.0
**Status**: ✅ Active Development
