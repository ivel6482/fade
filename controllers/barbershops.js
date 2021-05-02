const Barbershop = require('../models/Barbershop')
const cloudinary = require('../utils/cloudinary')

const getAllBarbershops = async (req, res) => {
	try {
		const barbershops = await Barbershop.find()
		const barbershopsCount = await Barbershop.find().countDocuments()

		if (!barbershops) {
			return res
				.status(404)
				.json({ success: false, message: 'No barbershops found.' })
		}

		res
			.status(200)
			.json({ success: true, barbershops, count: barbershopsCount })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}

const createBarbershop = async (req, res) => {
	try {
		const { name, address, picture } = req.body
		const result = await cloudinary.uploader.upload(req.file.path)

		const barbershop = {
			name,
			address,
			picture: result.secure_url,
			cloudinaryId: result.public_id,
		}

		const created = await Barbershop.create(barbershop)
		res.status(200).json({ barbershop: created })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}

module.exports = {
	getAllBarbershops,
	createBarbershop,
}
