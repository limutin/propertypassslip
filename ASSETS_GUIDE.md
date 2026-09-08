# Assets Guide

## ✅ Assets Already Added

The following assets have been successfully copied to your project:

### Public Folder (`public/`)
- ✅ **dilg-logo.png** - DILG logo (displays in header)
- ✅ **lprc-logo.png** - Sub-LGRRC logo (displays in header)

These logos will now appear on:
- Landing page header
- Pass slip form header
- Generated PDF documents

## 📁 Asset Locations

### Current Structure
```
property-pass-slip-tracker/
├── public/
│   ├── dilg-logo.png     ✅ Copied
│   └── lprc-logo.png     ✅ Copied
└── src/
    └── assets/           (for additional assets)
```

## 🎨 Optional Additional Assets

You can add these optional assets to enhance your PDFs and application:

### For PDF Enhancement

#### 1. Bagong Pilipinas Logo
- **Location**: `public/bagong-pilipinas-logo.png`
- **Usage**: Top of PDF header (official template)
- **Recommended size**: 100x100px or similar

#### 2. Footer Logo (Intensity Logo)
- **Location**: `public/footer-logo.png`
- **Usage**: Bottom of PDF with tagline
- **Recommended size**: Width 150-200px

#### 3. Signature Images
Create folder: `public/signatures/`
- `public/signatures/director-signature.png` - Provincial Director
- `public/signatures/custodian-signature.png` - Property Custodian
- **Usage**: Authorized by and Security check sections
- **Recommended**: Transparent PNG, ~200x80px

### For Web Application

#### Favicon
- **Location**: `public/favicon.ico` or `public/favicon.png`
- **Usage**: Browser tab icon
- **Size**: 32x32px or 16x16px
- **Note**: Currently uses DILG logo as favicon

#### Loading/Placeholder Images
- **Location**: `src/assets/`
- **Usage**: Loading states, empty states, etc.

## 🔄 How to Add More Assets

### For Web Application (public folder)

1. Copy your asset file to the `public` folder:
```bash
# Example: Copy a new logo
Copy-Item "path\to\your\new-logo.png" -Destination "property-pass-slip-tracker\public\new-logo.png"
```

2. Reference in your code:
```jsx
<img src="/new-logo.png" alt="Description" />
```

### For Components (src/assets folder)

1. Create assets folder if it doesn't exist:
```bash
New-Item -ItemType Directory -Path "property-pass-slip-tracker\src\assets" -Force
```

2. Copy files there:
```bash
Copy-Item "path\to\image.png" -Destination "property-pass-slip-tracker\src\assets\image.png"
```

3. Import in your component:
```jsx
import imageName from '../assets/image.png'
<img src={imageName} alt="Description" />
```

## 📐 Image Specifications

### Logo Requirements

#### DILG Logo ✅
- Format: PNG with transparency
- Current: Already added
- Used in: Header, PDF

#### LPRC Logo ✅
- Format: PNG with transparency  
- Current: Already added
- Used in: Header, PDF

#### Recommended Specifications
- **Format**: PNG (with transparency) or JPG
- **Quality**: High resolution, but optimized for web
- **Max file size**: < 500KB for web performance
- **Logo dimensions**: 100-200px width recommended

### PDF Assets
For best PDF quality:
- **Resolution**: 300 DPI for print quality
- **Format**: PNG preferred (transparent background)
- **Size**: Keep under 1MB per image

## 🎨 Image Optimization

If your images are too large, you can optimize them:

### Online Tools (Free)
- **TinyPNG**: https://tinypng.com/ (PNG compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **Compressor.io**: https://compressor.io/

### Recommended Settings
- PNG: Use PNG-8 if possible (smaller) or PNG-24 for quality
- JPEG: 80-90% quality is usually sufficient
- Target size: < 200KB per logo for web

## 🔧 Using Assets in Code

### In React Components

```jsx
// Public folder assets (use absolute path)
<img src="/dilg-logo.png" alt="DILG Logo" />
<img src="/lprc-logo.png" alt="LPRC Logo" />

// With error handling
<img 
  src="/dilg-logo.png" 
  alt="DILG Logo" 
  onError={(e) => {
    e.target.style.display = 'none';
  }}
/>
```

### In PDF Generator (`src/utils/pdfGenerator.js`)

To add images to PDFs, you'll need to convert them to base64 or use image URLs.

Example modification:
```javascript
// Add image to PDF
const addImageToPDF = (doc, imagePath, x, y, width, height) => {
  // For public assets, use the URL
  const imageUrl = `${window.location.origin}${imagePath}`;
  doc.addImage(imageUrl, 'PNG', x, y, width, height);
};

// Usage
addImageToPDF(doc, '/dilg-logo.png', 20, 10, 30, 30);
```

## 📝 Asset Checklist

### Required (Already Complete) ✅
- ✅ DILG logo
- ✅ LPRC/Sub-LGRRC logo

### Optional (To Enhance)
- [ ] Bagong Pilipinas logo
- [ ] Footer/Intensity logo
- [ ] Director signature image
- [ ] Custodian signature image
- [ ] Custom favicon
- [ ] Loading spinner/animation
- [ ] Empty state illustrations

## 🚀 Current Status

**Your application is fully functional with the current assets!**

The two main logos (DILG and LPRC) are now in place and will display correctly when you run the application.

To test:
```bash
cd property-pass-slip-tracker
npm run dev
```

Visit http://localhost:5173 and you should see both logos in the header!

## 📞 Need Help?

If you need to add more assets or have questions:
- See QUICK_REFERENCE.md for commands
- Check PROJECT_SUMMARY.md for project structure
- Review the component files to see how assets are used

---

**Assets Status**: ✅ Ready to use!  
**Logos Added**: 2/2 required logos  
**Application Status**: Fully functional with current assets
