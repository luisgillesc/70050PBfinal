import ProductDao from '../daos/productDao.js';
import ProductDto from '../dtos/productDto.js';

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductDao.getAll();  // Obtener productos desde DAO
      const productsDto = products.map(product => new ProductDto(product));  // Aplicar DTO
      res.json(productsDto);  // Enviar solo la información filtrada
    } catch (err) {
      res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await ProductDao.create(req.body);  // Crear producto usando el DAO
      const productDto = new ProductDto(product);  // Aplicar DTO
      res.status(201).json(productDto);
    } catch (err) {
      res.status(500).json({ message: 'Error creating product', error: err.message });
    }
  }
};

export default productController;
