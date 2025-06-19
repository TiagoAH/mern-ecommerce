import Product from '../models/Product.js'

// 📌 Obter todos os produtos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter produtos.' })
  }
}

// 📌 Obter um único produto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter o produto.' })
  }
}

// 📌 Criar novo produto (admin)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body

    if (!name || !price) {
      return res.status(400).json({ message: 'Nome e preço são obrigatórios.' })
    }

    const product = new Product({
      name,
      description,
      price,
      image,
    })

    const created = await product.save()
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar produto.' })
  }
}

// 📌 Atualizar produto (admin)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, image, price } = req.body
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' })

    product.name = name
    product.description = description
    product.image = image
    product.price = price

    const updated = await product.save()
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto.' })
  }
}

// 📌 Apagar produto (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' })

    await product.deleteOne()
    res.json({ message: 'Produto apagado com sucesso.' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao apagar produto.' })
  }
}
