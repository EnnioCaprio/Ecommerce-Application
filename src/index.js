const express = require('express');
require('./db/connection');
const path = require('path');
const env = require('dotenv');
const app = express();
const cors = require('cors');
const User = require('./routers/User');
const Product = require('./routers/Product');
const ListProduct = require('./routers/ListProduct');

env.config();

app.use(express.json());
app.use(cors());
app.use('/api/user', User)
app.use('/api/product', Product)
app.use('/api/listProduct', ListProduct)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on the port:', port)
})