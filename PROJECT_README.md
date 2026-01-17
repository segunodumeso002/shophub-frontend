# ShopHub - Modern E-Commerce Platform

A professional, scalable e-commerce platform built with React and Node.js, featuring product browsing, shopping cart, secure checkout with Stripe, and admin management.

## 🚀 Features

### Customer Features
- ✅ Browse products by category
- ✅ Advanced search and filtering
- ✅ Product detail pages with reviews
- ✅ Shopping cart management
- ✅ Secure checkout with Stripe
- ✅ Order tracking
- ✅ User authentication (register/login)

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Inventory tracking
- ✅ Category management

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - API calls
- **React Hook Form** - Form handling
- **Stripe.js** - Payment processing

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Stripe** - Payment gateway
- **AWS SDK** - Cloud services

### Deployment
- **Netlify** - Frontend hosting
- **AWS Lambda + API Gateway** - Serverless backend
- **AWS RDS** - Database hosting
- **AWS S3** - Image storage

## 📦 Product Categories

- Electronics
- Clothing
- Shoes
- Jewelry
- Home & Kitchen
- Beauty & Personal Care
- Books
- Pet Supplies
- Sports & Outdoors

## 🚦 Getting Started

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

### Quick Start

1. **Clone and Install**
```bash
git clone <your-repo>
cd tutorial003-react
npm install
cd server && npm install
```

2. **Setup Database**
```bash
psql -U postgres -d ecommerce_db -f server/database-schema.sql
```

3. **Configure Environment**
```bash
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files with your credentials
```

4. **Start Development**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

5. **Open Browser**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📸 Screenshots

(Add screenshots after deployment)

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Helmet.js security headers
- CORS protection
- SQL injection prevention
- XSS protection

## 💳 Payment Testing

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

## 📊 Database Schema

- **users** - Customer and admin accounts
- **categories** - Product categories
- **products** - Product catalog
- **carts** - Shopping carts
- **cart_items** - Cart contents
- **orders** - Order records
- **order_items** - Order details

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - List products
- `GET /api/products/:slug` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

## 🎨 Design Philosophy

Inspired by Amazon's product-focused design:
- Clean, intuitive interface
- Fast loading times
- Mobile-responsive
- Accessibility compliant
- SEO optimized

## 📈 Scalability

- Serverless architecture (auto-scaling)
- Database connection pooling
- CDN for static assets
- Lazy loading for images
- Code splitting

## 🔄 Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications (AWS SES)
- [ ] Advanced search with Elasticsearch
- [ ] Real-time inventory updates
- [ ] Multi-currency support
- [ ] Social media integration
- [ ] Analytics dashboard

## 📝 License

MIT License - feel free to use for your portfolio!

## 👨‍💻 Author

Built as a portfolio project demonstrating full-stack development skills.

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

## 📞 Support

For questions or issues, please open a GitHub issue.

---

**Note**: This project uses Stripe in test mode. No real payments are processed.
