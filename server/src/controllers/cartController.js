import { query } from '../config/database.js';

export const getCart = async (req, res) => {
  try {
    let cart = await query('SELECT * FROM carts WHERE user_id = $1', [req.user.id]);
    
    if (cart.rows.length === 0) {
      cart = await query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [req.user.id]);
    }
    
    const cartId = cart.rows[0].id;
    const items = await query(
      'SELECT ci.*, p.name, p.price, p.image_url, p.stock_quantity FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
      [cartId]
    );
    
    res.json({ cart: cart.rows[0], items: items.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    let cart = await query('SELECT * FROM carts WHERE user_id = $1', [req.user.id]);
    if (cart.rows.length === 0) {
      cart = await query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [req.user.id]);
    }
    
    const cartId = cart.rows[0].id;
    const existing = await query('SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);
    
    if (existing.rows.length > 0) {
      await query('UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3', [quantity, cartId, productId]);
    } else {
      await query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cartId, productId, quantity]);
    }
    
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    await query('UPDATE cart_items SET quantity = $1 WHERE id = $2', [quantity, req.params.id]);
    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await query('DELETE FROM cart_items WHERE id = $1', [req.params.id]);
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await query('SELECT id FROM carts WHERE user_id = $1', [req.user.id]);
    if (cart.rows.length > 0) {
      await query('DELETE FROM cart_items WHERE cart_id = $1', [cart.rows[0].id]);
    }
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
