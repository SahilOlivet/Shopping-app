const { json } = require('express');
const fs = require('fs');
const path = require('path');

//helper constant
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');



module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the existing cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;


            // Add new product or increase the quantity
            if (existingProduct) {
                //giving all the properties of existing product to the updated product 
                updatedProduct = { ...existingProduct };
                //Now updating the quantity
                updatedProduct.qty = updatedProduct.qty + 1;
                //Replacing the old product in the products array with the new one
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })


    }


    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product){
               return; 
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);

            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })
        });
    }


    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }

        });
    }
}


