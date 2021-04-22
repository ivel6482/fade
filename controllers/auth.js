const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')

const login = async () => {
	const { email, password } = req.body

	const user = await User.findOne({ email }).select('+password')

	if (user) {
		const { firstName, lastName } = user
		const token = jwt.sign({ firstName, lastName })

		res.status(200).json({ token })
	} else {
	}
}
