import CartDao from '../daos/cartDao.js';

const cartController = {
  getCartById: async (req, res) => {
    try {
      const cart = await CartDao.getById(req.params.cid);
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
  },

  addProductToCart: async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      const cart = await CartDao.addProductToCart(req.params.cid, productId, quantity);
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: 'Error adding product to cart', error: err.message });
    }
  },

  clearCart: async (req, res) => {
    try {
      const cart = await CartDao.clearCart(req.params.cid);
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: 'Error clearing cart', error: err.message });
    }
  }
};

export default cartController;
