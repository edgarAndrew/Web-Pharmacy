const express = require("express")
const router = express.Router()

const {addSale,addToCart,getAllSales,removeSale,getCart,searchSale} = require("../controllers/sales")
const authMiddleware = require("../middlewares/authentication")

router.route('/search').get(authMiddleware,searchSale)
router.route('/').post(authMiddleware,addSale).get(authMiddleware,getAllSales)
router.route('/:orderId').post(authMiddleware,addToCart).delete(authMiddleware,removeSale)
                        .get(authMiddleware,getCart)

module.exports = router