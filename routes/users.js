const express = require('express')
const router = express.Router()
const {
	deleteUser,
	getUser,
	getUsers,
	updateUserDetails,
	updateUserAvatar,
} = require('../controllers/users')
const {
	getUserBookedAppointments,
	getUserPastBookedAppointments,
} = require('../controllers/appointments')
const { protect } = require('../middleware/auth')
const upload = require('../utils/multer')

router.route('/').get(getUsers)

router.route('/:id').get(getUser).put(updateUserDetails).delete(deleteUser)

router.route('/:id/avatar').put(upload.single('avatar'), updateUserAvatar)

router.get('/:id/appointments', getUserBookedAppointments)
router.get('/:id/appointments/complete', getUserPastBookedAppointments)

module.exports = router
