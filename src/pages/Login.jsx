import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data) => {
    try {
      const response = await authAPI.login(data);
      setAuth(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-orange-500 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
