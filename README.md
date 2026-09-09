# Property Pass Slip Web Tracker

A web application for managing property pass slips (borrowing/releasing of office property/equipment) for the DILG Misamis Occidental Provincial Office.

## Features

- **Public-facing form** for clients/employees to submit property pass slip requests
- **Admin dashboard** with analytics and tracking capabilities
- **Automatic PDF generation** that matches the official DILG template
- **Email notifications** (requires Cloud Function setup)
- **Firebase backend** for authentication, database, and storage

## Tech Stack

- **Frontend**: React with Vite
- **Backend/Database**: Firebase (Firestore, Auth, Storage)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **PDF Generation**: jsPDF with jspdf-autotable

## Setup Instructions

### 1. Install Dependencies

```bash
cd property-pass-slip-tracker
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following Firebase services:
   - **Authentication** (Email/Password provider)
   - **Firestore Database**
   - **Storage**
3. Get your Firebase configuration:
   - Go to Project Settings > General > Your apps
   - Click "Add app" and select Web
   - Copy the configuration object
4. Update `src/firebase/config.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Firestore Security Rules

Set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create pass slips
    match /passSlips/{passSlipId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update: if request.auth != null;
    }
    
    // Admin collection (if needed)
    match /admins/{adminId} {
      allow read, write: if request.auth != null;
    }
    
    // Settings collection
    match /settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Firebase Storage Rules

Set up Storage security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /pass-slips/{passSlipPdf} {
      allow read: if true;
      allow write: if request.auth != null || request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

### 5. Create Admin User

1. Run the development server:
```bash
npm run dev
```

2. Open Firebase Console > Authentication
3. Click "Add user" and create an admin account with email/password
4. Use these credentials to log into the admin dashboard

### 6. Add Logo Assets

Place the following logo files in the `public` directory:

- `public/dilg-logo.png` - DILG logo
- `public/lprc-logo.png` - LPRC logo

You can also add these optional assets for better PDF generation:
- `src/assets/bagong-pilipinas-logo.png`
- `src/assets/footer-logo.png`
- `src/assets/signatures/` (folder for signature images)

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Application Structure

### Pages

1. **Landing Page** (`/`) - Home page with "Get Started" and "Admin Login" buttons
2. **Pass Slip Form** (`/pass-slip`) - Public form for submitting pass slip requests
3. **Admin Login** (`/admin/login`) - Authentication page for administrators
4. **Admin Dashboard** (`/admin/dashboard`) - Protected dashboard with analytics and management

### Firebase Collections

#### passSlips
Stores all property pass slip records with the following structure:
- passSlipNo (auto-generated)
- date, requestedBy, office, email
- properties (array of items)
- purpose, movementType
- authorizedBy, securityCheck
- returnStatus
- status ('borrowed' or 'returned')
- pdfUrl, createdAt

## Email Notifications (Optional)

To enable email notifications, set up a Firebase Cloud Function:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize functions: `firebase init functions`
3. Implement the email sending function using Nodemailer or SendGrid
4. Deploy: `firebase deploy --only functions`

Sample Cloud Function structure is provided in the `functions/` directory.

## Color Palette

- **Navy Blue**: #0A2A5E (primary)
- **Navy Dark**: #1B2A4A
- **Gray**: #6B7280 / #E5E7EB (secondary/backgrounds)
- **White**: #FFFFFF (base)

## 🚀 Deployment

### Quick Deploy to Firebase Hosting

**For first-time setup, see:** [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

**Automated Scripts** (Windows):
1. Double-click `check-setup.bat` - Verify setup
2. Double-click `firebase-login.bat` - Login to Firebase
3. Double-click `firebase-init.bat` - Connect project
4. Update `src/firebase/config.js` with your credentials
5. Double-click `deploy.bat` - Build and deploy!

**Manual Commands**:
```bash
# First time setup
npx firebase-tools login
npx firebase-tools init
npm install

# Build and deploy
npm run build
npx firebase-tools deploy --only hosting
```

**Complete Guides**:
- 📘 [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Fast start guide
- 📗 [FIREBASE_HOSTING_GUIDE.md](FIREBASE_HOSTING_GUIDE.md) - Complete documentation
- 📕 [DEPLOY_TO_FIREBASE.md](DEPLOY_TO_FIREBASE.md) - Detailed instructions

### Other Hosting Options

- **Vercel**: Connect GitHub repository and deploy
- **Netlify**: Drag and drop the `dist` folder
- **Any static hosting**: Build with `npm run build` and upload `dist` folder

## Support

For issues or questions, contact the DILG Misamis Occidental Provincial Office:
- **Tel**: (088) 531-1007
- **Email**: dilg10.misocc@gmail.com
- **Facebook**: www.facebook.com/dilgmisoccprovince

## License

This project is developed for the Department of the Interior and Local Government (DILG) Misamis Occidental Provincial Office.
# propertypassslip
