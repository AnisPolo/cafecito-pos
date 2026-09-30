import { Link } from 'react-router-dom'
import Profile_atm from '../atoms/Profile_atm'
import Order_atm from '../atoms/Order_atm'
import styles from './UserNav_mol.module.css'

/* Bloque derecho del header: perfil + pedido — ref_img/1x/Header_temp.png */
export default function UserNav_mol({ profileHighlighted = false, orderCount = 1 }) {
  return (
    <div className={styles.nav}>
      <Link to="/perfil">
        <Profile_atm highlighted={profileHighlighted} />
      </Link>
      <Link to="/carrito">
        <Order_atm count={orderCount} />
      </Link>
    </div>
  )
}
