import express from 'express';
import { all, get, run } from '../sqlite.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authRequired, async (req, res) => {
  try {
    const rows = await all(`
      SELECT Cart.id, product_id, quantity, p.name, p.price, p.stock, p.category, p.description
      FROM Cart
      JOIN Products p ON p.id = Cart.product_id
      WHERE user_id = ?
      ORDER BY Cart.id DESC
    `, [req.user.id]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

router.post('/add', authRequired, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const q = quantity && quantity > 0 ? quantity : 1;
    const existing = await get('SELECT id, quantity FROM Cart WHERE user_id = ? AND product_id = ?', [req.user.id, product_id]);
    if (existing) {
      await run('UPDATE Cart SET quantity = ? WHERE id = ?', [existing.quantity + q, existing.id]);
      return res.json({ message: 'Updated cart quantity' });
    }
    await run('INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [req.user.id, product_id, q]);
    res.json({ message: 'Added to cart' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

router.put('/update/:id', authRequired, async (req, res) => {
  try {
    const { quantity } = req.body;
    await run('UPDATE Cart SET quantity = ? WHERE id = ? AND user_id = ?', [quantity, req.params.id, req.user.id]);
    res.json({ message: 'Cart updated' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

router.delete('/remove/:id', authRequired, async (req, res) => {
  try {
    await run('DELETE FROM Cart WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Removed from cart' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

export default router;
