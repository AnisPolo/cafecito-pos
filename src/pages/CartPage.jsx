import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartTemplate_temp from '../components/templates/CartTemplate_temp'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createCart } from '../services/cartService'

/* ref_img/CartPage.png */
export default function CartPage() {
  const { items, total, removeItem, clear } = useCart()
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const [paying, setPaying] = useState(false)
  const [message, setMessage] = useState('')

  // el servidor recalcula el total real; aquí solo se muestra el estimado con descuento
  const discount = user?.discountPercentage || 0
  const shownTotal = Math.round(total * (1 - discount / 100) * 100) / 100

  const pay = async () => {
    if (!token) return navigate('/login')
    setPaying(true)
    setMessage('')
    try {
      await createCart(items, token)
      clear()
      navigate('/perfil')
    } catch (err) {
      if (err.status === 401) {
        logout()
        navigate('/login')
      } else {
        setMessage(err.message)
      }
    } finally {
      setPaying(false)
    }
  }

  const note =
    message || (!token ? 'Inicia sesión para pagar' : discount ? `Incluye ${discount}% de descuento` : '')

  return (
    <CartTemplate_temp
      items={items}
      total={shownTotal}
      onRemove={removeItem}
      onPay={pay}
      payDisabled={paying || items.length === 0}
      note={note}
    />
  )
}
