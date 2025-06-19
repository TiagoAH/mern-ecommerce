import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, user } = useAuth()

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  })

  useEffect(() => {
    if (!user?.isAdmin) {
      alert('Apenas administradores podem editar produtos.')
      return navigate('/')
    }
  }, [user])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`)
        if (!res.ok) throw new Error('Produto não encontrado.')
        const data = await res.json()
        setProduct({
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image
        })
      } catch (err) {
        alert('Erro ao carregar produto.')
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price)
        })
      })

      if (!res.ok) throw new Error('Erro ao atualizar produto.')

      alert('Produto atualizado com sucesso!')
      navigate('/admin')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={product.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={product.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={product.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={product.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Guardar Alterações
        </button>
      </form>
    </div>
  )
}

export default EditProduct
