// Firebase Cloud Functions for Property Pass Slip Web Tracker
// This file contains Cloud Functions for email notifications and PDF generation

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure email transporter
// Option 1: Using Gmail (for development/testing)
// Note: For production, use SendGrid, AWS SES, or other email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Use App Password, not regular password
  }
});

// Option 2: Using SendGrid (recommended for production)
/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);
*/

/**
 * Cloud Function to send email with PDF attachment when a pass slip is created
 * Triggers on new document creation in passSlips collection
 */
exports.sendPassSlipEmail = functions.firestore
  .document('passSlips/{passSlipId}')
  .onCreate(async (snap, context) => {
    const passSlipData = snap.data();
    const passSlipId = context.params.passSlipId;

    try {
      // Get PDF URL from Storage
      const pdfUrl = passSlipData.pdfUrl;
      
      if (!pdfUrl) {
        console.error('No PDF URL found for pass slip:', passSlipId);
        return null;
      }

      // Prepare email content
      const mailOptions = {
        from: 'DILG Misamis Occidental <your-email@gmail.com>',
        to: passSlipData.email,
        subject: `Property Pass Slip - ${passSlipData.passSlipNo}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0A2A5E; color: white; padding: 20px; text-align: center;">
              <h1>Property Pass Slip</h1>
              <p>DILG Misamis Occidental Provincial Office</p>
            </div>
            
            <div style="padding: 20px; background-color: #f9fafb;">
              <h2 style="color: #0A2A5E;">Pass Slip Submitted Successfully</h2>
              
              <p>Dear ${passSlipData.requestedBy},</p>
              
              <p>Your Property Pass Slip has been successfully submitted and recorded in our system.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #0A2A5E; margin-top: 0;">Pass Slip Details:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Pass Slip No.:</strong> ${passSlipData.passSlipNo}</li>
                  <li><strong>Date:</strong> ${new Date(passSlipData.date.toDate()).toLocaleDateString()}</li>
                  <li><strong>Office:</strong> ${passSlipData.office}</li>
                  <li><strong>Items:</strong> ${passSlipData.properties.length} item(s)</li>
                </ul>
              </div>
              
              <p>A PDF copy of your pass slip is attached to this email. Please present this when borrowing/releasing the property.</p>
              
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0;">
                <strong>Important:</strong> Please ensure all items are returned in good condition by the specified date.
              </div>
              
              <p>If you have any questions, please contact us:</p>
              <ul>
                <li><strong>Phone:</strong> (088) 531-1007</li>
                <li><strong>Email:</strong> dilg10.misocc@gmail.com</li>
              </ul>
            </div>
            
            <div style="background-color: #0A2A5E; color: white; padding: 15px; text-align: center; margin-top: 20px;">
              <p style="margin: 5px 0; font-style: italic;">"Matino, Mahuway at Maaphan"</p>
              <p style="margin: 5px 0; font-size: 12px;">
                DILG Misamis Occidental Provincial Office<br>
                PEO Compound, Capitol Drive, Lower Lamac, Oroquieta City
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `${passSlipData.passSlipNo}.pdf`,
            path: pdfUrl
          }
        ]
      };

      // Send email
      await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully for pass slip:', passSlipId);
      return null;

    } catch (error) {
      console.error('Error sending email:', error);
      return null;
    }
  });

/**
 * Cloud Function to send notification when return status is updated
 */
exports.sendReturnNotification = functions.firestore
  .document('passSlips/{passSlipId}')
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const passSlipId = context.params.passSlipId;

    // Check if return status was updated
    if (beforeData.status === 'borrowed' && afterData.status === 'returned') {
      try {
        const mailOptions = {
          from: 'DILG Misamis Occidental <your-email@gmail.com>',
          to: afterData.email,
          subject: `Property Returned - ${afterData.passSlipNo}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #0A2A5E; color: white; padding: 20px; text-align: center;">
                <h1>Property Returned</h1>
              </div>
              
              <div style="padding: 20px;">
                <p>Dear ${afterData.requestedBy},</p>
                
                <p>This is to confirm that the property listed in Pass Slip No. <strong>${afterData.passSlipNo}</strong> has been returned.</p>
                
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="color: #0A2A5E;">Return Details:</h3>
                  <ul>
                    <li><strong>Returned By:</strong> ${afterData.returnStatus.returnedBy}</li>
                    <li><strong>Returned On:</strong> ${new Date(afterData.returnStatus.returnedOn.toDate()).toLocaleDateString()}</li>
                    <li><strong>Condition:</strong> ${afterData.returnStatus.condition === 'Good' ? 'In Good Condition' : 'With Issues'}</li>
                    ${afterData.returnStatus.remarks ? `<li><strong>Remarks:</strong> ${afterData.returnStatus.remarks}</li>` : ''}
                  </ul>
                </div>
                
                <p>Thank you for your cooperation.</p>
              </div>
              
              <div style="background-color: #0A2A5E; color: white; padding: 15px; text-align: center;">
                <p style="margin: 5px 0; font-style: italic;">"Matino, Mahuway at Maaphan"</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Return notification sent for pass slip:', passSlipId);
        
      } catch (error) {
        console.error('Error sending return notification:', error);
      }
    }

    return null;
  });

/**
 * Scheduled function to send reminders for unreturned items
 * Runs daily at 9:00 AM
 */
exports.sendReminders = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone('Asia/Manila')
  .onRun(async (context) => {
    const db = admin.firestore();
    const now = new Date();
    
    try {
      // Get all borrowed pass slips with temporary release
      const snapshot = await db.collection('passSlips')
        .where('status', '==', 'borrowed')
        .where('movementType.temporaryRelease', '==', true)
        .get();

      const reminders = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        const toDate = data.movementType.toDate.toDate();
        
        // Send reminder if due date is tomorrow or past due
        const daysUntilDue = Math.ceil((toDate - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDue <= 1 && daysUntilDue >= -7) {
          reminders.push({
            email: data.email,
            name: data.requestedBy,
            passSlipNo: data.passSlipNo,
            dueDate: toDate.toLocaleDateString(),
            isOverdue: daysUntilDue < 0
          });
        }
      });

      // Send reminder emails
      for (const reminder of reminders) {
        const mailOptions = {
          from: 'DILG Misamis Occidental <your-email@gmail.com>',
          to: reminder.email,
          subject: `${reminder.isOverdue ? 'OVERDUE: ' : 'Reminder: '}Property Return - ${reminder.passSlipNo}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: ${reminder.isOverdue ? '#dc2626' : '#0A2A5E'}; color: white; padding: 20px; text-align: center;">
                <h1>${reminder.isOverdue ? '⚠️ OVERDUE' : '🔔 Reminder'}</h1>
              </div>
              
              <div style="padding: 20px;">
                <p>Dear ${reminder.name},</p>
                
                <p>This is a ${reminder.isOverdue ? '<strong>reminder that your borrowed property is OVERDUE</strong>' : 'friendly reminder'} regarding Pass Slip No. <strong>${reminder.passSlipNo}</strong>.</p>
                
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p><strong>Due Date:</strong> ${reminder.dueDate}</p>
                  ${reminder.isOverdue ? '<p style="color: #dc2626;"><strong>Status: OVERDUE</strong></p>' : ''}
                </div>
                
                <p>Please return the borrowed property at your earliest convenience.</p>
                
                <p>If you have any concerns, please contact us at (088) 531-1007.</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
      }

      console.log(`Sent ${reminders.length} reminder emails`);
      return null;

    } catch (error) {
      console.error('Error sending reminders:', error);
      return null;
    }
  });
