const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
	try {
		let token
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				token = req.headers.authorization.split(' ')[1]
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

exports.authorize = (...roles) => {
	return (req, res, next) => {
		const allowedRoles = [...roles]
		console.log(allowedRoles)
		if (req.user && allowedRoles.includes(req.user.role)) {
			console.log('Access Granted')
			next()
		} else {
			console.log('Access Denied')
			res.status(403).json({ message: 'Not authorized' })
		}
	}
}