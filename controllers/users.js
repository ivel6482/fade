const User = require('../models/User')
const cloudinary = require('../utils/cloudinary')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find()
		const count = await User.countDocuments()
		if (users && count) {
			res.status(200).json({ users, count })
		} else {
			res.status(404).json({ message: 'No users found' })
		}
	} catch (error) {
		console.error(error)
	}
}

exports.getUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await User.findById(id)
		if (user) {
			res.status(200).json({
				user,
			})
		} else {
			res.status(404).json({ message: 'User not found.' })
		}
	} catch (error) {
		console.error(error)
	}
}

// ===================================================================
// = TODO: How to handle update request with Cloudinary.
// ===================================================================

exports.updateUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		})

		if (user) {
			res.status(200).json(user)
		} else {
			res.status(404).json({ message: 'User not found.' })
		}
	} catch (error) {
		console.error(error)
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findById(id)

		if (user) {
			await cloudinary.uploader.destroy(user.cloudinaryId)
			await user.remove(user)
			res.status(200).json({
				message: `${user.firstName} ${user.lastName} has been removed.`,
			})
		} else {
			res.status(404).json({ message: 'User not found.' })
		}
	} catch (error) {
		console.error(error)
	}
}
