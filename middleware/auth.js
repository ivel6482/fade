const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				const token = req.headers.authorization.split(' ')[1]
				const decoded = jwt.decode(token, process.env.JWT_SECRET)
				req.user = await User.findById(decoded.id).select('-password')
				next()
			} catch (error) {
				console.error(error)
				res.status(401).json({ message: 'Not authorized, token failed' })
			}
		}

		if (!token) {
			res.status(401).json({ message: 'Not authorized, no token.' })
		}
	} catch (error) {
		console.error(error)
	}
}
