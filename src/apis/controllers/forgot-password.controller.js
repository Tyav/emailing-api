const ForgotPass = require('../models/forgot-password.model');
const { User } = require('../models/user.model');
const otpGen = require('otp-generator');
const nodemailer = require('nodemailer');
const config = require('config');
const bcrypt = require('bcrypt');

/**
 * This controller verifies and returns the forgot-pass Object if valid
 * @param req 
 * @param {Object{}} res 
 */
function verify(req, res) {
  const { token, passId } = req.body;
	ForgotPass.get(passId, token).then(forgotPass => res.json({data:forgotPass})).catch(e => res.json(e));
}

/**
 * 
 * - controller for 
 */
function create(req, res) {
	User.findOne({ email: req.body.email }).then(async user => {
		if (user) {
			let otp = otpGen.generate(6, { specialChars: false });
			let hashedOtp = await bcrypt.hash(otp, config.get('saltRound'));
			let transport = nodemailer.createTransport({
				service : config.get('mailService'),
				auth    : {
					user : config.get('mailService-email'),
					pass : config.get('mailService-pass'),
				},
			});
			let result = await ForgotPass.deleteMany({ userId: user._id });
      if (result){
        const forgotpass = new ForgotPass({
          userId       : user._id,
          email        : req.body.email,
          token        : hashedOtp,
          tokenExpires : Date.now() + 600000,
        });
        await forgotpass.save();
        var mailOptions = {
          from    : 'decagon@info.com',
          to      : req.body.email,
          subject : 'testing OTP for you',
          text    : `Hi, seems you forgot your password, use this OTP to change your password. ${otp}`,
        };
  
        transport.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.json({ data: forgotpass._id, message: 'token sent, check your mail and copy token' });
        }
		}
		return res.json({ data: null, message: 'token sent, check your mail and copy token' });
	});
}

async function reset(req, res) {
  const {expireAt, userId, password} = req.body;
  if (new Date(expireAt) > Date.now()){
    let hash = await bcrypt.hash(password, config.get('saltRound'))
    await User.findOneAndUpdate({_id:userId},{
      $set:{
        password: hash
      }
    })
    return  res.json({success: 'ok'})
  }
  res.json({message: 'expired token'})
}

module.exports = { verify, create, reset };
