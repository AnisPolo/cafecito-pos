import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ProfileTemplate_temp from '../components/templates/ProfileTemplate_temp'
import { useAuth } from '../context/AuthContext'
import { getMyCarts } from '../services/cartService'
import { profile as profileBase } from '../data/products'
import { useMe } from '../hooks/useMe'

const SEALS_TOTAL = 15

/* ref_img/ProfilePage.png — datos del usuario y pedidos desde la BD */
export default function ProfilePage() {
  const me = useMe()
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!token) return
    getMyCarts(token)
      .then((carts) =>
        setOrders(
          [...carts]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((c) => ({
              id: c._id,
              date: new Date(c.date).toLocaleDateString('es-MX'),
              amount: c.totalPrice,
            }))
        )
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

  return <ProfileTemplate_temp profile={profile} orders={orders} />
}
