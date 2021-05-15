const mongoose = require("mongoose")

const BarberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a barber name"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Please enter a status"],
      enum: ["available", "booked", "not available"],
      default: "not availlable",
    },
    barbershop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barbershop",
    },
    specialty: {
      type: [String],
      enum: ["beard trimming", "haircut", "fade", "coloring"],
      default: "haircut",
    },
    //  appointments: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: "Appointment",
    //  },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Barber", BarberSchema)
