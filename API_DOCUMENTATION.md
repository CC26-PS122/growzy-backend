# 📚 API Documentation

Dokumentasi lengkap untuk semua endpoint Growzy Backend API.

**Base URL**: `http://localhost:4000/api` (Development)

## 🔑 Authentication

Gunakan JWT token yang didapat dari endpoint login/register.

### Header Requirements

```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### Error Responses

Semua error response mengikuti format berikut:

```json
{
  "success": false,
  "message": "Error description",
  "error": "error_code"
}
```

---

## 👤 User Endpoints

### 1. Register User

**Endpoint:**
```http
POST /api/auth/register
POST /api/register
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Request Fields:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| email | string | Yes | Valid email format, max 255 chars |
| password | string | Yes | Min 8 chars, alphanumeric recommended |

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
| Status | Message | Cause |
|--------|---------|-------|
| 400 | Email already exists | Email sudah terdaftar |
| 400 | Invalid email format | Format email tidak valid |
| 400 | Password too weak | Password terlalu pendek |
| 500 | Internal server error | Server error |

**Example (curl):**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

**Example (JavaScript):**
```javascript
const response = await fetch('http://localhost:4000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePassword123!'
  })
});
const data = await response.json();
console.log(data.token); // JWT token
```

---

### 2. Login User

**Endpoint:**
```http
POST /api/auth/login
POST /api/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
| Status | Message |
|--------|---------|
| 401 | Invalid email or password |
| 400 | Email and password required |
| 500 | Internal server error |

**Example (curl):**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

---

## 📋 Survey Endpoints

### 3. Get All Survey Questions

**Endpoint:**
```http
GET /api/survey
```

**Request Headers:**
```
No authentication required
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "Apa kekuatanmu yang paling menonjol?",
      "type": "multiple_choice",
      "options": [
        "Leadership",
        "Creativity",
        "Analytical",
        "Communication"
      ]
    },
    {
      "id": 2,
      "question": "Bagaimana kamu merespons tantangan?",
      "type": "multiple_choice",
      "options": [
        "Head on with confidence",
        "Carefully plan approach",
        "Seek team support",
        "Take time to analyze"
      ]
    }
  ]
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique question ID |
| question | string | Question text |
| type | string | Type: multiple_choice, open_text, etc |
| options | array | Array of possible answers |

**Example (JavaScript):**
```javascript
async function getSurveyQuestions() {
  const response = await fetch('http://localhost:4000/api/survey');
  const data = await response.json();
  
  if (data.success) {
    data.data.forEach(q => {
      console.log(q.question);
      console.log(q.options);
    });
  }
}
```

---

### 4. Submit Survey & Get Recommendation

**Endpoint:**
```http
POST /api/survey/recommendation
```

**Request Headers:**
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request:**
```json
{
  "answers": [1, 2, 3, 1, 2]
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| answers | array of numbers | Yes | Index dari pilihan jawaban (0-based) |

**Response (200):**
```json
{
  "success": true,
  "message": "Survey processed successfully",
  "recommendation": {
    "characterType": "brave_leader",
    "characterName": "The Bold Leader",
    "description": "You are a natural leader with courage and determination",
    "traits": ["Leadership", "Confidence", "Resilience"],
    "compatibility_score": 92
  },
  "characterId": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Errors:**
| Status | Message |
|--------|---------|
| 401 | Unauthorized: Missing or invalid token |
| 400 | Invalid answers format |
| 400 | Answers length doesn't match questions |
| 500 | Internal server error |

**Example (curl):**
```bash
curl -X POST http://localhost:4000/api/survey/recommendation \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [1, 2, 3, 1, 2]
  }'
```

**Example (JavaScript):**
```javascript
async function submitSurvey(token, answers) {
  const response = await fetch('http://localhost:4000/api/survey/recommendation', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answers })
  });
  
  const data = await response.json();
  if (data.success) {
    console.log('Character:', data.recommendation.characterName);
    console.log('ID:', data.characterId);
  }
}
```

---

## 👥 Profile Endpoints

*Note: Endpoint ini memerlukan autentikasi*

### 5. Get User Profile

**Endpoint:**
```http
GET /api/profile
```

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "bio": "Gaming enthusiast",
    "avatar_url": "https://example.com/avatar.jpg",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T15:45:00Z"
  }
}
```

---

### 6. Update User Profile

**Endpoint:**
```http
PUT /api/profile
PATCH /api/profile
```

**Request:**
```json
{
  "name": "John Doe",
  "bio": "Passionate gamer and developer",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "bio": "Passionate gamer and developer",
    "avatar_url": "https://example.com/new-avatar.jpg",
    "updated_at": "2024-01-20T16:00:00Z"
  }
}
```

---

## 🎮 Character Endpoints

### 7. Get User Character

**Endpoint:**
```http
GET /api/character
```

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "character_type": "brave_leader",
    "character_name": "The Bold Leader",
    "level": 5,
    "experience": 2500,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 8. Update Character

**Endpoint:**
```http
PUT /api/character
PATCH /api/character
```

**Request:**
```json
{
  "level": 6,
  "experience": 3000
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Character updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "level": 6,
    "experience": 3000,
    "updated_at": "2024-01-20T16:00:00Z"
  }
}
```

---

## 📅 Daily Log Endpoints

### 9. Create Daily Log

**Endpoint:**
```http
POST /api/dailylog
```

**Request Headers:**
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request:**
```json
{
  "activity": "Completed 30 minutes workout",
  "date": "2024-01-20"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Daily log created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "activity": "Completed 30 minutes workout",
    "date": "2024-01-20",
    "created_at": "2024-01-20T16:05:00Z"
  }
}
```

---

### 10. Get Daily Logs

**Endpoint:**
```http
GET /api/dailylog
GET /api/dailylog?date=2024-01-20
```

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| date | string | No | Format: YYYY-MM-DD |
| month | string | No | Format: YYYY-MM |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "activity": "Completed 30 minutes workout",
      "date": "2024-01-20",
      "created_at": "2024-01-20T16:05:00Z"
    }
  ]
}
```

---

## 🔄 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat |
| 400 | Bad Request | Request invalid |
| 401 | Unauthorized | Token missing/invalid |
| 404 | Not Found | Resource tidak ditemukan |
| 500 | Internal Server Error | Server error |

---

## 🧪 Testing Tips

### Using Postman Collection

1. **Setup Environment:**
   - baseUrl: `http://localhost:4000/api`
   - token: (dari login response)

2. **Pre-request Script:**
```javascript
// Set token setelah login
pm.environment.set("token", pm.response.json().token);
```

3. **Authorization Header:**
```
Authorization: Bearer {{token}}
```

### Common Test Scenarios

```bash
# 1. Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'

# 2. Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'

# 3. Get Survey (save token dari login)
curl -X GET http://localhost:4000/api/survey

# 4. Submit Survey
curl -X POST http://localhost:4000/api/survey/recommendation \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answers":[1,2,3,1,2]}'

# 5. Create Daily Log
curl -X POST http://localhost:4000/api/dailylog \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"activity":"Morning workout","date":"2024-01-20"}'
```

---

## 📞 Support

- 🐛 [Report Issue](https://github.com/CC26-PS122/growzy-backend/issues)
- 📧 Email: cc26-ps122@team.com

---

**Last Updated**: April 2024
**API Version**: 1.0.0
