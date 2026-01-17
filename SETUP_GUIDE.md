# E-Commerce Platform - Setup Guide

## Project Overview
A scalable e-commerce platform with React frontend (Netlify) and serverless Node.js backend (AWS).

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Zustand, React Router
- **Backend**: Node.js, Express, PostgreSQL, Stripe (test mode)
- **Deployment**: Netlify (frontend), AWS Lambda + API Gateway (backend)

---

## Phase 1: Database Setup

### 1. Install PostgreSQL
Ensure PostgreSQL is installed and running on your machine.

### 2. Create Database
```bash
psql -U postgres
CREATE DATABASE ecommerce_db;
\q
```

### 3. Run Schema
```bash
cd server
psql -U postgres -d ecommerce_db -f database-schema.sql
```

---

## Phase 2: Backend Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/ecommerce_db
JWT_SECRET=your_random_secret_key_here
PORT=5000
STRIPE_SECRET_KEY=sk_test_... (get from Stripe dashboard)
```

### 3. Get Stripe Test Keys
1. Go to https://dashboard.stripe.com/register
2. Create account (free)
3. Navigate to Developers > API keys
4. Copy "Secret key" (starts with sk_test_)
5. Copy "Publishable key" (starts with pk_test_)

### 4. Start Backend
```bash
npm run dev
```
Server runs on http://localhost:5000

---

## Phase 3: Frontend Setup

### 1. Install Dependencies
```bash
cd ..
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... (from Stripe)
```

### 3. Start Frontend
```bash
npm run dev
```
App runs on http://localhost:5173

---

## Phase 4: Create Admin User

### Option 1: Via API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

Then update role in database:
```sql
psql -U postgres -d ecommerce_db
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

---

## Phase 5: Add Sample Products

Use the admin panel or run SQL:
```sql
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('iPhone 15 Pro', 'iphone-15-pro', 'Latest Apple smartphone', 999.99, 1099.99, 1, 50, 'https://via.placeholder.com/400'),
('Samsung Galaxy S24', 'samsung-galaxy-s24', 'Flagship Android phone', 899.99, 999.99, 1, 30, 'https://via.placeholder.com/400'),
('Nike Air Max', 'nike-air-max', 'Comfortable running shoes', 129.99, 159.99, 3, 100, 'https://via.placeholder.com/400');
```

---

## Phase 6: AWS Deployment (Backend)

### Prerequisites
- AWS Account (Free Tier)
- AWS CLI installed

### 1. Install Serverless Framework
```bash
npm install -g serverless
```

### 2. Configure AWS Credentials
```bash
aws configure
```
Enter your AWS Access Key ID and Secret from IAM.

### 3. Create RDS PostgreSQL Database
1. Go to AWS RDS Console
2. Create Database > PostgreSQL
3. Choose Free Tier template
4. Set master password
5. Note the endpoint URL

### 4. Create S3 Bucket for Images
```bash
aws s3 mb s3://your-ecommerce-images
```

### 5. Deploy Backend
Create `serverless.yml` in server folder:
```yaml
service: ecommerce-api

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-2
  environment:
    DATABASE_URL: ${env:DATABASE_URL}
    JWT_SECRET: ${env:JWT_SECRET}
    STRIPE_SECRET_KEY: ${env:STRIPE_SECRET_KEY}

functions:
  api:
    handler: src/lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
```

Deploy:
```bash
cd server
serverless deploy
```

Note the API endpoint URL.

---

## Phase 7: Netlify Deployment (Frontend)

### 1. Build Frontend
```bash
npm run build
```

### 2. Deploy to Netlify
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 3. Configure Environment Variables
In Netlify dashboard:
- Go to Site settings > Environment variables
- Add `VITE_API_URL` = your AWS API Gateway URL
- Add `VITE_STRIPE_PUBLISHABLE_KEY` = your Stripe key

### 4. Redeploy
```bash
netlify deploy --prod
```

---

## Testing Payment (Stripe Test Mode)

Use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Any future expiry date, any CVC

---

## Project Structure

```
tutorial003-react/
├── src/                    # Frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── layouts/           # Layout wrappers
│   ├── services/          # API calls
│   ├── store/             # State management
│   └── App.jsx            # Main app
├── server/                # Backend
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, validation
│   │   └── config/        # Database config
│   └── database-schema.sql
└── README.md
```

---

## Next Steps

1. **Add Admin Panel** - Create pages for product/order management
2. **Image Upload** - Integrate AWS S3 for product images
3. **Email Notifications** - Use AWS SES for order confirmations
4. **Search & Filters** - Enhance product discovery
5. **Reviews & Ratings** - Add customer feedback
6. **Wishlist** - Save products for later

---

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `pg_ctl status`
- Verify DATABASE_URL in .env

### CORS Error
- Ensure FRONTEND_URL in backend .env matches your frontend URL

### Stripe Error
- Verify you're using test keys (sk_test_ and pk_test_)
- Check Stripe dashboard for webhook events

---

## Cost Estimate (AWS Free Tier)

- **Lambda**: 1M requests/month FREE
- **API Gateway**: 1M requests/month FREE
- **RDS**: 750 hours/month FREE (t2.micro)
- **S3**: 5GB storage FREE

Total: $0/month for first year with moderate traffic

---

## Support

For issues, check:
1. Browser console for frontend errors
2. Server logs: `npm run dev` output
3. AWS CloudWatch for Lambda logs
4. Stripe dashboard for payment logs
