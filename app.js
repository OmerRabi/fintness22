const mongoose = require('mongoose');
const express = require('express');
const costumeError = require("./app/handlers/errorHandler");
const productController = require("./app/controller/productController")
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/product', productController);          

app.use('**',(req,res) => {
    try {
        costumeError("E02C404")
    }
    catch(e) {

        res.status(e.statusCode).json(e);
    }
})

mongoose.connection.on('error', (err) => console.log("DB Connect Error:", err));
mongoose.connection.on('connected', () => {
    console.log("DB Connected:", mongoose.connection.name);
    // start server
    app.listen(PORT, () => {
        console.log(`Node listening on localhost:${PORT}`);
    });
});
mongoose.connect('mongodb://127.0.0.1:27017/fitness22', {
    useNewUrlParser: true
});




