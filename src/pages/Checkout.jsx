import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { orderAPI } from '../services/api';

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await orderAPI.create({ shippingAddress: data });
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              {...register('firstName', { required: 'Required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              {...register('lastName', { required: 'Required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            {...register('address', { required: 'Required' })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              {...register('city', { required: 'Required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              {...register('state', { required: 'Required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              {...register('zipCode', { required: 'Required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            {...register('phone', { required: 'Required' })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-orange-500 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
