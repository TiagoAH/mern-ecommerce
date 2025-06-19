import express from 'express'
import { createProduct, getProducts } from '../controllers/productController.js'
import protect from '../middleware/authMiddleware.js'
import isAdmin from '../middleware/adminMiddleware.js'
import { deleteProduct } from '../controllers/productController.js'
import { getProductById, updateProduct } from '../controllers/productController.js'
const router = express.Router()

router.get('/', getProducts)
router.post('/', protect, isAdmin, createProduct)
router.delete('/:id', protect, isAdmin, deleteProduct)
router.get('/:id', getProductById)
router.put('/:id', protect, isAdmin, updateProduct)

export default router
