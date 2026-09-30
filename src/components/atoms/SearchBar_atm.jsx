import searchIcon from '../../assets/svg/search_icon.svg'
import styles from './SearchBar_atm.module.css'

/* Barra de búsqueda — ref_img/1x/searchBar_atm.png */
export default function SearchBar_atm({ value = '', placeholder = '' }) {
  return (
    <div className={styles.bar}>
      <input type="text" defaultValue={value} placeholder={placeholder} aria-label="Buscar" />
      <img className={styles.icon} src={searchIcon} alt="" />
    </div>
  )
}
