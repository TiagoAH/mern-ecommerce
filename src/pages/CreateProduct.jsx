
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CreateProduct() {
 
  const navigate = useNavigate()
  const { token, user } = useAuth()

  useEffect(() => {
    if (!user?.isAdmin) {
      alert('Apenas administradores podem criar produtos.')
      navigate('/')
  }
}, [user])

  
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      alert('Tens de fazer login para criar um produto.')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price)
        })
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Erro ao criar produto.')
      }

      alert('Produto criado com sucesso!')
      navigate('/produtos')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Criar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Guardar Produto
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
