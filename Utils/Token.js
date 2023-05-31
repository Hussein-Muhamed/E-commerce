const AppError = require('./AppError')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next)=>{
    //! Steps 
    {
    //? 1) get token
    //? 2) Verify token -> get id
    //? 3) get userById
    //? 4) attach user to req.user 
    }

    const token = req.headers.authorization
    if(!token) return next(new AppError('Please provide token', 404))

    //* Check of token not change
    const {id} = jwt.verify(token, process.env.SECRET_CODE)
    const user = await User.findOne({_id:id})
    if(!user) return next(new AppError('Invalid token', 400))

    //* Save user in req to use
    req.user = user

    next()
}

module.exports = verifyToken