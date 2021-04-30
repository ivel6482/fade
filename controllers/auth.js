const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')

exports.signup = async (req, res) => {
	try {
		// get the user information sent from the form
		const { firstName, lastName, email, password, profilePicture } = req.body
		// see if the user already exists
		const userExists = await User.findOne({ email })

		// if the user already exists response with a message
		if (userExists) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const userToAdd = {
			firstName,
			lastName,
			email,
			password,
			profilePicture,
		}

		// create new user if it doesn't exists
		const newUser = await User.create(userToAdd)

		if (newUser) {
			res.status(201).json({ user: newUser, token: generateToken(newUser._id) })
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
	const user = await User.findOne({ email })
	// Compare the sent password with the hashed password **See: ./models/User.js:42**
	const isMatch = await user.matchPassword(password) // matchPassword is a method in the UserSchema that is accessible in the returned user from the query

	// If there's  a user and the password matches send the user information and token
	if (user && isMatch) {
		res.json({
			user,
			token: generateToken(user._id), // **See: ./utils/generateToken
		})
	} else {
		res.status(401).json({ message: 'Invalid email or password' })
	}
}

exports.getLoggedInUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (user) {
			res.json(user)
		} else {
			res.status(404).json({ message: 'User not found' })
		}
	} catch (error) {}
}
