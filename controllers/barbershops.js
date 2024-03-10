const Barbershop = require('../models/Barbershop')
const cloudinary = require('../utils/cloudinary')

// -----------------------------------------------------------------------------
//        - Get all barbershops -
// -----------------------------------------------------------------------------

exports.getAllBarbershops = async (req, res) => {
	try {
		const barbershops = await Barbershop.find()
		const barbershopsCount = await Barbershop.countDocuments()

		res.status(200).json({ count: barbershopsCount, barbershops })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}

// -----------------------------------------------------------------------------
//        - Get single barbershop -
// -----------------------------------------------------------------------------

exports.getBarbershop = async (req, res) => {
	try {
		const { id } = req.params
		const barbershop = await Barbershop.findById(id)

		if (barbershop) {
			res.status(200).json(barbershop)
		} else {
			res.status(404).json({ message: 'Barbershop not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

// -----------------------------------------------------------------------------
//        - Create barbershop -
// -----------------------------------------------------------------------------

exports.createBarbershop = async (req, res) => {
	// Lon and lat will come from leaflet
	try {
		const { name, location, contact, available, about, barbershopOwner } =
			req.body

		const newBarbershop = {
			name,
			about,
			location,
			contact,
			available,
			barbershopOwner,
		}

		const created = await Barbershop.create(newBarbershop)
		res.status(200).json({ barbershop: created })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}

// -----------------------------------------------------------------------------
//        - Update barbershop -
// -----------------------------------------------------------------------------

exports.updateBarbershop = async (req, res) => {
	try {
		const { id } = req.params
		const barbershop = await Barbershop.findById(id)
		if (barbershop) {
			const { name, location, contact, available, about } = req.body

			const newData = {
				name: name || barbershop.name,
				location: location || barbershop.location,
				contact: contact || barbershop.contact,
				available: available || barbershop.available,
				about: about || barbershop.about,
			}

			const updatedBarbershop = await Barbershop.findByIdAndUpdate(
				id,
				newData,
				{
					new: true,
					runValidators: true,
				}
			)
			res.status(200).json({ barbershop: updatedBarbershop })
		} else {
			res.status(404).json({ message: 'Barbershop not found.' })
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error' })
		console.error(error)
	}
}
// -----------------------------------------------------------------------------
//        - Upload barbershop banner image -
// -----------------------------------------------------------------------------
exports.uploadBanner = async (req, res) => {
	try {
		const { id } = req.params
		const barbershop = await Barbershop.findById(id)
		if (barbershop) {
			if (req.file === undefined) {
				return res.status(400).json({ message: 'An image is required.' })
			}

			if (barbershop.banner.cloudinaryId) {
				await cloudinary.uploader.destroy(barbershop.banner.cloudinaryId)
			}
			const result = await cloudinary.uploader.upload(req.file.path)
			const newData = {
				banner: {
					cloudinaryId: result.public_id,
					url: result.secure_url,
				},
			}
			const updatedBarbershop = await Barbershop.findByIdAndUpdate(
				id,
				newData,
				{
					new: true,
					runValidators: true,
				}
			)
			res.status(200).json({ barbershop: updatedBarbershop })
		} else {
			res.status(404).json({ message: 'Barbershop not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

// -----------------------------------------------------------------------------
//        - Upload barbershop avatar image -
//        TODO: Test endpoint.
// -----------------------------------------------------------------------------
exports.uploadAvatar = async (req, res) => {
	try {
		const { id } = req.params
		const barbershop = await Barbershop.findById(id)
		if (barbershop) {
			if (req.file === undefined) {
				return res.status(400).json({ message: 'An image is required.' })
			}

			if (barbershop.avatar.cloudinaryId) {
				await cloudinary.uploader.destroy(barbershop.avatar.cloudinaryId)
			}
			// FIXME: I think this will throw an error if req.file.path does not exist.
			const result = await cloudinary.uploader.upload(req.file.path)
			const newData = {
				avatar: {
					url: result.secure_url,
					cloudinaryId: result.public_id,
				},
			}
			const updatedBarbershop = await Barbershop.findByIdAndUpdate(
				id,
				newData,
				{
					new: true,
					runValidators: true,
				}
			)
			res.status(200).json({ barbershop: updatedBarbershop })
		} else {
			res.status(404).json({ message: 'Barbershop not found.' })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

// -----------------------------------------------------------------------------
//        - Delete barbershop -
// -----------------------------------------------------------------------------
exports.deleteBarbershop = async (req, res) => {
	try {
		const { id } = req.params
		const barbershop = await Barbershop.findById(id)
		if (barbershop) {
			if (barbershop.banner.cloudinaryId) {
				await cloudinary.uploader.destroy(barbershop.banner.cloudinaryId)
			}

			if (barbershop.avatar.cloudinaryId) {
				await cloudinary.uploader.destroy(barbershop.avatar.cloudinaryId)
			}
			await Barbershop.deleteOne({ _id: id }) // replaced remove with deleteOne.
			res.status(200).json({ message: `${barbershop.name} has been removed.` })
		} else {
			res.status(404).json({ message: 'Barbershop not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}
