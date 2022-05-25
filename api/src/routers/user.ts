import express from 'express'
import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.route('/').get(getAllUsers).post(createUser)
router.route('/:bookId').get(getSingleUser).put(updateUser).delete(deleteUser)

export default router