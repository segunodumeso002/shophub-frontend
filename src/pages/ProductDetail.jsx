import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { productAPI, cartAPI } from '../services/api';
import { useAuthStore, useCartStore } from '../store';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getBySlug(slug);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      window.location.href = '/login';
      return;
    }
    try {
      await cartAPI.add({ productId: product.id, quantity });
      addItem({ ...product, quantity });
      toast.success('Added to cart successfully!');
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image_url || 'https://via.placeholder.com/600'} 
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.5 out of 5)</span>
          </div>

          <div className="border-t border-b py-4 mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-red-600">${product.price}</span>
              {product.compare_at_price && (
                <span className="text-xl text-gray-500 line-through">${product.compare_at_price}</span>
              )}
            </div>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity:</label>
            <select 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-orange-500 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <div className="mt-6 space-y-2 text-sm">
            <p><strong>Category:</strong> {product.category_name}</p>
            <p><strong>Stock:</strong> {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
