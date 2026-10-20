import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ProfileTemplate_temp from '../components/templates/ProfileTemplate_temp'
import { useAuth } from '../context/AuthContext'
import { getMyCarts } from '../services/cartService'
import { profile as profileBase } from '../data/products'
import { useMe } from '../hooks/useMe'
import { useCart } from '../context/CartContext'
import { buildTicket } from '../utils/ticket'

const SEALS_TOTAL = 15

// Ticket de un pedido guardado. Nombre y precio vienen de la captura hecha al comprar;
// los pedidos antiguos usan el producto actual (puede no existir si se borró).
const ticketFromCart = (cart) =>
  buildTicket({
    orderNumber: cart.orderNumber ?? String(cart._id).slice(-6).toUpperCase(),
    total: cart.totalPrice,
    discountPercent: cart.discountApplied ?? 0,
    items: cart.items.map((i) => ({
      ...i,
      name: i.name ?? i.product?.name ?? 'Producto no disponible',
      price: i.price ?? i.product?.price ?? 0,
      unavailable: i.price == null && i.product?.price == null, // producto borrado: precio desconocido
    })),
  })

/* ref_img/ProfilePage.png — datos del usuario y pedidos desde la BD */
export default function ProfilePage() {
  const me = useMe()
  const { token, logout } = useAuth()
  const { clear } = useCart()
  const navigate = useNavigate()
  const [carts, setCarts] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (!token) return
    getMyCarts(token)
      .then((list) =>
        setCarts([...list].sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((err) => {
        if (err.status === 401) {
          logout()
          navigate('/login')
        }
      })
  }, [token])

  if (!token) return <Navigate to="/login" replace />

  if (!me) return <p>Cargando...</p>

  const orders = carts.map((c) => ({
    id: c._id,
    date: new Date(c.date).toLocaleDateString('es-MX'),
    amount: c.totalPrice,
  }))

  const { next } = me
  const hint = next
    ? `Sube a ${next.discountPercentage}% registrando ${next.purchasesNeeded} ${
        next.purchasesNeeded === 1 ? 'compra' : 'compras'
      } más!`
    : '¡Ya tienes el descuento máximo!'

  const profile = {
    ...profileBase,
    name: me.name,
    discount: `${me.discountPercentage}%`,
    nextDiscountHint: hint,
    seals: { total: SEALS_TOTAL, filled: Math.min(me.purchasesCount, SEALS_TOTAL) },
  }

  const selectedCart = carts.find((c) => c._id === selectedId)
  const receipt = selectedCart ? ticketFromCart(selectedCart) : null

  const handleLogout = () => {
    logout()
    clear()
    navigate('/')
  }

  return (
    <ProfileTemplate_temp
      profile={profile}
      orders={orders}
      onLogout={handleLogout}
      onSelectOrder={setSelectedId}
      receipt={receipt}
      onCloseReceipt={() => setSelectedId(null)}
    />
  )
}
