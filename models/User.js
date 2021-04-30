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
	// if the password field has a select of false it will not be able to access the password using this.password, if we want to return the password we should do it in a query and using the .select() method to prevent the password being sent **Like this: const user = await User.findById(id).select('+password')
	return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
