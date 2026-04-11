# 🤝 Panduan Kontribusi

Terima kasih telah tertarik untuk berkontribusi pada Growzy Backend! Dokumen ini berisi panduan lengkap tentang cara berkontribusi.

## Sebelum Memulai

- Baca [README.md](README.md) untuk memahami project
- Pastikan Node.js v18+ sudah terinstal
- Miliki akun GitHub dan Supabase

## Proses Kontribusi

### 1. Fork Repository

Klik tombol **Fork** di halaman repository GitHub

### 2. Clone Repository Anda

```bash
git clone https://github.com/username-anda/growzy-backend.git
cd growzy-backend
```

### 3. Tambahkan Upstream Remote

```bash
git remote add upstream https://github.com/CC26-PS122/growzy-backend.git
```

### 4. Buat Branch Feature

```bash
# Update main branch dari upstream
git fetch upstream
git checkout main
git merge upstream/main

# Buat branch baru
git checkout -b feature/nama-fitur
```

**Naming Convention untuk Branch:**
- `feature/nama-fitur` - Untuk fitur baru
- `fix/nama-bug` - Untuk bug fix
- `docs/deskripsi` - Untuk dokumentasi
- `refactor/deskripsi` - Untuk refactor code

### 5. Setup Development Environment

```bash
# Install dependencies
npm install

# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan nilai Supabase Anda
nano .env
```

### 6. Lakukan Perubahan

Buat perubahan code sesuai kebutuhan

### 7. Test Perubahan

```bash
# Jalankan development server
npm run dev

# Test endpoint menggunakan Postman/Insomnia
# Pastikan tidak ada error di console
```

### 8. Commit Perubahan

```bash
# Staged changes
git add .

# Commit dengan pesan deskriptif
git commit -m "feat: Tambah fitur login dengan Google"
```

**Commit Message Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat` - Fitur baru
- `fix` - Bug fix
- `docs` - Dokumentasi
- `style` - Formatting
- `refactor` - Refactor code
- `perf` - Performance improvement
- `test` - Test addition
- `chore` - Dependencies, build setup

**Contoh:**
```
feat(auth): Tambah JWT validation middleware

- Menambah middleware untuk validasi JWT token
- Menyimpan user info di request object
- Update userController untuk menggunakan middleware

Closes #123
```

### 9. Push ke Branch

```bash
git push origin feature/nama-fitur
```

### 10. Buat Pull Request

1. Pergi ke repository GitHub Anda
2. Klik **Compare & pull request**
3. Isi PR description dengan format:

```markdown
## 📝 Deskripsi
Jelaskan apa yang sudah diubah dan mengapa

## 🎯 Tipe Perubahan
- [x] Bug fix
- [ ] Fitur baru
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
Jelaskan bagaimana cara test perubahan ini:
- [ ] Test dengan Postman endpoint `/api/auth/login`
- [ ] Verifikasi middleware berfungsi dengan token valid
- [ ] Verifikasi 401 error dengan token invalid

## ✅ Checklist
- [x] Code sudah di-review sendiri
- [x] Sudah test perubahan
- [x] Update documentation jika ada API changes
- [x] Tidak ada breaking changes
- [x] Commit message mengikuti convention

## 📸 Screenshots/Logs
(Jika ada)
```

### 11. Review & Merge

Tim akan review PR Anda. Resp feedback dan buat perubahan jika diperlukan.

Setelah approved, PR akan di-merge ke main branch.

## Coding Standards

### Code Style

Gunakan format yang sudah ada di project:

```javascript
// ✅ GOOD
import express from 'express';
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }
    
    const user = await userService.getUserByEmail(email);
    // ... rest of logic
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ AVOID
import express from 'express';
const handleUserLogin=async(req,res)=>{
  const user = await userService.getUserByEmail(req.body.email);
  res.json(user);
};
```

### File Organization

```
src/
├── controllers/
│   └── featureController.js      // Handler HTTP request
├── services/
│   └── featureService.js         // Business logic & queries
├── helpers/
│   └── featureHelper.js          // Utility functions
└── middleware/
    └── featureMiddleware.js      // Middleware functions
```

### Naming Conventions

```javascript
// Files: camelCase
userController.js
userService.js

// Functions: camelCase
const getUserById = () => {}
const calculateSurveyRecommendation = () => {}

// Constants: UPPER_CASE
const MAX_USER_NAME_LENGTH = 100;
const DEFAULT_PORT = 4000;

// Classes: PascalCase
class UserService {}
class DatabaseConnection {}
```

## Project Structure Best Practices

### Error Handling

```javascript
// ✅ GOOD
try {
  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  res.json({ success: true, user });
} catch (error) {
  console.error('Error fetching user:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}
```

### Response Format

Jaga konsistensi format response:

```javascript
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* data */ }
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "error": "error_code"
}
```

### Comments & Documentation

```javascript
/**
 * Fetch user by ID
 * @param {string} userId - The user ID to fetch
 * @returns {Promise<Object>} User object
 * @throws {Error} If user not found
 */
const getUserById = async (userId) => {
  // Implementation
};

// For complex logic
const calculateCharacterLevel = (experience) => {
  // Level progression: 0-100 = Level 1, 100-200 = Level 2, etc
  return Math.floor(experience / 100) + 1;
};
```

## Testing

Sebelum membuat PR:

```bash
# 1. Test endpoint dengan Postman/Insomnia
# 2. Check console untuk error/warning
npm run dev

# 3. Verifikasi database changes di Supabase dashboard
# 4. Test edge cases
```

### Test Checklist

- [ ] Endpoint response dengan data yang benar
- [ ] Error handling berfungsi (400, 401, 404, 500)
- [ ] Database changes tercatat di Supabase
- [ ] Tidak ada console error/warning
- [ ] Middleware berfungsi dengan baik
- [ ] CORS tidak ada masalah

## Local Testing dengan Sample Data

```bash
# Test endpoint survey
curl http://localhost:4000/api/survey

# Test login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Deployment Testing

Sebelum merge ke main, pastikan:

- [ ] Build lokal berhasil (`npm start`)
- [ ] Tidak ada unused imports
- [ ] No console.log di production code (hanya console.error)
- [ ] Environment variables documented

## Troubleshooting untuk Contributors

### Git Conflicts

```bash
# Update dari upstream
git fetch upstream
git rebase upstream/main

# Resolve conflicts di file, kemudian:
git add .
git rebase --continue
```

### Accidental Commit Push

```bash
# Undo commit terakhir (keep changes)
git reset --soft HEAD~1

# Undo commit dan changes
git reset --hard HEAD~1
```

### Need to Sync Fork

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Review Process

1. **Automated Checks**: GitHub action akan run lint/test
2. **Code Review**: Tim akan review code quality
3. **Testing**: Verifikasi testing sudah complete
4. **Approval**: Minimal 1 approval dari maintainer
5. **Merge**: Squash commit ke main branch

## Questions?

- 📧 Email: cc26-ps122@team.com
- 💬 GitHub Issues: [Report Issue](https://github.com/CC26-PS122/growzy-backend/issues)
- 📚 Documentation: [README.md](README.md)

---

**Terima kasih telah berkontribusi! 🎉**
