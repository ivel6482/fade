const mongoose = require('mongoose')

const BarbershopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter a barbershop name.'],
			trim: true,
		},
		about: {
			type: String,
			trim: true,
		},
		location: {
			address: {
				type: String,
				required: [true, 'Please enter a barbershop address'],
				trim: true,
			},
			lon: {
				type: String,
			},
			lat: {
				type: String,
			},
		},
		banner: {
			url: {
				type: String,
			},
			cloudinaryId: {
				type: String,
			},
		},
		avatar: {
			url: {
				// TODO: Set a default.
				type: String,
			},
			cloudinaryId: {
				type: String,
			},
		},
		contact: {
			phoneNumber: {
				type: String,
				required: [true, 'Please add a phone number, instead got {VALUE}'],
				match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			},
		},
		available: {
			hours: {
				open: {
					type: String,
				},
				close: {
					type: String,
				},
			},
			days: {
				type: [String],
				enum: [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
				],
			},
		},
		favoriteCount: {
			type: Number,
			default: 0,
		},
		favorites: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'User',
		},

		// owner: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Owner'
		// },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Barbershop', BarbershopSchema)
