const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please enter your first name.'],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, 'Please enter your last name.'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please enter your email address.'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter a password.'],
			select: false,
		},
		profilePicture: {
			type: String,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
