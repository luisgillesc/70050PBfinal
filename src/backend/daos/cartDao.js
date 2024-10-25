import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

class CartDao {
  async getAll() {
    return await Cart.find().populate('products.productId');
  }

  async getById(id) {
    return await Cart.findById(id).populate('products.productId');
  }

  async create(cartData) {
    return await Cart.create(cartData);
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const product = await Product.findById(productId);
    if (!product) throw new Error('Producto no encontrado');

    const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    return await cart.save();
  }

  async clearCart(cartId) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = [];
    return await cart.save();
  }

  async delete(cartId) {
    return await Cart.findByIdAndDelete(cartId);
  }
}

export default new CartDao();
