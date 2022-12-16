const express = require('express')
const router = express.Router();

const authMiddleware = require('../middlewares/authentication')

const {addUser,deleteUser,getAllUsers,getCurrentUser} = require('../controllers/users')

router.route('/').get(authMiddleware,getAllUsers)
router.route('/profile').get(authMiddleware,getCurrentUser)
router.route('/add').post(authMiddleware,addUser)
router.route('/:id').delete(authMiddleware,deleteUser)

module.exports = router;