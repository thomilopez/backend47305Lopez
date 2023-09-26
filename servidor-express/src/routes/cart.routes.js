import express from 'express';
const cartRouter = express.Router();
import CartManager from '../persistence/CartManager.js';
const cartManager = new CartManager("./servidor-express/src/files/carts.json");

const myMiddleware = (req, res, next) => {
    console.log('Middleware ejecutado');
    next();
};

cartRouter.use(myMiddleware);

cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);

    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos del carrito" });
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const addedProduct = await cartManager.addProductToCart(cartId, productId);
    res.json(addedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
});


// export default cartRouter;
export {cartRouter};
