const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema(
	{
		time: {
			type: String, // For testing, change to date
			required: [true, 'Please specify an appointment time'],
		},
		day: {
			type: Date,
			required: [true, 'Please specify an appointment date'],
			default: Date.now(),
			unique: true,
		},
		booked: {
			type: Boolean,
			required: [true, 'Please specify is the appointment is booked'],
			default: false,
		},
		bookedAt: {
			type: Date,
		},
		bookedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			// required: [
			// 	true,
			// 	'Please provide the id of the user who booked the appointment',
			// ],
		},
		barberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Barber',
			required: [
				true,
				'Please specify the id of the barber that the appointment belongs to',
			],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Appointment', AppointmentSchema)
