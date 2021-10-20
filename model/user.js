const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name : String,
    age : Number,
    email : {String},
    username : String,
    password : String
},
     {collection : 'users'}
)


const model = mongoose.model('userSchema', userSchema)

module.exports = model
