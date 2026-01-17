import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderAPI.getById(id);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  const shippingAddress = typeof order.shipping_address === 'string' 
    ? JSON.parse(order.shipping_address) 
    : order.shipping_address;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/orders" className="flex items-center gap-2 text-accent hover:underline mb-6">
        <ArrowLeft size={20} />
        Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Order #{order.order_number}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Order Status</h3>
            <p className="text-lg capitalize">{order.status}</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Payment Status</h3>
            <p className="text-lg capitalize">{order.payment_status}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
        <p>{shippingAddress.phone}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium">{item.product_name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${item.subtotal}</p>
                <p className="text-sm text-gray-600">${item.product_price} each</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-primary">${order.total_amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
