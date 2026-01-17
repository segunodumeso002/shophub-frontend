# AWS S3 Setup Guide for Image Upload

## Step 1: Create S3 Bucket

1. Go to AWS Console: https://console.aws.amazon.com/s3
2. Click "Create bucket"
3. Bucket name: `shophub-products` (must be globally unique)
4. Region: `us-east-2` (Ohio)
5. Uncheck "Block all public access"
6. Check "I acknowledge..."
7. Click "Create bucket"

## Step 2: Configure Bucket Policy

1. Click on your bucket name
2. Go to "Permissions" tab
3. Scroll to "Bucket policy"
4. Click "Edit" and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::shophub-products/*"
    }
  ]
}
```

5. Click "Save changes"

## Step 3: Configure CORS

1. Still in "Permissions" tab
2. Scroll to "Cross-origin resource sharing (CORS)"
3. Click "Edit" and paste:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

4. Click "Save changes"

## Step 4: Create IAM User

1. Go to IAM Console: https://console.aws.amazon.com/iam
2. Click "Users" → "Create user"
3. Username: `shophub-uploader`
4. Click "Next"
5. Select "Attach policies directly"
6. Search and select: `AmazonS3FullAccess`
7. Click "Next" → "Create user"

## Step 5: Create Access Keys

1. Click on the user you just created
2. Go to "Security credentials" tab
3. Scroll to "Access keys"
4. Click "Create access key"
5. Select "Application running outside AWS"
6. Click "Next" → "Create access key"
7. **IMPORTANT**: Copy both:
   - Access key ID
   - Secret access key

## Step 6: Update Backend .env

Add these to `server/.env`:

```env
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_S3_BUCKET=shophub-products
```

## Step 7: Restart Backend

```bash
cd server
npm run dev
```

## Testing

1. Login as admin
2. Go to Admin → Manage Products → Add Product
3. Click "Choose File" under Product Image
4. Select an image
5. Wait for upload (you'll see "Uploading...")
6. Image URL will auto-populate
7. Save product

## Troubleshooting

### "Access Denied" Error
- Check IAM user has S3 permissions
- Verify access keys are correct in .env

### "Bucket not found"
- Verify bucket name in .env matches actual bucket
- Check region is correct

### Images not loading
- Check bucket policy allows public read
- Verify CORS is configured

## Cost

- S3 Free Tier: 5GB storage, 20,000 GET requests/month
- After free tier: ~$0.023 per GB/month
- Very affordable for small projects!

## Security Notes

- Never commit .env file to Git
- Rotate access keys regularly
- Use IAM roles in production (not access keys)
- Consider CloudFront CDN for better performance
