const express = require('express')
const router = express.Router()
const { signup, getLoggedInUser, login } = require('../controllers/auth')
const { protect } = require('../middleware/auth')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/user').get(protect, getLoggedInUser)

module.exports = router
