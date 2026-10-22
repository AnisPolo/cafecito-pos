import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import searchIcon from '../../assets/svg/search_icon.svg'
import styles from './SearchBar_atm.module.css'

/* Barra de búsqueda — ref_img/1x/searchBar_atm.png
   Enter o la lupa llevan a /menu?q=texto. Estando en /menu además filtra en vivo.
   El texto buscado vive en la URL (?q=), así que funciona con recargar y atrás/adelante. */
export default function SearchBar_atm({ placeholder = 'Buscar' }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [text, setText] = useState(q)

  // atrás/adelante o "Quitar búsqueda" cambian ?q=: el campo se pone al día
  useEffect(() => setText(q), [q])

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = text.trim()
    navigate(value ? `/menu?q=${encodeURIComponent(value)}` : '/menu')
  }

  const handleChange = (e) => {
    const value = e.target.value
    setText(value)
    // en /menu se filtra mientras se escribe, sin llenar el historial
    if (pathname === '/menu') setParams(value.trim() ? { q: value } : {}, { replace: true })
  }

  return (
    <form className={styles.bar} role="search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Buscar productos"
      />
      <button type="submit" className={styles.submit} aria-label="Buscar">
        <img className={styles.icon} src={searchIcon} alt="" />
      </button>
    </form>
  )
}
