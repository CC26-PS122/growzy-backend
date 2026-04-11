# 📋 PROJECT SETUP NOTES

Dokumentasi internal tentang struktur dan konfigurasi proyek Growzy Backend.

## 🎯 Project Overview

**Project Name**: Growzy Backend  
**Type**: Node.js/Express RESTful API  
**Database**: Supabase (PostgreSQL)  
**Deployment**: Vercel  
**Repository**: https://github.com/CC26-PS122/growzy-backend.git

## 📁 Directory Structure

```
growzy-backend/
├── index.js                          # Main server entry point
├── package.json                      # Project dependencies & scripts
├── vercel.json                       # Vercel deployment config
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
│
├── Documentation/
│   ├── README.md                     # Main documentation
│   ├── GETTING_STARTED.md            # Quick start guide (5 min setup)
│   ├── API_DOCUMENTATION.md          # Complete API reference
│   ├── DEPLOYMENT.md                 # Deployment guide (Vercel)
│   ├── CONTRIBUTING.md               # Contribution guidelines
│   └── PROJECT_SETUP_NOTES.md        # This file
│
└── src/
    ├── config/
    │   └── db.js                     # Supabase client initialization
    │                                 # Creates supabase instance
    │
    ├── middleware/
    │   └── supabaseAuthMiddleware.js # JWT token validation
    │                                 # Protects authenticated routes
    │
    ├── router/
    │   ├── router.js                 # Main API routes
    │   │                             # GET /survey
    │   │                             # POST /survey/recommendation
    │   │                             # POST /register, /login
    │   └── authRouter.js             # Authentication routes
    │                                 # POST /auth/register
    │                                 # POST /auth/login
    │
    ├── controllers/
    │   ├── userController.js         # User signup & login logic
    │   ├── profileController.js      # Profile management logic
    │   ├── characterController.js    # Character management logic
    │   ├── surveyController.js       # Survey & recommendation logic
    │   └── dailyLogController.js     # Daily log tracking logic
    │
    ├── services/
    │   ├── userService.js            # User DB queries
    │   │                             # getUserByAuthId()
    │   │                             # getUserByEmail()
    │   ├── profileService.js         # Profile DB queries
    │   │                             # getUserProfileByUserId()
    │   ├── characterService.js       # Character DB queries
    │   │                             # getCharacterByUserId()
    │   ├── surveyService.js          # Survey queries & calc
    │   │                             # getSurveyQuestions()
    │   │                             # calculateRecommendation()
    │   └── dailyLogService.js        # Daily log DB queries
    │                                 # getDailyLogsByUserId()
    │
    └── helpers/
        └── timeHelper.js             # Time/date utility functions
```

## 🔧 Core Technologies

| Technology | Version | Purpose                |
| ---------- | ------- | ---------------------- |
| Node.js    | 18+     | JavaScript runtime     |
| Express.js | 5.2.1   | Web framework          |
| Supabase   | 2.99.1  | Database & Auth        |
| CORS       | 2.8.6   | Cross-origin requests  |
| Dotenv     | 17.3.1  | Environment variables  |
| Nodemon    | 3.1.14  | Dev server auto-reload |

## 🚀 Running the Project

### Scripts Available

```json
{
  "dev": "nodemon index.js", // Development (auto-reload)
  "start": "node index.js" // Production
}
```

### Commands

```bash
# Install dependencies
npm install

# Development mode
npm run dev                          # Listen on PORT from .env (default 4000)

# Production mode
npm start                            # Listen on PORT from .env (default 4000)
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```env
# Required for Supabase connection
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Optional (defaults provided)
PORT=4000
NODE_ENV=development
```

### CORS Configuration

Configured in `index.js`:

```javascript
app.use(
  cors({
    origin: "*", // Allow all origins for development
  }),
);
```

For production, update to:

```javascript
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://growzy.app",
  }),
);
```

## 🔐 Authentication Flow

### Registration

```
POST /api/auth/register
  ↓
supabase.auth.signUp()
  ↓
Create user in database
  ↓
Generate JWT token
  ↓
Return token + user data
```

### Login

```
POST /api/auth/login
  ↓
supabase.auth.signInWithPassword()
  ↓
Verify user in database
  ↓
Return JWT token + user data
```

### Protected Routes

```
GET /api/profile
  ↓
Check Authorization header for JWT
  ↓
supabaseAuthMiddleware validates token
  ↓
Extract user_id from token
  ↓
Attach to req.user
  ↓
