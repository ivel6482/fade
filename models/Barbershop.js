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
					required: [
						true,
						'Please specify an hour your barbershop will be opened to the public',
					],
				},
				close: {
					type: String,
					required: [
						true,
						'Please specify an hour your barbershop will be closed to the public',
					],
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
				default: [],
				required: [
					true,
					'Please specify at least one day that your barbershop will be opened.',
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
			default: [],
		},

		// owner: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Owner'
		// },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Barbershop', BarbershopSchema)
