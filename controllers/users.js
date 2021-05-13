const User = require("../models/User")
const cloudinary = require("../utils/cloudinary")

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    const count = await User.countDocuments()
    if (users) {
      res.status(200).json({ count, users })
    } else {
      res.status(404).json({ message: "No users found" })
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
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: "User not found." })
    }
  } catch (error) {
    console.error(error)
  }
}

exports.updateUserDetails = async (req, res) => {
  const { id } = req.params
  const { firstName, lastName } = req.body

  try {
    const user = await User.findById(id)

    if (user) {
      const updatedData = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        // TODO: Check if this is necessary. (avatar, cloudinaryId, email)
        avatar: user.avatar,
        cloudinaryId: user.cloudinaryId,
        email: user.email,
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      })

      res.status(200).json(updatedUser)
    } else {
      res.status(404).json({ message: "User not found." })
    }
  } catch (error) {
    console.error(error)
  }
}

exports.updateUserAvatar = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (user) {
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId)
      }

      const result = await cloudinary.uploader.upload(req.file.path)
      const data = {
        avatar: result.secure_url,
        cloudinaryId: result.public_id,
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })

      res.json(updatedUser)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)

    if (user) {
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId)
      }
			await User.deleteOne({ _id: user._id })
      res.status(200).json({
        message: `${user.firstName} ${user.lastName} has been removed.`,
      })
    } else {
      res.status(404).json({ message: "User not found." })
    }
  } catch (error) {
    console.error(error)
  }
}
