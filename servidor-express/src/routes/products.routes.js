import { express } from 'express';
const productRouter = express.Router();
import ProductManager from './persistence/ProductManager.js';
const productManager = new ProductManager("./servidor-express/src/files/products.json");

productRouter.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

productRouter.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

productRouter.post("/", async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        const product = {
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails
        };

    await productManager.addProduct(product);
        res.json({ message: "Producto agregado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

productRouter.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;

        await productManager.updateProduct(productId, updatedFields);
        res.json({ message: "Producto actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

productRouter.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
    
        await productManager.deleteProduct(productId);
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});


export {router as productRouter};