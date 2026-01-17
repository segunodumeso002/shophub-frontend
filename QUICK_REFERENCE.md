# 🚀 Quick Reference Card

## Essential Commands

### Start Development
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### Database Commands
```bash
# Connect to database
psql -U postgres -d ecommerce_db

# Run schema
psql -U postgres -d ecommerce_db -f server/database-schema.sql

# Make user admin
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### Build & Deploy
```bash
# Build frontend
npm run build

# Deploy to Netlify
netlify deploy --prod

# Deploy backend to AWS
cd server
serverless deploy
```

## Test Credentials

### Stripe Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## URLs

- **Frontend Dev**: http://localhost:5173
- **Backend Dev**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Stripe Dashboard**: https://dashboard.stripe.com

## File Locations

### Configuration
- Frontend env: `.env`
- Backend env: `server/.env`
- Database schema: `server/database-schema.sql`

### Key Files
- Main app: `src/App.jsx`
- API service: `src/services/api.js`
- Store: `src/store/index.js`
- Backend entry: `server/src/index.js`

## API Endpoints

### Auth
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/profile` - Get profile

### Products
- GET `/api/products` - List products
- GET `/api/products/:slug` - Get product
- POST `/api/products` - Create (admin)
- PUT `/api/products/:id` - Update (admin)
- DELETE `/api/products/:id` - Delete (admin)

### Cart
- GET `/api/cart` - Get cart
- POST `/api/cart` - Add item
- PUT `/api/cart/:id` - Update item
- DELETE `/api/cart/:id` - Remove item

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders` - Get user orders
- GET `/api/orders/:id` - Get order details

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (server/.env)
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce_db
JWT_SECRET=your_secret_key
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
```

## Troubleshooting

### Port in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database not found
```bash
psql -U postgres
CREATE DATABASE ecommerce_db;
```

### Dependencies issue
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd server
rm -rf node_modules package-lock.json
npm install
```

## Git Commands

```bash
git init
git add .
git commit -m "Initial commit: E-commerce platform"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## AWS Free Tier Limits

- Lambda: 1M requests/month
- API Gateway: 1M requests/month
- RDS: 750 hours/month (t2.micro)
- S3: 5GB storage

## Next Phase Checklist

- [ ] Database setup complete
- [ ] Backend running
- [ ] Frontend running
- [ ] Admin user created
- [ ] Sample products added
- [ ] Test order placed
- [ ] Ready for Admin Panel development

---

**Keep this file open while developing!** 📌
