const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const cors = require('cors');
const bodyparser = require('body-parser')

const connectDB = require('./config/connectDB')

dotenv.config({path: './config/config.env'});
connectDB();

const account = require('./routes/accounts')
const authentication = require('./routes/auth')
const budget = require('./routes/budget')
const categories = require('./routes/categories')
const expenses = require('./routes/expenses')
const goal = require('./routes/goal')
const users = require('./routes/users')

const app = express();

app.use(express.json());

app.use(fileupload({
    debug: true
}));

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// Enable CORS
app.use(cors());

app.use(cookieParser({
    debug: true
}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/account', account);
app.use('/api/v1/auth', authentication);
app.use('/api/v1/budgets', budget);
app.use('/api/v1/categories', categories);
app.use('/api/v1/expenses', expenses);
app.use('/api/v1/goals', goal);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT= process.env.PORT || 5000;

const server = app.listen(
    PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)

    server.close(() => process.exit(1))
});
