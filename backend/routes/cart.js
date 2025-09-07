const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Add/update item
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
    } else {
      const idx = cart.items.findIndex(it => it.productId.toString() === productId);
      if (idx === -1) cart.items.push({ productId, quantity });
      else cart.items[idx].quantity = cart.items[idx].quantity + quantity;
    }
    await cart.save();
    const populated = await cart.populate('items.productId');
    res.json(populated);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Remove item
router.delete('/:productId', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart empty' });
    cart.items = cart.items.filter(it => it.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
