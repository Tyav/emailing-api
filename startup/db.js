//let mongoose = require('mongoose');


module.exports = db =>{
  db.connect('mongodb://localhost/email-api', {useNewUrlParser:true,useFindAndModify: false,useCreateIndex: true }, ()=>{
  console.log('connected to dbase')
})
}
