import Stripe from 'stripe';
import { query } from '../config/database.js';
import { sendOrderConfirmation } from '../config/email.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    
    const cart = await query('SELECT id FROM carts WHERE user_id = $1', [req.user.id]);
    if (cart.rows.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const items = await query(
      'SELECT ci.*, p.name, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
      [cart.rows[0].id]
    );
    
    if (items.rows.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const totalAmount = items.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: { orderNumber }
    });
    
    const orderResult = await query(
      'INSERT INTO orders (user_id, order_number, total_amount, shipping_address, payment_intent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, orderNumber, totalAmount, JSON.stringify(shippingAddress), paymentIntent.id]
    );
    
    const orderId = orderResult.rows[0].id;
    
    for (const item of items.rows) {
      await query(
        'INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES ($1, $2, $3, $4, $5, $6)',
        [orderId, item.product_id, item.name, item.price, item.quantity, item.price * item.quantity]
      );
    }
    
    await query('DELETE FROM cart_items WHERE cart_id = $1', [cart.rows[0].id]);
    
    // Send confirmation email
    const user = await query('SELECT email, first_name, last_name FROM users WHERE id = $1', [req.user.id]);
    if (user.rows.length > 0) {
      const userData = user.rows[0];
      await sendOrderConfirmation(
        orderResult.rows[0],
        userData.email,
        `${userData.first_name} ${userData.last_name}`
      );
    }
    
    res.json({ order: orderResult.rows[0], clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    if (order.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const items = await query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id]);
    res.json({ ...order.rows[0], items: items.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const result = await query('SELECT o.*, u.email, u.first_name, u.last_name FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await query('UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [status, req.params.id]);
    res.json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
