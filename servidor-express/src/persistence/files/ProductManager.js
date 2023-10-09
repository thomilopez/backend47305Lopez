
import { promises as fs } from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async createProduct(productInfo) {
    try {
      if (await this.fileExist()) {
        const contenidoString = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(contenidoString);
        let newId = 1;
        if (products.length > 0) {
          newId = products[products.length - 1].id + 1;
        }
        productInfo.id = newId;
        products.push(productInfo);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return 'Producto agregado';
      } else {
        throw new Error('No se pudo agregar el producto');
      }
    } catch (error) {
      throw error;
    }
  }

  async fileExist() {
    try {
      await fs.access(this.path);
      return true;
    } catch (error) {
      return false;
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
      return producto;
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
        await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
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
        await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
        console.log('Producto eliminado exitosamente.');
      } else {
        console.log('No se encontró ningún producto con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }
}

export default ProductManager;