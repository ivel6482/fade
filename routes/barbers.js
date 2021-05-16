const express = require("express")
const upload = require("../utils/multer")
const router = express.Router()
const {
  createBarber,
  getBarber,
  getAllBarbers,
  updateBarber,
  uploadAvatar,
  deleteBarber,
} = require("../controllers/barbers")

router.route("/").post(createBarber).get(getAllBarbers)
router.route("/:id").get(getBarber).put(updateBarber).delete(deleteBarber)
router.route("/:id/avatar").put(upload.single("image"), uploadAvatar)

module.exports = router
