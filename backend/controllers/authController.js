import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Gerar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

}

// 📌 Registar novo utilizador
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Preenche todos os campos.' })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Email já está registado.' })
    }

    // Torna o primeiro utilizador admin
    const isFirstUser = (await User.countDocuments()) === 0

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: isFirstUser
    })

    const token = generateToken(user)

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao registar utilizador.' })
  }
}

// 📌 Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas.' })
    }

    const token = generateToken(user)

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao autenticar utilizador.' })
  }
}
