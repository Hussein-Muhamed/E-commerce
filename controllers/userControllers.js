const User = require('../models/userModel');
const AppError = require('../Utils/AppError');
const jwt = require('jsonwebtoken')


const register = async(req, res)=>{
    const {userName, email, password} = req.body
    const user = new User({email, password, userName})

    //? User.preSave hash password 🔑 
    await user.save()

    //? To Hide password from response
    user.password = undefined
    res.send(user)
}

const login = async(req, res, next)=>{
    const {email,password} = req.body;

    //* .select to add password 
    const user = await User.findOne({email}).select('+password')
    if(!user) return next(new AppError('Invalid Credentials',400))

    const comparePassword = await user.checkPassword(password)
    if(!comparePassword) return next(new AppError('Invalid Credentials',400))

    //* generate token with expired 1d
    const token = jwt.sign({id:user._id},process.env.SECRET_CODE,{expiresIn:'1d'})

    //* Hide password again 🙈
    user.password = undefined
    res.send({token, user})
}

const getAllUsers = async(req, res)=>{
    const users = await User.find()
    res.send(users)
}

const getProfile = async(req,res)=>{
    //? req.user came from token 
    res.send(req.user)
}


module.exports = {register, login, getAllUsers, getProfile}