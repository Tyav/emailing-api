const router = require('express').Router();
const forgotPassCtrl = require('../controllers/forgot-password.controller')


router.route('/verify')
  .post(forgotPassCtrl.verify);

router.route('/forgot')
  .post(forgotPassCtrl.create);

router.route('/reset')
  .post(forgotPassCtrl.reset)

module.exports = router