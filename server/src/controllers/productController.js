import { query } from '../config/database.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let queryText = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = true';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      queryText += ` AND c.slug = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      queryText += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    queryText += ` ORDER BY p.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await query(queryText, params);
    const countResult = await query('SELECT COUNT(*) FROM products WHERE is_active = true');
    
    res.json({ products: result.rows, total: parseInt(countResult.rows[0].count) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const result = await query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = $1',
      [req.params.slug]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, compareAtPrice, categoryId, stockQuantity, imageUrl, images } = req.body;
    
    console.log('Creating product:', req.body);
    
    const result = await query(
      'INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, slug, description, price, compareAtPrice || null, categoryId, stockQuantity, imageUrl, JSON.stringify(images || [])]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, compareAtPrice, categoryId, stockQuantity, imageUrl, images, isActive } = req.body;
    
    const result = await query(
      'UPDATE products SET name = $1, description = $2, price = $3, compare_at_price = $4, category_id = $5, stock_quantity = $6, image_url = $7, images = $8, is_active = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
      [name, description, price, compareAtPrice, categoryId, stockQuantity, imageUrl, JSON.stringify(images || []), isActive, req.params.id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await query('UPDATE products SET is_active = false WHERE id = $1', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
