import { query } from '../config/database.js';

export const getCategories = async (req, res) => {
  try {
    const result = await query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
