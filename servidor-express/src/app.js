import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import path from "path";
import { productsService } from './persistence/index.js';
import {viewRouter} from './routes/views.routes.js'
import {productRouter} from './routes/products.routes.js';
import {cartRouter} from './routes/cart.routes.js';

const port = 8080;
const app = express();

//middleare
app.use(express.static(path.join(__dirname,"/public")));

const httpServer = app.listen(port, () => console.log(`Servidor en funcionamiento en el puerto ${port}`));

const io = new Server(httpServer);

// config planillas

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


// Routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(viewRouter);


//midlewares
app.use(express.json());


//socket server
io.on("connection", async(socket)=>{
    console.log("cliente conectado");
    const products = await productsService.getProducts();
    socket.emit("productsArray", products);

    //recibir el producto del socket del cliente
    socket.on("addProduct",async(productData)=>{
        const result = await productsService.createProduct(productData);
        const products = await productsService.getProducts();
        io.emit("productsArray", products);
    });

    socket.on("deleteProduct", async (productId) => {
        await productsService.deleteProduct(productId);
        const products = await productsService.getProducts();
        io.emit("productsArray", products);
    });
});



