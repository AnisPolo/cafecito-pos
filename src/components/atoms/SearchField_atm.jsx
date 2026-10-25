import searchIcon from '../../assets/svg/search_icon.svg'
import styles from './SearchField_atm.module.css'

/* Campo de búsqueda (solo presentación): píldora ámbar con la lupa como botón de envío.
   Lo usa SearchBar_atm (encabezado, lleva al menú) y el filtro de clientes del admin. */
export default function SearchField_atm({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar',
  label = 'Buscar',
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form className={styles.bar} role="search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={label}
      />
      <button type="submit" className={styles.submit} aria-label="Buscar">
        <img className={styles.icon} src={searchIcon} alt="" />
      </button>
    </form>
  )
}
