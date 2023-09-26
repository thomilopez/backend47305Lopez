import express from 'express';
import {productRouter} from './routes/products.routes.js';
import {cartRouter} from './routes/cart.routes.js';



const app = express();

// Routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);




const port = 8080;
app.listen(port, () => console.log(`Servidor en funcionamiento en el puerto ${port}`));



