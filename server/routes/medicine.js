const express = require('express')
const router = express.Router();

const authMiddleware = require('../middlewares/authentication')
const {addMedicine,getMedicineInfo,removeMedicine,
    updateMedicine,getAllMeds,searchMed} = require('../controllers/medicine')

router.route('/search').get(authMiddleware,searchMed)
router.route("/").post(authMiddleware,addMedicine).get(authMiddleware,getAllMeds)
router.route("/:id").delete(authMiddleware,removeMedicine).patch(authMiddleware,updateMedicine)
                    .get(authMiddleware,getMedicineInfo)

module.exports = router;