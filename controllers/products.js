const Product = require("../models/product");

//note: syntax to export --> exports.anyNameOfYourChoice = (){//your fxn code }


//ultimately this is the middleware function which will be passed to admin route


//middleware function to GET Add products page.
exports.getAddProductPage = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

//mddleware function to POST a new product
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

//middleware function to GET SHOP HOME PAGE

exports.getShopHomePage = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });

};