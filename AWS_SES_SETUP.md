# AWS SES Email Setup Guide

## Step 1: Verify Your Email Address

1. Go to AWS SES Console: https://console.aws.amazon.com/ses
2. Click "Verified identities" in left menu
3. Click "Create identity"
4. Select "Email address"
5. Enter your email (e.g., `your-email@gmail.com`)
6. Click "Create identity"
7. **Check your email** and click the verification link
8. Wait for status to show "Verified"

## Step 2: Request Production Access (Optional)

By default, SES is in **Sandbox mode** - you can only send to verified emails.

**For testing:** Stay in sandbox mode (free, works fine)

**For production:**
1. Click "Account dashboard" in left menu
2. Click "Request production access"
3. Fill the form (takes 24 hours for approval)

## Step 3: Update Backend .env

Add to `server/.env`:

```env
SES_FROM_EMAIL=your-verified-email@gmail.com
```

**Note:** Use the same email you verified in Step 1

## Step 4: Restart Backend

```bash
cd server
npm run dev
```

## Testing

1. Place an order as a customer
2. Check your email inbox
3. You should receive an order confirmation email

## Sandbox Mode Limitations

In sandbox mode, you can only send emails to:
- Verified email addresses
- Your own email

**To send to any email:** Request production access (Step 2)

## Cost

- **Free Tier:** 62,000 emails/month (if sending from EC2)
- **After free tier:** $0.10 per 1,000 emails
- Very affordable!

## Troubleshooting

### Email not received
- Check spam folder
- Verify email address is verified in SES
- Check backend terminal for errors
- Ensure SES_FROM_EMAIL matches verified email

### "Email address not verified" error
- Verify the sender email in SES console
- Wait for verification email and click link
- Update .env with verified email

### "Access Denied" error
- Your IAM user needs SES permissions
- Add `AmazonSESFullAccess` policy to IAM user

## Email Templates

The system sends:
- ✅ Order confirmation (when order is placed)

You can add more:
- Order shipped notification
- Order delivered notification
- Password reset emails
- Welcome emails

## Customization

Edit `server/src/config/email.js` to:
- Change email design
- Add company logo
- Modify email content
- Add more email types
