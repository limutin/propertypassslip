# Quick Reference Guide

## Common Commands

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy Cloud Functions
firebase deploy --only functions

# Deploy everything
firebase deploy

# View Firebase logs
firebase functions:log
```

### Troubleshooting

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force

# Check for outdated packages
npm outdated

# Update packages
npm update

# Security audit
npm audit
npm audit fix
```

## Project Structure

```
property-pass-slip-tracker/
├── public/                      # Static assets
│   ├── dilg-logo.png           # DILG logo
│   └── lprc-logo.png           # LPRC logo
├── src/
│   ├── assets/                 # Additional assets (optional)
│   ├── components/             # Reusable components
│   │   ├── BarChart.jsx
│   │   ├── Navbar.jsx
│   │   ├── PieChart.jsx
│   │   ├── PropertyRow.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/               # React contexts
│   │   └── AuthContext.jsx
│   ├── firebase/               # Firebase configuration
│   │   ├── config.js
│   │   └── functions.js
│   ├── pages/                  # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── LandingPage.jsx
│   │   └── PassSlipForm.jsx
│   ├── utils/                  # Utility functions
│   │   └── pdfGenerator.js
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── functions/                  # Firebase Cloud Functions
│   ├── index.js
│   └── package.json
├── .env.example               # Environment variables template
├── .gitignore
├── firebase.json              # Firebase configuration
├── firestore.indexes.json     # Firestore indexes
├── firestore.rules            # Firestore security rules
├── index.html                 # HTML template
├── package.json               # Dependencies
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Project documentation
├── storage.rules              # Storage security rules
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.js             # Vite configuration
```

## Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | LandingPage | Public |
| `/pass-slip` | PassSlipForm | Public |
| `/admin/login` | AdminLogin | Public |
| `/admin/dashboard` | AdminDashboard | Protected (Admin only) |

## Firebase Collections

### passSlips
```javascript
{
  passSlipNo: "PPS-20260908-001",
  date: Timestamp,
  requestedBy: "John Doe",
  signature: "John Doe",
  office: "IT Department",
  email: "john@example.com",
  properties: [
    {
      description: "Laptop",
      serialNumber: "SN12345",
      quantity: 1,
      condition: "Good"
    }
  ],
  purpose: "Work from home",
  movementType: {
    bringingOut: true,
    temporaryRelease: false,
    fromDate: null,
    toDate: null
  },
  authorizedBy: {
    name: "EDWARD G. BHAGWANI, JD, MNSA, CESO V",
    title: "Provincial Director",
    date: Timestamp
  },
  securityCheck: {
    verified: true,
    custodianName: "MARY LOUISE T. IDULSA",
    custodianTitle: "Administrative Aide IV"
  },
  returnStatus: {
    returnedBy: null,
    returnedOn: null,
    condition: null,
    remarks: null
  },
  status: "borrowed",
  pdfUrl: "https://...",
  createdAt: Timestamp
}
```

## Key Functions

### Firebase Functions (`src/firebase/functions.js`)

```javascript
// Generate unique pass slip number
generatePassSlipNumber()

// Create new pass slip
createPassSlip(passSlipData)

// Get all pass slips
getAllPassSlips()

// Update return status
updateReturnStatus(passSlipId, returnData)

// Upload PDF to storage
uploadPDF(pdfBlob, passSlipNo)

// Update pass slip with PDF URL
updatePassSlipPDF(passSlipId, pdfUrl)
```

### PDF Generator (`src/utils/pdfGenerator.js`)

```javascript
// Generate PDF from pass slip data
generatePDF(passSlipData)
```

### Auth Context (`src/contexts/AuthContext.jsx`)

```javascript
// Get current user
const { currentUser } = useAuth()

// Login
const { login } = useAuth()
await login(email, password)

// Logout
const { logout } = useAuth()
await logout()
```

## Environment Variables

Create `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Color Palette

```css
Navy Blue (Primary): #0A2A5E
Navy Dark: #1B2A4A
Gray: #6B7280
Light Gray: #E5E7EB
White: #FFFFFF
```

## Default Admin Configuration

```javascript
// Authorized By
Name: EDWARD G. BHAGWANI, JD, MNSA, CESO V
Title: Provincial Director

// Property Custodian
Name: MARY LOUISE T. IDULSA
Title: Administrative Aide IV
```

## Contact Information

```
Tel: (088) 531-1007
Email: dilg10.misocc@gmail.com
Facebook: www.facebook.com/dilgmisoccprovince
Website: www.region10.dilg.gov.ph
Address: PEO Compound, Capitol Drive, Lower Lamac, Oroquieta City
```

## Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

## Common Issues & Solutions

### Issue: Module not found
```bash
npm install
```

### Issue: Port already in use
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Issue: Firebase permission denied
- Check Firestore/Storage security rules
- Verify authentication token
- Check user permissions

### Issue: PDF not generating
- Check browser console for errors
- Verify jsPDF installation
- Check data format

### Issue: Images not loading
- Verify files are in `public` folder
- Check file names (case-sensitive)
- Clear browser cache

## Testing Checklist

- [ ] Form submission works
- [ ] PDF generates correctly
- [ ] Admin login works
- [ ] Dashboard displays data
- [ ] Charts render
- [ ] Search/filter works
- [ ] Mark as returned works
- [ ] Responsive on mobile
- [ ] All links work

## Deployment URLs

- **Development**: http://localhost:5173
- **Production**: [Your production URL]
- **Firebase Console**: https://console.firebase.google.com/project/[your-project-id]

---

**Last Updated**: September 8, 2026
