import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { productAPI, categoryAPI } from '../../services/api';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getBySlug(id);
      const product = response.data;
      setValue('name', product.name);
      setValue('slug', product.slug);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('compareAtPrice', product.compare_at_price);
      setValue('categoryId', product.category_id);
      setValue('stockQuantity', product.stock_quantity);
      setValue('imageUrl', product.image_url);
      setImagePreview(product.image_url);
    } catch (error) {
      toast.error('Failed to fetch product');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = JSON.parse(localStorage.getItem('auth-storage'))?.state?.token;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      setValue('imageUrl', data.imageUrl);
      setImagePreview(data.imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Ensure imageUrl has a value
      if (!data.imageUrl) {
        data.imageUrl = 'https://via.placeholder.com/400';
      }
      
      if (id) {
        await productAPI.update(id, data);
        toast.success('Product updated successfully');
      } else {
        await productAPI.create(data);
        toast.success('Product created successfully');
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'Add'} Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            {...register('slug', { required: 'Slug is required' })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description')}
            rows="4"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Price is required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Compare At Price</label>
            <input
              type="number"
              step="0.01"
              {...register('compareAtPrice')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              {...register('categoryId', { required: 'Category is required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input
              type="number"
              {...register('stockQuantity', { required: 'Stock is required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {uploading && <p className="text-sm text-gray-600 mt-1">Uploading...</p>}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional - or upload above)</label>
          <input
            {...register('imageUrl')}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Or paste image URL directly"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
