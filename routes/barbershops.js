const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const { protect } = require('../middleware/auth')
const {
	getAllBarbershops,
	createBarbershop,
} = require('../controllers/barbershops')

router
	.route('/')
	.get(getAllBarbershops)
	.post(protect, upload.single('image'), createBarbershop)

module.exports = router
