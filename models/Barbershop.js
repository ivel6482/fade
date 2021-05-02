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
		cloudinaryId: {
			type: String,
		},
		picture: {
			type: String,
			default:
				'https://res.cloudinary.com/drlwtqzgt/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1619727940/samples/animals/cat.jpg',
			required: true,
		},
		// owner: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Owner'
		// }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Barbershop', BarbershopSchema)
