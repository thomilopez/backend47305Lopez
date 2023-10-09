import CartManager from './files/CartManager.js';
import ProductManager from './files/ProductManager.js';

import { __dirname } from "../utils.js";
import path from "path"


const productsService = new ProductManager(path.join(__dirname,"/files/products.json"));

const cartsService = new CartManager(path.join(__dirname, "/files/carts.json"));

export {productsService};

export {cartsService};