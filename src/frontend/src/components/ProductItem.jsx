import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-gray-900 font-semibold">$ {product.price}</p>
      <button className="bg-green-500 text-white p-2 rounded-lg mt-4">Add to Cart</button>
    </div>
  );
};

export default ProductItem;
