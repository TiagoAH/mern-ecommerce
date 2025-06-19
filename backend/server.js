import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)


app.get('/', (req, res) => {
  res.send('API está a funcionar 🔥')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`))
