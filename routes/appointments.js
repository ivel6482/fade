const express = require('express')
const router = express.Router()
const {
	createAppointment,
	getAllAppointments,
	getAppointment,
	updateAppointment,
} = require('../controllers/appointments')

router.route('/').post(createAppointment).get(getAllAppointments)
router.route('/:id').get(getAppointment).put(updateAppointment)

module.exports = router
