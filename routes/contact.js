import express from 'express';
import { run } from '../sqlite.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
    await run('INSERT INTO Contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)', [name, email, message, new Date().toISOString()]);
    res.json({ message: 'Message received' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

export default router;
