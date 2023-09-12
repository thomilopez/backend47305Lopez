const express = require('express');
const ProductManager = require('./pesistence/ProductManager');


const app = express();
const productManager = new ProductManager("./src/files/product.json");

app.get("/product", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await ProductManager.getProducts();

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

app.get("/products/:pid", async (req, res) => {
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

const port = 8080;
app.listen(port, () => console.log(`Servidor en funcionamiento en el puerto ${port}`));

