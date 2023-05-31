const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
require('dotenv').config()

const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')

require('./Database/database')

const app = express()
const port = process.env.PORT

//! Middleware
{
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(morgan('dev'))
}

//? Routers
app.use('/user',userRouter)
app.use('/product',productRouter)

//* Global error handler
app.use((err,req,res,next)=>{
    console.log("Error:", err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        status:statusCode,
        message: err?.message || 'Interval server error',
        errors: err?.errors || []
    })
})

app.listen(port, ()=>{
    console.log(`Server Run on Port :${port} 🚀`);
})