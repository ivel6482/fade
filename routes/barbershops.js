const express = require('express')
const router = express.Router()
const {
	getAllBarbershops,
	createBarbershop,
} = require('../controllers/barbershops')

router.route('/').get(getAllBarbershops).post(createBarbershop)

module.exports = router
