import React from 'react';
import ProductList from '../components/ProductList';

const Products = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList />
    </div>
  );
};

export default Products;
