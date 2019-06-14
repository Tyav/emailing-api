let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('config');
let _ = require('lodash');

let Schema = mongoose.Schema;

let userSchema = new Schema(
	{
		name     : {
			type      : String,
			required  : true,
			minlength : 2,
		},
		email    : {
			type     : String,
			required : true,
		},
		password : {
			type     : String,
			required : true,
		},
	},
	{ timestamps: true },
);

userSchema.methods.generateToken = function() {
	const token = jwt.sign({ id: this._id, user: _.pick(this, [ 'name', 'email' ]) }, config.get('jwtPrivateKey'));
	return token;
};
const User = mongoose.model('user', userSchema);

module.exports = {
	User,
};
