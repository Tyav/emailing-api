let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('config');
let _ = require('lodash');

let Schema = mongoose.Schema;

let UserSchema = new Schema(
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

UserSchema.methods.generateToken = function() {
	const token = jwt.sign({ id: this._id, user: _.pick(this, [ 'name', 'email' ]) }, config.get('jwtPrivateKey'));
	return token;
};

UserSchema.statics = {
	/**
	 * 
	 * @param {ObjectId} id - The ObjectId of user
	 * @returns {Promise<user, Error>}
	 */
	get(id){
		return this.findById(id)
			.select('name email createdAt')
			.exec()
			.then((user)=>{
				if (user){
					return user
				}
				return Promise.reject({message: 'no user exist'})
			})
	},
	/**
	 * 
	 * @param {Number} limit - Number of users to be returned
	 * @param {Number} skip - Number of users to be skipped
	 * @returns {Promise<User[]>}
	 */
	load({limit= 50, skip=0}={}){
		return this.find()
			.select('name email createdAt')
			.sort({createdAt: -1})
			.skip(+skip)
			.limit(+limit)
			.exec();
	}

}

const User = mongoose.model('user', UserSchema);

module.exports = {
	User,
};
