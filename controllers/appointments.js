const Appointment = require('../models/Appointment')

exports.getAllAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find()
		const count = await Appointment.countDocuments()

		if (appointments.length === 0) {
			return res.status(200).json({ message: 'No appointments' })
		}

		res.status(200).json({ count, appointments })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getAvailableAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find({ booked: false })
		const count = await Appointment.countDocuments({ booked: false })
		if (appointments) {
			res.status(200).json({ count, appointments })
		} else {
			res.status(404).json({ message: 'No available appointments' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getBookedAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find({ booked: true })
		const count = await Appointment.countDocuments({ booked: true })
		if (appointments) {
			res.status(200).json({ count, appointments })
		} else {
			res.status(404).json({ message: 'No available appointments' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const appointment = await Appointment.findById(id)

		if (appointment) {
			res.status(200).json(appointment)
		} else {
			res.status(404).json({ message: 'No appointment found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//TODO: Get appointment by barber
// /barbers/:id/appointments
exports.getBarberAppointments = async (req, res) => {
	try {
		const { id } = req.params
		const appointments = await Appointment.find({ barberId: id })

		if (appointments.length === 0 || !appointments) {
			return res
				.status(404)
				.json({ message: 'No appointments for selected barber' })
		} else {
			res.status(200).json({ appointments })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.createAppointment = async (req, res) => {
	try {
		const { time, barberId } = req.body
		const duplicateAppointmentExists = await Appointment.findOne({
			barberId,
			time,
		}).populate('barberId')

		if (duplicateAppointmentExists) {
			return res.status(400).json({
				message: `An appointment at ${time} for ${duplicateAppointmentExists.barberId.name} already exists.`,
			})
		}

		const newAppointment = {
			time,
			barberId,
		}

		const appointment = await Appointment.create(newAppointment)
		res.status(200).json(appointment)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

// TODO: Better handle duplicate key error
exports.updateAppointment = async (req, res) => {
	const { id } = req.params
	const { time, day } = req.body
	try {
		const appointment = await Appointment.findById(id)

		if (appointment) {
			const newData = {
				time: time || appointment.time,
				day: day || appointment.day,
			}

			const updatedAppointment = await Appointment.findByIdAndUpdate(
				id,
				newData,
				{ new: true, runValidators: true }
			)

			res.status(200).json({ appointment: updatedAppointment })
		} else {
			res.status(404).json({ message: 'Appointment not found' })
		}
	} catch (error) {
		if (
			error.name === 'MongoError' &&
			error.message.split(' ')[0] === 'E11000'
		) {
			return res.status(400).json({
				message: `There is already an appointment with the time: ${time}`,
			})
		}
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.bookAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const appointment = await Appointment.findById(id)
		if (appointment) {
			const bookedData = {
				bookedAt: Date.now(),
				bookedBy: req.user._id,
				booked: true,
			}

			const bookedAppointment = await Appointment.findByIdAndUpdate(
				id,
				bookedData,
				{ new: true, runValidators: true }
			)

			res.status(200).json({ appointment: bookedAppointment })
		} else {
			res.status(404).json({ message: 'Appointment not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.cancelAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const appointment = await Appointment.findById(id)
		if (appointment) {
			const cancelData = {
				bookedAt: null,
				bookedBy: null,
				booked: false,
			}

			const canceledAppointment = await Appointment.findByIdAndUpdate(
				id,
				cancelData,
				{ new: true, runValidators: true }
			)

			res.status(200).json({ appointment: canceledAppointment })
		} else {
			res.status(404).json({ message: 'Appointment not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.deleteAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const appointment = await Appointment.findById(id)
		if (appointment) {
			await Appointment.deleteOne({ _id: id })
			res.status(200).json({
				message: `Appointment at ${appointment.time} with the id of ${appointment._id}`,
			})
		} else {
			res.status(404).json({ message: 'Appointment not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getUserBookedAppointments = async (req, res) => {
	try {
		const { id } = req.params
		const appointments = await Appointment.find({ bookedBy: id })

		if (appointments) {
			res.status(200).json({ appointments })
		} else {
			res.status(404).json({ message: 'No appointments found' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}
