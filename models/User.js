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
			unique: true,
			required: [true, 'Please enter your email address.'],
			trim: true,
			match:
				/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
		},
		password: {
			type: String,
			required: [true, 'Please enter a password.'],
			select: false, // Does not return the password by default, if we want it please use .select('+password') when querying.
			// match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, // Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
		},
		avatar: {
			type: String,
			default:
				'https://res.cloudinary.com/drlwtqzgt/image/upload/samples/animals/cat.jpg',
			required: [true, 'Please provide an image url for the avatar.'],
		},
		// There should not be a cloudinaryId by default because we don't want to delete it or modify the picture.
		cloudinaryId: {
			type: String,
		},
		role: {
			type: String,
			required: [true, 'Please provide a valid user role, instead got {VALUE}'],
			enum: ['admin', 'barber', 'costumer'],
			default: 'costumer',
		},
		favoriteBarbershops: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Barbershop',
		},
		// appointments: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Appointment',
		// },
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
