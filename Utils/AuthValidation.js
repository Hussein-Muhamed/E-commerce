const joi = require('joi')
const AppError = require('./AppError')

//! Signup Validation
const signupSchema = joi.object({
    userName: joi.string().required().min(3).max(10),
    email:joi.string().required().email(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const signupValidation = (req, res, next) =>{
    const {error} = signupSchema.validate(req.body)
    if(error) return next(new AppError(error.message, 400,error.details))
    next()
}

//! Login Validation
const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const loginValidation = (req, res, next)=>{
    const {error} = loginSchema.validate(req.body)
    if(error) return next(new AppError(error.message, 400, error.details))
    next()
}

module.exports = {signupValidation, loginValidation}