const express = require('express');
const bodyParser = require('body-parser');
const path  = require('path');



const rootDirectory = require('./utils/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res)=>{
    res.status(404).sendFile(path.join(rootDirectory,'views','page-not-found.html'));
});

app.listen(3000);