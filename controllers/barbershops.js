const Barbershop = require('../models/Barbershop')
const cloudinary = require('../utils/cloudinary')

exports.getAllBarbershops = async (req, res) => {
	try {
		const barbershops = await Barbershop.find()
		const barbershopsCount = await Barbershop.countDocuments()

		if (barbershops) {
			res
				.status(200)
				.json({ success: true, barbershops, count: barbershopsCount })
		} else {
			res.status(404).json({ success: false, message: 'No barbershops found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}

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

exports.createBarbershop = async (req, res) => {
	// Lon and lat will come from leaflet
	try {
		const {
			name,
			location: { address, lon, lat },
			contact: { phoneNumber },
			available: {
				hours: { open, close },
				days,
			},
		} = req.body

		const newBarbershop = {
			name,
			location: {
				address,
				lon,
				lat,
			},
			contact: {
				phoneNumber,
			},
			available: {
				hours: {
					open,
					close,
				},
				days,
			},
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

// TODO: Update barbershop
// TODO: Upload avatar
// TODO: Upload banner
// TODO: Delete barbershop
// TODO: Test controllers
