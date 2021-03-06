const express = require('express');
const productsRouter = require('./routes/products')
const uniqueProductRouter = require('./routes/SingleProduct')

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/products', productsRouter);
app.use('/products', uniqueProductRouter);
app.use(express.static(__dirname+"/public"));

const PORT = 8080;
const server = app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));