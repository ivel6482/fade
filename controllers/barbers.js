const Barber = require("../models/Barber")
const cloudinary = require("../utils/cloudinary")

//------------------------------------------------------------------------------
//          - Get all barbers -
//------------------------------------------------------------------------------

exports.getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barbers.find()
    const count = await Barbers.countDocuments()

    if (barbers.length === 0) {
      return res.status(200).json({ message: "No barbers" })
    }

    res.status(200).json({ count, barbers })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

//------------------------------------------------------------------------------
//          - Get single barber -
//------------------------------------------------------------------------------

exports.getBarber = async (req, res) => {
  try {
    const { id } = req.params
    const barber = await Barber.findById(id)
    if (barber) {
      res.status(200).json(barber)
    } else {
      res.status(404).json({ message: 'Barber not found' })
    }
  } catch(error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
