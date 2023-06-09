const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const products = this.getProductsFromStorage();

    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const product = {
      id: nextId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    products.push(product);
    this.saveProductsToStorage(products);
  }

  getProducts() {
    return this.getProductsFromStorage();
  }

  getProductById(productId) {
    const products = this.getProductsFromStorage();
    const product = products.find(p => p.id === productId);
    return product || null;
  }

  updateProduct(productId, updatedFields) {
    const products = this.getProductsFromStorage();
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      this.saveProductsToStorage(products);
      return true;
    }

    return false;
  }

  deleteProduct(productId) {
    let products = this.getProductsFromStorage();
    products = products.filter(p => p.id !== productId);
    this.saveProductsToStorage(products);
  }

  getProductsFromStorage() {
    if (fs.existsSync(this.path)) {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileData) || [];
    }
    return [];
  }

  saveProductsToStorage(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
}

const productManager = new ProductManager('products.json');

productManager.addProduct("Camiseta", "Camiseta básica preta", 70, "thumbnail1.jpg", "ABC123", 15);
productManager.addProduct("Calça", "Calça jeans azul", 100, "thumbnail2.jpg", "DEF456", 10);

const products = productManager.getProducts();
console.log("Todos os produtos:", products);

const product = productManager.getProductById(1);
if (product) {
  console.log("Produto encontrado:", product);
}

productManager.updateProduct(1, { price: 80 });
const updatedProduct = productManager.getProductById(1);
console.log("Produto atualizado:", updatedProduct);

productManager.deleteProduct(2);
const updatedProducts = productManager.getProducts();
console.log("Produtos depois do delete:", updatedProducts);

module.exports = ProductManager;
