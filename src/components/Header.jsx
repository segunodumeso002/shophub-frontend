import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, Package, X } from 'lucide-react';
import { useAuthStore, useCartStore } from '../store';

export default function Header() {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Clothing', slug: 'clothing' },
    { name: 'Shoes', slug: 'shoes' },
    { name: 'Jewelry', slug: 'jewelry' },
    { name: 'Home & Kitchen', slug: 'home-kitchen' },
    { name: 'Beauty & Personal Care', slug: 'beauty-personal-care' },
    { name: 'Books', slug: 'books' },
    { name: 'Pet Supplies', slug: 'pet-supplies' },
    { name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  ];

  return (
    <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
      <div className="bg-secondary py-2 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-primary transition whitespace-nowrap">
            ShopHub
          </Link>

          <div className="flex-1 max-w-2xl hidden sm:block">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 rounded-l text-black focus:outline-none"
              />
              <button type="submit" className="bg-primary px-4 sm:px-6 py-2 rounded-r hover:bg-orange-600 transition">
                <Search size={20} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-xs sm:text-sm">Hello, <span className="font-bold">{user.firstName}</span></span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="hover:text-primary transition flex items-center gap-2">
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link to="/orders" className="hover:text-primary transition flex items-center gap-2">
                    <Package size={20} />
                    <span>Orders</span>
                  </Link>
                  <button onClick={handleLogout} className="hover:text-primary transition text-sm">
                    Logout
                  </button>
                </div>
                <div className="md:hidden flex items-center gap-2">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="hover:text-primary transition text-xs">
                      Admin
                    </Link>
                  )}
                  <Link to="/orders" className="hover:text-primary transition">
                    <Package size={20} />
                  </Link>
                  <button onClick={handleLogout} className="hover:text-primary transition text-xs">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="hover:text-primary transition flex items-center gap-1 sm:gap-2">
                <User size={20} />
                <span className="hidden sm:inline text-sm">Sign In</span>
              </Link>
            )}

            <Link to="/cart" className="hover:text-primary transition flex items-center gap-2 relative">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-gray-800 py-2 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-6 overflow-x-auto">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1 sm:gap-2 hover:text-primary transition whitespace-nowrap text-sm"
          >
            <Menu size={18} />
            <span>All</span>
          </button>
          <Link to="/category/electronics" className="hover:text-primary transition whitespace-nowrap text-xs sm:text-sm">Electronics</Link>
          <Link to="/category/clothing" className="hover:text-primary transition whitespace-nowrap text-xs sm:text-sm">Clothing</Link>
          <Link to="/category/shoes" className="hover:text-primary transition whitespace-nowrap text-xs sm:text-sm">Shoes</Link>
          <Link to="/category/jewelry" className="hover:text-primary transition whitespace-nowrap text-xs sm:text-sm hidden sm:inline">Jewelry</Link>
          <Link to="/category/home-kitchen" className="hover:text-primary transition whitespace-nowrap text-xs sm:text-sm hidden md:inline">Home & Kitchen</Link>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="bg-white w-80 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-secondary text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Categories</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                <X size={24} />
              </button>
            </div>
            <div className="py-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
