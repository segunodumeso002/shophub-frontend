# 📁 Project Structure

```
tutorial003-react/
│
├── 📂 public/                          # Static assets
│   └── vite.svg
│
├── 📂 src/                             # Frontend source code
│   ├── 📂 assets/                      # Images, icons
│   │   └── react.svg
│   │
│   ├── 📂 components/                  # Reusable UI components
│   │   ├── Header.jsx                  # Navigation bar (Amazon-style)
│   │   ├── Footer.jsx                  # Site footer
│   │   └── ProductCard.jsx             # Product display card
│   │
│   ├── 📂 layouts/                     # Page layouts
│   │   └── MainLayout.jsx              # Main app layout wrapper
│   │
│   ├── 📂 pages/                       # Route pages
│   │   ├── Home.jsx                    # Homepage with products
│   │   ├── Login.jsx                   # User login
│   │   ├── Register.jsx                # User registration
│   │   ├── ProductDetail.jsx           # Single product view
│   │   ├── Cart.jsx                    # Shopping cart
│   │   └── Checkout.jsx                # Checkout process
│   │
│   ├── 📂 services/                    # API integration
│   │   └── api.js                      # Axios config + API calls
│   │
│   ├── 📂 store/                       # State management
│   │   └── index.js                    # Zustand stores (auth, cart)
│   │
│   ├── 📂 hooks/                       # Custom React hooks (future)
│   ├── 📂 utils/                       # Helper functions (future)
│   │
│   ├── App.jsx                         # Main app component + routing
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles + Tailwind
│
├── 📂 server/                          # Backend source code
│   ├── 📂 src/
│   │   ├── 📂 config/                  # Configuration files
│   │   │   └── database.js             # PostgreSQL connection pool
│   │   │
│   │   ├── 📂 controllers/             # Business logic
│   │   │   ├── authController.js       # Register, login, profile
│   │   │   ├── productController.js    # Product CRUD
│   │   │   ├── categoryController.js   # Category listing
│   │   │   ├── cartController.js       # Cart operations
│   │   │   └── orderController.js      # Order management
│   │   │
│   │   ├── 📂 middleware/              # Express middleware
│   │   │   └── auth.js                 # JWT authentication
│   │   │
│   │   ├── 📂 routes/                  # API routes
│   │   │   ├── auth.js                 # /api/auth/*
│   │   │   ├── products.js             # /api/products/*
│   │   │   ├── categories.js           # /api/categories/*
│   │   │   ├── cart.js                 # /api/cart/*
│   │   │   └── orders.js               # /api/orders/*
│   │   │
│   │   ├── 📂 models/                  # Database models (future)
│   │   ├── 📂 utils/                   # Helper functions (future)
│   │   │
│   │   └── index.js                    # Express server entry
│   │
│   ├── database-schema.sql             # PostgreSQL schema
│   ├── package.json                    # Backend dependencies
│   ├── .env.example                    # Environment template
│   └── .env                            # Environment variables (gitignored)
│
├── 📄 Configuration Files
│   ├── .gitignore                      # Git ignore rules
│   ├── .env.example                    # Frontend env template
│   ├── .env                            # Frontend env (gitignored)
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS config
│   ├── postcss.config.js               # PostCSS config
│   └── eslint.config.js                # ESLint rules
│
└── 📚 Documentation
    ├── README.md                       # Original Vite template
    ├── PROJECT_README.md               # Main project documentation
    ├── SETUP_GUIDE.md                  # Detailed setup instructions
    ├── PROJECT_SUMMARY.md              # What we built + next steps
    ├── QUICK_REFERENCE.md              # Command cheat sheet
    └── PROJECT_STRUCTURE.md            # This file
```

## 🎯 Key Files Explained

### Frontend Core
- **App.jsx**: Main component with React Router setup
- **main.jsx**: React DOM render entry point
- **index.css**: Tailwind directives + global styles

### Backend Core
- **index.js**: Express server with middleware and routes
- **database.js**: PostgreSQL connection pool
- **auth.js (middleware)**: JWT token verification

