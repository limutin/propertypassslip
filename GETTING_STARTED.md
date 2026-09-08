# Getting Started - Quick Setup (5 Minutes)

This guide will get you up and running with the Property Pass Slip Web Tracker in just a few minutes.

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js installed (version 18 or higher)
- ✅ A Google account (for Firebase)
- ✅ Internet connection
- ✅ A code editor (VS Code recommended)
- ✅ Command line/terminal access

To check Node.js version:
```bash
node --version
```

If you don't have Node.js, download it from: https://nodejs.org/

## Step 1: Install Dependencies (2 minutes)

Open a terminal in the `property-pass-slip-tracker` folder and run:

```bash
npm install
```

Wait for all packages to install. You'll see a progress bar.

## Step 2: Set Up Firebase (2 minutes)

### A. Create Firebase Project
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Name it: `property-pass-slip-tracker`
4. Click through the setup wizard

### B. Enable Services
In your Firebase project:

**Firestore:**
1. Click "Firestore Database" → "Create database"
2. Start in production mode → Choose region: `asia-southeast1`

**Authentication:**
1. Click "Authentication" → "Get started"
2. Enable "Email/Password" → Save

**Storage:**
1. Click "Storage" → "Get started"
2. Use default rules → Choose same region

### C. Get Configuration
1. Click ⚙️ (Settings) → "Project settings"
2. Scroll to "Your apps" → Click web icon `</>`
3. Register app name: `Property Pass Slip Tracker`
4. Copy the `firebaseConfig` object

### D. Update Your Code
1. Open `src/firebase/config.js`
2. Replace the placeholder config with your copied values
3. Save the file

## Step 3: Add Logos (1 minute)

1. Download DILG and LPRC logos (from provided links)
2. Save them in the `public` folder:
   - `public/dilg-logo.png`
   - `public/lprc-logo.png`

*Note: The app will work without logos, but they won't display.*

## Step 4: Create Admin User (1 minute)

1. Go to Firebase Console → Authentication
2. Click "Add user"
3. Enter:
   - Email: `admin@dilgmisocc.gov.ph`
   - Password: [Create a strong password]
4. Click "Add user"
5. **Save these credentials!**

## Step 5: Deploy Security Rules (1 minute)

### Firestore Rules
1. Firebase Console → Firestore → Rules tab
2. Copy content from `firestore.rules` file
3. Paste and click "Publish"

### Storage Rules
1. Firebase Console → Storage → Rules tab
2. Copy content from `storage.rules` file
3. Paste and click "Publish"

## Step 6: Run the App! (30 seconds)

```bash
npm run dev
```

Open your browser to: http://localhost:5173

## Testing Your Setup

### Test 1: Landing Page
- You should see the DILG header
- Two buttons: "Get Started" and "Admin Login"

### Test 2: Submit Pass Slip
1. Click "Get Started"
2. Fill out the form
3. Click "Submit Pass Slip"
4. You should see a success message

### Test 3: Admin Dashboard
1. Go back to home
2. Click "Admin Login"
3. Use admin credentials you created
4. You should see the dashboard with your submitted pass slip

## Troubleshooting

### Problem: `npm install` fails
**Solution:** 
```bash
npm cache clean --force
npm install
```

### Problem: Can't log in as admin
**Solution:** 
- Check email/password in Firebase Console → Authentication
- Make sure Authentication is enabled

### Problem: Form submission fails
**Solution:** 
- Check Firebase config in `src/firebase/config.js`
- Check browser console for errors (F12)
- Verify Firestore and Storage are enabled

### Problem: Logos don't show
**Solution:** 
- Verify files are named exactly: `dilg-logo.png` and `lprc-logo.png`
- Check they're in the `public` folder, not `src`

### Problem: Port 5173 already in use
**Solution:** 
```bash
npm run dev -- --port 3000
```

## What's Next?

### For Development
- Customize colors in `tailwind.config.js`
- Modify form fields in `src/pages/PassSlipForm.jsx`
- Add more analytics in `src/pages/AdminDashboard.jsx`

### For Production
1. Build the app: `npm run build`
2. Test the build: `npm run preview`
3. Deploy to Firebase Hosting (see SETUP_GUIDE.md)

## Need More Help?

📖 **Detailed Setup**: See `SETUP_GUIDE.md`
📋 **Deployment**: See `DEPLOYMENT_CHECKLIST.md`
🔧 **Commands**: See `QUICK_REFERENCE.md`
📊 **Project Info**: See `PROJECT_SUMMARY.md`

## Support Contacts

- **Firebase Issues**: https://firebase.google.com/support
- **DILG Contact**: (088) 531-1007 | dilg10.misocc@gmail.com

---

## Quick Command Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Update packages
npm update
```

---

**🎉 Congratulations!** Your Property Pass Slip Web Tracker is now running!

If everything works, you're ready to use the application. For production deployment, follow the SETUP_GUIDE.md.
