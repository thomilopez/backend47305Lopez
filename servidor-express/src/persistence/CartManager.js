import {promises as fs} from 'fs';

class CartManager {
    constructor(path) {
    this.path = path;
}

async createCart() {
    try {
        const carts = await this.getCarts();
        const lastId = carts.length > 0 ? carts[carts.length - 1].id : 0;
        const newCart = { id: lastId + 1, products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts));
        console.log('Carrito creado exitosamente.');
        return newCart;
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        throw error;
    }
}

async getCartById(id) {
    try {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === id);
    return cart;
    } catch (error) {
        console.error('Error al obtener el carrito por ID:', error);
    throw error;
    }
}

async addProductToCart(cartId, productId) {
    try {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    const existingProduct = cart.products.find((p) => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.products.push({ id: productId, quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carts));
    console.log('Producto agregado al carrito exitosamente.');
    return cart;
    } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
        throw error;
    }
}

async getCarts() {
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
}

export default CartManager;