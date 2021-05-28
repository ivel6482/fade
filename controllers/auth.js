const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')
const cloudinary = require('../utils/cloudinary')

exports.signup = async (req, res) => {
	try {
		// get the user information sent from the form
		const { firstName, lastName, email, password, role } = req.body
		// see if the user already exists
		const userExists = await User.findOne({ email })

		// if the user already exists response with a message
		if (userExists) {
			return res.status(400).json({ message: 'User already exists.' })
		}

		// Makes the image upload optional
		// FIXME: Handle default value for avatar url and cloudinaryId here.
		if (req.file === undefined) {
			const userToAdd = {
				firstName,
				lastName,
				email,
				password,
				role,
			}

			const newUser = await User.create(userToAdd)

			if (newUser) {
				res
					.status(201)
					.json({ user: newUser, token: generateToken(newUser._id) })
			}
		}

		const result = await cloudinary.uploader.upload(req.file.path)

		const userToAdd = {
			firstName,
			lastName,
			email,
			password,
			avatar: result.secure_url,
			cloudinaryId: result.public_id,
			role,
		}

		// create new user if it doesn't exists
		const newUser = await User.create(userToAdd)

		if (newUser) {
			res.status(201).json({ token: generateToken(newUser._id) })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.login = async (req, res) => {
	// get email and password from information sent
	const { email, password } = req.body
	// find the user with that email
	const user = await User.findOne({ email }).select('+password') // Since the password is omitted when querying for users by default, we need to use the .select() method to indicate that we want the password as well to be returned.

	// Compare the sent password with the hashed password **See: ./models/User.js:42**
	const isMatch = await user.matchPassword(password) // matchPassword is a method in the UserSchema that is accessible in the returned user from the query

	// If there's  a user and the password matches send the user information and token
	if (user && isMatch) {
		res.json({
			token: generateToken(user._id), // **See: ./utils/generateToken
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				_id: user._id,
				email: user.email,
				avatar: user.avatar,
			},
		})
	} else {
		res.status(401).json({ message: 'Invalid email or password' })
	}
}

exports.getLoggedInUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (user) {
			res.json({ token: generateToken(user._id) })
		} else {
			res.status(404).json({ message: 'User not found' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}
