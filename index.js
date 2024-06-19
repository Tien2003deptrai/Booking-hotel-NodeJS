const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AdminRouter = require('./routes/AdminRoute');
const CustomerRouter = require('./routes/CustomerRoute');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow requests from port 3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/admin', AdminRouter);
app.use('/customer', CustomerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
