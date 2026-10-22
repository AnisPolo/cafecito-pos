import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/authService'
import styles from './AuthPage.module.css'

const MIN_PASSWORD = 8

/* Registro — mismo diseño que el inicio de sesión.
   Al registrarse se inicia sesión automáticamente. */
export default function RegisterPage() {
  const { token, login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // con sesión iniciada no tiene sentido ver el formulario; tras registrarse, esto mismo lleva a la portada
  if (token) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    try {
      await register(name.trim(), email, password)
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
        <h1 className={styles.title}>Crear cuenta</h1>

        <label className={styles.field}>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
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
            minLength={MIN_PASSWORD}
            required
          />
          <span className={styles.hint}>Mínimo {MIN_PASSWORD} caracteres</span>
        </label>
        <label className={styles.field}>
          Confirmar contraseña
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={MIN_PASSWORD}
            required
          />
        </label>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Registrarme'}
        </button>

        <Link className={styles.switch} to="/login">
          Ya tengo cuenta
        </Link>
      </form>
    </main>
  )
}
