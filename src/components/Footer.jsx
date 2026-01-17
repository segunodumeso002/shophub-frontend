export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">All Products</a></li>
              <li><a href="#" className="hover:text-primary">Categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Facebook</a></li>
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
