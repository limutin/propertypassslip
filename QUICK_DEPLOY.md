# ⚡ Quick Deploy Guide - PropertyPassSlip

## 🎯 First Time Setup (One Time Only)

### 1. Check Your Setup
Double-click: **`check-setup.bat`**

### 2. Login to Firebase
Double-click: **`firebase-login.bat`**
- Your browser will open
- Sign in with your Google account
- Return to terminal

### 3. Connect to Firebase Project
Double-click: **`firebase-init.bat`**
- Select: **Hosting** (spacebar + Enter)
- Choose your Firebase project
- Public directory: **dist**
- Single-page app: **Yes**
- GitHub: **No**

### 4. Configure Firebase Credentials
**IMPORTANT**: Edit `src/firebase/config.js`

Get your config from: [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Settings ⚙️ → Project Settings
- Scroll to "Your apps" → Web app `</>`
- Copy the config values

Replace in `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 5. Deploy!
Double-click: **`deploy.bat`**

Wait for: ✔ Deploy complete!

Your site will be live at: `https://your-project-id.web.app`

---

## 🔄 Subsequent Deployments

After making code changes, just run:

**`deploy.bat`**

That's it! 🎉

---

## 📱 Manual Commands (Alternative)

If batch files don't work, use Command Prompt:

```bash
# First time
npx firebase-tools login
npx firebase-tools init
npm install

# Every deployment
npm run build
npx firebase-tools deploy --only hosting
```

---

## ✅ Success Checklist

- [ ] check-setup.bat shows all OK
- [ ] firebase-login.bat completed successfully
- [ ] firebase-init.bat completed successfully
- [ ] src/firebase/config.js has real credentials
- [ ] deploy.bat completed without errors
- [ ] Site opens in browser at Firebase URL

---

## 🆘 Common Issues

**"Script execution disabled"**
→ Use Command Prompt (CMD) instead of PowerShell

**"Not logged in"**
→ Run firebase-login.bat again

**"Build failed"**
→ Run: `npm install` then `npm run build`

**"Blank page after deploy"**
→ Check src/firebase/config.js has real credentials

**"404 error"**
→ Verify firebase.json has correct settings

---

## 📞 Full Documentation

See **FIREBASE_HOSTING_GUIDE.md** for complete instructions.

---

**Made a change? Just run deploy.bat again!** 🚀
