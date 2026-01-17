import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { orderAPI } from '../services/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ shippingData, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    
    try {
      // Create order and get payment intent
      const response = await orderAPI.create({ shippingAddress: shippingData });
      const { clientSecret } = response.data;

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            address: {
              line1: shippingData.address,
              city: shippingData.city,
              state: shippingData.state,
              postal_code: shippingData.zipCode,
            },
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful! Order placed.');
        navigate('/orders');
      }
    } catch (error) {
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Payment Information</h2>
        <button
          onClick={onBack}
          className="text-primary hover:underline"
          type="button"
        >
          ← Back to Shipping
        </button>
      </div>

      <form onSubmit={handlePayment}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Card Details</label>
          <div className="border rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Shipping Address</h3>
          <p className="text-sm text-gray-600">
            {shippingData.firstName} {shippingData.lastName}<br />
            {shippingData.address}<br />
            {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
            {shippingData.phone}
          </p>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-orange-500 transition disabled:opacity-50"
        >
          {loading ? 'Processing Payment...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
}

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [step, setStep] = useState(1); // 1 = shipping, 2 = payment
  const [shippingData, setShippingData] = useState(null);

  const onShippingSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const goBackToShipping = () => {
    setStep(1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {step === 1 && (
        <form onSubmit={handleSubmit(onShippingSubmit)} className="bg-white p-6 rounded-lg">
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
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-orange-500 transition"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === 2 && (
        <Elements stripe={stripePromise}>
          <PaymentForm 
            shippingData={shippingData} 
            onBack={goBackToShipping}
          />
        </Elements>
      )}
    </div>
  );
}
