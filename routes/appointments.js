const express = require('express')
const router = express.Router()
const {
	createAppointment,
	getAllAppointments,
	getAppointment,
	updateAppointment,
	deleteAppointment,
	bookAppointment,
	cancelAppointment,
	getAvailableAppointments,
	getBookedAppointments,
	completeAppointment,
} = require('../controllers/appointments')
const { protect, authorize } = require('../middleware/auth')

router
	.route('/')
	.post(createAppointment)
	.get(protect, authorize('barber', 'admin'), getAllAppointments)
router.get('/available', getAvailableAppointments)
router.get('/booked', getBookedAppointments)
router
	.route('/:id')
	.get(getAppointment)
	.put(updateAppointment)
	.delete(deleteAppointment)

router.put('/:id/book', protect, bookAppointment)
router.put('/:id/cancel', protect, cancelAppointment)
router.put('/:id/complete', protect, completeAppointment)

module.exports = router
