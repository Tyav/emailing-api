const {User} = require('../models/user.model');
const _ = require('lodash')

function get (req, res) {
  return res.json(req.user);
}
/**
 * 
 * @param {Request{}} req 
 * @param {Response{}} res 
 * @param {callback} next 
 */
function getAll (req, res, next) {
  const {limit= 50, skip=0} = req.query
  User.load({limit,skip})
    .then(user=>res.json(user))
    .catch(e=>next(e))
}

function create (req, res){
  const user = new User(req.body);
  user.save();
  const token = user.generateToken()
  return res.json({token,data:_.pick(user,['_id','name','email'])})
}








module.exports = {get, getAll, create}