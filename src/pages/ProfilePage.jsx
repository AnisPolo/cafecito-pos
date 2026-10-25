import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMe } from '../hooks/useMe'
import ClientProfilePage from './ClientProfilePage'
import AdminProfilePage from './AdminProfilePage'

/* /perfil: según el rol muestra el perfil del cliente o el del administrador */
export default function ProfilePage() {
  const me = useMe()
  const { token } = useAuth()

  if (!token) return <Navigate to="/login" replace />
  if (!me) return <p>Cargando...</p>

  return me.role === 'admin' ? <AdminProfilePage me={me} /> : <ClientProfilePage me={me} />
}
