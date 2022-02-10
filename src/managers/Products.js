const fs = require('fs');

const pathToProducts = __dirname+'/../files/products';

class ProductManager {
    add = async(product)=>{
        if(fs.existsSync(pathToProducts)){
            try{
                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                if(products.length===0){
                    product.id=1;
                    products.push(product);
                    await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                    return {status:"Success", message: "Added 1 Product"}
                }
                product.id = products[[products.length-1]].id+1;
                products.push(product);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2));
                return{status:"Success", message:"Added 1 Product"}
            }catch(error){
                return {message:"Error", error:error}
            }
        }else{
            try{
                product.id=1;
                await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2));
                return {status:"Success", message:"Added 1 Product"}
            }catch(error){
                return {message:"Error", error:error}
            }
        }
    }
    get = async () =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                return {status:"Success", payload:products}
            }catch(error){
                return {message:"Error", error:error}
            }
        }else{
            return {status:"Success", payload:[]}
        }
    }
    getById = async (id)=>{
        if(!id) return {status:"Error", message:"Id Not Found"}
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data);

            let product = products.find(u=>u.id===id);
            if(product) return {status:"Success", Product: product}
            else return {status: "Error", message:"Product Not Found"}
        }   
    }
    deleteById = async (id) => {
        if(!id) return {status:"Error", message:"Id Not Found"}
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data);

            let newProduct = products.filter(p=>p.id!==id)
            await fs.promises.writeFile(pathToProducts,JSON.stringify(newProduct,null,2))
            return {status: "Success", message:"Product Deleted"}
        }
    }

}

module.exports = ProductManager;