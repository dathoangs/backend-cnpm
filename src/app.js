require('dotenv').config()
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const app = express();

// init middlewares
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//init db
require('./dbs/init.mongodb')

//init routers
app.use('/', require('./routers'))


app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error',
    })
})


module.exports = app;
