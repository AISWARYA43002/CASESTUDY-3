const mongoose=require('mongoose')
const userschema=mongoose.Schema({
    username:String,
    password:String,
    email: {
        type: String,
        unique: true
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
      },
      

})
const userData=mongoose.model('user',userschema)
module.exports=userData