Continue to controller
```

## 🗄️ Database Schema

### users

- id (UUID, PK)
- auth_id (UUID, FK to auth.users)
- email (VARCHAR, UNIQUE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### profiles

- id (UUID, PK)
- user_id (UUID, FK)
- name (VARCHAR)
- bio (TEXT)
- avatar_url (VARCHAR)
- created_at, updated_at

### characters

- id (UUID, PK)
- user_id (UUID, FK)
- character_type (VARCHAR)
- level (INT)
- experience (INT)
- created_at, updated_at

### surveys

- id (UUID, PK)
- user_id (UUID, FK)
- questions (JSONB)
- responses (JSONB)
- created_at

### daily_logs

- id (UUID, PK)
- user_id (UUID, FK)
- activity (TEXT)
- date (DATE)
- created_at

## 🔄 API Endpoints Overview

### Authentication

```
POST /api/auth/register      - Register new user
POST /api/auth/login         - Login user
POST /api/register           - Register (alternative)
POST /api/login              - Login (alternative)
```

### Survey

```
GET /api/survey              - Get survey questions
POST /api/survey/recommendation - Submit survey & get recommendation
```

### User (Protected)

```
GET /api/profile             - Get user profile
PUT /api/profile             - Update profile
GET /api/character           - Get user character
PUT /api/character           - Update character
POST /api/dailylog           - Create daily log
GET /api/dailylog            - Get daily logs
```

## 🧪 Testing Checklist

### Manual Testing

Before committing, test these scenarios:

- [ ] GET /api/survey returns questions
- [ ] POST /api/auth/register with new email → 201 + token
- [ ] POST /api/auth/register with existing email → 400
- [ ] POST /api/auth/login with correct credentials → token
- [ ] POST /api/auth/login with wrong password → 401
- [ ] POST /api/survey/recommendation without token → 401
- [ ] POST /api/survey/recommendation with token → recommendation
- [ ] Response format consistent across endpoints
- [ ] Error messages are clear
- [ ] No console errors in terminal

### cURL Test Commands

```bash
# Test survey
curl http://localhost:4000/api/survey

# Test register
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' | jq -r '.token')

# Test protected endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/profile
```

## 🚢 Deployment Pipeline

### Local → GitHub → Vercel

```
1. Local Development
   ↓
2. Commit & Push to GitHub
   ↓
3. Vercel webhook triggers
   ↓
4. Install dependencies (npm install)
   ↓
5. Build (if applicable)
   ↓
6. Deploy to Vercel
   ↓
7. Environment variables loaded
   ↓
8. Server running on Vercel URL
```

### Environment Variables for Production

Set in Vercel Dashboard:

- SUPABASE_URL
- SUPABASE_ANON_KEY
- NODE_ENV=production

## 📝 Code Style Guidelines

### Naming Conventions

```javascript
// Files: camelCase
userController.js;
userService.js;

// Functions: camelCase + descriptive verb
const getUserById = () => {};
const calculateSurveyRecommendation = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;

// Classes: PascalCase (if used)
class UserService {}
```

### Error Handling

```javascript
// Always use try-catch for async operations
try {
  const data = await someAsyncOperation();
  res.json({ success: true, data });
} catch (error) {
  console.error("Context:", error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
```

### Response Format

```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, message: 'Error description' }
```

## 🔍 Quick Debugging Tips

### Check Environment Variables

```bash
# Print all env vars
env | grep SUPABASE

# Test Supabase connection
curl https://YOUR_SUPABASE_URL/rest/v1/users \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### View Server Logs

```bash
# Development (nodemon)
npm run dev                    # Shows real-time logs

# Check specific logs
cat ~/.pm2/logs/app-error.log  # If using PM2
tail -f vercel.log            # If using Vercel CLI
```

### Database Debugging

In Supabase Dashboard:

- SQL Editor: Run custom queries
- Table Editor: View/edit data directly
- Logs: View auth & API logs

## 📚 Adding New Features

### Step-by-Step Process

1. **Create Service** (data layer)

   ```javascript
   // src/services/newFeatureService.js
   export const getNewFeatureData = async () => {
     return supabase.from("table_name").select("*");
   };
   ```

2. **Create Controller** (business logic)

   ```javascript
   // src/controllers/newFeatureController.js
   export const getNewFeature = async (req, res) => {
     try {
       const data = await newFeatureService.getNewFeatureData();
       res.json({ success: true, data });
     } catch (error) {
       res.status(500).json({ success: false, message: error.message });
     }
   };
   ```

3. **Add Route**

   ```javascript
   // src/router/router.js
   import { getNewFeature } from "../controllers/newFeatureController.js";

   router.get("/newfeature", getNewFeature);
   ```

4. **Test Endpoint**

   ```bash
   curl http://localhost:4000/api/newfeature
   ```

5. **Document in README**
   - Add to API_DOCUMENTATION.md
   - Update README.md if major feature

## 🐛 Common Issues & Solutions

| Issue                      | Cause                   | Solution                                   |
| -------------------------- | ----------------------- | ------------------------------------------ |
| Cannot connect to Supabase | Wrong credentials       | Check SUPABASE_URL & SUPABASE_ANON_KEY     |
| PORT already in use        | Another process on port | `lsof -ti:4000 \| xargs kill -9`           |
| 401 Unauthorized           | Token missing/invalid   | Add `Authorization: Bearer {token}` header |
| Module not found           | Missing dependency      | Run `npm install`                          |
| Slow response              | Cold start / slow query | Check database indexes, optimize queries   |

## 📞 Project Contacts

- **GitHub**: https://github.com/CC26-PS122/growzy-backend
- **Supabase**: https://app.supabase.com/
- **Vercel**: https://vercel.com/dashboard
- **Email**: cc26-ps122@team.com

## 📅 Version History

- **v1.0.0** (April 2024): Initial release
  - User authentication with Supabase
  - Survey system with recommendations
  - Character management
  - Daily log tracking
  - Deployment on Vercel

---

**Last Updated**: April 2024  
**Status**: ✅ Active Development  
**Maintained By**: CC26-PS122 Team
