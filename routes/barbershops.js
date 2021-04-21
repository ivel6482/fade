const express = require('express')
const router = express.Router()
const {
	getAllBarbershops,
	createBarbershop,
} = require('../controllers/barbershops')

router.get('/', getAllBarbershops)
router.post('/', createBarbershop)

module.exports = router
