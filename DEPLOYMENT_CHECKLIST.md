# Deployment Checklist

Use this checklist before deploying your Property Pass Slip Web Tracker to production.

## Pre-Deployment

### Firebase Configuration
- [ ] Firebase project created
- [ ] Firestore Database enabled and configured
- [ ] Firebase Authentication enabled (Email/Password)
- [ ] Firebase Storage enabled
- [ ] Firebase config added to `src/firebase/config.js`
- [ ] Firestore security rules deployed
- [ ] Storage security rules deployed
- [ ] Firestore indexes created (if needed)

### Application Setup
- [ ] All dependencies installed (`npm install`)
- [ ] Logo images added to `public` folder:
  - [ ] `dilg-logo.png`
  - [ ] `lprc-logo.png`
- [ ] Application builds successfully (`npm run build`)
- [ ] No console errors in development mode
- [ ] All forms validate correctly
- [ ] PDF generation works properly

### Admin Setup
- [ ] Admin user created in Firebase Authentication
- [ ] Admin credentials documented securely
- [ ] Admin can log in successfully
- [ ] Admin dashboard displays correctly
- [ ] Analytics charts render properly

### Testing
- [ ] Can submit a pass slip from public form
- [ ] Pass slip is saved to Firestore
- [ ] PDF is generated and uploaded to Storage
- [ ] Admin can view all pass slips in dashboard
- [ ] Admin can mark items as returned
- [ ] Search and filter work correctly
- [ ] All navigation links work
- [ ] Responsive design works on mobile devices
- [ ] All images load correctly
- [ ] Form validation works properly

### Security
- [ ] Security rules tested and working
- [ ] Admin routes are protected
- [ ] No sensitive data in console logs
- [ ] Firebase config not exposed in public repositories
- [ ] CORS configured correctly for Firebase Storage

### Performance
- [ ] Application loads in < 3 seconds
- [ ] Images are optimized
- [ ] Build size is reasonable (check `dist` folder)
- [ ] No memory leaks in long sessions

### Content
- [ ] All text reviewed for accuracy
- [ ] Contact information is correct:
  - [ ] Phone: (088) 531-1007
  - [ ] Email: dilg10.misocc@gmail.com
  - [ ] Facebook: www.facebook.com/dilgmisoccprovince
- [ ] Official names and titles verified:
  - [ ] Provincial Director: EDWARD G. BHAGWANI, JD, MNSA, CESO V
  - [ ] Property Custodian: MARY LOUISE T. IDULSA - Administrative Aide IV
- [ ] Tagline present: "Matino, Mahuway at Maaphan"

## Deployment

### Build
- [ ] Run `npm run build` successfully
- [ ] Check `dist` folder for output
- [ ] Test built files with `npm run preview`

### Hosting
- [ ] Hosting service chosen (Firebase Hosting, Vercel, Netlify, etc.)
- [ ] Domain configured (if custom domain)
- [ ] SSL certificate active (HTTPS)
- [ ] Deployment successful
- [ ] Production URL accessible

### Post-Deployment Testing
- [ ] Visit production URL
- [ ] Test form submission in production
- [ ] Test admin login in production
- [ ] Test PDF download in production
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

## Optional Features

### Email Notifications (Cloud Functions)
- [ ] Cloud Functions initialized
- [ ] Email service configured (Gmail/SendGrid)
- [ ] Email credentials secured
- [ ] `sendPassSlipEmail` function deployed
- [ ] `sendReturnNotification` function deployed
- [ ] `sendReminders` function deployed (optional)
- [ ] Test email delivery

### Monitoring
- [ ] Firebase Analytics enabled (optional)
- [ ] Error logging configured
- [ ] Usage monitoring set up
- [ ] Quota alerts configured

### Backup
- [ ] Firestore backup strategy in place
- [ ] Storage backup strategy in place
- [ ] Admin credentials backed up securely

## Documentation

- [ ] README.md updated
- [ ] SETUP_GUIDE.md reviewed
- [ ] Admin user guide created (optional)
- [ ] End-user instructions created (optional)

## Handover (if applicable)

- [ ] Admin credentials shared securely
- [ ] Firebase project ownership transferred
- [ ] Documentation provided
- [ ] Training session completed
- [ ] Support contact established

## Launch

- [ ] Announce to stakeholders
- [ ] Inform potential users
- [ ] Monitor for issues in first 24-48 hours
- [ ] Be available for support

## Post-Launch

- [ ] Monitor Firebase usage
- [ ] Check error logs regularly
- [ ] Gather user feedback
- [ ] Plan for updates and improvements

---

## Emergency Rollback Plan

If issues occur after deployment:

1. **Revert to previous version** (if using version control)
2. **Check Firebase Console** for errors
3. **Review Firestore rules** - temporarily make more permissive if needed
4. **Disable Cloud Functions** if they're causing issues
5. **Contact support** if Firebase service issues

## Support Contacts

- **Firebase Support**: https://firebase.google.com/support
- **Project Developer**: [Your contact info]
- **DILG Contact**: (088) 531-1007 | dilg10.misocc@gmail.com

---

**Date Deployed**: _____________

**Deployed By**: _____________

**Production URL**: _____________

**Notes**:
