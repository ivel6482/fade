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
} = require('../controllers/appointments')
const { protect } = require('../middleware/auth')

router.route('/').post(createAppointment).get(getAllAppointments)
router
	.route('/:id')
	.get(getAppointment)
	.put(updateAppointment)
	.delete(deleteAppointment)

router.put('/:id/book', protect, bookAppointment)
router.put('/:id/cancel', protect, cancelAppointment)

module.exports = router
