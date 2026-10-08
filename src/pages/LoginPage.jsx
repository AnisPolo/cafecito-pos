import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/authService'
import styles from './LoginPage.module.css'

/* Inicio de sesión / registro */
export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isRegister = mode === 'register'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) await register(name, email, password)
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <Link className={styles.back} to="/">← Volver</Link>
        <h1 className={styles.title}>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h1>

        {isRegister && (
          <label className={styles.field}>
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        )}
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
            minLength={8}
            required
          />
        </label>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? 'Enviando...' : isRegister ? 'Registrarme' : 'Entrar'}
        </button>

        <button
          className={styles.switch}
          type="button"
          onClick={() => { setMode(isRegister ? 'login' : 'register'); setError('') }}
        >
          {isRegister ? 'Ya tengo cuenta' : 'No tengo cuenta, quiero registrarme'}
        </button>
      </form>
    </main>
  )
}
