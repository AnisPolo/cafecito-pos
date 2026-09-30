import { Link } from 'react-router-dom'
import TittleOrangeBox_atm from '../atoms/TittleOrangeBox_atm'
import SearchBar_atm from '../atoms/SearchBar_atm'
import styles from './NavSearch_mol.module.css'

/* Bloque izquierdo del header: Menu + buscador — ref_img/1x/Header_temp.png */
export default function NavSearch_mol({ menuBoxed = false, searchValue = '' }) {
  return (
    <div className={styles.nav}>
      <Link to="/menu">
        <TittleOrangeBox_atm boxed={menuBoxed}>Menu</TittleOrangeBox_atm>
      </Link>
      <SearchBar_atm value={searchValue} />
    </div>
  )
}
