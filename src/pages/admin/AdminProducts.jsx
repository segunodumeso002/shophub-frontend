import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { productAPI } from '../../services/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 100 });
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productAPI.delete(id);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock_quantity}</td>
                <td className="px-6 py-4">{product.category_name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
