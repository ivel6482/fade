const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
