import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { cartAPI } from '../services/api';
import { useCartStore } from '../store';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setItems } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      setCart(response.data);
      setItems(response.data.items);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await cartAPI.remove(itemId);
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await cartAPI.update(itemId, { quantity });
      fetchCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg mb-4 flex gap-4">
                <img 
                  src={item.image_url || 'https://via.placeholder.com/150'} 
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-red-600 mb-2">${item.price}</p>
                  <div className="flex items-center gap-4">
                    <select 
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                      className="border rounded px-2 py-1"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-orange-600 transition mb-3"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/"
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition block text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
