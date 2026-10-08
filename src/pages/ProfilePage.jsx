import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ProfileTemplate_temp from '../components/templates/ProfileTemplate_temp'
import { useAuth } from '../context/AuthContext'
import { getMyCarts } from '../services/cartService'
import { profile as profileBase } from '../data/products'

const SEALS_TOTAL = 15

/* ref_img/ProfilePage.png — datos del usuario y pedidos desde la BD */
export default function ProfilePage() {
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

  const profile = {
    ...profileBase,
    name: user?.name || profileBase.name,
    discount: `${user?.discountPercentage ?? 0}%`,
    seals: { total: SEALS_TOTAL, filled: Math.min(orders.length, SEALS_TOTAL) },
  }

  return <ProfileTemplate_temp profile={profile} orders={orders} />
}