### State Management
- **store/index.js**: 
  - `useAuthStore`: User authentication state
  - `useCartStore`: Shopping cart state

### API Service
- **services/api.js**:
  - Axios instance with interceptors
  - API methods for all endpoints
  - Automatic token injection

## 📊 Database Tables

```
users
├── id (PK)
├── email (unique)
├── password_hash
├── first_name
├── last_name
├── role (customer/admin)
└── timestamps

categories
├── id (PK)
├── name
├── slug (unique)
├── description
└── image_url

products
├── id (PK)
├── name
├── slug (unique)
├── description
├── price
├── compare_at_price
├── category_id (FK)
├── stock_quantity
├── image_url
├── images (JSONB)
├── is_active
└── timestamps

carts
├── id (PK)
├── user_id (FK)
└── timestamps

cart_items
├── id (PK)
├── cart_id (FK)
├── product_id (FK)
├── quantity
└── created_at

orders
├── id (PK)
├── user_id (FK)
├── order_number (unique)
├── status
├── total_amount
├── shipping_address (JSONB)
├── payment_status
├── payment_intent_id
└── timestamps

order_items
├── id (PK)
├── order_id (FK)
├── product_id (FK)
├── product_name
├── product_price
├── quantity
├── subtotal
└── created_at
```

## 🔄 Data Flow

### User Registration/Login
```
Frontend (Login.jsx)
    ↓ POST /api/auth/login
Backend (authController.js)
    ↓ Query database
Database (users table)
    ↓ Return user + JWT
Frontend (useAuthStore)
    ↓ Store in localStorage
All API calls include token
```

### Adding to Cart
```
Frontend (ProductDetail.jsx)
    ↓ POST /api/cart
Backend (cartController.js)
    ↓ Verify JWT token
    ↓ Insert/Update cart_items
Database (carts, cart_items)
    ↓ Return updated cart
Frontend (useCartStore)
    ↓ Update UI
```

### Placing Order
```
Frontend (Checkout.jsx)
    ↓ POST /api/orders
Backend (orderController.js)
    ↓ Create Stripe payment intent
Stripe API
    ↓ Return client secret
    ↓ Create order + order_items
Database (orders, order_items)
    ↓ Clear cart
    ↓ Return order details
Frontend
    ↓ Redirect to success page
```

## 🚀 Deployment Structure

### Production
```
Netlify (Frontend)
    ↓ HTTPS requests
AWS API Gateway
    ↓ Invoke
AWS Lambda (Backend)
    ↓ Query
AWS RDS (PostgreSQL)

AWS S3 (Product Images)
    ↓ CDN
CloudFront (Optional)
```

## 📦 Dependencies

### Frontend (package.json)
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **zustand**: State management
- **react-hook-form**: Form handling
- **@stripe/stripe-js**: Payment UI
- **tailwindcss**: Styling
- **lucide-react**: Icons

### Backend (server/package.json)
- **express**: Web framework
- **pg**: PostgreSQL client
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT tokens
- **stripe**: Payment processing
- **cors**: CORS middleware
- **helmet**: Security headers
- **dotenv**: Environment variables

## 🎨 Component Hierarchy

```
App
└── BrowserRouter
    └── Routes
        ├── MainLayout
        │   ├── Header
        │   ├── Outlet
        │   │   ├── Home
        │   │   │   ├── ProductCard (multiple)
        │   │   ├── ProductDetail
        │   │   ├── Cart
        │   │   └── Checkout
        │   └── Footer
        ├── Login
        └── Register
```

## 🔐 Security Layers

1. **Password**: bcrypt hashing (10 rounds)
2. **Authentication**: JWT tokens (7-day expiry)
3. **Authorization**: Role-based (customer/admin)
4. **Rate Limiting**: 100 requests per 15 minutes
5. **CORS**: Restricted to frontend URL
6. **Helmet**: Security headers
7. **SQL Injection**: Parameterized queries
8. **XSS**: React auto-escaping

---

**This structure is designed for scalability and maintainability!** 🏗️
