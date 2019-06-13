//let mongoose = require('mongoose');


module.exports = db =>{
  db.connect('mongodb://localhost/email-api', {useNewUrlParser:true}, ()=>{
  console.log('connected to dbase')
})
}
