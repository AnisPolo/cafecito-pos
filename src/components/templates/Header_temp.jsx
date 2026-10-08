import { Link } from 'react-router-dom'
import NavSearch_mol from '../molecules/NavSearch_mol'
import Logo_atm from '../atoms/Logo_atm'
import UserNav_mol from '../molecules/UserNav_mol'
import { useCart } from '../../context/CartContext'
import styles from './Header_temp.module.css'

/* Cabecera común a las 5 pantallas — ref_img/1x/Header_temp.png
   `active` decide qué elemento lleva la caja naranja.
   El contador del pedido sale del carrito. */
export default function Header_temp({ active = null, searchValue = '' }) {
  const { count } = useCart()
  return (
    <header className={styles.header}>
      <NavSearch_mol menuBoxed={active === 'menu'} searchValue={searchValue} />
      <Link className={styles.logo} to="/">
        <Logo_atm />
      </Link>
      <UserNav_mol profileHighlighted={active === 'perfil'} orderCount={count} />
    </header>
  )
}
