const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/Products');
const uploader = require('../services/Upload');

const productServices = new ProductManager();


router.get('/',(req,res)=>{
    productServices.get().then(result=>res.send(result))
});

router.post('/',uploader.single('file'),(req,res)=>{
    let product = req.body;
    let file = req.file;
    products.push(product)
    if(!file) return res.status(500).send({error:"couldn't upload file"})
    product.thumbnail = req.protocol+"://"+req.hostname+":8080/img"+file.filename;
    productServices.add(product).then(result=>res.send(result));
})

module.exports = router;