class ProductManager {
  products = [];
  nextId = 1;
 
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos os campos são obrigatórios.");
      return;
    }

    if (this.getProductByCode(code)) {
      console.log("Já existe um produto com o mesmo código.");
      return;
    }

    const product = {
      id: this.nextId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    this.products.push(product);
    this.nextId++;
  };

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      return product;
    } else {
      console.log("Produto não encontrado.");
      return null;
    }
  };

  getProductByCode(productCode) {
    const product = this.products.find((p) => p.code === productCode);
    return product || null;
  }
};

const productManager = new ProductManager();

productManager.addProduct("Camiseta", "Camiseta básica preta", 70, "thumbnail1.jpg", "ABC123", 15);
productManager.addProduct("Calça", "Calça jeans azul", 100, "thumbnail2.jpg", "DEF456", 10);

const product = productManager.getProductById(1);
if (product) {
  console.log("Produto encontrado:", product);
}
