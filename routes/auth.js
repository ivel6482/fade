const express = require('express')
const router = express.Router()
const { signup, getLoggedInUser, login } = require('../controllers/auth')
const { protect } = require('../middleware/auth')
const upload = require('../utils/multer')

router.route('/signup').post(upload.single('image'), signup)
router.route('/login').post(login)
router.route('/user').get(protect, getLoggedInUser)

module.exports = router
