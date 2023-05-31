const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const {Schema} = mongoose

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

//!Hash password
userSchema.pre('save', async function(){
    const currentDocument = this
    
    //* Check if password change or not (register ✔, update ✖)
    if(currentDocument.isModified('password')){
        const hashPassword = await bcryptjs.hash(currentDocument.password,10)
        currentDocument.password = hashPassword
    }
})

//! Instance Method 
userSchema.methods.checkPassword = async function(password){
    const currentDocument = this

    //* bcrypt.compare(req.body.password, database password)
    const match = await bcryptjs.compare(password, currentDocument.password)
    return match 
}

const User = mongoose.model('User',userSchema)
module.exports = User