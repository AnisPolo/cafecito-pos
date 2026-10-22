import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AuthPage.module.css'

/* Inicio de sesión (el registro tiene su propia página: /register) */
export default function LoginPage() {
  const { token, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // con sesión iniciada no tiene sentido ver el formulario; tras entrar, esto mismo lleva a la portada
  if (token) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <Link className={styles.back} to="/">← Volver</Link>
        <h1 className={styles.title}>Iniciar sesión</h1>

        <label className={styles.field}>
          Correo
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className={styles.field}>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Entrar'}
        </button>

        <Link className={styles.switch} to="/register">
          No tengo cuenta, quiero registrarme
        </Link>
      </form>
    </main>
  )
}
