// const mongoose = require('mongoose')

// // ? Is there a way of extending User schema to use this Barber schema as well if the role is barber in the User schema?
// const BarberSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: [true, 'Please enter a barber name'],
// 			trim: true,
// 		},
// 		avatar: {
// 			url: {
// 				type: String,
// 			},
// 			cloudinaryId: {
// 				type: String,
// 			},
// 		},
// 		status: {
// 			type: String,
// 			required: [true, 'Please enter a status'],
// 			enum: ['available', 'booked', 'not available'],
// 			default: 'not available',
// 		},
// 		barbershop: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'Barbershop',
// 		},
// 		specialties: {
// 			type: [String],
// 			enum: ['beard trimming', 'haircut', 'fade', 'coloring'],
// 			default: 'haircut',
// 		},
// 		appointments: [
// 			{
// 				type: mongoose.Schema.Types.ObjectId,
// 				ref: 'Appointment',
// 			},
// 		],
// 	},
// 	{ timestamps: true }
// )

// module.exports = mongoose.model('Barber', BarberSchema)
