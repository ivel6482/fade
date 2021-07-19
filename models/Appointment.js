const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema(
	{
		time: {
			type: String, // For testing, change to date
			required: [true, 'Please specify an appointment time'],
		},
		booked: {
			type: Boolean,
			required: [true, 'Please specify is the appointment is booked'],
			default: false,
		},
		completed: {
			type: Boolean,
			required: [true, 'Please specify if the appointment has been completed'],
			default: false,
		},
		bookedAt: {
			type: Date,
		},
		bookedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		barberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [
				true,
				'Please specify the id of the barber that the appointment belongs to',
			],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Appointment', AppointmentSchema)
