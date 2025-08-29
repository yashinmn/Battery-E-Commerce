import express from 'express';
import { all, get, run } from '../sqlite.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authRequired, async (req, res) => {
  try {
    const rows = await all('SELECT * FROM Orders WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/checkout', authRequired, async (req, res) => {
  try {
    const items = await all(`
      SELECT c.product_id, c.quantity, p.stock
      FROM Cart c JOIN Products p ON p.id = c.product_id
      WHERE c.user_id = ?
    `, [req.user.id]);
    if (!items.length) return res.status(400).json({ error: 'Cart is empty' });

    // Check stock
    for (const it of items) {
      if (it.quantity > it.stock) {
        return res.status(400).json({ error: 'Insufficient stock for one or more items' });
      }
    }

    // Place orders per item and decrease stock
    const now = new Date().toISOString();
    for (const it of items) {
      await run('INSERT INTO Orders (user_id, product_id, quantity, status, date) VALUES (?, ?, ?, ?, ?)', [req.user.id, it.product_id, it.quantity, 'PENDING', now]);
      await run('UPDATE Products SET stock = stock - ? WHERE id = ?', [it.quantity, it.product_id]);
    }
    await run('DELETE FROM Cart WHERE user_id = ?', [req.user.id]);

    res.json({ message: 'Order placed successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

export default router;
