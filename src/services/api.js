export const api = async (url, method = 'GET', data = null, token = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const res = await fetch(url, options)
  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Erro na requisição')
  }

  return result
}
