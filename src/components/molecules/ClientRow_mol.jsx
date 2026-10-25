import avatar from '../../assets/svg/avatar_icon.svg'
import DiscountBadge_atm from '../atoms/DiscountBadge_atm'
import { discountHint } from '../../utils/discount'
import styles from './ClientRow_mol.module.css'

/* Renglón de cliente del panel de admin (solo consulta): nombre, correo,
   cuánto falta para el siguiente descuento y el descuento actual */
export default function ClientRow_mol({ client }) {
  return (
    <li className={styles.row}>
      <img className={styles.avatar} src={avatar} alt="" />
      <div className={styles.info}>
        <h3 className={styles.name}>{client.name}</h3>
        <p className={styles.email}>{client.email}</p>
        <p className={styles.hint}>{discountHint(client.next, '¡Ya tiene el descuento máximo!')}</p>
      </div>
      <DiscountBadge_atm>{client.discountPercentage}%</DiscountBadge_atm>
    </li>
  )
}
