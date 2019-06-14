const {User} = require('../models/user.model');
const router = require('express').Router();
const userCtrl = require('../controllers/user.controllers')


router.route('/user').get(userCtrl.getAll).post(userCtrl.create)





module.exports = router