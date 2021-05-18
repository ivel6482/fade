const express = require('express')
const router = express.Router()
const {
	createAppointment,
	getAllAppointments,
	getAppointment,
	updateAppointment,
	deleteAppointment,
} = require('../controllers/appointments')

router.route('/').post(createAppointment).get(getAllAppointments)
router
	.route('/:id')
	.get(getAppointment)
	.put(updateAppointment)
	.delete(deleteAppointment)

module.exports = router
