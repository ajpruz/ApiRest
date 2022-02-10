const express = require('express');
const ProductManager = require('../managers/Products')
const products = require('../files/products')

const router = express.Router();

const productServices = new ProductManager();

router.get('/:id',(req,res)=>{
    let param = req.params.id
    let params = parseInt(param);
    if(isNaN(param)) return res.status(400).send({error:"Incorrect id"})
    productServices.getById(params).then(result=>res.send(result))
})

router.put('/:id',(req,res)=>{
    let param = req.params.id;
    let clientWord = req.body.name;
    if(isNaN(param)) return res.status(400).send({error:"Incorrect id"})
    let id = parseInt(param);
    let array = productServices.getById(id);
    if(id<1 || id>array.length-1) return res.status(400).send({error:"Out of bounds"})
    array[id] = clientWord;

    productServices.getById(id) = array.join(' ');
    productServices.getById(params).then(result=>res.send(result))
})

router.delete('/:id',(req, res)=>{
    let param = req.params.id;
    let id = parseInt(param)
    productServices.deleteById(id).then(res.send(`Haz Eliminado el producto # ${id}`))
    
})

module.exports = router