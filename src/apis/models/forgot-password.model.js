const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const ForgotPasswordSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  token:{
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    validate: [ function(v) {
        return (v - new Date()) <= 300000;
    }, 'Cannot expire more than 60 seconds in the future.' ],
    default: function() {
        // 60 seconds from now
        return new Date(new Date().valueOf() + 300000);
    }
}
},{timestamps:true});

ForgotPasswordSchema.methods = {

};

ForgotPasswordSchema.statics = {
  // get(id){
  //   this.find({userId: id})
  // },
  get(id , token) {
    return this.findOne({_id:id})
      .exec()
      .then(async (forgotPassword)=>{
        let isToken = await bcrypt.compare(token, forgotPassword.token);
        let isValidToken = forgotPassword.expireAt > Date.now();
        if (isValidToken && isToken) {
          return forgotPassword
        }
        return Promise.reject({message: 'invalid token'})
      })
      .catch(()=>Promise.reject({message: 'invalid token'}))
  }
}
 
module.exports = mongoose.model('forgot-password', ForgotPasswordSchema)