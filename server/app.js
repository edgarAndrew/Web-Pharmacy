require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// connect DB
const {connectDB} = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const medicineRouter = require('./routes/medicine')
const salesRouter = require('./routes/sales')

// error handlers
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

// express static
app.use(express.static('build'))

// json parser
app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',usersRouter);
app.use('/api/v1/med',medicineRouter);
app.use('/api/v1/sale',salesRouter);

// error handler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        const con = await connectDB()
        console.log("Connected to MYSQL DB")
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
      console.log(error);
    }
};

start();
