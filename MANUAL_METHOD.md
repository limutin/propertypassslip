# 🔧 Manual Method - Using Command Prompt

## If the .bat files don't work, do this instead:

This method is more reliable and lets you see what's happening.

---

## Step 1: Open Command Prompt in Your Project Folder

### Method A (Easy way):
1. Open File Explorer
2. Navigate to: `c:\Users\ACER\Desktop\PropertyPassslip\propertypassslip`
3. Click in the **address bar** at the top (where it shows the path)
4. Type: `cmd`
5. Press **Enter**
6. A black Command Prompt window will open

### Method B (Alternative):
1. Right-click the `propertypassslip` folder
2. Select "Open in Terminal" or "Open Command Window Here"

---

## Step 2: Login to Firebase

In the Command Prompt window, type this **exactly** and press Enter:

```
npx firebase-tools login
```

**What happens:**
- You'll see: "Waiting for authentication..."
- Your web browser will open
- Sign in with your Google account
- You'll see "Success!" in the browser
- Close the browser tab
- Go back to Command Prompt
- You'll see: "✔ Success! Logged in as your@email.com"

✅ **Done!** Move to Step 3.

---

## Step 3: Initialize Firebase Project

In the same Command Prompt window, type:

```
npx firebase-tools init
```

**Now answer the questions:**

### Question 1: Which Firebase features?
```
? Which Firebase features do you want to set up for this directory?
  ( ) Firestore
  ( ) Functions
❯ ( ) Hosting
  ( ) Storage
```
- Use **arrow keys** to move to "Hosting"
- Press **SPACEBAR** to select it (you'll see an `X` or `*`)
- Press **ENTER**

### Question 2: Project Setup
```
? Please select an option:
❯ Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
```
- Choose: **Use an existing project**
- Press **ENTER**

### Question 3: Select Your Project
```
? Select a default Firebase project for this directory:
  project-1
❯ your-project-name
  project-3
```
- Use **arrow keys** to find YOUR project
- Press **ENTER**

### Question 4: Public Directory
```
? What do you want to use as your public directory? (public)
```
- Type: **dist**
- Press **ENTER**

### Question 5: Single-page App
```
? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
```
- Type: **Y**
- Press **ENTER**

### Question 6: GitHub Setup
```
? Set up automatic builds and deploys with GitHub? (y/N)
```
- Type: **N**
- Press **ENTER**

### Question 7: Overwrite index.html
```
? File dist/index.html already exists. Overwrite? (y/N)
```
**IF this question appears:**
- Type: **N**
- Press **ENTER**

**You'll see:**
```
✔ Firebase initialization complete!
```

✅ **Done!** Move to Step 4.

---

## Step 4: Install Dependencies

In the same Command Prompt window, type:

```
npm install
```

This will take 1-2 minutes. Wait for it to finish.

✅ **Done!** Move to Step 5.

---

## Step 5: Build Your Project

Type:

```
npm run build
```

This creates the `dist` folder that will be deployed.

You'll see:
```
✓ built in 5.23s
```

✅ **Done!** Move to Step 6.

---

## Step 6: Deploy to Firebase

Type:

```
npx firebase-tools deploy --only hosting
```

**What happens:**
- You'll see: "Deploying to 'your-project-id'..."
- Wait 1-2 minutes
- You'll see:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project/overview
Hosting URL: https://your-project.web.app
```

🎉 **THAT'S YOUR LIVE WEBSITE URL!**

---

## Step 7: Open Your Website

1. Copy the Hosting URL from Step 6
2. Open your web browser
3. Paste the URL
4. Press Enter

**Your website is live!** 🎊

---

## 🔄 To Deploy Updates Later

Just run these 2 commands:

```
npm run build
npx firebase-tools deploy --only hosting
```

Done! Your changes are live.

---

## 📋 Quick Reference - All Commands

```bash
# One-time setup
npx firebase-tools login
npx firebase-tools init
npm install

# Every deployment
npm run build
npx firebase-tools deploy --only hosting
```

---

## ❓ Troubleshooting

### "npx not recognized"
**Solution:** Install Node.js from https://nodejs.org/

### "Firebase command failed"
**Solution:** 
1. Close Command Prompt
2. Open a new one
3. Try again

### "Not authorized"
**Solution:** Run the login command again:
```
npx firebase-tools login
```

### "Build failed"
**Solution:** Make sure you updated `src/firebase/config.js` with your real Firebase credentials

### "Permission denied"
**Solution:** Run Command Prompt as Administrator:
- Search for "cmd" in Start Menu
- Right-click "Command Prompt"
- Select "Run as administrator"
- Navigate to your project folder
- Try again

---

## ✅ Success Checklist

- [ ] Logged in to Firebase
- [ ] Initialized Firebase project
- [ ] `.firebaserc` file created in project folder
- [ ] Dependencies installed
- [ ] Project built successfully
- [ ] Deployed to Firebase
- [ ] Website opens in browser

---

This manual method is more reliable than the batch files!
