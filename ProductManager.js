const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(producto) {
    try {
      const productos = await this.getProducts();
      const lastId = productos.length > 0 ? productos[productos.length - 1].id : 0;
      const newProduct = { id: lastId + 1, ...producto };
      productos.push(newProduct);
      await fs.writeFile(this.path, JSON.stringify(productos));
      console.log('Producto agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path);
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      } else {
        throw error;
      }
    }
  }

  async getProductById(id) {
    try {
      const productos = await this.getProducts();
      const producto = productos.find((p) => p.id === id);
      console.log('Producto encontrado:', producto);
    } catch (error) {
      console.error('Error al buscar el producto por ID:', error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const productos = await this.getProducts();
      const index = productos.findIndex((p) => p.id === id);
      if (index !== -1) {
        productos[index] = { ...productos[index], ...updatedFields };
        await fs.writeFile(this.path, JSON.stringify(productos));
        console.log('Producto actualizado exitosamente.');
      } else {
        console.log('No se encontró ningún producto con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }

  async deleteProduct(id) {
    try {
      const productos = await this.getProducts();
      const index = productos.findIndex((p) => p.id === id);
      if (index !== -1) {
        productos.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(productos));
        console.log('Producto eliminado exitosamente.');
      } else {
        console.log('No se encontró ningún producto con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }
}

module.exports = ProductManager;