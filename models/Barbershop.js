const mongoose = require('mongoose')

const BarbershopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter a barbershop name.'],
			trim: true,
		},
		address: {
			type: String,
			required: [true, 'Please enter a barbershop address'],
			trim: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Barbershop', BarbershopSchema)
