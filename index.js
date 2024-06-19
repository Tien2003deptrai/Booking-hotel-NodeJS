const express = require('express');
const cookieParser = require('cookie-parser');
const AdminRouter = require('./routes/AdminRoute');
const CustomerRouter = require('./routes/CustomerRoute');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/admin', AdminRouter);
app.use('/customer', CustomerRouter);

app.listen(process.env.port, () => {
    console.log('Server listening on port ' + process.env.port);
})