import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getAll();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
      case 'processing':
      case 'shipped':
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <Package className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">No orders yet</p>
          <Link to="/" className="text-accent hover:underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{order.order_number}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${order.total_amount}</p>
                  </div>
                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-secondary text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
