const express = require('express');
require('./db/connection');
const env = require('dotenv');
const app = express();
const cors = require('cors');
const User = require('./routers/User');
const Product = require('./routers/Product');
const ListProduct = require('./routers/ListProduct');

env.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/api/user', User)
app.use('/api/product', Product)
app.use('/api/listProduct', ListProduct)


app.listen(port, () => {
    console.log('Listening on the port:', port)
})