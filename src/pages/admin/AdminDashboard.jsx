import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <ShoppingBag className="text-primary" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Package className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Users className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">$0</p>
            </div>
            <DollarSign className="text-purple-600" size={40} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
          <ShoppingBag className="text-primary mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Manage Products</h2>
          <p className="text-gray-600">Add, edit, or remove products from your store</p>
        </Link>

        <Link to="/admin/orders" className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
          <Package className="text-blue-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Manage Orders</h2>
          <p className="text-gray-600">View and update order statuses</p>
        </Link>
      </div>
    </div>
  );
}
