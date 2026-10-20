import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartTemplate_temp from '../components/templates/CartTemplate_temp'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createCart } from '../services/cartService'
import { useMe } from '../hooks/useMe'

const STORAGE_KEY = 'lastOrder'

// El ticket sobrevive a una recarga (un invitado no tiene perfil donde recuperar su número)
const loadConfirmation = () => {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) } catch { return null }
}
const saveConfirmation = (value) => {
  try {
    if (value) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch { /* sin storage */ }
}

/* ref_img/CartPage.png — se puede pagar con sesión o como invitado */
export default function CartPage() {
  const { items, total, removeItem, clear } = useCart()
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const [paying, setPaying] = useState(false)
  const [message, setMessage] = useState('')
  const [confirmation, setConfirmation] = useState(loadConfirmation)
  const me = useMe()

  const name = user?.name ?? 'Invitado'

  // el servidor recalcula el total real; aquí solo se muestra el estimado con descuento
  const discount = me?.discountPercentage ?? 0
  const shownTotal = Math.round(total * (1 - discount / 100) * 100) / 100

  const pay = async () => {
    setPaying(true)
    setMessage('')
    try {
      // copia de los productos antes de vaciar el carrito: el ticket necesita nombres y precios
      const lines = items.map((i) => ({ ...i }))
      const order = await createCart(items, token)

      const subtotal = lines.reduce((sum, i) => sum + i.price * i.quantity, 0)
      const percent = order.discountApplied ?? 0
      const ticket = {
        orderNumber: order.orderNumber,
        total: order.totalPrice,                          // el que cobró el servidor
        discountAmount: Math.max(subtotal - order.totalPrice, 0),
        items: lines.map((i) => ({
          ...i,
          discount: (i.price * i.quantity * percent) / 100, // parte del descuento de este producto
        })),
      }

      clear()
      saveConfirmation(ticket)
      setConfirmation(ticket)
    } catch (err) {
      if (err.status === 401 && token) {
        // la sesión venció: se cierra, pero se puede pagar de nuevo como invitado
        logout()
        setMessage('Tu sesión venció. Pulsa pagar de nuevo para continuar como invitado o inicia sesión.')
      } else {
        setMessage(err.message)
      }
    } finally {
      setPaying(false)
    }
  }

  const closeConfirmation = () => {
    saveConfirmation(null)
    setConfirmation(null)
    navigate('/menu')
  }

  const note =
    message ||
    (!token
      ? 'Comprando como invitado. Inicia sesión para obtener descuentos'
      : discount
        ? `Incluye ${discount}% de descuento`
        : '')

  return (
    <CartTemplate_temp
      items={items}
      total={shownTotal}
      onRemove={removeItem}
      onPay={pay}
      payDisabled={paying || items.length === 0}
      note={note}
      name={name}
      confirmation={confirmation}
      onCloseConfirmation={closeConfirmation}
    />
  )
}
