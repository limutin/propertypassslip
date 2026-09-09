# Deploy PropertyPassSlip to Firebase

## Step 1: Enable PowerShell Scripts (One-time setup)

Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Step 2: Install Firebase CLI (if not already installed)

```powershell
npm install -g firebase-tools
```

## Step 3: Login to Firebase

```powershell
firebase login
```

This will open your browser to authenticate with your Google account.

## Step 4: Initialize Firebase Project (if not already done)

```powershell
firebase init
```

Select:
- **Hosting** (use arrow keys and spacebar)
- Choose "Use an existing project" or "Create a new project"
- For public directory, enter: **dist**
- Configure as single-page app: **Yes**
- Set up automatic builds with GitHub: **No** (for now)

## Step 5: Configure Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ > Project Settings
4. Scroll down to "Your apps" section
5. Click the web icon `</>` to add a web app (if not already added)
6. Copy the config values and update `src/firebase/config.js`

## Step 6: Build Your Project

```powershell
npm run build
```

This creates an optimized production build in the `dist` folder.

## Step 7: Deploy to Firebase

```powershell
firebase deploy
```

Or deploy only hosting:
```powershell
firebase deploy --only hosting
```

## Step 8: View Your Live Site

After deployment completes, you'll see:
```
✔  Deploy complete!

Hosting URL: https://your-project-id.web.app
```

---

## Quick Deploy Commands (After Initial Setup)

```powershell
# Build and deploy in one go
npm run build ; firebase deploy --only hosting

# Check deployment status
firebase hosting:channel:list

# Open hosting site
firebase open hosting:site
```

---

## Troubleshooting

### Issue: "Firebase config not found"
- Make sure you've run `firebase init` in the project directory
- Check that `.firebaserc` file exists

### Issue: "Build folder not found"
- Run `npm run build` before deploying
- Verify that `dist` folder is created

### Issue: "Deployment fails"
- Check that you're logged in: `firebase login`
- Verify project exists: `firebase projects:list`
- Try `firebase deploy --debug` for more details

---

## Environment Variables (.env)

Don't forget to create a `.env` file based on `.env.example` for local development.
For production, Firebase config is in `src/firebase/config.js`.

**Important**: Never commit your actual Firebase credentials to version control!
