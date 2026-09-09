# 🚀 Firebase Hosting Setup Guide for PropertyPassSlip

## Prerequisites Checklist

- [ ] Node.js installed (check with: `node --version`)
- [ ] npm installed (check with: `npm --version`)
- [ ] Firebase account created at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Firebase project created (or ready to create)

---

## 📋 Step-by-Step Deployment Process

### Option A: Quick Deploy (Using Batch Scripts)

I've created automated scripts for you. Just double-click them in order:

1. **firebase-login.bat** - Login to Firebase
2. **firebase-init.bat** - Connect to your Firebase project
3. **deploy.bat** - Build and deploy your site

### Option B: Manual Command Line

If you prefer manual control, follow these steps:

#### Step 1: Login to Firebase

Open Command Prompt (CMD) or PowerShell in this directory and run:

```bash
npx firebase-tools login
```

This opens your browser for Google authentication.

#### Step 2: Initialize Firebase Project

```bash
npx firebase-tools init
```

**Important Selections:**
- **Which Firebase features?** → Select **Hosting** (use spacebar, then Enter)
- **Project Setup** → Choose "Use an existing project" or "Create a new project"
- **What do you want to use as your public directory?** → Type: `dist`
- **Configure as a single-page app?** → `Yes`
- **Set up automatic builds with GitHub?** → `No` (for now)

#### Step 3: Configure Firebase Credentials

**CRITICAL**: You need to update your Firebase configuration!

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click ⚙️ (Settings) → Project Settings
4. Scroll to "Your apps" section
5. If no web app exists, click `</>` to add one
6. Copy the configuration object

7. **Update `src/firebase/config.js`** with your real values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:..."
};
```

#### Step 4: Install Dependencies

```bash
npm install
```

#### Step 5: Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

#### Step 6: Deploy to Firebase

```bash
npx firebase-tools deploy --only hosting
```

Or deploy everything (hosting, firestore, functions):

```bash
npx firebase-tools deploy
```

#### Step 7: Access Your Live Site

After deployment completes, you'll see:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id/overview
Hosting URL: https://your-project-id.web.app
```

🎉 **Your site is now live at the Hosting URL!**

---

## 🔧 Useful Commands

```bash
# Check current Firebase project
npx firebase-tools projects:list

# View deployment history
npx firebase-tools hosting:channel:list

# Open hosting dashboard
npx firebase-tools open hosting:site

# Test locally before deploying
npm run build
npx firebase-tools serve

# Deploy only hosting (faster)
npx firebase-tools deploy --only hosting

# Deploy with debug info
npx firebase-tools deploy --debug
```

---

## ⚡ Quick Redeploy After Changes

After making code changes:

```bash
npm run build
npx firebase-tools deploy --only hosting
```

Or use the **deploy.bat** script!

---

## 🔒 Security Setup

### Firestore Rules

Your `firestore.rules` file controls database access. Deploy it with:

```bash
npx firebase-tools deploy --only firestore:rules
```

### Storage Rules

Your `storage.rules` file controls file upload access. Deploy it with:

```bash
npx firebase-tools deploy --only storage
```

---

## 🛠️ Troubleshooting

### Issue: PowerShell Script Execution Error

If you get "running scripts is disabled", run PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or use **Command Prompt (CMD)** instead of PowerShell.

### Issue: "Firebase config values not set"

Make sure you updated `src/firebase/config.js` with your actual Firebase project credentials (see Step 3).

### Issue: "Error: HTTP Error: 404, Project not found"

Run `npx firebase-tools use --add` and select your project.

### Issue: Build fails

- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Run `npm run build`

### Issue: Site shows blank page after deployment

- Check browser console for errors
- Verify `firebase.json` has the correct rewrite rules
- Ensure `dist` folder was created during build
- Try clearing browser cache

### Issue: "Not logged in"

Run: `npx firebase-tools login`

---

## 📁 Project Structure

```
propertypassslip/
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Built files (created by npm run build)
├── firebase.json          # Firebase configuration
├── .firebaserc            # Firebase project mapping
├── firestore.rules        # Database security rules
├── storage.rules          # Storage security rules
├── deploy.bat             # Quick deploy script
├── firebase-login.bat     # Login script
└── firebase-init.bat      # Init script
```

---

## 🌐 Custom Domain (Optional)

To use your own domain:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS setup instructions
4. Wait for SSL certificate provisioning (up to 24 hours)

---

## 📊 Monitoring

View your site's usage and performance:

- [Firebase Console](https://console.firebase.google.com/) → Hosting
- Check Analytics, Performance, and Crash reports

---

## 🔄 Continuous Deployment (Optional)

For automatic deployments on git push:

1. Use GitHub Actions
2. Or Firebase Hosting GitHub integration
3. Or run `npx firebase-tools init hosting:github`

---

## 📝 Important Notes

- **Never commit your actual Firebase credentials** to public repositories
- The `.env.example` file is a template - create your own `.env` file
- Build before every deployment: `npm run build`
- Test locally first: `npm run dev`
- First deployment may take 5-10 minutes
- Subsequent deployments are faster (1-2 minutes)

---

## ✅ Deployment Checklist

Before deploying:

- [ ] Firebase credentials configured in `src/firebase/config.js`
- [ ] Dependencies installed (`npm install`)
- [ ] Code tested locally (`npm run dev`)
- [ ] Production build successful (`npm run build`)
- [ ] Firebase project initialized (`.firebaserc` exists)
- [ ] Logged into Firebase (`npx firebase-tools login`)
- [ ] Firestore rules configured
- [ ] Storage rules configured

---

## 📞 Need Help?

- Firebase Documentation: https://firebase.google.com/docs/hosting
- Firebase Support: https://firebase.google.com/support
- Vite Documentation: https://vitejs.dev/

---

**Good luck with your deployment! 🚀**
