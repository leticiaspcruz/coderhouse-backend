const express = require('express');
const server = express();
const ProductManager = require('./productManager.js');
const productManager = new ProductManager('products.json');

server.get('/products', (req, res) => {
  const { limit} = req.query;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

server.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id); 
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
