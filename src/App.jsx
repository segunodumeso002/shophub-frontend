import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import ProductForm from './pages/admin/ProductForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="category/:slug" element={<Category />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/products/new" element={<ProductForm />} />
            <Route path="admin/products/edit/:id" element={<ProductForm />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#FF9900',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
