const express = require('express')
const router = express.Router()
const { getUserProfile } = require('../controllers/users')

router.route('/profile').get(getUserProfile)

module.exports = router
