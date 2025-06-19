import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'Utilizador não encontrado.' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter utilizador.' })
  }
})

export default router