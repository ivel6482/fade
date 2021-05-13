const Barbershop = require("../models/Barbershop")
const cloudinary = require("../utils/cloudinary")

// -----------------------------------------------------------------------------
//        - Get all barbershops -
// -----------------------------------------------------------------------------

exports.getAllBarbershops = async (req, res) => {
  try {
    const barbershops = await Barbershop.find()
    const barbershopsCount = await Barbershop.countDocuments()

    if (barbershops && barbershops.length > 0) {
      res.status(200).json({ count: barbershopsCount, barbershops })
    } else {
      res.status(404).json({ success: false, message: "No barbershops found." })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// -----------------------------------------------------------------------------
//        - Get single barbershop -
// -----------------------------------------------------------------------------

exports.getBarbershop = async (req, res) => {
  try {
    const { id } = req.params
    const barbershop = await Barbershop.findById(id)

    if (barbershop) {
      res.status(200).json(barbershop)
    } else {
      res.status(404).json({ message: "Barbershop not found." })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// -----------------------------------------------------------------------------
//        - Create barbershop -
// -----------------------------------------------------------------------------

exports.createBarbershop = async (req, res) => {
  // Lon and lat will come from leaflet
  try {
    const { name, location, contact, available } = req.body

    const newBarbershop = {
      name,
      location,
      contact,
      available,
    }

    const created = await Barbershop.create(newBarbershop)
    res.status(200).json({ barbershop: created })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// -----------------------------------------------------------------------------
//        - Update barbershop -
// -----------------------------------------------------------------------------

exports.updateBarbershop = async (req, res) => {
  try {
    const { id } = req.params
    const barbershop = await Barbershop.findById(id)
    if (barbershop) {
      const { name, location, contact, available } = req.body
      console.log({
        body: req.body,
        barbershop,
      })

      const newData = {
        name: name || barbershop.name,
        location: location || barbershop.location,
        contact: contact || barbershop.contact,
        available: available || barbershop.available,
      }

      const updatedBarbershop = await Barbershop.findByIdAndUpdate(
        id,
        newData,
        {
          new: true,
          runValidators: true,
        }
      )
      res.status(200).json({ barbershop: updatedBarbershop })
    } else {
      res.status(404).json({ message: "Barbershop not found." })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
    console.error(error)
  }
}
// -----------------------------------------------------------------------------
//        - Upload barbershop banner image -
// - TODO:
//   - Upload banner
// -----------------------------------------------------------------------------
exports.uploadBanner = async (req, res) => {
  try {
    const { id } = req.params
    const barbershop = await Barbershop.findById(id)
    // TODO: If this works, refactor other controllers that contain cloudinary.
    if (barbershop) {
      if (barbershop.banner.cloudinaryId) {
        await cloudinary.uploader.destroy(barbershop.banner.cloudinaryId)
        console.log("Delete Image")
      }
      const result = await cloudinary.uploader.upload(req.file.path)
      console.log("Upload Image")
      const newData = {
        banner: {
          cloudinaryId: result.public_id,
          url: result.secure_url,
        },
      }
      const updatedBarbershop = await Barbershop.findByIdAndUpdate(
        id,
        newData,
        {
          new: true,
          runValidators: true,
        }
      )
      res.status(200).json({ barbershop: updatedBarbershop })

      // if (barbershop.banner.cloudinaryId) {
      //   // handle changing banner
      //   await cloudinary.uploader.destroy(barbershop.banner.cloudinaryId)
      //   const result = cloudinary.uploader.upload(req.file.path)
      //   const newData = {
      //     banner.cloudinaryId: result.public_id,
      //     banner.url = result.secure_url,
      //   }
      //   const updatedBarbershop = await Barbershop.findByIdAndUpdate(id, newData, {
      //     new: true,
      //     runValidators: true,
      //   })
      //   res.status(200).json({ barbershop: updatedBarbershop })
      // } else {
      //   // handle first upload
      //   const result = cloudinary.uploader.upload(req.file.path)
      //   const newData = {
      //     banner.cloudinaryId: result.public_id,
      //     banner.url = result.secure_url,
      //   }
      //   const updatedBarbershop = await Barbershop.findByIdAndUpdate(id, newData, {
      //     new: true,
      //     runValidators: true,
      //   })
      //   res.status(200).json({ barbershop: updatedBarbershop })
      // }
    } else {
      res.status(404).json({ message: "Barbershop not found." })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// -----------------------------------------------------------------------------
//        - Upload barbershop avatar image -
// - TODO:
//   - Upload avatar
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//        - Delete barbershop -
// -----------------------------------------------------------------------------
exports.deleteBarbershop = async (req, res) => {
  try {
    const { id } = req.params
    const barbershop = await Barbershop.findById(id)
    if (barbershop) {
      // Handle deletion of cloudinary pictures.
      await Barbershop.deleteOne({ _id: id }) // replaced remove with deleteOne.
      res.status(200).json({ message: `${barbershop.name} has been removed.` })
    } else {
      res.status(404).json({ message: "Barbershop not found." })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
