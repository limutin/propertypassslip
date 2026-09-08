# Property Pass Slip Web Tracker - Complete Setup Guide

This guide will walk you through setting up the Property Pass Slip Web Tracker from scratch.

## Prerequisites

Before you begin, make sure you have:
- Node.js (v18 or higher) installed
- A Google account (for Firebase)
- Basic knowledge of command line operations

## Step-by-Step Setup

### Step 1: Install Dependencies

Open a terminal in the `property-pass-slip-tracker` folder and run:

```bash
npm install
```

This will install all required packages including React, Firebase, Chart.js, jsPDF, and Tailwind CSS.

### Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: "property-pass-slip-tracker" (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### Step 3: Enable Firebase Services

#### A. Enable Firestore Database

1. In Firebase Console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (we'll add security rules later)
4. Select your region (preferably close to Philippines, e.g., "asia-southeast1")
5. Click "Enable"

#### B. Enable Authentication

1. Click on "Authentication" in the left sidebar
2. Click "Get started"
3. Click on "Email/Password" under Sign-in providers
4. Toggle "Enable" switch
5. Click "Save"

#### C. Enable Storage

1. Click on "Storage" in the left sidebar
2. Click "Get started"
3. Click "Next" (use default security rules for now)
4. Select your region (same as Firestore)
5. Click "Done"

### Step 4: Get Firebase Configuration

1. Click on the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (`</>`) to add a web app
5. Enter app nickname: "Property Pass Slip Tracker"
6. **Don't check** "Also set up Firebase Hosting" (we'll do this later)
7. Click "Register app"
8. Copy the `firebaseConfig` object shown

### Step 5: Configure Your Application

1. Open `src/firebase/config.js` in your code editor
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_FROM_FIREBASE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

3. Save the file

### Step 6: Add Logo Images

1. Download the DILG logo and LPRC logo (from the provided Google Drive links)
2. Save them in the `public` folder as:
   - `public/dilg-logo.png`
   - `public/lprc-logo.png`

Optional: Add additional assets for better PDF generation:
- Bagong Pilipinas logo
- Footer logo
- Signature images

### Step 7: Deploy Firebase Security Rules

#### Firestore Rules

1. Go to Firestore Database in Firebase Console
2. Click on "Rules" tab
3. Replace the content with the rules from `firestore.rules` file
4. Click "Publish"

#### Storage Rules

1. Go to Storage in Firebase Console
2. Click on "Rules" tab
3. Replace the content with the rules from `storage.rules` file
4. Click "Publish"

### Step 8: Create Admin User

1. Make sure your app is running: `npm run dev`
2. Go to Firebase Console > Authentication
3. Click "Add user"
4. Enter email: `admin@dilgmisocc.gov.ph` (or your preferred admin email)
5. Enter a strong password
6. Click "Add user"
7. **Save these credentials** - you'll use them to log into the admin dashboard

### Step 9: Test the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser to `http://localhost:5173`

3. Test the following:
   - Click "Get Started" and fill out a pass slip form
   - Go back and click "Admin Login"
   - Log in with the admin credentials you created
   - Check the admin dashboard

### Step 10: Deploy to Production

#### Option A: Firebase Hosting (Recommended)

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Log in to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```

Select:
- Hosting
- Use existing project (select your project)
- Public directory: `dist`
- Single-page app: `Yes`
- Don't overwrite index.html

4. Build your project:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy --only hosting
```

6. Your app will be live at: `https://your-project-id.web.app`

#### Option B: Other Hosting Services

**Vercel:**
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration
5. Deploy

**Netlify:**
1. Build your project: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder
4. Your site is live!

## Optional: Email Notifications

To enable automatic email notifications when pass slips are submitted:

### Step 1: Set Up Cloud Functions

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Initialize Cloud Functions:
```bash
firebase init functions
```

3. Choose JavaScript
4. Install dependencies

### Step 2: Configure Email Service

Edit `functions/index.js` and configure your email service:

**Option A: Gmail (Development/Testing)**
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Generate App Password in Google Account settings
  }
});
```

**Option B: SendGrid (Production - Recommended)**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Set it in Firebase config:
```bash
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
```

### Step 3: Deploy Cloud Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### Step 4: Update Firestore Rules

Allow Cloud Functions to write:
```javascript
allow write: if request.auth != null || request.auth.uid != null;
```

## Troubleshooting

### Issue: "Permission denied" errors in Firestore

**Solution:** Check your Firestore security rules in Firebase Console

### Issue: PDFs not generating

**Solution:** 
1. Check browser console for errors
2. Ensure jsPDF and jspdf-autotable are installed
3. Check if file size is too large

### Issue: Images not showing

**Solution:**
1. Verify image files are in the `public` folder
2. Check file names match exactly (case-sensitive)
3. Clear browser cache

### Issue: Admin can't log in

**Solution:**
1. Verify admin user exists in Firebase Authentication
2. Check email and password
3. Ensure Authentication is enabled in Firebase Console

### Issue: Build fails

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npm run build`

## Support

For technical issues with this application:
- Check the Firebase Console logs
- Review browser console for errors
- Consult Firebase documentation

For DILG-specific questions:
- **Tel**: (088) 531-1007
- **Email**: dilg10.misocc@gmail.com

## Next Steps

After successful setup:

1. **Customize branding**: Update colors, logos, and text to match your organization
2. **Add more fields**: Extend the pass slip form if needed
3. **Enhanced analytics**: Add more charts and reports to the dashboard
4. **Mobile app**: Consider building a mobile version using React Native
5. **QR codes**: Add QR code generation for pass slips
6. **Notifications**: Set up push notifications for admins

## Maintenance

### Regular Tasks

1. **Backup Firestore data**: 
   - Use Firebase Console or scheduled exports
   
2. **Monitor usage**:
   - Check Firebase Console for usage statistics
   - Watch for quota limits
   
3. **Update dependencies**:
```bash
npm update
npm audit fix
```

4. **Review security rules** regularly

## Cost Estimation

Firebase has a generous free tier (Spark Plan):
- **Firestore**: 1 GB storage, 50K reads/day, 20K writes/day
- **Authentication**: Unlimited users
- **Storage**: 5 GB storage, 1 GB/day downloads
- **Hosting**: 10 GB storage, 360 MB/day bandwidth

For most small to medium organizations, the free tier should be sufficient. Monitor your usage in Firebase Console.

## Security Best Practices

1. Never commit Firebase config with real credentials to public repositories
2. Use environment variables for sensitive data
3. Regularly review and update security rules
4. Enable 2FA for admin Firebase accounts
5. Regular audit logs in Firebase Console
6. Implement rate limiting for public endpoints
7. Keep all dependencies updated

---

**Congratulations!** Your Property Pass Slip Web Tracker is now set up and ready to use! 🎉
